/* ------------------------------------------------------------------
   Dijon → Nevers par le vignoble et le Morvan
   Un road trip = un fichier. Référencé dans src/data/roadtrips.js.

   Données extraites des fiches France Vélo Tourisme fournies, sauf
   l'étape 7 (lien Geovelo), dont les chiffres sont estimés — voir sa note.

   Les captures de carte sont cherchées automatiquement dans
   img/dijon-nevers/step-<n>.png, n étant le numéro d'étape ci-dessous.
   ------------------------------------------------------------------ */

export default {

  id: "dijon-nevers",
  titre: "Dijon → Nevers par le vignoble et le Morvan",
  itineraire: "Tour de Bourgogne à vélo · Itinérance verte en Autunois-Morvan · EuroVelo 6",

  dateDebut: "2026-08-17",

  etapes: [
    {
      jour: 1, debut: "Dijon", fin: "Nuits-Saint-Georges", km: 25, temps: "1 h 33",
      difficulte: "J'ai l'habitude", niveau: "moyen",
      pentes: "Quasi plat, léger relief entre coteaux viticoles et plaine (min 237 m · max 305 m)",
      denivele: "+54 m / −52 m",
      revetement: "Lisse 1 % · Non renseigné 99 %",
      cyclable: 1, cyclableDetail: "0,27 km en voie cyclable · 24 km en route partagée · 0,79 km non renseigné · dont 12 km (46 %) en parcours provisoire",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/dijon-nuits-st-georges",
      note: "Parcours de la « Voie des Vignes » non balisé, itinéraire provisoire non officiel mais sans difficulté, sur petites routes à travers le vignoble. Attention à la sortie de Dijon via Chenôve : depuis le port de Dijon, rejoindre la rue de Chenôve (bandes cyclables), monter à droite la rue Salengro vers les Pressoirs des ducs de Bourgogne, puis trouver la petite rue Pierre Curie (GR) qui rejoint Marsannay entre les vignes. Le balisage est noté 1/5 par les cyclistes du site (note globale 3/5 sur 2 avis : sécurité 3/5, intérêt 5/5, services 3/5) : prévoir une trace GPS. Détours conseillés : château du Clos de Vougeot (visite conseillée), villages vignerons de Marsannay-la-Côte, Fixin et Vosne-Romanée. Gares sur le parcours : Dijon (465 m), Velars-sur-Ouche (275 m), Corgoloin (969 m), Nuits-Saint-Georges (2 km), Vougeot-Gilly-lès-Cîteaux (2 km). TER dans toutes les directions depuis Dijon avec transport des vélos gratuit ; TGV Paris > Dijon > Chalon avec vélo sur réservation (6 vélos par train). Marchés : Dijon mardi, vendredi et samedi sous les halles ; Marsannay-la-Côte jeudi et samedi matin ; Nuits-St-Georges vendredi matin."
    },
    {
      jour: 1, debut: "Nuits-Saint-Georges", fin: "Beaune", km: 24.4, temps: "1 h 35",
      difficulte: "J'ai l'habitude", niveau: "moyen",
      pentes: "Quasi plat, légèrement descendant (min 218 m · max 284 m)",
      denivele: "+104 m / −126 m",
      revetement: "Lisse 69 % · Non renseigné 31 %",
      cyclable: 0, cyclableDetail: "0 km en voie cyclable · 24 km en route partagée (100 %)",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/nuits-st-georges-beaune",
      note: "Étape 11/29 du Tour de Bourgogne à vélo, sur la « voie des vignes ». Parcours non balisé, itinéraire provisoire non officiel mais sans difficulté, sur petites routes entre coteaux viticoles et voie ferrée. Prudence pour l'accès direct à Beaune, actuellement non aménagé pour les cyclistes. Gares SNCF de Nuits-St-Georges, Corgoloin et Beaune (TER Paris > Dijon > Beaune > Chalon > Mâcon > Lyon, transport des vélos gratuit ; TGV Paris > Dijon > Chalon avec vélo sur réservation, 6 vélos par train). Marchés : Nuits-St-Georges le vendredi matin, Beaune le mercredi et le samedi matin. À voir : beffroi et église du XIIIe s. à Nuits-St-Georges, carrières de marbre de Comblanchien, centre historique et Hospices de Beaune."
    },
    {
      jour: 2, debut: "Beaune", fin: "Santenay", km: 23, temps: "1 h 31",
      difficulte: "J'ai l'habitude", niveau: "moyen",
      pentes: "Vallonné léger, quelques côtes dans les vignes (min 215 m · max 290 m)",
      denivele: "+148 m / −147 m",
      revetement: "Non précisé (le site indique 100 % « Non renseigné »)",
      cyclable: 0, cyclableDetail: "23 km en route partagée · 0 km en voie cyclable",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/beaune-santenay",
      note: "Parcours officiel fléché sur petites routes et chemins de vigne. Sortie de Beaune par le parc de la Bouzaise. Quelques côtes à travers les vignes, très peu de voitures, jolis points de vue (avis cyclistes). Détour possible par la voie verte Santenay - Nolay. À Santenay, suite proposée vers Chalon par la voie verte le long du chemin de halage du canal du Centre. Gares SNCF sur le parcours : Beaune, Meursault, Chagny, Santenay ; la gare de Santenay-les-Bains est à 176 m du tracé, celle de Beaune à 2 km. TER Paris - Dijon - Beaune - Chalon - Lyon (nombreux trains, vélo gratuit) ; TGV Paris - Dijon - Chalon avec vélo sur réservation (6 vélos par train). Marchés : Beaune mercredi et samedi matin, Meursault vendredi matin, Santenay jeudi matin en été."
    },
    {
      jour: 2, debut: "Santenay", fin: "Épinac", km: 25, temps: "1 h 40",
      difficulte: "J'ai l'habitude", niveau: "moyen",
      pentes: "Montée régulière à flanc de coteau depuis Santenay, puis une côte marquée après le bois de Châtillon (min 216 m · max 457 m)",
      denivele: "+251 m / −127 m",
      revetement: "Lisse 79 % · Rugueux 21 %",
      cyclable: 78, cyclableDetail: "20 km en voie cyclable (78 %) · 6 km en route partagée (22 %)",
      url: "https://www.francevelotourisme.com/itineraire/itinerance-verte-en-autunois-morvan/santenay-epinac",
      note: "Voie verte balisée et aménagée sur 13,5 km entre Santenay et Épertully (bois de Châtillon), revêtue sur l'emprise de l'ancienne voie ferrée jusqu'à Épinac, avec bornes kilométriques. Passages en balcon avec vues sur la vallée et le vignoble ; viaducs de Cormot et de Rochabec (200 m de long chacun), au-delà de Nolay. Après le bois de Châtillon, portion plus raide avant de retrouver la voie verte au ruisseau de la Farge. Détour conseillé depuis Nolay : le cirque et la cascade du bout du monde par la D111 E (route partagée), à 5 km en direction de Vauchignon. Gares SNCF de Santenay-les-Bains (854 m de l'étape, ligne Chalon - Autun), Cheilly-lès-Maranges (2 km) et Chagny (6 km) ; depuis Lyon ou Dijon, descendre à Chagny puis rejoindre Santenay par l'EV6 - Canal du Centre sur 5,4 km. À voir : Mont de Sène (\"les Trois Croix\", 521 m) près de Santenay, cité médiévale de Nolay, puits Hottinguer et musée de la Mine à Épinac."
    },
    {
      jour: 3, debut: "Épinac", fin: "Autun", km: 21, temps: "1 h 33",
      difficulte: "J'ai l'habitude", niveau: "moyen",
      pentes: "Descendant, aucune montée annoncée (min 289 m · max 335 m)",
      denivele: "+0 m / −43 m",
      revetement: "Rugueux 78 % · Lisse 22 %",
      cyclable: 95, cyclableDetail: "20 km en voie cyclable · 1 km en route partagée",
      url: "https://www.francevelotourisme.com/itineraire/itinerance-verte-en-autunois-morvan/epinac-autun",
      note: "Voie verte balisée et aménagée sur 13 km entre Épinac et Dracy-Saint-Loup, sur l'emprise de l'ancienne voie ferrée, avec bornes kilométriques. Prudence : revêtement rustique (chemin de terre agricole) à hauteur de La Vesvres, avec descentes et montées. Le long de la D681 avant Autun, passage sur herbe avec caniveaux (fossés) en travers du cheminement. Détour conseillé : liaison facile et courte de 0,8 km indiquée depuis la voie verte jusqu'au château Renaissance de Sully (réservation conseillée). À Épinac, puits Hottinguer et musée de la Mine derrière l'ancienne gare. Gare SNCF d'Autun (ligne Chalon - Autun), avec cars pour Étang-sur-Arroux, Le Creusot et Le Creusot-Montceau TGV. Le site annonce « Montées : 0 m » alors que le descriptif signale des montées vers La Vesvres : compter au moins +46 m."
    },
    {
      jour: 3, debut: "Autun", fin: "Château-Chinon", km: 28, temps: "1 h 58",
      difficulte: "Aventure", niveau: "difficile",
      pentes: "Montées abruptes et descentes vertigineuses dans les monts du Morvan (min 291 m · max 673 m)",
      denivele: "+428 m / −46 m",
      revetement: "Lisse 72 % · Rugueux 28 %",
      cyclable: 24, cyclableDetail: "7 km en voie cyclable · 22 km en route partagée",
      url: "https://www.francevelotourisme.com/itineraire/itinerance-verte-en-autunois-morvan/autun-chateau-chinon",
      note: "Étape 3/3 de l'Itinérance Verte en Autunois-Morvan. L'itinéraire officiel s'arrête au carrefour de la D978 avant Arleuf : la suite jusqu'à Château-Chinon n'est pas balisée, c'est une proposition de France Vélo Tourisme pour cyclistes aguerris (à Arleuf, emprunter tour à tour la C2 puis la C1, fort dénivelé mais très beaux points de vue). Sur la Voie du Tacot (ancienne emprise de voie ferrée), le revêtement est du ballast recouvert d'humus, peu roulant : pneus larges conseillés. Bon état de forme nécessaire. Gare SNCF d'Autun (ligne Chalon - Autun), avec cars vers Étang-sur-Arroux, Chalon, Le Creusot et Le Creusot-Montceau TGV. À l'arrivée, cars Mobigo Château-Chinon - Nevers (ligne LR 501) : vélo en soute à bagages, non prioritaire, demander au chauffeur. À voir : cathédrale St-Lazare, théâtre romain et Musée Rolin à Autun ; panorama et circuit François Mitterrand à Château-Chinon."
    },
    {
      jour: 4, debut: "Arleuf", fin: "Limanton", km: 34.5, temps: "2 h 33",
      difficulte: "J'ai l'habitude", niveau: "moyen",
      pentes: "Descente d'ensemble depuis le plateau d'Arleuf (653 m), bosse km 8→11 (≈+115 m à 5 %), longue descente km 11→18, puis vallonné doux jusqu'à l'Aron (min 210 m · max 677 m)",
      denivele: "+300 m / −740 m",
      revetement: "Non précisé (petites routes goudronnées d'après OSRM)",
      cyclable: null, cyclableDetail: "Non précisé (Geovelo)",
      url: "https://geovelo.app/fr/route/?bike-type=own&c=3.959556%2C47.006545&e-bike=false&from=4.047416%2C47.043638&to=3.724939%2C46.982549&z=10.68",
      note: "Départ au hameau des Malpeines (commune d'Arleuf), arrivée au hameau du Magny (commune de Limanton). Tous les chiffres sont estimés : le lien Geovelo est un calcul d'itinéraire, sans fiche éditoriale. Distance obtenue avec OSRM (34,5 km) · profil échantillonné tous les 100 m via l'API d'altitude Open-Meteo, puis lissé — le D+ issu d'un modèle numérique de terrain est incertain (fourchette réelle plutôt +280 à +460 m, D− −720 à −900 m), seul le solde net −440 m est fiable. Temps calculé à ≈13,5 km/h, allure de cyclotouriste chargé (13 km/h sur le plat, un peu relevée ici par le profil globalement descendant), cohérente avec les autres étapes du voyage. Attention : les extrémités du lien ne sont pas les villes attendues — départ aux Malpeines, commune d'Arleuf (58430), à 11 km à l'est de Château-Chinon · arrivée au Magny, commune de Limanton (58290), à 15 km au sud-est de Châtillon-en-Bazois. Prévoir ces deux raccords, ou recalculer l'étape de centre à centre. Descente rapide dès le premier kilomètre depuis 653 m : vérifier freins et pneus avant de partir. Peu de commerces entre Arleuf et la vallée de l'Aron : partir ravitaillé."
    },
    {
      jour: 4, debut: "Limanton", fin: "Cercy-la-Tour", km: 17.8, temps: "1 h 12",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Quasi plat, le long du canal (min 214 m · max 231 m)",
      denivele: "+12 m / −27 m",
      revetement: "100 % rugueux",
      cyclable: 100, cyclableDetail: "18 km en voie cyclable · aucune route partagée",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/cercy-la-tour-chatillon-en-bazois",
      note: "Portion sud de la fiche France Vélo Tourisme Cercy-la-Tour → Châtillon-en-Bazois, reprise à Limanton là où s'arrête le tracé Geovelo de l'étape précédente, et parcourue en sens inverse. Distance recalculée par routage (17,8 km au lieu des 35 km de la fiche complète) ; temps et dénivelé sont proratisés depuis la fiche, qui donne +54/−23 sur 35 km à l'endroit. Étape entièrement le long du canal du Nivernais, à travers le Bazois : bocage, châteaux et églises romanes. Points de passage : le château de Limanton, les barrages à aiguilles de bois de Biches, la boucle de l'Aron et le petit port de Panneçot (ancien péage). On arrive à Cercy-la-Tour, petite cité d'origine médiévale, où le canal file en ligne droite vers la Loire. Gare de Cercy-la-Tour à 1 km de l'étape : TER Dijon > Montchanin > Decize > Nevers, environ 9 trains/jour en semaine. Un cycliste signale une hésitation possible au croisement du canal du Nivernais et de l'EV6, malgré un balisage bien réalisé. Marchés : Cercy-la-Tour le jeudi matin (2e et 4e du mois), Moulins-Engilbert le mardi matin (à 6 km de Panneçot)."
    },
    {
      jour: 5, debut: "Cercy-la-Tour", fin: "Decize", km: 15, temps: "0 h 58",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Quasi plat (min 189 m · max 199 m)",
      denivele: "+0 m / −0 m",
      revetement: "Rugueux 100 %",
      cyclable: 100, cyclableDetail: "15 km en voie cyclable · 0 km en route partagée",
      url: "https://www.francevelotourisme.com/itineraire/le-tour-de-bourgogne-a-velo/decize-cercy-la-tour",
      note: "Sens inverse de la fiche France Vélo Tourisme (données Decize→Cercy-la-Tour inversées : +0/−0 à l'endroit). Voie verte le long du canal du Nivernais puis de l'Aron, en pente douce. Début / fin de la voie verte près de la gare de Decize, à port Saint-Thibault (St-Léger-des-Vignes) : prudence pour rejoindre le centre de Decize dans la circulation, en fin d'étape dans notre sens. Variante vers La Machine par voie verte sur ancienne voie ferrée, à 7 km de Champvert (La Copine) ; musée de la Mine à La Machine. Gares SNCF aux deux extrémités : Cercy-la-Tour (1 km de l'étape) et Decize (129 m) ; TER Dijon > Montchanin > Decize > Nevers (environ 9 trains/jour), Intercité Paris > Cosne > Nevers (environ 12 trains/jour) ; pas de train entre Cercy, Corbigny et Auxerre. À voir : Cercy-la-Tour, petite cité d'origine médiévale ; Decize, tous services, église du XIe s. et crypte du VIIe s., promenades en gabares. Dénivelé non renseigné par le site plutôt que réellement nul : l'altitude varie de 189 à 199 m."
    },
    {
      jour: 5, debut: "Decize", fin: "Nevers", km: 33, temps: "2 h 29",
      difficulte: "Je débute", niveau: "facile",
      pentes: "Quasi plat (min 175 m · max 199 m)",
      denivele: "+10 m / −25 m",
      revetement: "Rugueux 95 % · Lisse 5 %",
      cyclable: 95, cyclableDetail: "32 km en voie cyclable · 2 km en route partagée",
      url: "https://www.francevelotourisme.com/itineraire/entre-rhin-et-loire-a-velo-eurovelo-6/decize-nevers",
      note: "Parcours en site propre intégral, excepté les sorties et arrivées de ville et un changement de rive à Jaugenay. Prudence à hauteur de Chevenon, où le revêtement est soulevé par des remontées racinaires. On suit le Canal latéral à la Loire puis le Canal d'embranchement, du port de jonction de Decize à celui de Nevers, avec l'arrivée sur la cité ducale par le pont de Loire. Pause ravitaillement conseillée à la guinguette de Fleury-sur-Loire. Connexion à la Via Allier à hauteur de Nevers. Gares SNCF proches : Decize (842 m), Béard (2 km), Imphy (3 km), Nevers (5 km), Nevers Le Banlay (6 km)."
    }
  ],

  // Campings à l'arrivée de chaque journée — à compléter.
  // Format : 1: [ { nom: "…", detail: "…", url: "…" } ]
  campings: {}

};
