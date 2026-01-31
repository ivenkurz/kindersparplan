/**
 * IRR (Internal Rate of Return) – numerische Lösung für NPV=0
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

  // Bisection: NPV > 0 bei niedrigem r, NPV < 0 bei hohem r
  let rLow = -0.99;
  let rHigh = 2;
  const tol = 1e-9;
  const maxIter = 100;

  for (let i = 0; i < maxIter; i++) {
    const rMid = (rLow + rHigh) / 2;
    const val = npv(rMid);
    if (Math.abs(val) < tol) return rMid;
    if (val > 0) rLow = rMid;
    else rHigh = rMid;
  }
  return (rLow + rHigh) / 2;
}
