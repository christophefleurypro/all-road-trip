/* ------------------------------------------------------------------
   roadtrip.html — rend le road trip identifié par ?id=<id>
   (à défaut d'id, le premier voyage du manifeste data/roadtrips.js).

   Seul le fichier de données du voyage demandé est chargé.

   Tout le markup vient des <template> de la page : ce script ne fait
   que cloner un gabarit et remplir ses [data-field].
   ------------------------------------------------------------------ */

(function () {
  const fichiers = window.ROADTRIPS_FICHIERS || [];
  const id = new URLSearchParams(location.search).get("id") || fichiers[0];

  const gabarit = nom => document.getElementById(nom).content.firstElementChild.cloneNode(true);

  function erreur(detail) {
    document.getElementById("erreur-detail").textContent = detail;
    document.getElementById("erreur").hidden = false;
  }

  if (!id) {
    erreur("Le manifeste data/roadtrips.js ne référence encore aucun voyage.");
    return;
  }
  if (fichiers.indexOf(id) === -1) {
    erreur("Aucun voyage ne porte l'identifiant « " + id + " » dans data/roadtrips.js.");
    return;
  }

  RTLoader.charger([id], function (voyages) {
    const rt = voyages.find(v => v.id === id);
    if (!rt) {
      erreur("Le fichier data/" + id + ".js est introuvable, ou son champ `id` " +
        "ne vaut pas « " + id + " ».");
      return;
    }
    rendre(rt);
  });

  function rendre(rt) {

    /* ---- En-tête ---- */

    const p = RT.periode(rt);
    const t = RT.totaux(rt);

    document.title = rt.titre + " — Étapes";
    document.getElementById("titre").textContent = "🚴 " + rt.titre;
    document.getElementById("sous-titre").textContent =
      RT.fmtPeriode(p.debut, p.fin) + (rt.itineraire ? " · " + rt.itineraire : "");

    /* ---- Tuiles de totaux ---- */

    const totals = document.getElementById("totals");
    RT.setTexte(totals, "jours", t.jours);
    RT.setTexte(totals, "etapes", t.etapes);
    RT.setTexte(totals, "km", RT.fmtNombre(t.km));
    RT.setTexte(totals, "temps", RT.fmtTemps(t.min));
    RT.setTexte(totals, "dplus", RT.fmtNombre(t.dplus));
    totals.hidden = false;

    /* ---- Journées ---- */

    const conteneur = document.getElementById("jours");
    const fiches = document.getElementById("fiches");
    let rang = 0; // position de l'étape dans le voyage, sert d'id de fiche

    RT.grouperParJours(rt.etapes).forEach(j => {
      const jour = gabarit("tpl-jour");
      const date = new Date(p.debut);
      date.setDate(date.getDate() + j.num - 1);
      const dateCourte = date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
      const dateLongue = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

      RT.setTexte(jour, "num", "Jour " + j.num);
      RT.setTexte(jour, "date", dateCourte);
      RT.setTexte(jour, "debut", j.etapes[0].debut);
      RT.setTexte(jour, "fin", j.etapes[j.etapes.length - 1].fin);
      RT.setTexte(jour, "km", RT.fmtNombre(j.km) + " km");
      RT.setTexte(jour, "temps", RT.fmtTemps(j.min));
      RT.setTexte(jour, "dplus", "+" + j.dplus + " m");
      RT.setTexte(jour, "nb", j.etapes.length + " étape" + (j.etapes.length > 1 ? "s" : ""));

      const body = RT.champ(jour, "body");
      j.etapes.forEach(e => {
        const ctx = { etape: e, jour: j, rang: rang++, total: rt.etapes.length, date: dateLongue, rt: rt };
        fiches.appendChild(rendreFiche(ctx));
        body.appendChild(rendreEtape(ctx));
      });
      body.appendChild(rendreCampings(rt, j));

      conteneur.appendChild(jour);
    });

    conteneur.hidden = false;

    /* ---- Lightbox : une galerie de toutes les étapes du voyage ---- */

    // Tous les liens "Voir" portent le même nom de galerie : ouvrir l'un d'eux
    // donne accès aux autres avec les flèches, le clavier et le balayage tactile.
    // `infinite: false` : le parcours est ordonné, on ne reboucle pas de la
    // dernière étape à la première.
    Fancybox.bind('[data-fancybox="etapes"]', {
      mainClass: "fb-etapes",
      Carousel: { infinite: false }
    });

    /* ---- Notes ---- */

    const avecNote = rt.etapes.filter(e => e.note);
    if (avecNote.length) {
      const liste = document.getElementById("notes-liste");
      avecNote.forEach(e => {
        const note = gabarit("tpl-note");
        RT.setTexte(note, "etape", e.debut + " → " + e.fin + " :");
        RT.setTexte(note, "texte", e.note);
        liste.appendChild(note);
      });
      document.getElementById("notes").hidden = false;
    }
  }

  // Remplit les champs communs à la ligne du tableau et à la fiche :
  // pourcentage de piste cyclable, barre de progression, badge de difficulté.
  function remplirCommun(racine, e) {
    RT.setTexte(racine, "debut", e.debut);
    RT.setTexte(racine, "fin", e.fin);
    RT.setTexte(racine, "temps", e.temps);
    RT.setTexte(racine, "pentes", e.pentes);
    RT.setTexte(racine, "denivele", e.denivele);
    RT.setTexte(racine, "revetement", e.revetement);
    RT.setTexte(racine, "cyclableDetail", e.cyclableDetail);

    const badge = RT.setTexte(racine, "difficulte", e.difficulte);
    if (badge && (e.niveau === "moyen" || e.niveau === "difficile")) badge.classList.add(e.niveau);

    if (e.cyclable === null || e.cyclable === undefined) {
      RT.setTexte(racine, "cyclable", "n.c.").classList.add("pct--nc");
      RT.champ(racine, "bar").remove();
    } else {
      RT.setTexte(racine, "cyclable", e.cyclable + " %");
      RT.champ(racine, "barFill").style.width = e.cyclable + "%";
    }
  }

  function rendreEtape(ctx) {
    const e = ctx.etape;
    const row = gabarit("tpl-etape");

    remplirCommun(row, e);
    RT.setTexte(row, "km", RT.fmtNombre(e.km) + " km");

    // Le lien "Voir" ouvre la lightbox ; tous les liens partagent le même nom de
    // galerie, ce qui donne la navigation étape précédente / suivante.
    const lien = RT.champ(row, "url");
    lien.href = e.url || "#";
    lien.dataset.fancybox = "etapes";
    lien.dataset.caption = (ctx.rang + 1) + "/" + ctx.total +
      " · Jour " + ctx.jour.num + " · " + e.debut + " → " + e.fin;

    lien.dataset.type = "inline";
    lien.dataset.src = "#fiche-" + ctx.rang;

    // Vignette de la carte. Elle n'entre pas dans la galerie Fancybox — sinon
    // chaque étape compterait deux fois — elle relaie le clic vers le lien.
    const vignette = RT.champ(row, "vignette");
    const cartes = cartesEtape(e, ctx.rt, ctx.rang);
    if (cartes.length) {
      const img = RT.champ(row, "vignetteImg");
      img.src = cartes[0];
      img.alt = "Carte de l'étape " + e.debut + " → " + e.fin;
      img.addEventListener("error", () => vignette.remove());
      vignette.title = "Voir la fiche de l'étape";
      vignette.addEventListener("click", () => lien.click());
    } else {
      vignette.remove();
    }

    return row;
  }

  // Fiche détaillée affichée dans la lightbox.
  function rendreFiche(ctx) {
    const e = ctx.etape;
    const fiche = gabarit("tpl-fiche");
    fiche.id = "fiche-" + ctx.rang;

    remplirCommun(fiche, e);
    RT.setTexte(fiche, "jour", "Jour " + ctx.jour.num);
    RT.setTexte(fiche, "date", ctx.date);
    RT.setTexte(fiche, "km", RT.fmtNombre(e.km) + " km");

    const cartes = cartesEtape(e, ctx.rt, ctx.rang);
    const cartesBloc = RT.champ(fiche, "cartesBloc");
    if (cartes.length) {
      cartes.forEach(chemin => {
        const fig = gabarit("tpl-fiche-carte");
        const img = RT.champ(fig, "img");
        img.src = chemin;
        img.alt = "Carte de l'étape " + e.debut + " → " + e.fin;
        // capture absente ou illisible : on retire la figure plutôt que d'afficher
        // une icône cassée, et le bloc entier s'il ne reste plus rien
        img.addEventListener("error", () => {
          fig.remove();
          if (!cartesBloc.children.length) cartesBloc.remove();
        });
        cartesBloc.appendChild(fig);
      });
    } else {
      cartesBloc.remove();
    }

    const noteBloc = RT.champ(fiche, "noteBloc");
    if (e.note) RT.setTexte(fiche, "note", e.note);
    else noteBloc.remove();

    const campingsBloc = RT.champ(fiche, "campingsBloc");
    const campings = (ctx.rt.campings && ctx.rt.campings[ctx.jour.num]) || [];
    const estArrivee = e.fin === ctx.jour.etapes[ctx.jour.etapes.length - 1].fin;

    if (campings.length && estArrivee) {
      RT.setTexte(fiche, "campingsLabel", "Campings — arrivée " + e.fin);
      const liste = RT.champ(fiche, "campingsListe");
      campings.forEach(c => {
        const item = gabarit("tpl-fiche-camping");
        RT.setTexte(item, "nom", c.nom);
        RT.setTexte(item, "detail", c.detail);
        item.href = c.url;
        liste.appendChild(item);
      });
    } else {
      campingsBloc.remove();
    }

    const lien = RT.champ(fiche, "url");
    if (e.url) lien.href = e.url;
    else lien.remove();

    // Boutons "étape précédente / suivante" : on nomme l'étape visée plutôt que
    // d'afficher un libellé générique. Aux extrémités, le bouton disparaît.
    const voisines = ctx.rt.etapes;
    const prec = voisines[ctx.rang - 1];
    const suiv = voisines[ctx.rang + 1];
    // on nomme l'autre extrémité de l'étape voisine : son point de départ pour la
    // précédente, son arrivée pour la suivante — sinon on répète la ville courante
    if (prec) RT.setTexte(fiche, "navPrev", prec.debut);
    else RT.champ(fiche, "navPrev").closest(".fiche__nav-btn").remove();
    if (suiv) RT.setTexte(fiche, "navNext", suiv.fin);
    else RT.champ(fiche, "navNext").closest(".fiche__nav-btn").remove();

    return fiche;
  }

  /* ------------------------------------------------------------------
     Les captures de carte d'une étape.

     Par convention, rien à déclarer : la capture de la Nᵉ étape du voyage
     (N compté à partir de 1, dans l'ordre du parcours) est cherchée en
       img/<id-du-voyage>/step-<N>.png
     Il suffit donc de déposer les fichiers. Un fichier absent est ignoré
     silencieusement — pas d'icône cassée, pas de bloc vide.

     Réglages possibles, si la convention ne convient pas :
       carte: "img/…/autre.png"        remplace la capture de cette étape
       carte: ["img/a.png", "…/b.png"] plusieurs captures, empilées
       carte: false                    aucune capture pour cette étape
       cartes: false   (sur le voyage) désactive la convention partout
     ------------------------------------------------------------------ */

  const EXT_CARTE = ".png";

  function cartesEtape(e, rt, rang) {
    if (e.carte === false || rt.cartes === false) return [];
    if (e.carte) return (Array.isArray(e.carte) ? e.carte : [e.carte]).filter(Boolean);
    return ["img/" + rt.id + "/step-" + (rang + 1) + EXT_CARTE];
  }

  function rendreCampings(rt, j) {
    const bloc = gabarit("tpl-campings");
    const arrivee = j.etapes[j.etapes.length - 1].fin;
    const liste = (rt.campings && rt.campings[j.num]) || [];

    RT.setTexte(bloc, "label", "Campings — arrivée " + arrivee);

    if (!liste.length) {
      bloc.appendChild(gabarit("tpl-campings-vide"));
      return bloc;
    }
    liste.forEach(c => {
      const item = gabarit("tpl-camping");
      RT.setTexte(item, "nom", c.nom);
      RT.setTexte(item, "detail", c.detail);
      item.href = c.url;
      bloc.appendChild(item);
    });
    return bloc;
  }
})();
