/**
 * Sight Scout website demo (SPEC.md §6).
 *
 * Hard rules this file must never violate:
 *  - No network requests, no cookies, no localStorage/sessionStorage. All state is in-memory
 *    and vanishes when the tab closes.
 *  - No score, acuity value, pass/fail, percentage, or anything that characterizes vision.
 *  - Fixed, generous sizes only; this never runs an adaptive staircase toward a threshold.
 *  - Advancing between rounds/screens only ever happens on a user click or key press, never a
 *    timer.
 */

type Direction = 'up' | 'right' | 'down' | 'left';

const DIRECTIONS: Direction[] = ['up', 'right', 'down', 'left'];
const DIRECTION_ANGLE: Record<Direction, number> = { up: 0, right: 90, down: 180, left: 270 };

// Fixed round sizes (px) when no calibration has run: generous, far from anyone's threshold.
const FALLBACK_SIZES_PX = [88, 70, 56, 56, 44];
// Roughly-equivalent logMAR values at an assumed 60cm distance, used only if calibration ran.
const ROUND_LOGMAR = [1.0, 0.9, 0.8, 0.8, 0.7];
const ASSUMED_DISTANCE_MM = 600;
const MIN_RING_PX = 40;
const MAX_RING_PX = 140;

const GAP_ANGLE_DEG = 34; // generous, clearly visible gap; this is a demo, not a calibrated optotype
const STROKE_FRACTION = 1 / 5;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function sizeForRound(index: number, mmPerPx: number | null): number {
  if (!mmPerPx) return FALLBACK_SIZES_PX[index];
  const logMar = ROUND_LOGMAR[index];
  const marArcmin = Math.pow(10, logMar);
  const shapeArcmin = marArcmin * 5; // whole optotype spans 5x the critical-detail MAR
  const thetaRad = ((shapeArcmin / 60) * Math.PI) / 180;
  const heightMm = ASSUMED_DISTANCE_MM * thetaRad;
  const px = heightMm / mmPerPx;
  return Math.min(MAX_RING_PX, Math.max(MIN_RING_PX, Math.round(px)));
}

function pickDirection(history: Direction[]): Direction {
  const lastTwo = history.slice(-2);
  const wouldRepeatThrice = lastTwo.length === 2 && lastTwo[0] === lastTwo[1];
  let choice: Direction;
  do {
    choice = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  } while (wouldRepeatThrice && choice === lastTwo[1]);
  return choice;
}

function renderRing(svg: SVGSVGElement, direction: Direction, sizePx: number) {
  const strokeWidth = sizePx * STROKE_FRACTION;
  const r = sizePx / 2 - strokeWidth / 2;
  const cx = sizePx / 2;
  const cy = sizePx / 2;
  const gapCenter = DIRECTION_ANGLE[direction];
  const half = GAP_ANGLE_DEG / 2;
  const d = describeArc(cx, cy, r, gapCenter + half, gapCenter + 360 - half);

  svg.setAttribute('width', String(sizePx));
  svg.setAttribute('height', String(sizePx));
  svg.setAttribute('viewBox', `0 0 ${sizePx} ${sizePx}`);

  const path = svg.querySelector('path');
  if (path) {
    path.setAttribute('d', d);
    path.setAttribute('stroke-width', String(strokeWidth));
  }
}

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

export function initDemo() {
  const screens = {
    intro: $('screen-intro'),
    calibration: $('screen-calibration'),
    activity: $('screen-activity'),
    aha: $('screen-aha'),
    end: $('screen-end'),
  };

  function showScreen(name: keyof typeof screens) {
    for (const key of Object.keys(screens) as (keyof typeof screens)[]) {
      screens[key].hidden = key !== name;
    }
    screens[name].querySelector<HTMLElement>('[data-autofocus]')?.focus();
  }

  let mmPerPx: number | null = null;
  const history: Direction[] = [];
  let currentDirection: Direction = 'up';
  let currentRound = 0;
  let answered = false;

  const ringSvg = $('ring-svg') as unknown as SVGSVGElement;
  const roundIndicator = $('round-indicator');
  const feedbackEl = $('feedback-message');
  const continueBtn = $('continue-btn');
  const arrowButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-direction]'));

  function startRound() {
    answered = false;
    feedbackEl.textContent = '';
    continueBtn.hidden = true;
    arrowButtons.forEach((b) => {
      b.disabled = false;
      b.setAttribute('aria-pressed', 'false');
    });

    currentDirection = pickDirection(history);
    history.push(currentDirection);

    const sizePx = sizeForRound(currentRound, mmPerPx);
    renderRing(ringSvg, currentDirection, sizePx);

    roundIndicator.textContent = `Ring ${currentRound + 1} of 5`;
  }

  function handleAnswer(direction: Direction) {
    if (answered) return;
    answered = true;
    arrowButtons.forEach((b) => (b.disabled = true));

    const correct = direction === currentDirection;
    const chosenBtn = arrowButtons.find((b) => b.dataset.direction === direction);
    chosenBtn?.setAttribute('aria-pressed', 'true');

    if (correct) {
      feedbackEl.textContent = 'Nice scouting! ⭐';
    } else {
      feedbackEl.textContent = `The gap was ${currentDirection} that time. Onward!`;
    }

    continueBtn.hidden = false;
    continueBtn.textContent = currentRound === 4 ? 'See the wrap-up' : 'Next ring';
    continueBtn.focus();
  }

  function advance() {
    if (currentRound === 2) {
      // After round 3 (index 2), show the "aha" interstitial before round 4.
      currentRound += 1;
      showScreen('aha');
      return;
    }
    if (currentRound === 4) {
      showScreen('end');
      return;
    }
    currentRound += 1;
    startRound();
  }

  arrowButtons.forEach((btn) => {
    btn.addEventListener('click', () => handleAnswer(btn.dataset.direction as Direction));
  });

  continueBtn.addEventListener('click', advance);

  document.addEventListener('keydown', (event) => {
    if (screens.activity.hidden) return;
    const map: Record<string, Direction> = {
      ArrowUp: 'up',
      ArrowRight: 'right',
      ArrowDown: 'down',
      ArrowLeft: 'left',
    };
    const direction = map[event.key];
    if (direction) {
      event.preventDefault();
      if (!answered) handleAnswer(direction);
    } else if (event.key === 'Enter' && !continueBtn.hidden) {
      advance();
    }
  });

  // Intro gate
  $('demo-start-btn').addEventListener('click', () => {
    showScreen('calibration');
  });

  // Calibration (optional; purely educational, never stored, only sizes the demo shapes)
  const calSlider = $('cal-slider') as HTMLInputElement;
  const calCard = $('cal-card');
  const calReadout = $('cal-readout');
  const CARD_WIDTH_MM = 85.6;

  function updateCalibration() {
    const widthPx = Number(calSlider.value);
    calCard.style.width = `${widthPx}px`;
    const pxPerCm = widthPx / (CARD_WIDTH_MM / 10);
    calReadout.textContent = `1 cm on your screen ≈ ${pxPerCm.toFixed(0)} px`;
  }
  calSlider.addEventListener('input', updateCalibration);
  updateCalibration();

  $('cal-confirm-btn').addEventListener('click', () => {
    const widthPx = Number(calSlider.value);
    mmPerPx = CARD_WIDTH_MM / widthPx;
    showScreen('activity');
    startRound();
  });

  $('cal-skip-btn').addEventListener('click', () => {
    mmPerPx = null;
    showScreen('activity');
    startRound();
  });

  // Aha interstitial → continues into round 4
  $('aha-continue-btn').addEventListener('click', () => {
    showScreen('activity');
    startRound();
  });

  // End screen → play again resets everything in memory
  $('play-again-btn').addEventListener('click', () => {
    history.length = 0;
    currentRound = 0;
    mmPerPx = null;
    calSlider.value = calSlider.defaultValue;
    updateCalibration();
    showScreen('calibration');
  });
}
