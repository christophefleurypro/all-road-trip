/* ------------------------------------------------------------------
   index.html — listing des road trips par date.

   Charge tous les fichiers listés dans data/roadtrips.js, puis répartit
   « À venir » (du plus proche au plus lointain) et « Déjà roulés » (du
   plus récent au plus ancien). Chaque carte pointe vers
   roadtrip.html?id=<id>.
   ------------------------------------------------------------------ */

(function () {
  const fichiers = window.ROADTRIPS_FICHIERS || [];
  const gabarit = nom => document.getElementById(nom).content.firstElementChild.cloneNode(true);

  if (!fichiers.length) {
    document.getElementById("vide").hidden = false;
    return;
  }

  RTLoader.charger(fichiers, function (voyages, manquants) {
    // ne garde que les voyages listés au manifeste, dans l'état où ils
    // se sont enregistrés
    const trips = voyages.filter(v => v && fichiers.indexOf(v.id) !== -1);

    if (manquants.length) {
      const av = document.getElementById("avertissement");
      av.textContent = manquants.length === 1
        ? "Le fichier data/" + manquants[0] + ".js n'a pas pu être chargé."
        : "Fichiers non chargés : " + manquants.map(id => "data/" + id + ".js").join(", ") + ".";
      av.hidden = false;
    }

    if (!trips.length) {
      document.getElementById("vide").hidden = false;
      return;
    }

    rendre(trips);
  });

  function rendre(trips) {

    /* ---- Répartition à venir / passés ---- */

    const today = RT.aujourdhui();
    const aVenir = [];
    const passes = [];

    trips.forEach(rt => {
      const entree = { rt: rt, periode: RT.periode(rt), totaux: RT.totaux(rt) };
      (entree.periode.fin < today ? passes : aVenir).push(entree);
    });

    aVenir.sort((a, b) => a.periode.debut - b.periode.debut);
    passes.sort((a, b) => b.periode.debut - a.periode.debut);

    remplir("section-a-venir", "liste-a-venir", aVenir, false);
    remplir("section-passes", "liste-passes", passes, true);

    /* ---- Totaux tous voyages confondus ---- */

    const totals = document.getElementById("totals");
    const cumul = trips.map(rt => RT.totaux(rt)).reduce((s, t) => ({
      jours: s.jours + t.jours,
      km: s.km + t.km,
      dplus: s.dplus + t.dplus
    }), { jours: 0, km: 0, dplus: 0 });

    RT.setTexte(totals, "voyages", trips.length);
    RT.setTexte(totals, "jours", cumul.jours);
    RT.setTexte(totals, "km", RT.fmtNombre(cumul.km));
    RT.setTexte(totals, "dplus", RT.fmtNombre(cumul.dplus));
    totals.hidden = false;
  }

  function remplir(idSection, idListe, entrees, passe) {
    if (!entrees.length) return;
    const liste = document.getElementById(idListe);
    entrees.forEach(e => liste.appendChild(carte(e, passe)));
    document.getElementById(idSection).hidden = false;
  }

  function carte(e, passe) {
    const el = gabarit("tpl-trip");
    const d = e.periode.debut;

    el.href = "roadtrip.html?id=" + encodeURIComponent(e.rt.id);
    if (passe) el.classList.add("trip--passe");

    RT.setTexte(el, "dateJour", d.getDate());
    RT.setTexte(el, "dateMois", d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""));
    RT.setTexte(el, "dateAnnee", d.getFullYear());

    RT.setTexte(el, "titre", e.rt.titre);
    RT.setTexte(el, "itineraire", e.rt.itineraire || "");

    RT.setTexte(el, "periode", RT.fmtPeriode(e.periode.debut, e.periode.fin));
    RT.setTexte(el, "jours", e.totaux.jours + " jour" + (e.totaux.jours > 1 ? "s" : ""));
    RT.setTexte(el, "km", RT.fmtNombre(e.totaux.km) + " km");
    RT.setTexte(el, "dplus", "+" + RT.fmtNombre(e.totaux.dplus) + " m");

    return el;
  }
})();
