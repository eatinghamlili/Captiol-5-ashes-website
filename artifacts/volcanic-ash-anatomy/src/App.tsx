import { useState } from 'react';
import { AlertTriangle, ArrowDown, ArrowUpRight, Check, ChevronRight, Eye, EyeOff, Plus, Wind } from 'lucide-react';

type PartId = 'nose' | 'throat' | 'airways' | 'lungs';

const parts: Record<
  PartId,
  { number: string; name: string; short: string; subtitle: string; role: string; ash: string; signs: string[]; note?: string }
> = {
  nose: {
    number: '01',
    name: 'Nose & nasal passages',
    short: 'Nose',
    subtitle: 'Where air gets in',
    role: 'Air comes in through the nose first. Mucous membranes and ciliated epithelial cells — cells carrying microscopic hairs — catch the larger ash particles, while the passages warm the air and add moisture to it before it travels any further down.',
    ash: 'Ash irritates that lining, so the nose runs or blocks up and sneezing comes in bursts. It catches a lot, but the nose is not a complete filter and the finest ash gets past it.',
    signs: ['Frequent sneezing', 'Runny or blocked nose'],
    note: 'Breathing through your mouth skips the nose altogether, which lets larger particles straight into the airway.',
  },
  throat: {
    number: '02',
    name: 'Throat',
    short: 'Throat',
    subtitle: 'Where the nose and mouth meet',
    role: 'The pharynx is where air from the nose and the mouth joins up before heading down. Particles caught in mucus here are usually swallowed or coughed back out.',
    ash: 'Ash leaves the throat scratchy and sore, and swallowing can feel uncomfortable. Mouth-breathing makes it worse, because that air has had none of the filtering the nose would have done.',
    signs: ['Scratchy, sore throat', 'Discomfort swallowing'],
  },
  airways: {
    number: '03',
    name: 'Trachea & bronchi',
    short: 'Airways',
    subtitle: 'The tubes down to the lungs',
    role: 'The trachea splits into two bronchi, and those branch into narrower and narrower tubes. Mucus lines them, and cilia sweep trapped debris back up toward the throat so it can be expelled.',
    ash: 'Ash inflames the lining of these tubes. That brings on coughing, wheezing, and a tight feeling across the chest — and for anyone with asthma or bronchitis it can be a good deal worse.',
    signs: ['Inflamed airway lining', 'Chest tightness and wheezing', 'Persistent cough'],
  },
  lungs: {
    number: '04',
    name: 'Alveoli & respiratory membrane',
    short: 'Alveoli',
    subtitle: 'Where oxygen reaches the blood',
    role: 'At the end of the smallest tubes sit the alveoli: tiny air sacs wrapped in microscopic capillaries. Across that thin membrane, oxygen passes into the blood and carbon dioxide passes back out.',
    ash: 'The finest particles travel the whole way down here. They inflame the air sacs, which cuts how much oxygen can cross into the blood and lets fluid build up.',
    signs: ['Reduced oxygen exchange', 'Fluid building up in the sacs'],
    note: 'Over a long exposure that damage can scar lung tissue and leave a lasting respiratory illness.',
  },
};

const calloutEffects: Record<PartId, string> = {
  nose: 'Irritation · sneezing',
  throat: 'Soreness · dry cough',
  airways: 'Tightness · wheezing',
  lungs: 'Fine ash reaches deep',
};

const protectTips: Record<PartId, string> = {
  nose: 'Stay inside with the windows shut while ash is falling, and breathe through your nose rather than your mouth.',
  throat: 'Keep time outdoors short, and check local ash advisories before you go out.',
  airways: 'Stay indoors. If you have to go out, follow public-health guidance on wearing a well-fitting particulate respirator.',
  lungs: 'Follow local health guidance, and get medical help if symptoms are serious or getting worse.',
};

const riskFactors = [
  {
    eyebrow: 'Who feels it first',
    title: 'Vulnerable groups',
    teaser: 'Age changes how much ash it takes to cause trouble.',
    body: 'Young children and elderly people are at higher risk. Smaller or less efficient lungs leave less margin, and neither group shrugs off a few days of bad air as easily as a healthy adult does.',
  },
  {
    eyebrow: 'What it makes worse',
    title: 'Pre-existing conditions',
    teaser: 'Ash does not need to cause a new illness to do harm.',
    body: 'Asthma, bronchitis, emphysema, allergies and cardiovascular disease can all be severely aggravated by ash exposure. Anyone living with one of these should treat an ashfall as a reason to stay indoors and to stick to the plan their clinician gave them.',
  },
];

const nervous = [
  {
    eyebrow: 'Fight or flight',
    title: 'Sympathetic nervous system',
    teaser: 'Mobilises the body when a situation turns dangerous.',
    role: 'It readies you to move: heart rate and cardiac output climb so oxygen reaches the muscles faster, and the muscles around the airways relax so more air can get in.',
    effect: 'Both of those changes help you run — and both mean you pull more ash into your lungs while you do it.',
  },
  {
    eyebrow: 'Clear thinking',
    title: 'Prefrontal cortex',
    teaser: 'Handles higher-level thinking and logical decisions.',
    role: 'This is the part of the brain you reason with: weighing options, following a plan, deciding what to do next.',
    effect: 'Under high panic it receives less oxygen, so people turn less rational exactly when clear thinking matters most. Knowing the plan beforehand beats working it out in the moment.',
  },
  {
    eyebrow: 'Automatic',
    title: 'Brain stem',
    teaser: 'Runs the involuntary necessities — breathing above all.',
    role: 'Breathing does not wait for you to choose it. The brain stem keeps the rhythm going whether you are paying attention or asleep.',
    effect: 'You cannot simply decide to breathe less of the air around you, which is why keeping ash out of that air matters more than anything you try to do with your lungs.',
  },
  {
    eyebrow: 'The signal',
    title: 'Hypothalamus',
    teaser: 'Releases the hormones that tell the body to act.',
    role: 'It translates a threat into chemistry, sending hormones out to put the rest of the body on alert.',
    effect: 'That signal starts the whole cascade — the racing heart, the open airways, and the fast, shallow breathing that goes with being frightened.',
  },
];

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
              <strong>{parts[id].short}</strong>
              <span> · {calloutEffects[id]}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="diagram-caption">Diagram: LadyofHats / Wikimedia Commons, public domain, with its labels removed.</p>
    </div>
  );
}

function Reveal({
  open,
  eyebrow,
  title,
  teaser,
  children,
}: {
  open: boolean;
  eyebrow: string;
  title: string;
  teaser?: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`reveal ${open ? 'is-open' : ''}`} tabIndex={0}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#a75239]">{eyebrow}</div>
          <h3 className="serif mt-2 text-xl leading-snug text-[#25343a]">{title}</h3>
        </div>
        <span className="reveal-hint" aria-hidden="true">
          <Plus size={13} />
        </span>
      </div>
      {teaser ? <p className="mt-3 text-[13px] leading-5 text-[#77766e]">{teaser}</p> : null}
      <div className="reveal-body">
        <div className="reveal-body-inner">{children}</div>
      </div>
    </article>
  );
}

function RevealToggle({ open, onToggle, className = '' }: { open: boolean; onToggle: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={open}
      className={`inline-flex items-center gap-2 rounded-full border border-[#a75239] px-3.5 py-2 text-[11px] font-semibold text-[#a75239] transition-colors duration-200 hover:bg-[#a75239] hover:text-[#fff7ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75239] ${className}`}
    >
      {open ? <EyeOff size={13} /> : <Eye size={13} />}
      {open ? 'Hide the details again' : 'Show all the information'}
    </button>
  );
}

function App() {
  const [selected, setSelected] = useState<PartId>('nose');
  const [revealAll, setRevealAll] = useState(false);
  const current = parts[selected];
  const toggleReveal = () => setRevealAll((value) => !value);

  return (
    <main className="page-grain min-h-[100dvh] overflow-hidden bg-[#f3efe5] text-[#25343a]">
      <header className="relative z-20 mx-auto flex max-w-[1320px] flex-col-reverse gap-6 px-6 py-5 md:flex-row md:items-start md:justify-between md:px-10">
        <div className="flex items-center gap-3 text-xs text-[#77766e]">
          <span className="h-2 w-2 rounded-full bg-[#a75239]" />
          A student field guide
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <a href="#top" className="flex items-center gap-3" aria-label="the other cavaliers, back to the top">
            <span className="text-[13px] font-semibold">the other cavaliers</span>
            <img
              src={`${import.meta.env.BASE_URL}the-other-cavaliers.png`}
              alt="the other cavaliers group"
              className="h-12 w-12 rounded-full border border-[#cbbba4] object-cover object-[50%_26%]"
            />
          </a>
          <div className="max-w-[23rem] rounded-sm border border-[#d7cbb9] bg-[#f7f3eb] px-4 py-3.5 text-left">
            <div className="text-xs font-semibold text-[#a75239]">How to read this page</div>
            <p className="mt-1.5 text-xs leading-5 text-[#59656a]">
              Hover over a part of the diagram, or over any card below, and its details appear. Nothing is missing — it
              just waits until you point at it. On a touchscreen, or to read the lot at once, use the button.
            </p>
            <RevealToggle open={revealAll} onToggle={toggleReveal} className="mt-3" />
          </div>
        </div>
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
              Volcanic ash is not soft dust. It is made of microscopic, jagged shards of fractured rock, glass and
              minerals — hard enough to scratch, and light enough for the wind to carry a long way. That is also how it
              ends up in the air people are breathing.
            </p>
            <div className="border-l border-[#cbbba4] pl-4 text-xs leading-5 text-[#77766e]">
              This page follows that air from the nose down to the air sacs deep in the lungs, where oxygen crosses into
              the blood.
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-3 text-xs text-[#77766e] md:mt-16">
          <Wind size={15} strokeWidth={1.5} /> Trace the route <span className="h-px w-12 bg-[#cbbba4]" /> 4 stops
          <a href="#explore" className="ml-2 flex items-center gap-1.5 font-semibold text-[#25343a] hover:text-[#a75239]">
            Start at the nose <ArrowDown size={13} />
          </a>
        </div>
      </section>

      <section id="explore" className="mx-auto max-w-[1320px] px-4 pb-16 md:px-10 md:pb-24">
        <div className="overflow-hidden rounded-[5px] border border-[#d7cbb9] bg-[#eae3d6] shadow-[0_24px_65px_-42px_rgba(65,50,37,.38)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d5c8b5] px-5 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#a75239]">Fig. 01</span>
              <h2 className="serif text-xl md:text-2xl">How a breath travels</h2>
            </div>
            <p className="text-xs text-[#77766e]">Hover over a part of the diagram</p>
          </div>
          <div className="grid min-h-[590px] lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,.85fr)]">
            <div className="relative flex min-h-[470px] flex-col items-center justify-center overflow-hidden border-b border-[#d5c8b5] px-5 py-8 lg:border-b-0 lg:border-r lg:px-8">
              <div className="pointer-events-none absolute left-5 top-5 text-xs text-[#a49a89]">Upper torso / anterior view</div>
              <div className="absolute bottom-9 left-8 h-px w-[calc(100%-4rem)] bg-[#d4c7b4]" />
              <AnatomyIllustration selected={selected} onSelect={setSelected} />
              <div className="relative z-10 mt-[-3px] flex flex-wrap justify-center gap-2">
                {(Object.keys(parts) as PartId[]).map((id) => (
                  <button
                    key={id}
                    onMouseEnter={() => setSelected(id)}
                    onClick={() => setSelected(id)}
                    className={`rounded-full border px-3 py-2 text-[11px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75239] ${selected === id ? 'border-[#a75239] bg-[#a75239] text-[#fff7ed]' : 'border-[#c7baa6] bg-[#f3ede2] text-[#536066] hover:border-[#a75239]'}`}
                  >
                    {parts[id].short}
                  </button>
                ))}
              </div>
            </div>
            <article aria-live="polite" className="flex flex-col px-6 py-8 md:px-10 md:py-10">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-3 text-xs font-semibold text-[#a75239]">Stop {current.number} / 04</div>
                  <h3 className="serif text-3xl leading-tight md:text-[2.4rem]">{current.name}</h3>
                  <p className="mt-2 text-sm text-[#77766e]">{current.subtitle}</p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cbbba4] text-[#a75239]">
                  <ArrowUpRight size={17} />
                </div>
              </div>
              <div className="my-7 h-px bg-[#d5c8b5]" />
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#587266]">
                    <Check size={13} /> In a normal breath
                  </div>
                  <p className="text-[14px] leading-6 text-[#425157]">{current.role}</p>
                </div>
                <div className="border-l-2 border-[#b56b4d] pl-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#a75239]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b56b4d]" /> With volcanic ash
                  </div>
                  <p className="text-[14px] leading-6 text-[#425157]">{current.ash}</p>
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold text-[#587266]">What that feels like</div>
                  <ul className="flex flex-wrap gap-1.5">
                    {current.signs.map((sign) => (
                      <li key={sign} className="rounded-full border border-[#d7cbb9] bg-[#f3ede2] px-2.5 py-1 text-[11px] text-[#536066]">
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                {current.note ? (
                  <p className="border-t border-[#d5c8b5] pt-4 text-[13px] leading-5 text-[#77766e]">
                    <span className="font-semibold text-[#a75239]">Worth knowing:</span> {current.note}
                  </p>
                ) : null}
              </div>
              <div className="mt-auto pt-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-[#77766e]">Path through the body</span>
                  <span className="text-xs text-[#a75239]">{current.number} — 04</span>
                </div>
                <div className="flex gap-1.5">
                  {(Object.keys(parts) as PartId[]).map((id) => (
                    <button
                      key={id}
                      aria-label={`Go to ${parts[id].name}`}
                      onMouseEnter={() => setSelected(id)}
                      onClick={() => setSelected(id)}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${selected === id ? 'bg-[#a75239]' : 'bg-[#d4c7b4] hover:bg-[#b7a58d]'}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() =>
                      setSelected(
                        selected === 'nose'
                          ? 'lungs'
                          : (['nose', 'throat', 'airways', 'lungs'][(['nose', 'throat', 'airways', 'lungs'].indexOf(selected) - 1 + 4) % 4] as PartId),
                      )
                    }
                    className="text-xs text-[#697277] hover:text-[#a75239]"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setSelected(
                        selected === 'lungs'
                          ? 'nose'
                          : (['nose', 'throat', 'airways', 'lungs'][(['nose', 'throat', 'airways', 'lungs'].indexOf(selected) + 1) % 4] as PartId),
                      )
                    }
                    className="flex items-center gap-1 text-xs font-semibold text-[#a75239] hover:gap-2"
                  >
                    Next stop <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs text-[#77766e]">Four stops, in order. Hover a card for the anatomy behind it.</p>
          <RevealToggle open={revealAll} onToggle={toggleReveal} />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {(Object.keys(parts) as PartId[]).map((id) => (
            <Reveal
              key={id}
              open={revealAll}
              eyebrow={`${parts[id].number} / ${parts[id].short}`}
              title={parts[id].name}
              teaser={parts[id].subtitle}
            >
              <div className="space-y-3 text-[13px] leading-5 text-[#59656a]">
                <p>
                  <span className="font-semibold text-[#587266]">Normally:</span> {parts[id].role}
                </p>
                <p>
                  <span className="font-semibold text-[#a75239]">With ash:</span> {parts[id].ash}
                </p>
                <ul className="flex flex-wrap gap-1.5 pt-0.5">
                  {parts[id].signs.map((sign) => (
                    <li key={sign} className="rounded-full border border-[#d7cbb9] bg-[#f3ede2] px-2.5 py-1 text-[11px] text-[#536066]">
                      {sign}
                    </li>
                  ))}
                </ul>
                <p className="border-t border-[#d7cbb9] pt-3 text-[#425157]">
                  <span className="font-semibold text-[#a75239]">Protect:</span> {protectTips[id]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="risk" className="mx-auto max-w-[1320px] px-6 pb-16 md:px-10 md:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d5c8b5] pb-5">
          <div>
            <span className="text-xs font-semibold text-[#a75239]">Fig. 02</span>
            <h2 className="serif mt-2 text-2xl md:text-3xl">The same ash, different lungs</h2>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#59656a]">
              How much harm an ashfall does depends as much on who is breathing it as on the ash itself.
            </p>
          </div>
          <RevealToggle open={revealAll} onToggle={toggleReveal} />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {riskFactors.map((item) => (
            <Reveal key={item.title} open={revealAll} eyebrow={item.eyebrow} title={item.title} teaser={item.teaser}>
              <p className="text-[13px] leading-5 text-[#59656a]">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-b border-[#d5c8b5] pb-5">
          <span className="text-xs font-semibold text-[#a75239]">Fig. 03</span>
          <h2 className="serif mt-2 text-2xl md:text-3xl">Panic makes it worse</h2>
          <p className="mt-2 max-w-[640px] text-sm leading-6 text-[#59656a]">
            An eruption is frightening, and fear changes the body before anyone has decided anything. The nervous system
            is built to get you out of danger fast — which, in falling ash, works against your lungs.
          </p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {nervous.map((item) => (
            <Reveal key={item.title} open={revealAll} eyebrow={item.eyebrow} title={item.title} teaser={item.teaser}>
              <div className="space-y-3 text-[13px] leading-5 text-[#59656a]">
                <p>
                  <span className="font-semibold text-[#587266]">Its job:</span> {item.role}
                </p>
                <p className="border-t border-[#d7cbb9] pt-3">
                  <span className="font-semibold text-[#a75239]">In an ashfall:</span> {item.effect}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-6 px-6 pb-16 md:grid-cols-[.8fr_1.2fr] md:px-10 md:pb-24">
        <div className="relative overflow-hidden bg-[#27383c] p-7 text-[#f3efe5] md:p-9">
          <div className="relative">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-[#d5a47e]">
              <AlertTriangle size={14} /> If ash is in the air
            </div>
            <h2 className="serif max-w-sm text-3xl leading-tight">The less of it you breathe in, the better.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#d2d7d1]">
              No two ashfalls are the same, so local emergency and public-health advice is what to go by, both during an
              eruption and for a while after it.
            </p>
          </div>
        </div>
        <div className="grid gap-px bg-[#d5c8b5] sm:grid-cols-2">
          <div className="bg-[#f7f3eb] p-6 md:p-8">
            <span className="text-xs font-semibold text-[#a75239]">01 / Limit</span>
            <h3 className="serif mt-3 text-xl">Stay out of ashfall</h3>
            <p className="mt-2 text-sm leading-6 text-[#59656a]">
              Stay inside while ash is falling, with the windows and doors shut. Anything strenuous outdoors is better
              left until later.
            </p>
          </div>
          <div className="bg-[#f7f3eb] p-6 md:p-8">
            <span className="text-xs font-semibold text-[#a75239]">02 / Filter</span>
            <h3 className="serif mt-3 text-xl">Use the right protection</h3>
            <p className="mt-2 text-sm leading-6 text-[#59656a]">
              If you do have to go out, check local advice on particulate respirators and on fitting one properly. A
              cloth face covering is not likely to stop particles this fine.
            </p>
          </div>
          <div className="bg-[#f7f3eb] p-6 md:col-span-2 md:p-8">
            <span className="text-xs font-semibold text-[#a75239]">03 / Get help</span>
            <h3 className="serif mt-3 text-xl">Breathing symptoms need attention</h3>
            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#59656a]">
              Get medical help if breathing becomes difficult, or if symptoms keep getting worse. Anyone with asthma or
              another respiratory condition should stick to the plan their clinician gave them and follow local health
              guidance. This page was written to explain the subject; it is not medical advice and cannot diagnose
              anything.
            </p>
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
