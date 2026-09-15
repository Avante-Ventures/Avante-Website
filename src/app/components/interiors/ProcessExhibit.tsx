import { useState } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';
import { BUILDER_COPY, BUILDER_STAGES } from '../world/InsideVentureBuilder';
import { InteriorSculpture } from './InteriorHero';

export function ProcessExhibit() {
  const { language } = useLanguage(), c = BUILDER_COPY[language];
  const [stage, setStage] = useState(0);
  return <section className="process-exhibit" aria-labelledby="process-title">
    <div className="process-exhibit-top"><span className="interior-kicker">{c.label}</span><h2 id="process-title">{c.process}</h2><p>{c.processNote}</p></div>
    <div className="process-exhibit-body"><div className="process-model"><InteriorSculpture mode="process" stage={stage} /><span className="process-model-caption">0{stage + 1} / 06 — {BUILDER_STAGES[stage]}</span></div>
      <div className="process-work"><div className="process-tabs">{BUILDER_STAGES.map((name, i) => <button key={name} aria-pressed={stage === i} aria-controls="process-detail" onClick={() => setStage(i)}><span>0{i + 1}</span>{name}</button>)}</div>
        <div id="process-detail" className="process-detail" aria-live="polite" aria-atomic="true"><h3>{c.stages[stage][0]}</h3><p>{c.stages[stage][1]}</p><div><span className="interior-kicker">{c.gate}</span><p>{c.stages[stage][2]}</p></div></div>
      </div>
    </div>
  </section>;
}
