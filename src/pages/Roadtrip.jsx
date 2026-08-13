import { useEffect, useRef, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import ROADTRIPS from "../data/roadtrips.js";
import FicheEtape, { PisteCyclable, BadgeDifficulte } from "../components/FicheEtape.jsx";
import {
  grouperParJours, totaux, periode, fmtPeriode, fmtTemps, fmtNombre, cartesEtape
} from "../utils.js";

/* Détail d'un voyage : totaux, journées en accordéon, une ligne par étape.
   Le lien « Voir » (et la vignette de carte) ouvrent la fiche de l'étape dans
   une lightbox Fancybox ; toutes les fiches partagent la même galerie, d'où la
   navigation étape précédente / suivante. */

function Vignette({ rt, etape, rang, onOuvrir }) {
  const [ok, setOk] = useState(true);
  const cartes = cartesEtape(etape, rt, rang);
  if (!cartes.length || !ok) return null;
  return (
    <button type="button" className="vignette" title="Voir la fiche de l'étape"
            onClick={onOuvrir}>
      <img src={cartes[0]} alt={"Carte de l'étape " + etape.debut + " → " + etape.fin}
           loading="lazy" decoding="async" onError={() => setOk(false)} />
    </button>
  );
}

function LigneEtape({ rt, jour, etape, rang, total }) {
  const lienRef = useRef(null);
  const legende = (rang + 1) + "/" + total + " · Jour " + jour.num +
    " · " + etape.debut + " → " + etape.fin;
  return (
    <div className="row">
      <div className="cell cell--etape etape">
        <span>{etape.debut}</span><span className="arrow">→</span><span>{etape.fin}</span>
      </div>
      <div className="cell cell--carte" data-label="Carte">
        <Vignette rt={rt} etape={etape} rang={rang}
                  onOuvrir={() => lienRef.current && lienRef.current.click()} />
      </div>
      <div className="cell num" data-label="Km">{fmtNombre(etape.km)} km</div>
      <div className="cell num" data-label="Temps estimé">{etape.temps}</div>
      <div className="cell" data-label="Difficulté"><BadgeDifficulte etape={etape} /></div>
      <div className="cell num" data-label="Dénivelé">{etape.denivele}</div>
      <div className="cell" data-label="Piste cyclable"><PisteCyclable etape={etape} /></div>
      <div className="cell cell--fiche">
        <a ref={lienRef} className="lien" href={etape.url || "#"}
           data-fancybox="etapes" data-type="inline"
           data-src={"#fiche-" + rang} data-caption={legende}>
          Voir ↗
        </a>
      </div>
    </div>
  );
}

function Campings({ rt, jour }) {
  const arrivee = jour.etapes[jour.etapes.length - 1].fin;
  const liste = (rt.campings && rt.campings[jour.num]) || [];
  return (
    <div className="campings">
      <span className="campings__label">Campings — arrivée {arrivee}</span>
      {liste.length
        ? liste.map(c => (
            <a key={c.url} className="camping" href={c.url}
               target="_blank" rel="noopener noreferrer">
              <span>{c.nom}</span><small>{c.detail}</small>
            </a>
          ))
        : <span className="campings__vide">Aucun camping repéré · à compléter</span>}
    </div>
  );
}

export default function Roadtrip({ id }) {
  const rt = ROADTRIPS.find(v => v.id === id);

  // Une seule galerie pour toute la page : montée/démontée avec elle.
  useEffect(() => {
    if (!rt) return;
    Fancybox.bind('[data-fancybox="etapes"]', {
      mainClass: "fb-etapes",
      Carousel: { infinite: false }
    });
    return () => {
      Fancybox.unbind('[data-fancybox="etapes"]');
      Fancybox.close();
    };
  }, [rt]);

  useEffect(() => {
    document.title = rt ? rt.titre + " — Étapes" : "Road trip — Étapes";
  }, [rt]);

  if (!rt) {
    return (
      <div className="wrap">
        <a className="back" href="#/">← Tous les road trips</a>
        <h1>Road trip</h1>
        <div className="erreur">
          <strong>Road trip introuvable</strong>
          <span>Aucun voyage ne porte l'identifiant « {id} » dans src/data/.</span>
        </div>
      </div>
    );
  }

  const p = periode(rt);
  const t = totaux(rt);
  const jours = grouperParJours(rt.etapes);
  const notes = rt.etapes.filter(e => e.note);

  // rang de la première étape de chaque journée, pour numéroter les fiches
  const rangs = [];
  let rang = 0;
  jours.forEach(j => { rangs.push(rang); rang += j.etapes.length; });

  const dateDuJour = j => {
    const d = new Date(p.debut);
    d.setDate(d.getDate() + j.num - 1);
    return d;
  };

  return (
    <div className="wrap">
      <a className="back" href="#/">← Tous les road trips</a>

      <h1>🚴 {rt.titre}</h1>
      <p className="subtitle">
        {fmtPeriode(p.debut, p.fin)}{rt.itineraire ? " · " + rt.itineraire : ""}
      </p>

      <div className="totals">
        <div className="tile">
          <div className="label">Jours</div>
          <div className="value">{t.jours}</div>
        </div>
        <div className="tile">
          <div className="label">Étapes</div>
          <div className="value">{t.etapes}</div>
        </div>
        <div className="tile">
          <div className="label">Distance totale</div>
          <div className="value">{fmtNombre(t.km)} <small>km</small></div>
        </div>
        <div className="tile">
          <div className="label">Temps total</div>
          <div className="value">{fmtTemps(t.min)}</div>
        </div>
        <div className="tile">
          <div className="label">Dénivelé + cumulé</div>
          <div className="value">{fmtNombre(t.dplus)} <small>m</small></div>
        </div>
      </div>

      <div className="table-card">
        <div className="row row--head" aria-hidden="true">
          <div className="cell">Étape</div>
          <div className="cell">Carte</div>
          <div className="cell">Km</div>
          <div className="cell">Temps estimé</div>
          <div className="cell">Difficulté</div>
          <div className="cell">Dénivelé</div>
          <div className="cell">Piste cyclable</div>
          <div className="cell">Fiche</div>
        </div>

        {jours.map((j, ij) => {
          const date = dateDuJour(j);
          return (
            <details className="day" key={j.num} open>
              <summary className="day-head">
                <div className="day-title">
                  <span className="day-chevron"></span>
                  <span className="day-num">Jour {j.num}</span>
                  <span className="day-date">
                    {date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
                  </span>
                  <span className="day-route">
                    {j.etapes[0].debut} <span className="arrow">→</span> {j.etapes[j.etapes.length - 1].fin}
                  </span>
                </div>
                <div className="day-stats">
                  <span>{fmtNombre(j.km)} km</span>
                  <span>{fmtTemps(j.min)}</span>
                  <span>+{j.dplus} m</span>
                  <span>{j.etapes.length} étape{j.etapes.length > 1 ? "s" : ""}</span>
                </div>
              </summary>
              <div className="day-body">
                {j.etapes.map((e, ie) => (
                  <LigneEtape key={rangs[ij] + ie} rt={rt} jour={j} etape={e}
                              rang={rangs[ij] + ie} total={rt.etapes.length} />
                ))}
                <Campings rt={rt} jour={j} />
              </div>
            </details>
          );
        })}
      </div>

      {notes.length > 0 && (
        <section className="notes">
          <h2 className="section-title">À noter</h2>
          <div>
            {notes.map(e => (
              <p className="note-item" key={e.debut + e.fin}>
                <strong>{e.debut} → {e.fin} :</strong> {e.note}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Fiches de la lightbox : cachées ici, déplacées par Fancybox à l'ouverture */}
      <div hidden>
        {jours.map((j, ij) => {
          const date = dateDuJour(j)
            .toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
          return j.etapes.map((e, ie) => (
            <FicheEtape key={rangs[ij] + ie} rt={rt} jour={j} etape={e}
                        rang={rangs[ij] + ie} date={date} />
          ));
        })}
      </div>
    </div>
  );
}
