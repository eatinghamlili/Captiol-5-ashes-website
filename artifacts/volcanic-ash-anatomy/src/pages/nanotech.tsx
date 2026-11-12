import { useState } from 'react';
import { Activity, AlertTriangle, ArrowDown, Check, ChevronRight, Cpu, WifiOff } from 'lucide-react';

import { Reveal, RevealToggle } from '@/components/reveal';

type OrganId = 'brain' | 'lungs' | 'heart' | 'liver' | 'kidneys' | 'blood';

const order: OrganId[] = ['brain', 'lungs', 'heart', 'liver', 'kidneys', 'blood'];

const organs: Record<
  OrganId,
  {
    number: string;
    name: string;
    short: string;
    subtitle: string;
    purpose: string;
    malfunction: string;
    signs: string[];
    monitor: string;
    protect: string;
    note?: string;
  }
> = {
  brain: {
    number: '01',
    name: 'Brain',
    short: 'Brain',
    subtitle: 'Where the signals start',
    purpose:
      'These nanobots were built to slip across the blood–brain barrier — the tight wall that normally keeps foreign material out of the brain — and release medicine right at a tumour or a cluster of misfiring nerve cells.',
    malfunction:
      'Without a working off switch, they keep releasing their dose and keep drifting into healthy tissue. The brain swells inside the skull, and the electrical signals passing between nerve cells get scrambled.',
    signs: ['Severe headaches', 'Confusion and memory gaps', 'Seizures'],
    monitor:
      'EEG sensors on the scalp track the brain’s electrical activity around the clock, and repeated brain scans show whether the swelling is growing.',
    protect: 'Medicines that bring swelling down and prevent seizures, given for as long as the nanobots stay active.',
    note: 'The barrier that makes the brain hard to treat also makes it hard to clean out. Whatever crosses in tends to stay.',
  },
  lungs: {
    number: '02',
    name: 'Lungs & air sacs',
    short: 'Lungs',
    subtitle: 'Where oxygen gets in',
    purpose:
      'Nanobots in the lungs were meant to carry antibiotics or anti-inflammatory drugs straight to infected or damaged tissue, so a patient needed a much smaller dose overall.',
    malfunction:
      'Malfunctioning nanobots lodge in the alveoli and the tiny capillaries wrapped around them. The immune system attacks them, the air sacs become inflamed, and less oxygen crosses into the blood.',
    signs: ['Shortness of breath', 'Low blood oxygen', 'Persistent cough'],
    monitor:
      'A pulse oximeter clipped to a finger reads blood oxygen every few seconds, and chest scans show where the particles have settled.',
    protect: 'Extra oxygen through a mask, and a ventilator if a patient can no longer breathe well enough alone.',
    note: 'It is the same damage volcanic ash does to the air sacs — only this time it starts from the inside.',
  },
  heart: {
    number: '03',
    name: 'Heart & arteries',
    short: 'Heart',
    subtitle: 'Where blood is pumped',
    purpose:
      'Heart nanobots were designed to patrol the arteries, breaking up small clots and clearing early fatty build-up before it could cause a heart attack.',
    malfunction:
      'Instead of breaking clots apart, malfunctioning nanobots clump together and become clots themselves, blocking small vessels. Some interfere with the electrical signals that keep the heartbeat steady.',
    signs: ['Irregular heartbeat', 'Chest pain', 'Dizziness or fainting'],
    monitor:
      'A continuous ECG records every heartbeat, and blood tests look for troponin — a protein released when heart muscle is being damaged.',
    protect: 'Blood thinners to stop new clots forming, and a defibrillator kept ready in case the rhythm turns dangerous.',
  },
  liver: {
    number: '04',
    name: 'Liver & spleen',
    short: 'Liver',
    subtitle: 'Where the blood is filtered',
    purpose:
      'Neither organ was a target. The liver and spleen filter the blood, so they are where stray particles naturally end up — they were the body’s plan for clearing the nanobots once the job was done.',
    malfunction:
      'Active nanobots keep arriving and never break down. The filtering cells are overwhelmed, the tissue becomes inflamed, and the liver slowly loses its ability to clean the blood.',
    signs: ['Pain under the right ribs', 'Yellowing skin and eyes', 'Exhaustion'],
    monitor: 'Liver function blood tests, taken every day, and ultrasound scans to check both organs for swelling.',
    protect: 'Supportive care to take the strain off the liver, and in the worst cases an assessment for a transplant.',
    note: 'This part is real: in nanomedicine studies, most particles injected into the blood are caught by the liver and spleen.',
  },
  kidneys: {
    number: '05',
    name: 'Kidneys & bladder',
    short: 'Kidneys',
    subtitle: 'Where waste leaves the body',
    purpose:
      'The kidneys were the exit. Each nanobot was designed to break down into pieces small enough to be filtered out and leave the body in urine.',
    malfunction:
      'Malfunctioning nanobots stay whole, and clumps of them are far too big to pass. They jam the kidneys’ tiny filters, so waste the body should be getting rid of builds up in the blood instead.',
    signs: ['Passing less urine', 'Swollen legs and ankles', 'Nausea'],
    monitor:
      'Blood tests for creatinine — a waste product that rises when the kidneys are struggling — and urine output measured hour by hour.',
    protect: 'Dialysis: a machine that filters the blood when the kidneys no longer can.',
  },
  blood: {
    number: '06',
    name: 'Bloodstream & immune system',
    short: 'Blood',
    subtitle: 'How it reaches everywhere',
    purpose:
      'The bloodstream is the nanobots’ road through the body. A protective coating hides them from the immune system, so they can travel without being attacked.',
    malfunction:
      'As that coating breaks down, the immune system recognises the nanobots as invaders. Inflammation spreads through the whole body, and blood starts clotting in places it should not.',
    signs: ['High fever', 'Low blood pressure', 'Clots in the arms and legs'],
    monitor: 'Vital signs checked around the clock, plus frequent blood counts and tests for markers of inflammation.',
    protect:
      'IV fluids, medicines that calm the immune response, and blood filtering (apheresis) to try to pull nanobots out of circulation.',
    note: 'This is why one malfunction can reach every organ on this page: the blood carries it there.',
  },
};

const calloutEffects: Record<OrganId, string> = {
  brain: 'Signals scrambled',
  lungs: 'Air sacs inflamed',
  heart: 'Rhythm slips',
  liver: 'Overloaded',
  kidneys: 'Filters jam',
  blood: 'Clots & fever',
};

const shutdownSteps = [
  {
    number: '01',
    title: 'The malfunction',
    body: 'Patients in an experimental trial start reporting symptoms in different parts of the body. Scans show nanobots gathering in places they were never meant to be.',
  },
  {
    number: '02',
    title: 'The shutdown signal',
    body: 'Every nanobot was built to listen for an emergency signal — a pulse sent from outside the body that tells it to switch itself off. The scientists send it.',
  },
  {
    number: '03',
    title: 'No response',
    body: 'Nothing changes, and some patients get worse. With the off switch gone, doctors have to find other ways to watch over them and keep them safe.',
  },
];

const shutdownCauses = [
  {
    eyebrow: 'Possibility A',
    title: 'Broken receivers',
    teaser: 'The part that listens may have failed first.',
    body: 'Each nanobot needs a tiny sensor to pick up the shutdown pulse. If the same fault that caused the malfunction also damaged that sensor, the signal arrives and nothing hears it.',
  },
  {
    eyebrow: 'Possibility B',
    title: 'Out of reach',
    teaser: 'Bone and deep tissue weaken signals.',
    body: 'Signals sent from outside the body, like ultrasound or light, lose strength as they pass through tissue, and the skull blocks a lot of them. Nanobots lodged deep in the brain or the liver may never receive it at all.',
  },
  {
    eyebrow: 'Possibility C',
    title: 'Clumped together',
    teaser: 'A cluster does not behave like a single nanobot.',
    body: 'The shutdown was tested on nanobots working alone. Packed into a clot or an organ’s filters, the ones on the outside may shield the ones inside, or the whole cluster may respond in ways nobody tested.',
  },
];

// Diagram coordinates match the pixels of body-defences-unlabelled.png (528 × 900).
const VIEW = { w: 528, h: 900 };

type Zone = { cx: number; cy: number; rx: number; ry: number; rotate?: number };

// Where each organ sits on the drawing. The heart, liver, spleen and kidneys are
// not drawn in the picture, so their zones mark where they would be.
const zones: Record<Exclude<OrganId, 'blood'>, Zone[]> = {
  brain: [{ cx: 255, cy: 105, rx: 82, ry: 60 }],
  lungs: [
    { cx: 208, cy: 408, rx: 50, ry: 88 },
    { cx: 331, cy: 396, rx: 47, ry: 80 },
  ],
  heart: [{ cx: 278, cy: 452, rx: 28, ry: 23, rotate: -25 }],
  liver: [
    { cx: 214, cy: 528, rx: 60, ry: 28, rotate: -8 },
    { cx: 374, cy: 520, rx: 13, ry: 24, rotate: 20 },
  ],
  kidneys: [
    { cx: 200, cy: 614, rx: 19, ry: 31 },
    { cx: 344, cy: 614, rx: 19, ry: 31 },
    { cx: 262, cy: 838, rx: 26, ry: 18 },
  ],
};

// Main blood vessels, shown only while the bloodstream is picked.
const vessels = [
  'M268 250L268 790',
  'M262 250L252 190',
  'M268 300C220 300 150 320 112 380L84 500',
  'M268 300C316 300 386 316 420 376L446 500',
  'M268 790L222 890',
  'M268 790L314 890',
];

const nanobots: Record<OrganId, [number, number][]> = {
  brain: [[222, 86], [250, 70], [282, 88], [300, 116], [238, 126], [268, 140]],
  lungs: [[194, 370], [216, 420], [190, 460], [320, 358], [342, 410], [324, 448], [230, 382]],
  heart: [[266, 446], [286, 458], [276, 470], [292, 440]],
  liver: [[178, 526], [214, 514], [246, 534], [206, 546], [374, 518]],
  kidneys: [[200, 604], [344, 604], [262, 836], [204, 630], [340, 630]],
  blood: [[268, 282], [268, 560], [268, 720], [150, 352], [96, 450], [386, 346], [434, 448], [236, 856], [300, 856], [256, 214]],
};

function ZoneShape({ zone }: { zone: Zone }) {
  return (
    <ellipse
      className="nano-zone"
      cx={zone.cx}
      cy={zone.cy}
      rx={zone.rx}
      ry={zone.ry}
      transform={zone.rotate ? `rotate(${zone.rotate} ${zone.cx} ${zone.cy})` : undefined}
    />
  );
}

function BodyIllustration({ selected, onSelect }: { selected: OrganId; onSelect: (id: OrganId) => void }) {
  const region = (id: OrganId) => ({
    className: `nano-region${selected === id ? ' is-active' : ''}`,
    role: 'button',
    tabIndex: 0,
    'aria-label': `Show ${organs[id].name}`,
    'aria-pressed': selected === id,
    onMouseEnter: () => onSelect(id),
    onFocus: () => onSelect(id),
    onClick: () => onSelect(id),
  });

  return (
    <div className="w-full max-w-[400px]">
      <div className="diagram-paper">
        <div className="anatomy-figure">
          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            className="nano-svg block h-auto w-full"
            role="group"
            aria-label="Front view of the head and upper body. Hover areas mark the brain, lungs, heart, liver and spleen, kidneys and bladder, and the main blood vessels. Small dots show nanobots spread through the body."
          >
            <image href={`${import.meta.env.BASE_URL}assets/body-defences-unlabelled.png`} width={VIEW.w} height={VIEW.h} />

            {/* Bloodstream sits under everything else. */}
            <g {...region('blood')}>
              {vessels.map((d) => (
                <path key={`hit-${d}`} className="nano-hit" d={d} />
              ))}
              <g className="nano-vessel">
                {vessels.map((d) => (
                  <path key={d} d={d} />
                ))}
              </g>
            </g>

            {(Object.keys(zones) as (keyof typeof zones)[]).map((id) => (
              <g key={id} {...region(id)}>
                {zones[id].map((zone, index) => (
                  <ZoneShape key={index} zone={zone} />
                ))}
              </g>
            ))}

            {/* Nanobots, drawn far larger than life. */}
            <g aria-hidden="true">
              {order.flatMap((id) =>
                nanobots[id].map(([cx, cy], index) => (
                  <circle
                    key={`${id}-${index}`}
                    className={`nano-dot${selected === id ? ' is-active' : ''}`}
                    cx={cx}
                    cy={cy}
                    r="6"
                    style={{ animationDelay: `${(index % 4) * 0.22}s` }}
                  />
                )),
              )}
            </g>
          </svg>

          <div aria-hidden="true" className="nano-label">
            <strong>{organs[selected].short}</strong> · {calloutEffects[selected]}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[.7rem] text-[#5b7189]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#2a7f9e]" /> Nanobot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#2563a8]" /> Malfunctioning in the area you picked
        </span>
        <span>Diagram: “Chemical, biochemical and physical defences of the body”, labels removed. Nanobots shown far larger than life.</span>
      </div>
    </div>
  );
}

export function NanotechPage() {
  const [selected, setSelected] = useState<OrganId>('brain');
  const [revealAll, setRevealAll] = useState(false);
  const current = organs[selected];
  const index = order.indexOf(selected);
  const total = String(order.length).padStart(2, '0');
  const toggleReveal = () => setRevealAll((value) => !value);
  const step = (delta: number) => setSelected(order[(index + delta + order.length) % order.length]);

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f3f8fd] text-[#16324f]">
      <header className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 pt-5 md:px-10">
        <a href="#nano-top" className="flex items-center gap-3" aria-label="the other cavaliers, back to the top">
          <img
            src={`${import.meta.env.BASE_URL}the-other-cavaliers.png`}
            alt="the other cavaliers group"
            className="h-11 w-11 rounded-full border-2 border-white object-cover object-[50%_26%] shadow-[0_1px_4px_rgba(22,50,79,.25)]"
          />
          <span className="heading text-[15px]">the other cavaliers</span>
        </a>
        <span className="text-sm text-[#3f5873]">English project — Ms Lee</span>
      </header>

      <section id="nano-top" className="mx-auto max-w-[1180px] px-4 pb-10 pt-5 md:px-10 md:pb-14">
        <div className="grid gap-6 rounded-2xl bg-[#d6e8f7] px-6 py-9 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-10">
          <div>
            <h1 className="heading text-[clamp(2.3rem,5vw,3.75rem)] font-bold leading-[1.06]">
              When the cure<br className="hidden sm:block" /> won’t switch off
            </h1>
            <p className="mt-5 max-w-[62ch] text-[17px] leading-7 text-[#2c4258]">
              Medical nanotechnology uses machines smaller than a blood cell to carry drugs, clear blockages and repair
              tissue from the inside. In this scenario an experimental treatment goes wrong: the nanobots inside patients
              start malfunctioning — and the emergency signal built to shut them down no longer works.
            </p>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-6 text-[#3f5873]">
              This page follows the malfunction through the body, organ by organ, and how doctors keep patients safe once
              the off switch is gone.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#nano-explore"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563a8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4f88]"
              >
                Start at the brain <ArrowDown size={15} />
              </a>
              <span className="flex items-center gap-2 text-sm text-[#3f5873]">
                <Cpu size={16} strokeWidth={1.75} /> Follow the spread · 6 stops
              </span>
              <span className="tag">A fictional scenario</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-5">
            <div className="heading text-base">How to read this page</div>
            <p className="mt-1.5 text-sm leading-6 text-[#3f5873]">
              Hover over a part of the body, or any card, and its details appear. On a touchscreen — or to read it all at
              once — use the button.
            </p>
            <RevealToggle open={revealAll} onToggle={toggleReveal} className="mt-3" />
          </div>
        </div>
      </section>

      <section id="nano-explore" className="mx-auto max-w-[1180px] px-4 pb-16 md:px-10 md:pb-24">
        <div className="overflow-hidden rounded-2xl border border-[#c9dbec] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#c9dbec] px-5 py-4 md:px-8">
            <h2 className="heading text-xl md:text-2xl">Figure 1: Where the malfunction spreads</h2>
            <p className="text-xs text-[#5b7189]">Hover over a part of the body</p>
          </div>
          <div className="grid min-h-[590px] lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,.85fr)]">
            <div className="relative flex min-h-[470px] flex-col items-center justify-center overflow-hidden border-b border-[#c9dbec] px-5 py-8 lg:border-b-0 lg:border-r lg:px-8">
              <div className="pointer-events-none absolute left-5 top-5 text-xs text-[#6f86a0]">Upper body / front view</div>
              <BodyIllustration selected={selected} onSelect={setSelected} />
              <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
                {order.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onMouseEnter={() => setSelected(id)}
                    onClick={() => setSelected(id)}
                    className={`rounded-full border px-3 py-2 text-[11px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563a8] ${selected === id ? 'border-[#2563a8] bg-[#2563a8] text-[#ffffff]' : 'border-[#a9c4de] bg-[#e7f0f9] text-[#3a5470] hover:border-[#2563a8]'}`}
                  >
                    {organs[id].short}
                  </button>
                ))}
              </div>
            </div>
            <article aria-live="polite" className="flex flex-col px-6 py-8 md:px-10 md:py-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="heading text-3xl leading-tight md:text-[2.4rem]">{current.name}</h3>
                  <p className="mt-2 text-sm text-[#5b7189]">Stop {Number(current.number)} of {order.length} · {current.subtitle}</p>
                </div>
              </div>
              <div className="my-7 h-px bg-[#c9dbec]" />
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#2e7d5b]">
                    <Check size={13} /> What it was built to do
                  </div>
                  <p className="text-[14px] leading-6 text-[#2c4258]">{current.purpose}</p>
                </div>
                <div className="rounded-xl bg-[#fff4e3] p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#9a5410]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d9822b]" /> When it malfunctions
                  </div>
                  <p className="text-[14px] leading-6 text-[#2c4258]">{current.malfunction}</p>
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold text-[#2e7d5b]">What the patient feels</div>
                  <ul className="flex flex-wrap gap-1.5">
                    {current.signs.map((sign) => (
                      <li key={sign} className="rounded-full border border-[#c9dbec] bg-[#e7f0f9] px-2.5 py-1 text-[11px] text-[#3a5470]">
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#2a7f9e]">
                    <Activity size={13} /> How doctors keep watch
                  </div>
                  <p className="text-[14px] leading-6 text-[#2c4258]">{current.monitor}</p>
                </div>
                {current.note ? (
                  <p className="border-t border-[#c9dbec] pt-4 text-[13px] leading-5 text-[#5b7189]">
                    <span className="font-semibold text-[#2563a8]">Worth knowing:</span> {current.note}
                  </p>
                ) : null}
              </div>
              <div className="mt-auto pt-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-[#5b7189]">Path through the body</span>
                  <span className="text-xs text-[#2563a8]">
                    {current.number} — {total}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {order.map((id) => (
                    <button
                      key={id}
                      type="button"
                      aria-label={`Go to ${organs[id].name}`}
                      onMouseEnter={() => setSelected(id)}
                      onClick={() => setSelected(id)}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${selected === id ? 'bg-[#2563a8]' : 'bg-[#c9dbec] hover:bg-[#8fb0d1]'}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between">
                  <button type="button" onClick={() => step(-1)} className="text-xs text-[#4f6780] hover:text-[#2563a8]">
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#2563a8] hover:gap-2"
                  >
                    Next stop <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs text-[#5b7189]">Six stops, in order. Hover a card for what doctors can do about it.</p>
          <RevealToggle open={revealAll} onToggle={toggleReveal} />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {order.map((id) => (
            <Reveal
              key={id}
              open={revealAll}
              eyebrow={`Stop ${Number(organs[id].number)}`}
              title={organs[id].name}
              teaser={organs[id].subtitle}
            >
              <div className="space-y-3 text-[13px] leading-5 text-[#3f5873]">
                <p>
                  <span className="font-semibold text-[#2e7d5b]">Built to:</span> {organs[id].purpose}
                </p>
                <p>
                  <span className="font-semibold text-[#9a5410]">Malfunction:</span> {organs[id].malfunction}
                </p>
                <ul className="flex flex-wrap gap-1.5 pt-0.5">
                  {organs[id].signs.map((sign) => (
                    <li key={sign} className="rounded-full border border-[#c9dbec] bg-[#e7f0f9] px-2.5 py-1 text-[11px] text-[#3a5470]">
                      {sign}
                    </li>
                  ))}
                </ul>
                <p>
                  <span className="font-semibold text-[#2a7f9e]">Watch:</span> {organs[id].monitor}
                </p>
                <p className="border-t border-[#c9dbec] pt-3 text-[#2c4258]">
                  <span className="font-semibold text-[#2563a8]">Protect:</span> {organs[id].protect}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="nano-shutdown" className="mx-auto max-w-[1180px] px-6 pb-16 md:px-10 md:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#c9dbec] pb-5">
          <div>
            <h2 className="heading text-2xl md:text-3xl">Figure 2: The failed shutdown</h2>
            <p className="mt-2 max-w-[600px] text-sm leading-6 text-[#3f5873]">
              The nanobots had a safety net: an emergency signal that should switch every one of them off. When it was
              needed, it did nothing.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563a8]">
            <WifiOff size={14} /> Signal sent · no response
          </div>
        </div>

        <ol className="mt-5 grid gap-3 md:grid-cols-3">
          {shutdownSteps.map((item, i) => (
            <li key={item.number} className={`rounded-2xl border border-[#c9dbec] p-6 md:p-8 ${i === shutdownSteps.length - 1 ? 'bg-[#e6f0fa]' : 'bg-[#ffffff]'}`}>
              <div className="flex items-center gap-2.5">
                <span className="step-num">{Number(item.number)}</span>
                <h3 className="heading text-xl">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#3f5873]">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-sm text-[#3f5873]">
            <span className="heading text-lg text-[#16324f]">Why the off switch might have failed.</span>{' '}
            <span className="text-xs text-[#5b7189]">Nobody knows yet. Three working theories:</span>
          </p>
          <RevealToggle open={revealAll} onToggle={toggleReveal} />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {shutdownCauses.map((item) => (
            <Reveal key={item.title} open={revealAll} eyebrow={item.eyebrow} title={item.title} teaser={item.teaser}>
              <p className="text-[13px] leading-5 text-[#3f5873]">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-6 px-6 pb-16 md:grid-cols-[.8fr_1.2fr] md:px-10 md:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-[#1f5a96] p-7 text-white md:p-9">
          <h2 className="heading max-w-sm text-3xl leading-tight">If you can’t switch it off, you watch it — and you protect.</h2>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white"><AlertTriangle size={14} /> Without an off switch</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#e3eefa]">
            Doctors can’t stop the nanobots directly, so the work shifts to catching damage early, supporting each organ
            under strain, and searching for another way to get the devices out.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#c9dbec] bg-white p-6 md:p-8">
            <div className="flex items-start gap-3">
              <span className="step-num mt-0.5">1</span>
              <div>
                <h3 className="heading text-xl leading-snug">Watch every organ, constantly</h3>
                <span className="tag mt-1.5">Monitor</span>
              </div>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#3f5873]">
              Heart monitors, oxygen readings, brain activity and daily blood tests, so a problem in any organ shows up
              before the patient feels it.
            </p>
          </div>
          <div className="rounded-2xl border border-[#c9dbec] bg-white p-6 md:p-8">
            <div className="flex items-start gap-3">
              <span className="step-num mt-0.5">2</span>
              <div>
                <h3 className="heading text-xl leading-snug">Treat the damage, organ by organ</h3>
                <span className="tag mt-1.5">Protect</span>
              </div>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#3f5873]">
              Oxygen for the lungs, blood thinners for clots, dialysis for the kidneys, anti-seizure medicine for the
              brain — each one buying time.
            </p>
          </div>
          <div className="rounded-2xl border border-[#c9dbec] bg-white p-6 md:col-span-2 md:p-8">
            <div className="flex items-start gap-3">
              <span className="step-num mt-0.5">3</span>
              <div>
                <h3 className="heading text-xl leading-snug">Find another way out</h3>
                <span className="tag mt-1.5">Remove</span>
              </div>
            </div>
            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#3f5873]">
              With the signal dead, researchers look for anything else that works: filtering nanobots out of the blood,
              pulling magnetic ones out with strong magnets, or waiting for the body to break them down. This scenario
              is fictional, written for an English project — real medical nanotechnology is still mostly experimental,
              and this page is not medical advice.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#c9dbec]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-6 py-6 text-xs text-[#5b7189] sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}the-other-cavaliers.png`} alt="" className="h-8 w-8 rounded-full object-cover object-[50%_26%]" />
            <span className="font-semibold text-[#16324f]">the other cavaliers</span>
            <span className="hidden h-4 w-px bg-[#a9c4de] sm:block" />
            <span className="flex items-center gap-2">
              A student field guide
            </span>
          </div>
          <span className="text-xs">A fictional scenario, not medical advice.</span>
        </div>
      </footer>
    </main>
  );
}
