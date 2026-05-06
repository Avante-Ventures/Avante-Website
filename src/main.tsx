import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './app/App';
import './styles/index.css';

// Vercel Analytics + Speed Insights are first-party (no third-party JS),
// load lazily after the page is interactive, and don't block INP. Both
// are free with the Vercel Pro plan that hosts this site.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  </StrictMode>
);
