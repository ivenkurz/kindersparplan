/**
 * IRR (Internal Rate of Return) – Newton-Methode für NPV=0
 * Cash flows: -einmalig (t=0), -monatlich (t=1..N-1), +endwert (t=N)
 */
export function calculateIRR(
  einmalig: number,
  monatlich: number,
  laufzeitJahre: number,
  endwert: number
): number {
  const nMonths = laufzeitJahre * 12;
  if (nMonths <= 0 || einmalig + monatlich * nMonths <= 0) return 0;

  function npv(annualRate: number): number {
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
    let pv = -einmalig;
    for (let m = 1; m <= nMonths; m++) {
      pv -= monatlich / Math.pow(1 + monthlyRate, m);
    }
    pv += endwert / Math.pow(1 + monthlyRate, nMonths);
    return pv;
  }

  function npvDerivative(annualRate: number): number {
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
    const dr_dmonthly = (1 / 12) * Math.pow(1 + annualRate, -11 / 12);
    let sum = 0;
    for (let m = 1; m <= nMonths; m++) {
      sum += (monatlich * m) / Math.pow(1 + monthlyRate, m + 1);
    }
    sum -= (endwert * nMonths) / Math.pow(1 + monthlyRate, nMonths + 1);
    return sum * dr_dmonthly;
  }

  // Newton-Raphson
  let r = 0.05;
  const tol = 1e-9;
  const maxIter = 50;
  for (let i = 0; i < maxIter; i++) {
    const val = npv(r);
    if (Math.abs(val) < tol) return r;
    const deriv = npvDerivative(r);
    if (Math.abs(deriv) < 1e-12) break;
    r = r - val / deriv;
    if (r < -0.99) r = -0.99;
    if (r > 2) r = 2;
  }
  return r;
}
