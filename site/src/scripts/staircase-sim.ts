/**
 * Staircase simulator for the Science page.
 * Runs a 2-down-1-up staircase against a SIMULATED player with a preset, hidden
 * threshold, then plots the trial history and compares the estimate to the truth.
 * Nothing about the real user is measured, stored, or sent anywhere.
 */

const GUESS_RATE = 0.25;
const LAPSE_RATE = 0.02;
const SLOPE_SIGMA = 0.06; // psychometric slope in logMAR units
const START_LEVEL = 0.9;
const STEP = 0.1;
const MAX_TRIALS = 30;
const MAX_REVERSALS = 8;
const ESTIMATE_REVERSALS = 6;

interface Trial {
  level: number;
  correct: boolean;
  reversal: boolean;
}

interface RunResult {
  trials: Trial[];
  trueThreshold: number;
  estimate: number | null;
}

function pCorrect(level: number, threshold: number): number {
  // Probability rises from guess rate toward (1 - lapse) as shapes get bigger than threshold.
  const f = 1 / (1 + Math.exp(-(level - threshold) / SLOPE_SIGMA));
  return GUESS_RATE + (1 - GUESS_RATE - LAPSE_RATE) * f;
}

function runStaircase(): RunResult {
  const trueThreshold = 0.25 + Math.random() * 0.3;
  const trials: Trial[] = [];
  let level = START_LEVEL;
  let consecutiveCorrect = 0;
  let lastDirection: 'down' | 'up' | null = null;
  const reversalLevels: number[] = [];

  while (trials.length < MAX_TRIALS && reversalLevels.length < MAX_REVERSALS) {
    const correct = Math.random() < pCorrect(level, trueThreshold);
    let direction: 'down' | 'up' | null = null;

    if (correct) {
      consecutiveCorrect += 1;
      if (consecutiveCorrect === 2) {
        direction = 'down';
        consecutiveCorrect = 0;
      }
    } else {
      direction = 'up';
      consecutiveCorrect = 0;
    }

    let reversal = false;
    if (direction && lastDirection && direction !== lastDirection) {
      reversal = true;
      reversalLevels.push(level);
    }
    if (direction) lastDirection = direction;

    trials.push({ level, correct, reversal });

    if (direction === 'down') level = Math.max(0, level - STEP);
    if (direction === 'up') level = Math.min(1.0, level + STEP);
  }

  const usable = reversalLevels.slice(-ESTIMATE_REVERSALS);
  const estimate = usable.length >= 3 ? usable.reduce((a, b) => a + b, 0) / usable.length : null;

  return { trials, trueThreshold, estimate };
}

const W = 640;
const H = 300;
const PAD = { top: 16, right: 16, bottom: 34, left: 46 };

function x(i: number, n: number): number {
  return PAD.left + (i / Math.max(1, n - 1)) * (W - PAD.left - PAD.right);
}

function y(level: number): number {
  // logMAR 1.0 (big shapes) at top, 0.0 at bottom.
  return PAD.top + (1 - level) * (H - PAD.top - PAD.bottom);
}

function render(svg: SVGSVGElement, caption: HTMLElement, result: RunResult) {
  const { trials, trueThreshold, estimate } = result;
  const n = trials.length;
  const parts: string[] = [];

  // Axes
  parts.push(
    `<line x1="${PAD.left}" y1="${y(0)}" x2="${W - PAD.right}" y2="${y(0)}" stroke="var(--color-line)" stroke-width="1.5"/>`,
    `<line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${y(0)}" stroke="var(--color-line)" stroke-width="1.5"/>`
  );
  for (const tick of [0, 0.2, 0.4, 0.6, 0.8, 1.0]) {
    parts.push(
      `<text x="${PAD.left - 8}" y="${y(tick) + 4}" text-anchor="end" font-size="11" fill="var(--color-ink)" opacity="0.55">${tick.toFixed(1)}</text>`,
      `<line x1="${PAD.left - 4}" y1="${y(tick)}" x2="${PAD.left}" y2="${y(tick)}" stroke="var(--color-line)"/>`
    );
  }
  parts.push(
    `<text x="${(PAD.left + W - PAD.right) / 2}" y="${H - 6}" text-anchor="middle" font-size="12" fill="var(--color-ink)" opacity="0.6">trial</text>`,
    `<text x="14" y="${(PAD.top + y(0)) / 2}" text-anchor="middle" font-size="12" fill="var(--color-ink)" opacity="0.6" transform="rotate(-90 14 ${(PAD.top + y(0)) / 2})">size (logMAR)</text>`
  );

  // True threshold line
  parts.push(
    `<line x1="${PAD.left}" y1="${y(trueThreshold)}" x2="${W - PAD.right}" y2="${y(trueThreshold)}" stroke="var(--color-sun)" stroke-width="2" stroke-dasharray="6 4"/>`
  );

  // Estimate line
  if (estimate !== null) {
    parts.push(
      `<line x1="${PAD.left}" y1="${y(estimate)}" x2="${W - PAD.right}" y2="${y(estimate)}" stroke="var(--color-teal)" stroke-width="2" stroke-dasharray="2 4"/>`
    );
  }

  // Path connecting trials
  const points = trials.map((t, i) => `${x(i, n)},${y(t.level)}`).join(' ');
  parts.push(`<polyline points="${points}" fill="none" stroke="var(--color-ink)" stroke-width="1.5" opacity="0.35"/>`);

  // Trial dots
  trials.forEach((t, i) => {
    const cx = x(i, n);
    const cy = y(t.level);
    if (t.reversal) {
      parts.push(`<circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="var(--color-sun)" stroke-width="2.5"/>`);
    }
    if (t.correct) {
      parts.push(`<circle cx="${cx}" cy="${cy}" r="5" fill="var(--color-teal)"/>`);
    } else {
      parts.push(`<circle cx="${cx}" cy="${cy}" r="5" fill="var(--color-cream)" stroke="var(--color-coral)" stroke-width="2.5"/>`);
    }
  });

  svg.innerHTML = parts.join('');

  const err = estimate !== null ? Math.abs(estimate - trueThreshold) : null;
  const summary =
    estimate !== null
      ? `This simulated player's true threshold was logMAR ${trueThreshold.toFixed(2)} (gold dashed line). ` +
        `After ${n} trials, averaging the ringed reversals put the estimate at ${estimate.toFixed(2)} ` +
        `(teal dashed line): off by ${err!.toFixed(2)}, which is ${err! < 0.1 ? 'less than one chart line' : 'about ' + (err! / 0.1).toFixed(1) + ' chart lines'}.`
      : `This run ended after ${n} trials without enough reversals for a stable estimate. That happens; run it again.`;

  caption.textContent = summary;
  svg.setAttribute(
    'aria-label',
    `Staircase chart of a simulated player. ${summary} Filled teal dots are correct answers, open coral dots are misses, and gold rings mark reversals.`
  );
}

export function initStaircaseSim() {
  const svg = document.getElementById('sim-chart') as unknown as SVGSVGElement;
  const caption = document.getElementById('sim-caption');
  const button = document.getElementById('sim-run');
  if (!svg || !caption || !button) return;

  const run = () => render(svg, caption as HTMLElement, runStaircase());
  button.addEventListener('click', run);
  run();
}
