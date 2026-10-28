import { useState } from 'react';
import { AlertTriangle, ArrowDown, ArrowUpRight, Check, ChevronRight, Wind } from 'lucide-react';

type PartId = 'nose' | 'throat' | 'airways' | 'lungs';

const parts: Record<PartId, { number: string; name: string; subtitle: string; role: string; ash: string }> = {
  nose: {
    number: '01',
    name: 'Nose & nasal passages',
    subtitle: 'Where air gets in',
    role: 'Air comes in through the nose first. Hairs and mucus catch some of the larger particles, and the passages warm the air and add moisture to it before it goes any further down.',
    ash: 'Ash irritates the lining, which can leave your nose runny or blocked. Some of it is caught here, but the nose is not a complete filter and finer ash gets past.',
  },
  throat: {
    number: '02',
    name: 'Throat',
    subtitle: 'Where the nose and mouth meet',
    role: 'The pharynx is where air from the nose and the mouth joins up before heading down. Particles that get stuck in mucus here are usually swallowed or coughed back out.',
    ash: 'Ash can leave the throat scratchy or sore and set off a cough. Breathing through your mouth makes that more likely, because the air skips the filtering the nose would have done.',
  },
  airways: {
    number: '03',
    name: 'Airways',
    subtitle: 'The tubes down to the lungs',
    role: 'The trachea splits into two bronchi, and those branch again into narrower and narrower tubes. Mucus lines them, and microscopic hairs called cilia sweep trapped dust back up toward the throat.',
    ash: 'Fine ash irritates these tubes, which can bring on coughing, wheezing, or a tight feeling in the chest. For people with asthma or another lung condition, the effect can be a good deal worse.',
  },
  lungs: {
    number: '04',
    name: 'Lungs & alveoli',
    subtitle: 'Where oxygen reaches the blood',
    role: 'At the end of the smallest tubes sit the alveoli, clusters of air sacs whose walls are thin enough for oxygen to cross into the blood and carbon dioxide to cross back out.',
    ash: 'The finest particles travel all the way down here. How much harm that does depends on the ash itself and on the person breathing it, but it can make existing breathing problems worse.',
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
    normal: 'The nasal passages warm incoming air, add moisture to it, and trap some particles on hairs and mucus.',
    ash: 'Ash irritates that lining, so a runny or blocked nose is common.',
    tip: 'Stay inside with the windows shut while ash is falling.',
  },
  throat: {
    normal: 'The pharynx carries air from the nose and mouth down toward the airway.',
    ash: 'A sore throat and a dry cough are the usual signs that ash has reached it.',
    tip: 'Keep time outdoors short, and check local ash advisories.',
  },
  airways: {
    normal: 'The trachea and bronchi carry air to the lungs. Mucus and cilia work together to move particles back out again.',
    ash: 'Fine ash can cause tightness or wheezing, and it may worsen asthma or COPD.',
    tip: 'Stay indoors. If you have to go out, follow public-health guidance on wearing a well-fitting particulate respirator.',
  },
  lungs: {
    normal: 'The lungs pass oxygen into the blood through tiny air sacs called alveoli, and take carbon dioxide back out.',
    ash: 'Fine enough ash reaches all the way down here, where it can worsen breathing problems.',
    tip: 'Follow local health guidance, and get medical help if symptoms are serious or getting worse.',
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
      <p className="diagram-caption">Diagram: LadyofHats / Wikimedia Commons, public domain, with its labels removed.</p>
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
          <span className="text-[13px] font-semibold">the other cavaliers</span>
        </a>
        <div className="hidden items-center gap-2 text-xs text-[#77766e] sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#a75239]" />
          A student field guide
        </div>
        <a href="#explore" className="flex items-center gap-2 text-xs font-semibold hover:text-[#a75239]">
          Explore anatomy <ArrowDown size={14} />
        </a>
      </header>

      <section id="top" className="relative mx-auto max-w-[1320px] px-6 pb-12 pt-8 md:px-10 md:pb-20 md:pt-14">
        <div className="relative max-w-[850px] rise-in">
          <div className="mb-6 flex items-center gap-3 text-xs text-[#a75239]">
            <span className="h-px w-8 bg-[#a75239]" /> Science project
          </div>
          <h1 className="serif max-w-[800px] text-[clamp(3.1rem,8vw,7.3rem)] leading-[.91] tracking-[-.055em]">
            What volcanic ash<br className="hidden sm:block" /> does to your lungs
          </h1>
          <div className="mt-8 grid max-w-[760px] gap-5 sm:grid-cols-[1fr_230px] sm:items-end">
            <p className="max-w-[520px] text-[15px] leading-7 text-[#59656a] md:text-[17px]">
              Volcanic ash is nothing like the soft ash from a fireplace. It is made of tiny pieces of rock and volcanic glass, hard and sharp enough to scratch, and light enough for the wind to carry a long way. That is also how it ends up in the air people are breathing.
            </p>
            <div className="border-l border-[#cbbba4] pl-4 text-xs leading-5 text-[#77766e]">
              This page follows that air from the nose down to the air sacs deep in the lungs, where oxygen crosses into the blood.
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-3 text-xs text-[#77766e] md:mt-16">
          <Wind size={15} strokeWidth={1.5} /> Trace the route <span className="h-px w-12 bg-[#cbbba4]" /> 4 stops
        </div>
      </section>

      <section id="explore" className="mx-auto max-w-[1320px] px-4 pb-16 md:px-10 md:pb-24">
        <div className="overflow-hidden rounded-[5px] border border-[#d7cbb9] bg-[#eae3d6] shadow-[0_24px_65px_-42px_rgba(65,50,37,.38)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d5c8b5] px-5 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#a75239]">Fig. 01</span>
              <h2 className="serif text-xl md:text-2xl">How a breath travels</h2>
            </div>
            <p className="text-xs text-[#77766e]">Click a part of the diagram</p>
          </div>
          <div className="grid min-h-[590px] lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,.85fr)]">
            <div className="relative flex min-h-[470px] flex-col items-center justify-center overflow-hidden border-b border-[#d5c8b5] px-5 py-8 lg:border-b-0 lg:border-r lg:px-8">
              <div className="pointer-events-none absolute left-5 top-5 text-xs text-[#a49a89]">Upper torso / anterior view</div>
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
                  <div className="mb-3 text-xs font-semibold text-[#a75239]">Stop {current.number} / 04</div>
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
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#587266]"><Check size={13} /> In a normal breath</div>
                  <p className="text-[14px] leading-6 text-[#425157]">{current.role}</p>
                </div>
                <div className="border-l-2 border-[#b56b4d] pl-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#a75239]"><span className="h-1.5 w-1.5 rounded-full bg-[#b56b4d]" /> With volcanic ash</div>
                  <p className="text-[14px] leading-6 text-[#425157]">{current.ash}</p>
                </div>
              </div>
              <div className="mt-auto pt-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-[#77766e]">Path through the body</span>
                  <span className="text-xs text-[#a75239]">{current.number} — 04</span>
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
              <div className="text-xs font-semibold text-[#a75239]">{parts[id].number} / {parts[id].name.split(' &')[0]}</div>
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
          <div className="relative">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-[#d5a47e]"><AlertTriangle size={14} /> If ash is in the air</div>
            <h2 className="serif max-w-sm text-3xl leading-tight">The less of it you breathe in, the better.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#d2d7d1]">No two ashfalls are the same, so local emergency and public-health advice is what to go by, both during an eruption and for a while after it.</p>
          </div>
        </div>
        <div className="grid gap-px bg-[#d5c8b5] sm:grid-cols-2">
          <div className="bg-[#f7f3eb] p-6 md:p-8">
            <span className="text-xs font-semibold text-[#a75239]">01 / Limit</span>
            <h3 className="serif mt-3 text-xl">Stay out of ashfall</h3>
            <p className="mt-2 text-sm leading-6 text-[#59656a]">Stay inside while ash is falling, with the windows and doors shut. Anything strenuous outdoors is better left until later.</p>
          </div>
          <div className="bg-[#f7f3eb] p-6 md:p-8">
            <span className="text-xs font-semibold text-[#a75239]">02 / Filter</span>
            <h3 className="serif mt-3 text-xl">Use the right protection</h3>
            <p className="mt-2 text-sm leading-6 text-[#59656a]">If you do have to go out, check local advice on particulate respirators and on fitting one properly. A cloth face covering is not likely to stop particles this fine.</p>
          </div>
          <div className="bg-[#f7f3eb] p-6 md:col-span-2 md:p-8">
            <span className="text-xs font-semibold text-[#a75239]">03 / Get help</span>
            <h3 className="serif mt-3 text-xl">Breathing symptoms need attention</h3>
            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#59656a]">Get medical help if breathing becomes difficult, or if symptoms keep getting worse. Anyone with asthma or another respiratory condition should stick to the plan their clinician gave them and follow local health guidance. This page was written to explain the subject; it is not medical advice and cannot diagnose anything.</p>
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
          <span className="text-xs">An educational page, not medical advice.</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
