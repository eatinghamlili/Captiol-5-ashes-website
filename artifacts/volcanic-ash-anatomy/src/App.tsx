import { useState } from 'react';
import { AlertTriangle, ArrowDown, ArrowUpRight, Check, ChevronRight, Wind } from 'lucide-react';

type PartId = 'nose' | 'throat' | 'airways' | 'lungs';

const parts: Record<PartId, { number: string; name: string; subtitle: string; role: string; ash: string }> = {
  nose: {
    number: '01',
    name: 'Nose & nasal passages',
    subtitle: 'The first filter',
    role: 'Air enters through the nose, where hairs and mucus trap some particles. The nasal passages also warm and moisten the air.',
    ash: 'Ash can irritate the lining of the nose and throat. Larger particles may be caught here, but this is not a complete filter.',
  },
  throat: {
    number: '02',
    name: 'Throat',
    subtitle: 'A shared passage',
    role: 'The pharynx carries air from the nose and mouth toward the lower airway. Tiny particles caught in mucus can be swallowed or coughed out.',
    ash: 'Ash may make the throat feel scratchy or sore and can trigger coughing. Breathing through the mouth bypasses some filtering in the nose.',
  },
  airways: {
    number: '03',
    name: 'Airways',
    subtitle: 'Moving air inward',
    role: 'The trachea branches into the bronchi and smaller tubes. Mucus and microscopic cilia help move trapped dust back toward the throat.',
    ash: 'Fine ash can irritate the airways, increasing coughing, wheezing, or tightness—especially for people with asthma or other lung conditions.',
  },
  lungs: {
    number: '04',
    name: 'Lungs & alveoli',
    subtitle: 'Where gases trade places',
    role: 'At the ends of the smallest airways are alveoli: tiny air sacs where oxygen moves into the blood and carbon dioxide moves out.',
    ash: 'Very fine particles can travel deeper into the lungs. Exposure may aggravate breathing problems; effects depend on the ash and the person.',
  },
};

const calloutEffects: Record<PartId, string> = {
  nose: 'Irritation · runny nose',
  throat: 'Soreness · dry cough',
  airways: 'Tightness · wheezing',
  lungs: 'Fine ash reaches deep',
};

const cardCopy: Record<PartId, { normal: string; ash: string; tip: string }> = {
  nose: {
    normal: 'The nasal passages warm and moisten incoming air and trap some particles with hairs and mucus.',
    ash: 'Volcanic ash can irritate the lining, causing a runny or stuffy nose.',
    tip: 'Stay indoors and keep windows closed while ash is falling.',
  },
  throat: {
    normal: 'The pharynx moves air from the nose and mouth toward the lower airway.',
    ash: 'Ash can irritate the throat, causing soreness and a dry cough.',
    tip: 'Limit outdoor exposure and follow local ash advisories.',
  },
  airways: {
    normal: 'The trachea and bronchi carry air to the lungs, while mucus and cilia help move particles back out.',
    ash: 'Fine ash can cause tightness or wheezing and may worsen asthma or COPD.',
    tip: 'Stay indoors; if you must go outside, follow public-health guidance on a well-fitting particulate respirator.',
  },
  lungs: {
    normal: 'The lungs bring oxygen into the blood through tiny air sacs called alveoli.',
    ash: 'Fine ash can reach deep into the lungs and worsen breathing problems.',
    tip: 'Follow local health guidance and seek medical help for serious or worsening symptoms.',
  },
};

function AnatomyIllustration({ selected, onSelect }: { selected: PartId; onSelect: (id: PartId) => void }) {
  return (
    <div className="w-full max-w-[560px]">
      <div className="diagram-paper">
        <div className="anatomy-figure">
          <img
            className="block h-auto w-full"
            src={`${import.meta.env.BASE_URL}assets/respiratory-system-complete-en.svg`}
            alt="Diagram of the respiratory system, showing the nose, throat, trachea, bronchi, lungs, and alveoli"
          />
          <svg className="diagram-callout-lines" viewBox="0 0 907.08 966.42" preserveAspectRatio="none" aria-hidden="true">
            <path d="M360 164 C340 145 320 130 290 119" />
            <circle cx="360" cy="164" r="5" />
            <path d="M402 276 C450 290 500 345 526 394" />
            <circle cx="402" cy="276" r="5" />
            <path d="M455 478 C463 455 471 438 490 420" />
            <circle cx="455" cy="478" r="5" />
            <path d="M620 660 C635 700 600 727 550 752" />
            <circle cx="620" cy="660" r="5" />
          </svg>
          {(Object.keys(parts) as PartId[]).map((id) => (
            <button
              key={id}
              type="button"
              className={`anatomy-hotspot anatomy-hotspot--${id} ${selected === id ? 'is-selected' : ''}`}
              aria-label={`Select ${parts[id].name}`}
              aria-pressed={selected === id}
              onMouseEnter={() => onSelect(id)}
              onFocus={() => onSelect(id)}
              onClick={() => onSelect(id)}
            />
          ))}
          {(Object.keys(parts) as PartId[]).map((id) => (
            <div key={id} className={`diagram-callout diagram-callout--${id}`}>
              <strong>{parts[id].name.split(' &')[0]}</strong>
              <span> · {calloutEffects[id]}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="diagram-caption">Diagram: LadyofHats / Wikimedia Commons, public domain.</p>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState<PartId>('nose');
  const current = parts[selected];

  return (
    <main className="page-grain min-h-[100dvh] overflow-hidden bg-[#f3efe5] text-[#25343a]">
      <header className="relative z-10 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="The other cavaliers home">
          <img src={`${import.meta.env.BASE_URL}the-other-cavaliers.png`} alt="the other cavaliers group" className="h-11 w-11 rounded-full border border-[#cbbba4] object-cover object-[50%_26%]" />
          <span className="text-[11px] font-bold uppercase tracking-[.18em]">the other cavaliers</span>
        </a>
        <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#77766e] sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#a75239]" />
          A student field guide
        </div>
        <a href="#explore" className="flex items-center gap-2 text-xs font-semibold hover:text-[#a75239]">
          Explore anatomy <ArrowDown size={14} />
        </a>
      </header>

      <section id="top" className="relative mx-auto max-w-[1320px] px-6 pb-12 pt-8 md:px-10 md:pb-20 md:pt-14">
        <div className="absolute right-[8%] top-16 hidden h-44 w-44 rounded-full border border-[#ddd1bf] md:block" />
        <div className="absolute right-[11%] top-[4.8rem] hidden h-32 w-32 rounded-full border border-dashed border-[#c8bba5] md:block" />
        <div className="relative max-w-[850px] rise-in">
          <div className="mono mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[.22em] text-[#a75239]">
            <span className="h-px w-8 bg-[#a75239]" /> Science / Field note 01
          </div>
          <h1 className="serif max-w-[800px] text-[clamp(3.1rem,8vw,7.3rem)] leading-[.91] tracking-[-.055em]">
            When ash<br className="hidden sm:block" /> enters the <em className="font-medium text-[#a75239]">air.</em>
          </h1>
          <div className="mt-8 grid max-w-[760px] gap-5 sm:grid-cols-[1fr_230px] sm:items-end">
            <p className="max-w-[520px] text-[15px] leading-7 text-[#59656a] md:text-[17px]">
              Volcanic ash is not soft fireplace ash. It is fine, abrasive rock and glass that can travel with the wind—and into the system that keeps us breathing.
            </p>
            <div className="border-l border-[#cbbba4] pl-4 text-xs leading-5 text-[#77766e]">
              Follow its path from first breath to the tiny air sacs where oxygen enters your blood.
            </div>
          </div>
        </div>
        <div className="mono mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[.18em] text-[#77766e] md:mt-16">
          <Wind size={15} strokeWidth={1.5} /> Trace the route <span className="h-px w-12 bg-[#cbbba4]" /> 4 stops
        </div>
      </section>

      <section id="explore" className="mx-auto max-w-[1320px] px-4 pb-16 md:px-10 md:pb-24">
        <div className="overflow-hidden rounded-[5px] border border-[#d7cbb9] bg-[#eae3d6] shadow-[0_24px_65px_-42px_rgba(65,50,37,.38)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d5c8b5] px-5 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] tracking-[.2em] text-[#a75239]">FIG. 01</span>
              <h2 className="serif text-xl md:text-2xl">A breath, mapped</h2>
            </div>
            <p className="mono text-[9px] uppercase tracking-[.14em] text-[#77766e]">Select a region to investigate</p>
          </div>
          <div className="grid min-h-[590px] lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,.85fr)]">
            <div className="relative flex min-h-[470px] flex-col items-center justify-center overflow-hidden border-b border-[#d5c8b5] px-5 py-8 lg:border-b-0 lg:border-r lg:px-8">
              <div className="pointer-events-none absolute left-5 top-5 mono text-[9px] uppercase tracking-[.17em] text-[#a49a89]">Upper torso / anterior view</div>
              <div className="absolute bottom-9 left-8 h-px w-[calc(100%-4rem)] bg-[#d4c7b4]" />
              <AnatomyIllustration selected={selected} onSelect={setSelected} />
              <div className="relative z-10 mt-[-3px] flex flex-wrap justify-center gap-2">
                {(Object.keys(parts) as PartId[]).map((id) => (
                  <button key={id} onClick={() => setSelected(id)} className={`rounded-full border px-3 py-2 text-[11px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75239] ${selected === id ? 'border-[#a75239] bg-[#a75239] text-[#fff7ed]' : 'border-[#c7baa6] bg-[#f3ede2] text-[#536066] hover:border-[#a75239]'}`}>
                    {parts[id].name.split(' &')[0]}
                  </button>
                ))}
              </div>
            </div>
            <article aria-live="polite" className="flex flex-col px-6 py-8 md:px-10 md:py-10">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mono mb-3 text-[10px] tracking-[.2em] text-[#a75239]">STOP {current.number} / 04</div>
                  <h3 className="serif text-3xl leading-tight md:text-[2.65rem]">{current.name}</h3>
                  <p className="mt-2 text-sm text-[#77766e]">{current.subtitle}</p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cbbba4] text-[#a75239]">
                  <ArrowUpRight size={17} />
                </div>
              </div>
              <div className="my-7 h-px bg-[#d5c8b5]" />
              <div className="space-y-6">
                <div>
                  <div className="mono mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[.2em] text-[#587266]"><Check size={13} /> In a normal breath</div>
                  <p className="text-[14px] leading-6 text-[#425157]">{current.role}</p>
                </div>
                <div className="border-l-2 border-[#b56b4d] pl-4">
                  <div className="mono mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[.2em] text-[#a75239]"><span className="h-1.5 w-1.5 rounded-full bg-[#b56b4d]" /> With volcanic ash</div>
                  <p className="text-[14px] leading-6 text-[#425157]">{current.ash}</p>
                </div>
              </div>
              <div className="mt-auto pt-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="mono text-[9px] uppercase tracking-[.17em] text-[#77766e]">Path through the body</span>
                  <span className="mono text-[9px] text-[#a75239]">{current.number} — 04</span>
                </div>
                <div className="flex gap-1.5">
                  {(Object.keys(parts) as PartId[]).map((id) => (
                    <button key={id} aria-label={`Go to ${parts[id].name}`} onClick={() => setSelected(id)} className={`h-1.5 flex-1 rounded-full transition-colors ${selected === id ? 'bg-[#a75239]' : 'bg-[#d4c7b4] hover:bg-[#b7a58d]'}`} />
                  ))}
                </div>
                <div className="mt-3 flex justify-between">
                  <button onClick={() => setSelected(selected === 'nose' ? 'lungs' : (['nose', 'throat', 'airways', 'lungs'][(['nose', 'throat', 'airways', 'lungs'].indexOf(selected) - 1 + 4) % 4] as PartId))} className="text-xs text-[#697277] hover:text-[#a75239]">Previous</button>
                  <button onClick={() => setSelected(selected === 'lungs' ? 'nose' : (['nose', 'throat', 'airways', 'lungs'][(['nose', 'throat', 'airways', 'lungs'].indexOf(selected) + 1) % 4] as PartId))} className="flex items-center gap-1 text-xs font-semibold text-[#a75239] hover:gap-2">Next stop <ChevronRight size={14} /></button>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {(Object.keys(parts) as PartId[]).map((id) => (
            <article key={id} className="rounded-sm border border-[#d7cbb9] bg-[#f7f3eb] p-5 md:p-6">
              <div className="mono text-[9px] uppercase tracking-[.18em] text-[#a75239]">{parts[id].number} / {parts[id].name.split(' &')[0]}</div>
              <h3 className="serif mt-2 text-xl text-[#25343a]">{parts[id].name}</h3>
              <div className="mt-4 space-y-3 text-[13px] leading-5 text-[#59656a]">
                <p>{cardCopy[id].normal}</p>
                <p>{cardCopy[id].ash}</p>
                <p className="border-t border-[#d7cbb9] pt-3 text-[#425157]"><span className="font-semibold text-[#a75239]">Protect:</span> {cardCopy[id].tip}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-6 px-6 pb-16 md:grid-cols-[.8fr_1.2fr] md:px-10 md:pb-24">
        <div className="relative overflow-hidden bg-[#27383c] p-7 text-[#f3efe5] md:p-9">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-[#657675]/40" />
          <div className="absolute -right-1 top-0 h-24 w-24 rounded-full border border-dashed border-[#657675]/50" />
          <div className="relative">
            <div className="mono mb-5 flex items-center gap-2 text-[9px] uppercase tracking-[.2em] text-[#d5a47e]"><AlertTriangle size={14} /> If ash is in the air</div>
            <h2 className="serif max-w-sm text-3xl leading-tight">Less exposure is the best protection.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#d2d7d1]">Ash clouds can vary. Follow local emergency and public-health guidance, especially during and after an eruption.</p>
          </div>
        </div>
        <div className="grid gap-px bg-[#d5c8b5] sm:grid-cols-2">
          <div className="bg-[#f7f3eb] p-6 md:p-8">
            <span className="mono text-[10px] text-[#a75239]">01 / LIMIT</span>
            <h3 className="serif mt-3 text-xl">Stay out of ashfall</h3>
            <p className="mt-2 text-sm leading-6 text-[#59656a]">If possible, stay indoors with windows and doors closed. Avoid strenuous activity outdoors while ash is falling.</p>
          </div>
          <div className="bg-[#f7f3eb] p-6 md:p-8">
            <span className="mono text-[10px] text-[#a75239]">02 / FILTER</span>
            <h3 className="serif mt-3 text-xl">Use the right protection</h3>
            <p className="mt-2 text-sm leading-6 text-[#59656a]">When you must go outside, follow local advice on a well-fitting particulate respirator. A cloth face covering may not protect against fine ash.</p>
          </div>
          <div className="bg-[#f7f3eb] p-6 md:col-span-2 md:p-8">
            <span className="mono text-[10px] text-[#a75239]">03 / GET HELP</span>
            <h3 className="serif mt-3 text-xl">Breathing symptoms need attention</h3>
            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#59656a]">Seek medical help for serious or worsening breathing symptoms. People with asthma or other respiratory conditions should follow their clinician’s plan and local health guidance. This guide is educational and does not diagnose or replace medical advice.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d5c8b5]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-6 py-6 text-xs text-[#77766e] sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}the-other-cavaliers.png`} alt="" className="h-8 w-8 rounded-full object-cover object-[50%_26%]" />
            <span className="font-semibold text-[#25343a]">the other cavaliers</span>
            <span className="hidden h-4 w-px bg-[#cbbba4] sm:block" />
            <span>Student science project</span>
          </div>
          <span className="mono text-[9px] uppercase tracking-[.16em]">Anatomy is the map. Protection is the point.</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
