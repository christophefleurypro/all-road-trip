/* ------------------------------------------------------------------
   Helpers partagés par index.html et roadtrip.html.
   Calculs (temps, dénivelé, regroupement par jour) et formatage FR.
   ------------------------------------------------------------------ */

window.RT = (function () {

  /* ---- Parsing des données ---- */

  // "2 h 29" → 149 (minutes)
  function parseTemps(t) {
    const m = String(t || "").match(/(\d+)\s*h\s*(\d+)?/);
    return m ? parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0) : 0;
  }

  // "+836 m / −640 m" → 836
  function dplus(denivele) {
    const m = String(denivele || "").match(/\+\s*([\d\s]+)/);
    return m ? parseInt(m[1].replace(/\s/g, ""), 10) : 0;
  }

  /* ---- Formatage ---- */

  // 149 → "2 h 29"
  function fmtTemps(min) {
    return Math.floor(min / 60) + " h " + String(min % 60).padStart(2, "0");
  }

  // 282.09999 → "282,1"  ·  33 → "33"
  function fmtNombre(n) {
    return String(Math.round(n * 10) / 10).replace(".", ",");
  }

  /* ---- Regroupement ---- */

  // [étapes] → [{ num, etapes, km, min, dplus }] dans l'ordre du parcours
  function grouperParJours(etapes) {
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
  function totaux(rt) {
    const jours = grouperParJours(rt.etapes);
    return {
      jours: jours.length,
      etapes: (rt.etapes || []).length,
      km: (rt.etapes || []).reduce((s, e) => s + e.km, 0),
      min: (rt.etapes || []).reduce((s, e) => s + parseTemps(e.temps), 0),
      dplus: (rt.etapes || []).reduce((s, e) => s + dplus(e.denivele), 0)
    };
  }

  /* ---- Dates ---- */

  // "2026-08-13" → Date locale à midi (évite tout décalage de fuseau)
  function toDate(iso) {
    const p = String(iso || "").split("-");
    return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0);
  }

  // { debut, fin, nbJours } — la fin découle de dateDebut + nombre de jours
  function periode(rt) {
    const nbJours = grouperParJours(rt.etapes).length || 1;
    const debut = toDate(rt.dateDebut);
    const fin = toDate(rt.dateDebut);
    fin.setDate(fin.getDate() + nbJours - 1);
    return { debut: debut, fin: fin, nbJours: nbJours };
  }

  // "13 – 18 août 2026" · "30 août – 2 septembre 2026" · "28 déc. 2026 – 3 janv. 2027"
  function fmtPeriode(debut, fin) {
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

  function aujourdhui() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /* ---- DOM ---- */

  function champ(racine, nom) {
    return racine.querySelector('[data-field="' + nom + '"]');
  }

  function setTexte(racine, nom, valeur) {
    const el = champ(racine, nom);
    if (el) el.textContent = valeur;
    return el;
  }

  return {
    parseTemps: parseTemps,
    dplus: dplus,
    fmtTemps: fmtTemps,
    fmtNombre: fmtNombre,
    grouperParJours: grouperParJours,
    totaux: totaux,
    toDate: toDate,
    periode: periode,
    fmtPeriode: fmtPeriode,
    aujourdhui: aujourdhui,
    champ: champ,
    setTexte: setTexte
  };
})();
