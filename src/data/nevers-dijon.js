/* ------------------------------------------------------------------
   Nevers → Dijon par le Morvan
   Un road trip = un fichier. Référencé dans src/data/roadtrips.js.

   Champs :
     id          identifiant, doit être identique au nom du fichier
                 (c'est lui qui apparaît dans roadtrip.html?id=<id>)
     titre       titre affiché
     itineraire  nom des véloroutes empruntées (sous-titre)
     dateDebut   "AAAA-MM-JJ", jour 1 — la date de fin est calculée
                 automatiquement à partir du nombre de jours des étapes
     etapes[]    une entrée par tronçon ; `jour` regroupe les tronçons
                 d'une même journée
                   niveau   : "facile" | "moyen" | "difficile" (couleur du badge)
                   cyclable : 0 à 100, ou null si la donnée n'existe pas
                   carte    : capture de la carte, affichée dans la popup au clic
                              sur « Voir ». Un chemin, ou plusieurs :
                                carte: "img/nevers-decize.png"
                                carte: ["img/nevers-decize-1.png",
                                        "img/nevers-decize-2.png"]
                              Champ facultatif : sans lui, la popup affiche la
                              fiche sans carte.
     campings{}  indexé par numéro de jour, hébergements à l'arrivée
   ------------------------------------------------------------------ */

export default {

  id: "nevers-dijon",
  titre: "Nevers → Dijon par le Morvan",
  itineraire: "EuroVelo 6 · Tour de Bourgogne à vélo · GTMC gravel",
  dateDebut: "2026-08-13",

  etapes: [
    {
      jour: 1, debut: "Nevers", fin: "Decize", km: 33, temps: "2 h 29",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Quasi plat (min 175 m · max 199 m)",
      denivele: "+25 m / −10 m",
      revetement: "Rugueux 95 % · Lisse 5 %",
      cyclable: 95, cyclableDetail: "32 km en voie cyclable · 2 km en route partagée",
      url: "https://www.francevelotourisme.com/itineraire/entre-rhin-et-loire-a-velo-eurovelo-6/decize-nevers",
      note: "Sens inverse de la fiche France Vélo Tourisme (données Decize→Nevers inversées : +10/−25 à l'endroit). Site propre quasi intégral. Prudence vers Chevenon : revêtement soulevé par des racines."
    },
    {
      jour: 2, debut: "Decize", fin: "Cercy-la-Tour", km: 15, temps: "0 h 58",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Plat (min 189 m · max 199 m)",
      denivele: "+0 m / −0 m",
      revetement: "Rugueux 100 %",
      cyclable: 100, cyclableDetail: "15 km en voie cyclable (voie verte le long de l'Aron)",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/decize-cercy-la-tour",
      note: "Prudence dans la circulation pour rejoindre le centre de Decize. Variante possible vers La Machine (7 km depuis Champvert, ancienne voie ferrée)."
    },
    {
      jour: 2, debut: "Cercy-la-Tour", fin: "Saint-Honoré-les-Bains", km: 18.9, temps: "1 h 23",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Faux plat montant (133 m de montées sur 19 km)",
      denivele: "+133 m / −76 m",
      revetement: "Non précisé (Geovelo)",
      cyclable: 39, cyclableDetail: "39 % de voies cyclables (itinéraire « Équilibré »)",
      url: "https://geovelo.app/fr/route/?bike-type=own&c=3.760597%2C46.901242&e-bike=false&from=3.645748%2C46.869664&to=3.840683%2C46.905602&z=11.95",
      note: "Variantes Geovelo — Direct : 17,6 km / 1 h 18 · Sécurisé : 19,2 km / 1 h 24 · Touristique : 19,2 km / 1 h 24."
    },
    {
      jour: 3, debut: "Saint-Honoré-les-Bains", fin: "Anost", km: 37.3, temps: "3 h 05",
      difficulte: "Difficile", niveau: "difficile",
      pentes: "Montée principale km 9→17 (≈5-6 % moy., passages raides), 2ᵉ bosse km 25→31, point haut ≈661 m, final en descente",
      denivele: "+836 m / −640 m",
      revetement: "100 % route goudronnée",
      cyclable: 0, cyclableDetail: "0 % de pistes dédiées (Geovelo) · ≈30 % en voies cyclables partagées · le reste sur routes",
      url: "https://geovelo.app/fr/route/bG9jPTQ2LjkwNTYwMiwzLjg0MDY4MyZsb2M9NDcuMDc3NTA4LDQuMDk4OTQyI01FRElBTiNGYWxzZSNNRURJQU4jMTUjRmFsc2UjTm9uZSMyMDI2LTA4LTEzIDEyOjU5OjQzLjQ3OTAwMyNUUkFESVRJT05BTCMwIzAjUkVDT01NRU5ERUQjRmFsc2UjRmFsc2U=/?c=3.982945%2C46.989079&z=10.40",
      note: "Via Onlay (D 177). ≈22 m de D+ par km : étape la plus exigeante du parcours route."
    },
    {
      jour: 4, debut: "Anost", fin: "Montsauche-les-Settons", km: 54, temps: "5 h 00",
      difficulte: "Difficile (gravel/VTT)", niveau: "difficile",
      pentes: "Vallonné en continu (min 374 m · max 746 m) ; en sens inverse, le plus sportif est en début d'étape, puis montées roulantes et courtes descentes",
      denivele: "+996 m / −876 m",
      revetement: "Chemins et sentiers gravel/VTT (pas de % précis)",
      cyclable: null, cyclableDetail: "Non précisé (GTMC)",
      url: "https://www.la-gtmc.com/itineraire/grande-traversee-du-massif-central-gravel/montsauche-les-settons-anost",
      note: "Sens inverse du balisage GTMC : données de l'étape Montsauche→Anost inversées (+876/−996 à l'endroit). Vigilance après l'étang Pinsot. Belvédère d'Ouroux sur le lac de Pannecière, à 150 m de l'église."
    },
    {
      jour: 5, debut: "Montsauche-les-Settons", fin: "Saulieu", km: 34, temps: "2 h 30",
      difficulte: "Assez facile (gravel/VTT)", niveau: "moyen",
      pentes: "Dénivelé bien réparti, étape courte (min 457 m · max 670 m), seconde moitié plus roulante via l'ancienne voie du Tacot",
      denivele: "+297 m / −355 m",
      revetement: "Chemins, sentiers et ancienne voie ferrée, passerelles en bois (pas de % précis)",
      cyclable: null, cyclableDetail: "Non précisé (GTMC)",
      url: "https://www.la-gtmc.com/itineraire/grande-traversee-du-massif-central-gravel/saulieu-montsauche-les-settons",
      note: "Sens inverse du balisage GTMC : données de l'étape Saulieu→Montsauche inversées (+355/−297 à l'endroit). Passerelles en bois glissantes par temps humide. Passage aux lacs de Chamboux et des Settons."
    },
    {
      jour: 5, debut: "Saulieu", fin: "Pouilly-en-Auxois", km: 30.9, temps: "2 h 24",
      difficulte: "Modérée", niveau: "moyen",
      pentes: "Départ en descente (point haut ≈540 m), montée principale km 15→20 (≈+160 m, passages raides), longue descente puis final plat",
      denivele: "+434 m / −579 m",
      revetement: "98 % route · ≈2 % chemins",
      cyclable: 6, cyclableDetail: "6 % de pistes dédiées (Geovelo) · ≈71 % en voies cyclables partagées · le reste sur routes",
      url: "https://geovelo.app/fr/route/bG9jPTQ3LjI3NzUxOCw0LjIzMDY5MiZsb2M9NDcuMjYyMjQyLDQuNTU2MTk2I01FRElBTiNGYWxzZSNNRURJQU4jMTUjRmFsc2UjTm9uZSMyMDI2LTA4LTEzIDEzOjA2OjM5LjExOTMwMiNUUkFESVRJT05BTCMwIzAjUkVDT01NRU5ERUQjRmFsc2UjRmFsc2U=/?c=4.407398%2C47.322437&z=9.46",
      note: "Via Route de Thomirey (C 3). Profil globalement descendant (≈14 m de D+ par km)."
    },
    {
      jour: 6, debut: "Pouilly-en-Auxois", fin: "La Bussière-sur-Ouche", km: 25, temps: "1 h 40",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Doucement descendant le long du canal (min 309 m · max 433 m)",
      denivele: "+32 m / −115 m",
      revetement: "Rugueux 100 %",
      cyclable: 100, cyclableDetail: "25 km en voie cyclable (canal de Bourgogne, écluses et port de Vandenesse)",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/pouilly-en-auxois-la-bussiere-sur-ouche",
      note: "Détour conseillé vers Châteauneuf-en-Auxois (longue côte hors piste). Pas de gare sur la section — les plus proches : Venarey-les-Laumes, Velars, Dijon."
    },
    {
      jour: 6, debut: "La Bussière-sur-Ouche", fin: "Dijon", km: 34, temps: "2 h 13",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Plat à légèrement descendant (min 238 m · max 315 m)",
      denivele: "+0 m / −73 m",
      revetement: "Rugueux 92 % · Lisse 6 % · n.r. 2 %",
      cyclable: 95, cyclableDetail: "32 km en voie cyclable · 2 km en route partagée",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/la-bussiere-sur-ouche-dijon",
      note: "Canal de Bourgogne puis voie verte et pistes jusqu'au port de Dijon ; passage le long de l'A 38, arrivée par le lac Kir."
    }
  ],

  // Campings à l'arrivée de chaque journée (ou à proximité immédiate de l'itinéraire)
  campings: {
    1: [
      { nom: "Camping des Halles ★★★", detail: "Decize · bord de Loire, départ de l'EuroVelo 6",
        url: "https://www.camping-des-halles-decize.fr/" },
      { nom: "Camping de Nevers — Onlycamp", detail: "Nevers · au départ de l'étape, pour la veille",
        url: "https://www.nevers-tourisme.com/sit/camping-de-nevers-onlycamp" }
    ],
    2: [
      { nom: "Camping Les Bains ★★★", detail: "Saint-Honoré-les-Bains",
        url: "https://www.campinglesbains.com/" },
      { nom: "Camping municipal du Guet ★★", detail: "Saint-Honoré-les-Bains · 66 emplacements",
        url: "http://www.st-honore-les-bains.com/camping-municipal-du-guet/" }
    ],
    3: [
      { nom: "Camping du Pont de Bussy ★★★", detail: "Anost · municipal, 5 min du bourg",
        url: "https://www.destination-saone-et-loire.fr/fr/hotellerie-de-plein-air/camping-du-pont-de-bussy.html" }
    ],
    4: [
      { nom: "Camping Les Mésanges ★★★", detail: "Montsauche · 200 m de la plage du lac",
        url: "https://www.campinglesmesanges.fr/" },
      { nom: "Camping Plage du Midi ★★★", detail: "Les Settons · plage de sable, piscine",
        url: "https://settons-camping.fr/" },
      { nom: "Activital — Eco Base des Settons ★", detail: "Les Settons · Accueil Vélo, location VTT",
        url: "https://activital.net/hebergements-au-lac-des-settons/" }
    ],
    5: [
      { nom: "Camping Vert Auxois ★★★", detail: "Pouilly-en-Auxois · accès direct au canal",
        url: "https://camping-vert-auxois.fr/" },
      { nom: "Camping Lac de Panthier ★★★★", detail: "Vandenesse-en-Auxois · ~6 km, sur l'étape suivante",
        url: "https://www.lac-de-panthier.com/" }
    ],
    6: [
      { nom: "Camping du Lac Kir ★", detail: "Dijon · 300 m du lac, arrivée de l'étape",
        url: "https://www.camping-du-lac-dijon.com/" }
    ]
  }

};
