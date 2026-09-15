// Run against the production build in CI before publishing. Direct URL renders
// alone do not exercise React Router's lazy imports from an already-open Home.
export async function verifyNavigation(browser, origin) {
  const page = await browser.newPage();
  const failures = [];
  page.on('pageerror', error => failures.push(String(error)));
  await page.setViewport({ width: 1440, height: 900 });
  const arrived = async path => {
    await page.waitForFunction(expected => location.pathname === expected &&
      document.querySelector('#root h1') && !document.querySelector('[data-route-error]'), { timeout: 15000 }, path);
    if (failures.length) throw new Error(failures.join('\n'));
  };
  const follow = async path => {
    await page.click(`a[href="${path}"]`);
    await arrived(path);
  };

  try {
    // Reproduce a tab whose first lazy page chunk disappeared after deployment.
    let missing = true;
    await page.setRequestInterception(true);
    const intercept = request => {
      if (missing && /\/assets\/WhyAvantePage-[^/]+\.js/.test(request.url())) {
        missing = false;
        return request.respond({ status: 404, contentType: 'text/plain', body: 'Missing previous deployment chunk' });
      }
      return request.continue();
    };
    page.on('request', intercept);
    await page.goto(`${origin}/en`, { waitUntil: 'domcontentloaded' });
    await arrived('/en');
    await Promise.all([
      page.waitForResponse(result => /\/assets\/WhyAvantePage-[^/]+\.js/.test(result.url()) && result.status() === 200, { timeout: 15000 }),
      follow('/en/why-avante'),
    ]);
    // The document reload must have retrieved the replacement module, not just
    // displayed prerendered HTML or left the Home underneath a loading overlay.
    await page.waitForFunction(() => !document.querySelector('[data-route-error]') && document.querySelector('.interior-hero h1'), { timeout: 15000 });
    if (missing) throw new Error('The missing route chunk regression was not exercised');
    page.off('request', intercept);
    await page.setRequestInterception(false);
    console.log('✓ Navigation recovers a missing page chunk at the intended destination');

    for (const locale of ['en', 'pt', 'es']) {
      await page.goto(`${origin}/${locale}`, { waitUntil: 'domcontentloaded' });
      await arrived(`/${locale}`);
      for (const route of ['why-avante', 'portfolio', 'investors', 'principles', 'library']) {
        await follow(`/${locale}/${route}`);
      }
      const article = await page.$eval(`a[href^="/${locale}/library/"]`, element => element.getAttribute('href'));
      await follow(article);
      await follow(`/${locale}`);
      console.log(`✓ Navigation: ${locale} Home → venture builder → portfolio → investors → principles → library → article → Home`);
    }

    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${origin}/es`, { waitUntil: 'domcontentloaded' });
    await arrived('/es');
    for (const route of ['why-avante', 'portfolio', 'library', 'investors']) {
      await page.click('.avt-nav-hamburger');
      await page.waitForSelector('#avante-mobile-navigation[open]');
      await page.click(`#avante-mobile-navigation a[href="/es/${route}"]`);
      await arrived(`/es/${route}`);
      await page.waitForFunction(() => !document.querySelector('#avante-mobile-navigation[open]') &&
        document.documentElement.style.overflow !== 'hidden' && document.body.style.overflow !== 'hidden');
    }
    console.log('✓ Mobile navigation: all internal menu routes open and restore scrolling');
  } finally {
    await page.close();
  }
}
