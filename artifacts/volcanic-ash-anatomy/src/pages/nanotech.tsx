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

// Diagram coordinates. The body is centred on x = 210; the viewBox adds a margin
// on both sides for the callouts.
const VIEW = { x: -90, y: 0, w: 600, h: 800 };
const pctX = (x: number) => `${((x - VIEW.x) / VIEW.w) * 100}%`;
const pctRight = (x: number) => `${((VIEW.x + VIEW.w - x) / VIEW.w) * 100}%`;
const pctY = (y: number) => `${(y / VIEW.h) * 100}%`;

// Each callout either starts at a left edge (right-hand labels) or ends at a
// right edge (left-hand labels), so its leader line always meets the box.
const callouts: Record<OrganId, { side: 'left' | 'right'; edge: number; top: number; leader: string; dot: [number, number] }> = {
  brain: { side: 'right', edge: 262, top: 26, leader: 'M238 60C248 50 254 42 262 40', dot: [238, 60] },
  lungs: { side: 'left', edge: 118, top: 150, leader: 'M166 248C150 220 136 180 118 164', dot: [166, 248] },
  heart: { side: 'right', edge: 334, top: 258, leader: 'M246 282C280 280 310 274 334 272', dot: [246, 282] },
  liver: { side: 'left', edge: 76, top: 336, leader: 'M160 352C130 352 100 350 76 350', dot: [160, 352] },
  kidneys: { side: 'right', edge: 334, top: 400, leader: 'M252 412C280 414 310 414 334 414', dot: [252, 412] },
  blood: { side: 'left', edge: 136, top: 560, leader: 'M178 584C164 580 150 576 136 574', dot: [178, 584] },
};

const nanobots: Record<OrganId, [number, number][]> = {
  brain: [[192, 56], [204, 68], [224, 56], [232, 76], [214, 86], [196, 80]],
  lungs: [[170, 230], [164, 272], [184, 302], [250, 232], [258, 274], [246, 306], [178, 256]],
  heart: [[214, 282], [232, 292], [224, 304], [240, 276]],
  liver: [[172, 346], [198, 352], [222, 344], [186, 362], [262, 352]],
  kidneys: [[178, 410], [242, 410], [210, 462], [186, 426], [236, 428]],
  blood: [
    [118, 236], [107, 300], [98, 390], [302, 236], [313, 300], [322, 390],
    [181, 520], [176, 610], [178, 700], [239, 520], [244, 610], [242, 700], [210, 166],
  ],
};

const armVessel = 'M206 182C176 180 138 192 118 234L102 332L94 432';
const armVesselRight = 'M214 182C244 180 282 192 302 234L318 332L326 432';
const legVessel = 'M212 466C198 480 184 500 179 540L176 600L180 740';
const legVesselRight = 'M212 466C226 480 240 500 241 540L244 600L240 740';

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
    <div className="w-full max-w-[470px]">
      <div className="diagram-paper">
        <div className="anatomy-figure">
          <svg
            viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
            className="nano-svg block h-auto w-full"
            role="group"
            aria-label="Front view of a human body with the brain, lungs, heart, liver and spleen, kidneys and bladder, and the main blood vessels marked. Small dots show nanobots spread through the body."
          >
            <defs>
              <path
                id="nano-body-half"
                d="M210 128L194 128L193 158C176 164 150 168 132 178C112 188 104 206 102 230L92 330L80 432C78 448 80 462 90 466C100 470 106 460 106 446L112 340L128 252C136 300 146 350 146 392C146 414 140 432 140 452L152 600L162 742C160 760 166 774 182 776L196 776C200 770 200 758 198 744L198 604L206 476C207 470 209 468 210 468"
              />
            </defs>

            {/* Body outline: one half, mirrored. */}
            <use href="#nano-body-half" className="nano-skin" />
            <use href="#nano-body-half" className="nano-skin" transform="matrix(-1 0 0 1 420 0)" />

            {/* Bloodstream sits under everything else. */}
            <g {...region('blood')}>
              <path className="nano-hit" d={armVessel} />
              <path className="nano-hit" d={armVesselRight} />
              <path className="nano-hit" d={legVessel} />
              <path className="nano-hit" d={legVesselRight} />
              <g className="nano-vessel">
                <path d="M210 140L212 470" />
                <path d="M204 182L202 128" />
                <path d="M216 182L218 128" />
                <path d={armVessel} />
                <path d={armVesselRight} />
                <path d={legVessel} />
                <path d={legVesselRight} />
              </g>
            </g>

            <ellipse className="nano-skin" cx="210" cy="80" rx="44" ry="54" />

            <g {...region('brain')}>
              <ellipse className="nano-hit" cx="210" cy="68" rx="40" ry="33" />
              <path
                className="nano-organ nano-organ--brain"
                d="M178 76C172 56 186 40 206 40C226 36 246 48 244 66C246 82 236 94 220 94C206 98 188 94 178 76Z"
              />
              <g className="nano-detail">
                <path d="M210 42L210 94" />
                <path d="M186 60C194 54 200 62 206 56" />
                <path d="M214 52C222 46 228 54 236 52" />
                <path d="M188 80C196 74 202 82 206 76" />
                <path d="M216 72C224 66 230 74 238 70" />
              </g>
            </g>

            <g {...region('lungs')}>
              <path className="nano-detail nano-detail--airway" d="M210 136L210 196M210 196C204 204 196 208 186 212M210 196C216 204 224 208 234 212" />
              <path
                className="nano-organ nano-organ--lung"
                d="M196 194C178 186 160 200 154 228C148 258 148 298 152 324C168 332 186 330 200 320C202 280 202 230 196 194Z"
              />
              <path
                className="nano-organ nano-organ--lung"
                d="M224 194C242 186 260 200 266 228C272 258 272 298 268 324C254 332 240 330 230 324C234 304 240 292 236 278C230 262 222 246 224 194Z"
              />
              <g className="nano-detail">
                <path d="M190 212C182 232 176 256 174 282M182 240C172 250 166 262 164 276M184 266C188 282 188 296 184 310" />
                <path d="M230 212C238 232 246 256 250 282M240 240C250 250 256 262 258 276" />
              </g>
            </g>

            <g {...region('heart')}>
              <path
                className="nano-organ nano-organ--heart"
                d="M216 268C208 258 192 262 194 278C196 294 212 306 228 318C240 306 254 292 254 278C254 262 238 258 230 268C226 262 220 262 216 268Z"
              />
            </g>

            <g {...region('liver')}>
              <path
                className="nano-organ nano-organ--liver"
                d="M148 340C176 330 226 330 248 340C244 354 222 366 196 372C174 378 154 372 150 362C148 354 148 346 148 340Z"
              />
              <ellipse className="nano-organ nano-organ--spleen" cx="262" cy="354" rx="9" ry="16" transform="rotate(-20 262 354)" />
            </g>

            <g {...region('kidneys')}>
              <rect className="nano-hit" x="160" y="386" width="100" height="88" rx="10" />
              <g className="nano-detail">
                <path d="M188 422C190 438 198 452 204 458" />
                <path d="M232 422C230 438 222 452 216 458" />
              </g>
              <path
                className="nano-organ nano-organ--kidney"
                d="M184 390C172 386 164 398 166 412C168 426 178 432 188 426C182 418 182 404 188 398C190 394 188 390 184 390Z"
              />
              <path
                className="nano-organ nano-organ--kidney"
                d="M236 390C248 386 256 398 254 412C252 426 242 432 232 426C238 418 238 404 232 398C230 394 232 390 236 390Z"
              />
              <ellipse className="nano-organ nano-organ--bladder" cx="210" cy="464" rx="14" ry="10" />
            </g>

            {/* Nanobots, drawn far larger than life. */}
            <g aria-hidden="true">
              {order.flatMap((id) =>
                nanobots[id].map(([cx, cy], index) => (
                  <circle
                    key={`${id}-${index}`}
                    className={`nano-dot${selected === id ? ' is-active' : ''}`}
                    cx={cx}
                    cy={cy}
                    r="3.4"
                    style={{ animationDelay: `${(index % 4) * 0.22}s` }}
                  />
                )),
              )}
            </g>

            <g className="nano-leaders" aria-hidden="true">
              {order.map((id) => (
                <g key={id} className={selected === id ? 'is-active' : ''}>
                  <path d={callouts[id].leader} />
                  <circle cx={callouts[id].dot[0]} cy={callouts[id].dot[1]} r="4" />
                </g>
              ))}
            </g>
          </svg>

          {order.map((id) => {
            const c = callouts[id];
            return (
              <div
                key={id}
                aria-hidden="true"
                className={`diagram-callout nano-callout${selected === id ? ' is-active' : ''}`}
                style={{
                  top: pctY(c.top),
                  ...(c.side === 'right' ? { left: pctX(c.edge) } : { right: pctRight(c.edge) }),
                }}
              >
                <strong>{organs[id].short}</strong>
                <span> · {calloutEffects[id]}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[.65rem] text-[#5b7189]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#2a7f9e]" /> Nanobot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#2563a8]" /> Malfunctioning in the area you picked
        </span>
        <span>Drawn for this page. Simplified; nanobots shown far larger than life.</span>
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
              <div className="pointer-events-none absolute left-5 top-5 text-xs text-[#6f86a0]">Whole body / front view</div>
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
                  <p className="mt-2 text-sm text-[#5b7189]">Stop {Number(current.number)} of {total} · {current.subtitle}</p>
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
