/**
 * Visual-angle size calculator for the Science page.
 * Pure geometry for curiosity: converts a Snellen target + viewing distance + pixel
 * density into physical and pixel sizes. Measures nothing about the user, stores
 * nothing, sends nothing.
 */

const SNELLEN: Record<string, number> = {
  '20/20': 1,
  '20/25': 1.25,
  '20/32': 1.6,
  '20/40': 2,
  '20/50': 2.5,
  '20/63': 3.15,
  '20/80': 4,
  '20/100': 5,
  '20/200': 10,
};

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

export function initSizeCalculator() {
  const distance = $('calc-distance') as HTMLInputElement;
  const distanceOut = $('calc-distance-out');
  const snellen = $('calc-snellen') as HTMLSelectElement;
  const ppi = $('calc-ppi') as HTMLInputElement;
  const result = $('calc-result');

  function update() {
    const dMm = Number(distance.value) * 10; // slider is in cm
    const mar = SNELLEN[snellen.value] ?? 1;
    const shapeArcmin = mar * 5;
    const thetaRad = ((shapeArcmin / 60) * Math.PI) / 180;
    const hMm = dMm * 2 * Math.tan(thetaRad / 2);
    const gapMm = hMm / 5;
    const ppiVal = Math.min(1000, Math.max(50, Number(ppi.value) || 264));
    const mmPerPx = 25.4 / ppiVal;
    const hPx = hMm / mmPerPx;
    const gapPx = gapMm / mmPerPx;

    distanceOut.textContent = `${(dMm / 10).toFixed(0)} cm`;
    result.innerHTML =
      `At <strong>${(dMm / 10).toFixed(0)} cm</strong>, a <strong>${snellen.value}</strong>-sized shape is ` +
      `<strong>${hMm.toFixed(2)} mm</strong> tall (${hPx.toFixed(0)} px at ${ppiVal} ppi). ` +
      `Its critical gap is ${gapMm.toFixed(2)} mm, or ${gapPx.toFixed(1)} px` +
      (gapPx < 2 ? ', <strong>below the 2-pixel honesty limit for this screen and distance</strong>.' : '.');
  }

  distance.addEventListener('input', update);
  snellen.addEventListener('change', update);
  ppi.addEventListener('input', update);
  update();
}
