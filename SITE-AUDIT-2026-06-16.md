# Auditoría del sitio Avante Ventures — 2026-06-16

> Reporte de síntesis sobre 43 hallazgos verificados adversarialmente. Tras deduplicar
> (varios hallazgos eran el mismo problema visto desde dimensiones de auditoría distintas),
> quedan **34 incidencias confirmadas y únicas**. Las severidades reflejan la severidad
> *corregida* tras la verificación adversarial, no la severidad cruda inicial.

---

## Resumen ejecutivo

El sitio está estructuralmente sano y funciona en producción, pero arrastra **dos clases de
deuda que erosionan la credibilidad ante inversores y fundadores**. Primero, hay
**contradicciones numéricas en métricas de track record que se muestran en vivo**: el múltiplo
de salida de Accera figura como `5×` en la tarjeta de portafolio pero `4×` en el ticker de la
home (crítico), y el de Sigga aparece como `11×` en una sola tarjeta contra `10×` en todo el
resto del sitio, incluida la misma página (alto). A esto se suman conteos de portafolio
incompatibles (`1` vs `2` vs `3` ventures activas), una promesa de reducción de costos del 90%
que el propio equipo documentó como no garantizable y que sigue publicada en el ticker, y una
oficina (Bogotá) anunciada en el ticker que no existe en ninguna otra parte del sitio.

Segundo, hay **deuda de contenido e i18n**: las biografías y títulos del equipo —el contenido
de mayor peso de confianza— están codificados solo en inglés y se renderizan sin traducir en la
versión en portugués; tres enlaces de artículos apuntan a `/contact`, una ruta inexistente que
da 404; y la página 404 no emite metadatos (sin `noindex`, título genérico, HTTP 200). El resto
es **código muerto duplicado** (`TeamGrid`, `VenturesGrid`, `LogoGrid`, `ProofSection` y ~20
componentes huérfanos) que hoy no se ve, pero que guarda datos obsoletos contradictorios y es
una trampa de mantenimiento si alguien lo reconecta. La prioridad es reconciliar las métricas
en vivo y arreglar el enlace roto antes que limpiar el código muerto.

---

## Conteo por severidad

| Severidad   | Incidencias únicas |
|-------------|:------------------:|
| 🔴 Critical |         1          |
| 🟠 High     |         5          |
| 🟡 Medium   |        11          |
| 🟢 Low      |        17          |
| **Total**   |       **34**       |

Leyenda de acción:
- **NECESITA DATOS DEL DUEÑO** — no se puede autoarreglar; requiere que el equipo confirme el hecho real (título, métrica, año, número de oficinas).
- **AUTO-ARREGLABLE** — cambio mecánico/cosmético que se puede aplicar sin nueva información.

---

## 🔴 CRITICAL

### 1. Múltiplo de Accera: `5×` en la tarjeta de portafolio vs `4×` en superficies en vivo
- **Archivo:** `src/app/pages/PortfolioPage.tsx:157` (y comentario en `:342`)
- **Severidad:** Critical
- **Qué está mal:** La tarjeta de Accera muestra `highlight: 'MOI 5×'`, pero el timeline de la misma página (`:916`), el `EditorialTicker.tsx:41` (en vivo en la home), `ProofSection.tsx:32` y `TeamGrid.tsx:22` dicen `4×`. Es un múltiplo financiero contradictorio, visible para inversores, sobre el track record del equipo. El valor `4×` es el dominante en el sitio.
- **Fix sugerido:** Cambiar `:157` a `'MOI 4×'` y actualizar el comentario en `:342`, salvo que el dueño confirme que el múltiplo realizado correcto es `5×` — en cuyo caso hay que actualizar todas las demás referencias a `5×`.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar el múltiplo real de Accera).

---

## 🟠 HIGH

### 2. Múltiplo de Sigga: `11×` en la tarjeta de portafolio vs `10×` en todo el resto del sitio
- **Archivo:** `src/app/pages/PortfolioPage.tsx:145` (y comentario en `:342`)
- **Severidad:** High
- **Qué está mal:** La tarjeta de Sigga muestra `'MOI 11×'`, único caso en todo el código. El resto —el ancla featured de la misma página (`:779`), el timeline (`:917`), la descripción SEO (`:178/184/190`), `EditorialTicker`, `ProofSection`, `InvestorsPage`, el artículo de caso de estudio y hasta el slug `sigga-case-study-10x-exit`— dice `10×`. Contradicción a pocos píxeles de distancia en la misma página.
- **Fix sugerido:** Cambiar `:145` a `'MOI 10×'` (o `'Exit 10×'`) y actualizar el comentario en `:342`. Si `11×` fuera correcto, actualizar todas las demás referencias.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar el múltiplo real de Sigga).

### 3. Enlaces a `/contact` en cuerpos de artículos resuelven a una ruta inexistente (404)
- **Archivo:** `src/app/data/articles.ts:5495, 5571, 5647`
- **Severidad:** High
- **Qué está mal:** Tres párrafos publicados (EN/PT/ES del artículo `lp-allocation-case-venture-studios`) contienen `[start a conversation](/contact)`. `renderRichText()` (`ArticlePage.tsx:424`) le antepone el locale, convirtiéndolo en `/{locale}/contact`, ruta que no existe en `routes.tsx` (cae al catch-all `*` → `NotFoundPage` 404). En el resto del sitio el contacto se alcanza vía el ancla `/{language}#contact` de la home, no una ruta propia.
- **Fix sugerido:** Repuntar los tres enlaces a un destino válido. Lo más limpio: cambiar a `/investors` (la página de Investors expone el `ContactModal`), o añadir una ruta `/:locale/contact` real, o usar el ancla `/#contact`. Aplicar en los tres locales.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (decidir destino canónico de contacto), aunque la implementación es mecánica una vez decidido.

### 4. La afirmación "90% reducción de costos" sigue en vivo en el ticker tras retirarse de ProofSection por no garantizable
- **Archivo:** `src/app/components/EditorialTicker.tsx:43`
- **Severidad:** High
- **Qué está mal:** El ticker (en vivo en la home) muestra `'cost reduction · WIR' / '90% underwriting'`. `ProofSection.tsx:49-52` contiene un comentario explícito de que esa cifra de 90% fue retirada porque "era un compromiso público que no podemos garantizar a escala" y se reformuló a "Hours → minutes". El ticker conserva la cifra dura ya retirada.
- **Fix sugerido:** Alinear el ticker con la decisión de ProofSection: eliminar el `90%` o reformularlo a algo direccional ("horas → minutos").
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar la métrica publicable de WIR).

### 5. Las oficinas se contradicen: el ticker anuncia tres (`SP · SF · BOG`) pero el resto del sitio lista dos
- **Archivo:** `src/app/components/EditorialTicker.tsx:44`
- **Severidad:** High
- **Qué está mal:** El ticker lista `'SP · SF · BOG'` (incluye Bogotá) en los tres locales. Ningún otro componente menciona Bogotá: `ClockRow.tsx` define exactamente dos relojes (São Paulo, San Francisco) y su comentario habla de "las dos ciudades operativas"; `InvestorEcosystem`, los heroes y `PrinciplesPage.tsx:145` dicen "São Paulo + San Francisco". El visitante ve tres oficinas en el ticker y dos en el footer de relojes justo debajo.
- **Fix sugerido:** Si solo hay dos oficinas, cambiar el ticker a `'SP · SF'`. Si Bogotá es real, añadir un tercer reloj y actualizar el resto del sitio a tres ciudades.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar número real de oficinas).

### 6. Títulos y biografías del equipo codificados solo en inglés — se renderizan sin traducir en el sitio PT
- **Archivo:** `src/app/components/TeamSection.tsx:24-64` (datos); render en `:227` y `:271`
- **Severidad:** High
- **Qué está mal:** `TeamSection` define el helper `t(en, pt)` y lo usa para el eyebrow/título/descripción, pero cada `title` y cada entrada de `highlights` son literales en inglés que evitan `t()`. En `/pt` el visitante ve los títulos y credenciales del equipo en inglés ("Co-Founder & Partner - Avante", "CFO at Innova Capital and Unbox Capital", "$500M+ managed in venture", etc.). Es el contenido de mayor peso de confianza de la home, sin traducir para usuarios en portugués.
- **Fix sugerido:** Envolver cada `title` y cada `highlight` en `t(en, pt)`. Como el array se construye dentro del componente (donde `t`/`language` están en scope), basta con sustituir los literales por llamadas a `t(...)`.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (requiere las traducciones PT preferidas de cada título/credencial).

---

## 🟡 MEDIUM

### 7. Conteo de ventures activas contradictorio: `1 activa` (ticker/footer) vs `2` (Cohort 1 portafolio) vs `3` (artículos)
- **Archivo:** `src/app/components/EditorialTicker.tsx:37` (y `Footer.tsx:160`)
- **Severidad:** Medium
- **Qué está mal:** El ticker y el footer dicen `'1 active · 4 pipeline'`. `PortfolioPage.tsx:255` dice "Cohort 1 is live (WIR + Alphajuri)" y su strip resumen muestra `value: '2'` (`:639`); el array VENTURES tiene dos entradas `status: 'cohort1'`. Los artículos (`articles.ts`) nombran tres ventures activas (Alphajuri, WIR, BR Auction Intel). El `1 active` vs `2` para el mismo Cohort 1 es indefendible.
- **Fix sugerido:** Decidir el conteo canónico y alinear ticker, footer, strip resumen e intro del portafolio (p. ej. `'2 active · 4 pipeline'`).
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar conteo activo canónico).

### 8. BR Auction Intel se nombra como portafolio en artículos pero está ausente de todas las superficies estructuradas
- **Archivo:** `src/app/data/articles.ts:2979` (y +30 menciones)
- **Severidad:** Medium
- **Qué está mal:** Varios artículos listan BR Auction Intel como una de las tres ventures core junto a Alphajuri y WIR, pero no aparece en el array VENTURES de `PortfolioPage` ni en `PortfolioStrip`, `VenturesGrid`, `SocialProofStrip`, `LogoGrid` ni `EditorialTicker`. El contenido editorial y las listas estructuradas discrepan sobre si es parte del portafolio.
- **Fix sugerido:** Añadir BR Auction Intel al array VENTURES (y strips relevantes), o suavizar/eliminar su encuadre de portafolio en `articles.ts`.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar membresía/estatus de BR Auction Intel).

### 9. Año de fundación de Accera inconsistente dentro de la misma página (`Est. 2014` vs timeline `2018`)
- **Archivo:** `src/app/pages/PortfolioPage.tsx:156`
- **Severidad:** Medium
- **Qué está mal:** La tarjeta de Accera declara `est: 'Est. 2014'`, pero el timeline de track record de la misma página la lista en `2018` (`:916`). La copia del cuerpo (`:255`) agrupa Accera con "tickets de 2014 (iFood, Sigga, Accera)", apuntando a 2014 como el año intencionado.
- **Fix sugerido:** Elegir el año correcto de Accera y usarlo tanto en la tarjeta VENTURES como en el timeline.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar el año real de Accera).

### 10. La grilla de "principles" de la home usa números (01/04) que mapean a principios distintos que la página `/principles` que dice reflejar
- **Archivo:** `src/app/AppContentWrapper.tsx:520-565`
- **Severidad:** Medium
- **Qué está mal:** El teaser de la home (cuyo comentario en `:507-511` dice que "refleja la página /principles") numera mal: home `#01` = "First ticket or no ticket." vs `PrinciplesPage` `#01` = "Operators who have already shipped something hard."; home `#04` = "3–4 ventures per year" pero ese es realmente el `#06` del `PrinciplesPage`. Solo el `#10` coincide.
- **Fix sugerido:** Renumerar los ítems del teaser para que coincidan con los números canónicos de `PrinciplesPage` (relabel "3–4 ventures" como `06`, y usar los títulos reales de `01`/`04` o elegir tres principios cuyos números y títulos coincidan).
- **Acción:** **AUTO-ARREGLABLE** (los datos canónicos están en `PrinciplesPage.tsx`).

### 11. Atribución fundacional de inDinero contradictoria (Jess fundadora única vs Andrea cofundadora)
- **Archivo:** `src/app/components/TeamSection.tsx:49,61`; `src/app/pages/PortfolioPage.tsx:163`; `src/app/AppContentWrapper.tsx:429`
- **Severidad:** Medium
- **Qué está mal:** `TeamSection` (Jess "Founding CEO" + Andrea "Co-founder of inDinero") y el puente de la home ("Jess and Andrea with inDinero") presentan a ambas como cofundadoras, pero `PortfolioPage.tsx:163` dice "Founded by Jess Mah" sin mencionar a Andrea. Un lector cruzando páginas recibe señales conflictivas.
- **Fix sugerido:** Decidir la historia fundacional real y hacer que `TeamSection`, `PortfolioPage` y el puente de la home la digan consistentemente.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar fundadores reales de inDinero).

### 12. Jess Mah: dos títulos distintos y descripciones inDinero/Mahway divergentes entre TeamSection y TeamGrid
- **Archivo:** `src/app/components/TeamSection.tsx:46,49`; `src/app/components/TeamGrid.tsx:45,46`
- **Severidad:** Medium
- **Qué está mal:** `TeamSection` la lista como "Partner & Co-Founder - Mahway" con "Sequoia Scout"; `TeamGrid` como "Strategic Advisor" con "YC, inDinero founder, Forbes 30 Under 30". Títulos (core partner vs advisor) y credenciales (Sequoia Scout vs YC/Forbes) divergen. (Nota: `TeamGrid` es código muerto — ver §28.)
- **Fix sugerido:** Reconciliar el rol y unificar la lista de credenciales entre ambos componentes (o borrar `TeamGrid`).
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar título y credenciales de Jess).

### 13. Andrea Barrica: título y bio divergen entre TeamSection y TeamGrid
- **Archivo:** `src/app/components/TeamSection.tsx:56,59-61`; `src/app/components/TeamGrid.tsx:28,30`
- **Severidad:** Medium
- **Qué está mal:** `TeamSection`: "Partner & Co-Founder - Mahway" + "Former VP at 500 Startups", "CEO of O.school", "Co-founder of inDinero". `TeamGrid`: "Co-Founder & Operating Partner" + "YC W14, founded O.school". Credenciales no solapadas y "CEO of" vs "founded" para O.school.
- **Fix sugerido:** Alinear el título y unificar credenciales; reconciliar el fraseo de O.school (o borrar `TeamGrid`).
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar título y credenciales de Andrea).

### 14. La página 404 no emite metadatos: sin `noindex`, hereda título genérico, sirve HTTP 200
- **Archivo:** `src/app/pages/NotFoundPage.tsx:16-135`
- **Severidad:** Medium
- **Qué está mal:** `NotFoundPage` no renderiza `<Helmet>`/`<SEOHelmet>`. Consecuencias: hereda el `<title>Avante Ventures` genérico; no tiene `noindex` (Google puede indexar URLs basura como soft-404); y por el fallback SPA devuelve HTTP 200 en vez de 404. Es la única página pública sin `SEOHelmet`.
- **Fix sugerido:** Añadir `<SEOHelmet title="Page not found" ... noindex />` al inicio del componente (`SEOHelmet` ya soporta `noindex`). Para un 404 real, configurar también un 404 en Vercel.
- **Acción:** **AUTO-ARREGLABLE** (el `<SEOHelmet noindex>` es mecánico; el status 404 real requiere config Vercel).

### 15. JSON-LD de Organization: los `jobTitle` de los fundadores están obsoletos y contradicen las bios corregidas
- **Archivo:** `index.html:143-172`
- **Severidad:** Medium
- **Qué está mal:** El schema `founder` codifica títulos que ya no coinciden con `TeamSection`: Felipe "Venture Partner" (vs "Strategic Partner and Founder of Bamboo DCM"); Jess "Strategic Advisor" (vs "Partner & Co-Founder - Mahway"); Andrea "Co-Founder & Operating Partner" (vs "Partner & Co-Founder - Mahway"); Amanda "Co-Founder & Managing Partner" (vs "Co-Founder & Partner - Avante"). Alimenta Knowledge Panel y citaciones de LLM.
- **Fix sugerido:** Alinear cada `jobTitle` del JSON-LD con el título canónico de `TeamSection` y mantenerlos en sync.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar el string público de cada título antes de editar el schema).

### 16. Bug latente: el bloque hero deshabilitado referencia el componente no importado `AvanteHeroBackground`
- **Archivo:** `src/app/AppContentWrapper.tsx:129` (bloque `120-281`)
- **Severidad:** Medium
- **Qué está mal:** Dentro del bloque `{false && <section>...}`, el JSX renderiza `<AvanteHeroBackground />`, pero no está importado en este archivo. Hoy el short-circuit `false &&` evita el `ReferenceError` y el build (solo `vite build`, sin `tsc`) lo deja pasar. Pero el comentario en `:106-109` anticipa hacer rollback poniendo `false`→`true`, lo que lanzaría `ReferenceError: AvanteHeroBackground is not defined` y dejaría la home en blanco.
- **Fix sugerido:** Borrar el bloque muerto `{false && ...}` (`:120-281`), o si se quiere preservar el rollback, restaurar el `import { AvanteHeroBackground } from '@/app/components/AvanteHeroBackground'` para que compile al reactivarse.
- **Acción:** **AUTO-ARREGLABLE** (mecánico).

### 17. Componente duplicado obsoleto: `ProofSection.tsx` huérfano duplica métricas de track record (incluye Accera `4×` conflictivo)
- **Archivo:** `src/app/components/ProofSection.tsx:23-47`
- **Severidad:** Medium
- **Qué está mal:** `ProofSection` nunca se importa/renderiza (los comentarios en `PortfolioPage.tsx:336-344` confirman que las métricas se reubicaron a las tarjetas de portafolio para "evitar proof duplicado"). El huérfano conserva su propia copia de `10× / 4× / $500MM+`. Carga Accera en `4×`, que ya discrepa con el `5×` de `PortfolioPage` (ver §1) — reactivarlo expondría el conflicto.
- **Fix sugerido:** Borrar `ProofSection.tsx` para que estas métricas vivan solo en las tarjetas de portafolio.
- **Acción:** **AUTO-ARREGLABLE** (borrar código muerto).

---

## 🟢 LOW

### Contradicciones de personas / formato (bajo impacto, mayoría en código muerto)

### 18. Felipe Moraes: tres roles/títulos distintos entre TeamSection y TeamGrid
- **Archivo:** `src/app/components/TeamSection.tsx:36`; `src/app/components/TeamGrid.tsx:38`
- **Severidad:** Low
- **Qué está mal:** `TeamSection` (en vivo): "Strategic Partner and Founder of Bamboo DCM". `TeamGrid` (código muerto): "Venture Partner" con track record "Innova Capital". Felipe tiene legítimamente ambas afiliaciones (Bamboo DCM e Innova era, confirmado en `PortfolioPage.tsx:122`); el problema es el título divergente en archivos distintos.
- **Fix sugerido:** Fijar un título canónico en `TeamGrid` que coincida con `TeamSection`, o borrar `TeamGrid`.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar título canónico de Felipe).

### 19. Amanda Pinheiro: título y track record difieren entre TeamSection y TeamGrid
- **Archivo:** `src/app/components/TeamSection.tsx:24,27-30`; `src/app/components/TeamGrid.tsx:20,22`
- **Severidad:** Low
- **Qué está mal:** "Co-Founder & Partner - Avante" (TeamSection) vs "Co-Founder & Managing Partner" (TeamGrid); credenciales CFO/Unbox/Columbia solo en TeamSection. `TeamGrid` es código muerto, sin impacto al usuario hoy.
- **Fix sugerido:** Alinear título y hechos, o borrar `TeamGrid`.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar Partner vs Managing Partner).

### 20. inDinero dimensionado de tres formas distintas (100+ empleados / 200+ clientes / $100M+ ARR)
- **Archivo:** `src/app/components/TeamSection.tsx:49`; `src/app/pages/PortfolioPage.tsx:163`; `src/app/AppContentWrapper.tsx:429`
- **Severidad:** Low
- **Qué está mal:** Cada superficie usa una métrica headline distinta de la misma empresa. No se contradicen matemáticamente, pero no hay métrica ancla compartida, lo que debilita la verificabilidad.
- **Fix sugerido:** Elegir una o dos métricas canónicas de inDinero y reusarlas consistentemente.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar cifras reales de inDinero).

### 21. Bullet de relleno: "Deep expertise in AI-native venture building"
- **Archivo:** `src/app/components/TeamSection.tsx:30`
- **Severidad:** Low
- **Qué está mal:** El cuarto highlight de Amanda es un placeholder vago e infalsificable junto a tres credenciales concretas (CFO, $500M+, Columbia); diluye las más fuertes.
- **Fix sugerido:** Reemplazar por un hecho concreto (venture/rol de IA específico) o eliminarlo.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (requiere un hecho real del equipo).

### 22. Formato de títulos inconsistente entre miembros del equipo
- **Archivo:** `src/app/components/TeamSection.tsx:24,36,46,55`
- **Severidad:** Low
- **Qué está mal:** Tres miembros usan separador ` - ` antes de la org; Felipe usa "and Founder of" sin separador. Inconsistente como sistema de títulos (cosmético; los títulos se renderizan en mayúsculas).
- **Fix sugerido:** Estandarizar un patrón único ("Role - Org" o "Role, Org") y aplicarlo a los cuatro.
- **Acción:** **AUTO-ARREGLABLE** (cosmético).

### Formato / nombres / métricas

### 23. `$500M+` vs `$500MM+` — misma cifra, dos abreviaturas de magnitud distintas
- **Archivo:** `src/app/pages/InvestorsPage.tsx:164` (`M+`) vs `ProofSection.tsx:40`, `EditorialTicker.tsx:39`, `TeamGrid.tsx:22`, `PortfolioPage.tsx:641` (`MM+`)
- **Severidad:** Low
- **Qué está mal:** La misma cifra de capital desplegado por el equipo fundador se escribe con `M` y con `MM`; puede leerse como dos magnitudes distintas.
- **Fix sugerido:** Estandarizar una notación en todo el sitio (p. ej. `$500M+`).
- **Acción:** **AUTO-ARREGLABLE** (cosmético).

### 24. Casing/espaciado de nombres de empresas inconsistente: `inDinero` vs `Indinero`, `Alpha Lit` vs `ALPHALIT`
- **Archivo:** `src/app/components/VenturesGrid.tsx:35` (`Indinero`); `PortfolioStrip.tsx:24/26` (`ALPHALIT`/`INDINERO`)
- **Severidad:** Low
- **Qué está mal:** `VenturesGrid` escribe "Indinero" (pierde el `in` minúscula de marca) como texto title-case; `PortfolioStrip` usa "ALPHALIT" sin límite de palabra. El resto del sitio usa "inDinero" / "Alpha Lit".
- **Fix sugerido:** Normalizar a las formas de marca canónicas "inDinero" y "Alpha Lit" (o "ALPHA LIT" al ir en mayúsculas).
- **Acción:** **AUTO-ARREGLABLE** (cosmético).

### 25. Strip resumen "Since 2010" no corroborado en ninguna otra parte del sitio
- **Archivo:** `src/app/pages/PortfolioPage.tsx:640`
- **Severidad:** Low
- **Qué está mal:** El strip dice "Building & Investing — Since 2010", pero el hito más temprano en todo el sitio (incluido el timeline de la misma página) es el ticket Innova/iFood de 2014; el studio se fundó en 2024. "2010" se lee como fecha placeholder/redondeada inconsistente con el ancla de 2014.
- **Fix sugerido:** Confirmar si algún track record del equipo arranca en 2010; si no, cambiar a "Since 2014" o reformular.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (confirmar año de inicio real).

### Enlaces rotos (latentes)

### 26. Ancla muerta `href="#case-studies"` sin elemento `id` coincidente
- **Archivo:** `src/app/components/VenturesGrid.tsx:181`
- **Severidad:** Low
- **Qué está mal:** El CTA "View Case Studies" apunta a `#case-studies`, que no existe en ningún lado. Bajo porque `VenturesGrid` es código muerto (nunca se renderiza); enlace roto latente si se reconecta.
- **Fix sugerido:** Borrar `VenturesGrid.tsx`, o repuntar el CTA a `/${language}/portfolio` o añadir un `id="case-studies"` real.
- **Acción:** **AUTO-ARREGLABLE**.

### i18n (latente / cosmético)

### 27. Strings de bio placeholder con tokens `[Company]` aún en el diccionario de traducciones
- **Archivo:** `src/app/hooks/useLanguage.tsx:170-173 (PT), 469-472 (EN), 773-776 (ES)`
- **Severidad:** Low
- **Qué está mal:** Claves `team.*.desc` con tokens literales `[Company]`/`[Empresa Brasileira]`/`[Startup Brasileira]`. Hoy no usadas (ningún componente las lee), pero fuga de placeholder latente si alguien las reconecta.
- **Fix sugerido:** Borrar las cuatro claves `team.*.desc` de los tres bloques de idioma, o completarlas con bios reales.
- **Acción:** **NECESITA DATOS DEL DUEÑO** si se completan; **AUTO-ARREGLABLE** si se borran (no hay referencias).

### 28. Label "Building & Investing" dejado en inglés en la rama PT
- **Archivo:** `src/app/pages/PortfolioPage.tsx:640`
- **Severidad:** Low
- **Qué está mal:** `t('Building & Investing', 'Building & Investing')` — el argumento PT es idéntico al EN, mientras el `value` compañero sí está traducido (`Since 2010` → `Desde 2010`). Borderline: el studio mantiene "Building" como anglicismo de marca en otros lugares.
- **Fix sugerido:** Proveer traducción PT (p. ej. "Construindo & Investindo"), o confirmar que es un anglicismo de marca intencional.
- **Acción:** **NECESITA DATOS DEL DUEÑO** (decisión de marca).

### 29. Discrepancia de wording español en el principio #10 entre el teaser de la home y `/principles`
- **Archivo:** `src/app/AppContentWrapper.tsx:557` vs `src/app/pages/PrinciplesPage.tsx:155`
- **Severidad:** Low
- **Qué está mal:** Home: "Lo que no **haremos** es lo que somos" (futuro); PrinciplesPage: "Lo que no **hacemos** es lo que somos" (presente). El EN y PT del mismo principio sí son idénticos entre ambos archivos.
- **Fix sugerido:** Alinear el string ES a un wording canónico único.
- **Acción:** **AUTO-ARREGLABLE** (cosmético).

### SEO meta (menor)

### 30. JSON-LD de artículos fija `dateModified` igual a `datePublished` para cada artículo
- **Archivo:** `src/app/pages/ArticlePage.tsx:82-83`
- **Severidad:** Low
- **Qué está mal:** `dateModified: article.datePublished` está cableado a la fecha de publicación y nunca refleja una edición real, suprimiendo señales de frescura. `articles.ts` no tiene campo `dateModified`.
- **Fix sugerido:** Añadir un campo opcional `dateModified` al tipo Article y usar `article.dateModified ?? article.datePublished`.
- **Acción:** **AUTO-ARREGLABLE** (mecánico).

### Código muerto / componentes duplicados obsoletos (sin impacto en vivo, riesgo de deriva)

### 31. `TeamGrid.tsx` huérfano duplica y contradice las bios en vivo de `TeamSection`
- **Archivo:** `src/app/components/TeamGrid.tsx:16-50`
- **Severidad:** Low / Medium (es la raíz de §12, §13, §18, §19)
- **Qué está mal:** `TeamGrid` nunca se importa/renderiza (la home usa `TeamSection`). Guarda títulos obsoletos (Managing Partner, Venture Partner, Strategic Advisor, Operating Partner) y credenciales divergentes. Es la fuente raíz de las contradicciones de títulos del equipo. Riesgo latente si se reconecta.
- **Fix sugerido:** Borrar `TeamGrid.tsx`. Si se quiere una grilla 2×2, alimentarla del mismo array que `TeamSection`.
- **Acción:** **AUTO-ARREGLABLE** (borrar código muerto).

### 32. `VenturesGrid.tsx` huérfano contradice los datos de portafolio en vivo
- **Archivo:** `src/app/components/VenturesGrid.tsx:12-41`
- **Severidad:** Low
- **Qué está mal:** Nunca renderizado. Describe "Softmax" como "AI Infrastructure / Enterprise-grade AI deployment" (en vivo es "AI foundational model... by Jess Mah + Andrea Barrica inside Mahway, a16z-backed"), usa "Indinero" mal escrito, y enlaza a `#case-studies` inexistente.
- **Fix sugerido:** Borrar `VenturesGrid.tsx`; los hechos de portafolio deben venir solo del array VENTURES de `PortfolioPage`.
- **Acción:** **AUTO-ARREGLABLE** (borrar código muerto).

### 33. `LogoGrid.tsx` huérfano referencia un nombre de venture (`Clareo`) que no existe en ninguna otra parte
- **Archivo:** `src/app/components/LogoGrid.tsx:8-11`
- **Severidad:** Low
- **Qué está mal:** Nunca renderizado (el strip en vivo es `SocialProofStrip`). Lista "Clareo — Litigation Finance"; "Clareo" no aparece en ningún otro archivo — la venture real de litigation finance es "Alpha Lit". `LogoCarousel.tsx` es un tercer strip también huérfano.
- **Fix sugerido:** Borrar `LogoGrid.tsx` y `LogoCarousel.tsx`, o reemplazar "Clareo" por "Alpha Lit".
- **Acción:** **AUTO-ARREGLABLE** (borrar código muerto).

### 34. Componentes huérfanos varios y archivo Figma `WirWebsite` obsoleto
- **Archivo:** `src/app/components/` (múltiples); `src/imports/WirWebsite/WirWebsite.tsx:1671`; `AvantePlaybookStaircase.tsx`; `WhyVentureStudio.tsx`, etc.
- **Severidad:** Low
- **Qué está mal:** ~20 componentes exportados sin importadores (`HeroBody`, `AvtAvatar`, `CTASection`, `FooterLinksRow`, `GlassCard`, `HeroPill`, `InvestmentThesis`, `LanguageToggle`, `LogoCarousel`, `MobileNav`, `NetworkGlobe`, `ScrollReveal`, `SectionHeader`, `YouTubeBackground`, `WhyVentureStudio`, `SiliconValleyVentureBuilding`, `FAQSection`, etc.), más `AppClean.tsx`/`AppTemp.tsx`, `figma/ImageWithFallback.tsx`, el árbol `src/imports/WirWebsite/` (que contiene otra variante de inDinero: "Built and scaled inDinero (Fintech) for 10+ years"), y `AvantePlaybookStaircase.tsx` (duplica `PlaybookStaircase`). Bloque muerto grande `{false && ...}` (`AppContentWrapper.tsx:120-281`). Inflan el repo y confunden auditorías futuras; `YouTubeBackground` carga acceso a `window.YT`.
- **Fix sugerido:** Triagear y borrar los huérfanos (o moverlos a `/archive`). Antes de borrar `MobileNav` confirmar que `Navbar` lleva su propio hamburger inline (lo lleva). Borrar también el bloque `{false && ...}` de §16.
- **Acción:** **AUTO-ARREGLABLE** (borrar código muerto tras confirmación rápida).

---

## Orden de arreglo recomendado

**Fase 1 — Métricas en vivo que dañan credibilidad ante inversores (requieren confirmación del dueño, luego edición mínima):**
1. §1 (Critical) Accera `5×` vs `4×` — confirmar múltiplo real y unificar.
2. §2 (High) Sigga `11×` vs `10×` — confirmar y unificar a `10×`.
3. §4 (High) Reducción de costos 90% WIR en el ticker — reformular o quitar.
4. §5 (High) Oficinas `SP · SF · BOG` vs dos ciudades — confirmar número de oficinas.
5. §7 (Medium) Conteo de ventures activas `1`/`2`/`3` — fijar canónico.

**Fase 2 — Roto funcional / SEO de alto valor:**
6. §3 (High) Enlaces `/contact` 404 en artículos (EN/PT/ES) — repuntar a ruta válida.
7. §6 (High) Bios del equipo sin traducir en PT — envolver en `t(en, pt)`.
8. §14 (Medium) Metadatos de la 404 — añadir `<SEOHelmet noindex>`.
9. §15 (Medium) JSON-LD de fundadores obsoleto — sincronizar con `TeamSection`.

**Fase 3 — Consistencia de contenido (mayoría auto-arreglable):**
10. §10 (Medium) Renumerar el teaser de principles de la home.
11. §9 (Medium) Año de Accera `2014` vs `2018`.
12. §8 (Medium) Membresía de BR Auction Intel.
13. §11–§13, §18–§20 Reconciliar atribuciones y bios del equipo (mayoría se resuelve borrando `TeamGrid`, §31).

**Fase 4 — Eliminar código muerto (desbloquea y previene futuras contradicciones):**
14. §16 (Medium) Borrar el bloque hero `{false && ...}` y/o restaurar el import.
15. §17, §31, §32, §33, §34 Borrar `ProofSection`, `TeamGrid`, `VenturesGrid`, `LogoGrid`/`LogoCarousel`, `WirWebsite` y demás huérfanos. **Hacer esto elimina la raíz de §12, §13, §18, §19, §23, §24 y §27 de un solo golpe.**

**Fase 5 — Pulido cosmético:**
16. §21, §22, §23, §24, §25, §28, §29, §30 — formato, casing, fechas y traducciones puntuales.

> Nota estratégica: borrar el código muerto (Fase 4) antes que reconciliar bios manualmente
> (Fase 3) ahorra trabajo, porque la mayoría de las contradicciones de títulos del equipo
> existen solo porque `TeamGrid` y compañía guardan copias obsoletas. Eliminadas esas copias,
> `TeamSection` y `PortfolioPage` quedan como única fuente de verdad.
