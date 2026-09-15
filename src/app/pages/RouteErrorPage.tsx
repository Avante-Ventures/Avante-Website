import { useEffect } from 'react';
import { useLocation, useRouteError } from 'react-router';
import { recoverRoute } from '../routeRecovery.mjs';

const COPY = {
  en: ['This page could not load.', 'Please try opening it again.', 'Open page again', 'Back to Home'],
  pt: ['Não foi possível abrir esta página.', 'Tente abrir a página novamente.', 'Abrir novamente', 'Voltar ao início'],
  es: ['No se pudo abrir esta página.', 'Intenta abrir la página de nuevo.', 'Abrir de nuevo', 'Volver al inicio'],
};

export default function RouteErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  const locale = location.pathname.split('/')[1];
  const language = locale === 'pt' || locale === 'es' ? locale : 'en';
  const copy = COPY[language];
  const destination = location.pathname + location.search + location.hash;

  useEffect(() => {
    let storage;
    try { storage = window.sessionStorage; } catch { return; }
    recoverRoute(error, destination, {
      storage, online: navigator.onLine, build: import.meta.url,
      navigate: (url: string) => window.location.replace(url),
    });
  }, [error, destination]);

  // These are document links: recovery must not reuse the failed module cache.
  return <main data-route-error style={{ minHeight: '100svh', display: 'grid', alignContent: 'center', gap: 24, padding: 'max(24px, 6vw)', background: '#06070d', color: '#eef0f7' }}>
    <img src="/redesign-assets/avante-logo.svg" alt="Avante" width="120" height="32" />
    <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.1 }}>{copy[0]}</h1>
    <p>{copy[1]}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <a href={destination} style={{ padding: '12px 0', textDecoration: 'underline' }}>{copy[2]} ↗</a>
      <a href={`/${language}`} style={{ padding: '12px 0', textDecoration: 'underline' }}>{copy[3]}</a>
    </div>
  </main>;
}
