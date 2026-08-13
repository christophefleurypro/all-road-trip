/* ------------------------------------------------------------------
   Calculs et formatage FR partagés par le listing et la page voyage.
   Fonctions pures, sans DOM.
   ------------------------------------------------------------------ */

// "2 h 29" → 149 (minutes)
export function parseTemps(t) {
  const m = String(t || "").match(/(\d+)\s*h\s*(\d+)?/);
  return m ? parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0) : 0;
}

// "+836 m / −640 m" → 836
export function dplus(denivele) {
  const m = String(denivele || "").match(/\+\s*([\d\s]+)/);
  return m ? parseInt(m[1].replace(/\s/g, ""), 10) : 0;
}

// 149 → "2 h 29"
export function fmtTemps(min) {
  return Math.floor(min / 60) + " h " + String(min % 60).padStart(2, "0");
}

// 282.09999 → "282,1"  ·  33 → "33"
export function fmtNombre(n) {
  return String(Math.round(n * 10) / 10).replace(".", ",");
}

// [étapes] → [{ num, etapes, km, min, dplus }] dans l'ordre du parcours
export function grouperParJours(etapes) {
  const jours = [];
  (etapes || []).forEach(e => {
    let j = jours.find(j => j.num === e.jour);
    if (!j) { j = { num: e.jour, etapes: [] }; jours.push(j); }
    j.etapes.push(e);
  });
  jours.forEach(j => {
    j.km = j.etapes.reduce((s, e) => s + e.km, 0);
    j.min = j.etapes.reduce((s, e) => s + parseTemps(e.temps), 0);
    j.dplus = j.etapes.reduce((s, e) => s + dplus(e.denivele), 0);
  });
  return jours;
}

// Totaux d'un road trip
export function totaux(rt) {
  return {
    jours: grouperParJours(rt.etapes).length,
    etapes: (rt.etapes || []).length,
    km: (rt.etapes || []).reduce((s, e) => s + e.km, 0),
    min: (rt.etapes || []).reduce((s, e) => s + parseTemps(e.temps), 0),
    dplus: (rt.etapes || []).reduce((s, e) => s + dplus(e.denivele), 0)
  };
}

// "2026-08-13" → Date locale à midi (évite tout décalage de fuseau)
export function toDate(iso) {
  const p = String(iso || "").split("-");
  return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0);
}

// { debut, fin, nbJours } — la fin découle de dateDebut + nombre de jours
export function periode(rt) {
  const nbJours = grouperParJours(rt.etapes).length || 1;
  const debut = toDate(rt.dateDebut);
  const fin = toDate(rt.dateDebut);
  fin.setDate(fin.getDate() + nbJours - 1);
  return { debut, fin, nbJours };
}

// "13 – 18 août 2026" · "30 août – 2 septembre 2026" · "28 déc. 2026 – 3 janv. 2027"
export function fmtPeriode(debut, fin) {
  const complet = { day: "numeric", month: "long", year: "numeric" };
  if (debut.getTime() === fin.getTime()) {
    return debut.toLocaleDateString("fr-FR", complet);
  }
  const memeAnnee = debut.getFullYear() === fin.getFullYear();
  const memeMois = memeAnnee && debut.getMonth() === fin.getMonth();
  const optsDebut = memeMois ? { day: "numeric" }
    : memeAnnee ? { day: "numeric", month: "long" }
      : complet;
  return debut.toLocaleDateString("fr-FR", optsDebut) + " – " +
    fin.toLocaleDateString("fr-FR", complet);
}

export function aujourdhui() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// Les captures de carte d'une étape.
// Convention : img/<id>/step-<n>.png (n = rang de l'étape, à partir de 1).
// `carte` sur l'étape remplace la convention ; `cartes: false` sur le voyage
// ou `carte: false` sur l'étape la désactivent.
export function cartesEtape(e, rt, rang) {
  if (e.carte === false || rt.cartes === false) return [];
  if (e.carte) return (Array.isArray(e.carte) ? e.carte : [e.carte]).filter(Boolean);
  return [import.meta.env.BASE_URL + "img/" + rt.id + "/step-" + (rang + 1) + ".png"];
}
