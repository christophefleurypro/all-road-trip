/* ------------------------------------------------------------------
   Chargement des fichiers de données, un par road trip.

   data/roadtrips.js liste les identifiants ; chaque data/<id>.js
   s'ajoute lui-même à window.ROADTRIPS. On injecte les <script>
   nécessaires puis on rend la main.

   Injection de <script> plutôt que fetch() : ça fonctionne aussi en
   file:// (double-clic sur index.html), là où fetch est bloqué.

   index.html charge tous les voyages (il les liste tous) ;
   roadtrip.html ne charge que celui demandé dans l'URL.
   ------------------------------------------------------------------ */

window.RTLoader = (function () {

  // charger(["id-a", "id-b"], function (voyages, manquants) { ... })
  //   voyages   : window.ROADTRIPS, tous les voyages enregistrés
  //   manquants : identifiants demandés qui ne se sont pas enregistrés
  //               (fichier absent, erreur de syntaxe, ou `id` divergent)
  function charger(ids, quandPret) {
    window.ROADTRIPS = window.ROADTRIPS || [];

    // dédoublonne et ignore les entrées vides du manifeste
    const demandes = (ids || []).filter(
      (id, i, liste) => typeof id === "string" && id && liste.indexOf(id) === i
    );

    if (!demandes.length) {
      quandPret(window.ROADTRIPS, []);
      return;
    }

    let restants = demandes.length;
    let rendu = false;

    // filet de sécurité : si un événement de chargement ne remontait pas,
    // on rend quand même la main plutôt que de laisser la page blanche
    const secours = setTimeout(finir, 8000);

    demandes.forEach(function (id) {
      const script = document.createElement("script");
      script.src = "data/" + id + ".js";
      // onload comme onerror : dans les deux cas ce fichier est réglé
      script.onload = script.onerror = termine;
      document.head.appendChild(script);
    });

    function termine() {
      if (--restants <= 0) finir();
    }

    function finir() {
      if (rendu) return;
      rendu = true;
      clearTimeout(secours);

      const voyages = window.ROADTRIPS;
      const manquants = demandes.filter(function (id) {
        return !voyages.some(function (v) { return v && v.id === id; });
      });
      quandPret(voyages, manquants);
    }
  }

  return { charger: charger };
})();
