import { useState } from "react";
import { fmtNombre, cartesEtape } from "../utils.js";

/* Fiche détaillée d'une étape, affichée dans la lightbox Fancybox (type inline).
   Les boutons data-carousel-go-prev / -go-next sont écoutés par Fancybox
   n'importe où dans la visionneuse : ils pilotent la navigation. */

function Carte({ src, alt }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null; // capture absente : pas d'icône cassée
  return (
    <figure className="fiche__carte">
      <img src={src} alt={alt} loading="lazy" decoding="async"
           onError={() => setOk(false)} />
    </figure>
  );
}

export function PisteCyclable({ etape }) {
  if (etape.cyclable === null || etape.cyclable === undefined) {
    return (
      <>
        <span className="pct pct--nc">n.c.</span>
        <div className="sub">{etape.cyclableDetail}</div>
      </>
    );
  }
  return (
    <>
      <span className="pct">{etape.cyclable} %</span>
      <div className="bar"><div style={{ width: etape.cyclable + "%" }} /></div>
      <div className="sub">{etape.cyclableDetail}</div>
    </>
  );
}

export function BadgeDifficulte({ etape }) {
  const cls = "badge" +
    (etape.niveau === "moyen" ? " moyen" : etape.niveau === "difficile" ? " difficile" : "");
  return <span className={cls}>{etape.difficulte}</span>;
}

export default function FicheEtape({ rt, jour, etape, rang, date }) {
  const cartes = cartesEtape(etape, rt, rang);
  const estArrivee = etape.fin === jour.etapes[jour.etapes.length - 1].fin;
  const campings = (estArrivee && rt.campings && rt.campings[jour.num]) || [];
  const prec = rt.etapes[rang - 1];
  const suiv = rt.etapes[rang + 1];

  return (
    <div className="fiche" id={"fiche-" + rang}>
      <p className="fiche__jour">
        <span>Jour {jour.num}</span>
        <span className="fiche__date">{date}</span>
      </p>
      <h2 className="fiche__titre">
        <span>{etape.debut}</span><span className="arrow">→</span><span>{etape.fin}</span>
      </h2>
      <p className="fiche__badge"><BadgeDifficulte etape={etape} /></p>

      {cartes.length > 0 && (
        <div className="fiche__cartes">
          {cartes.map(src => (
            <Carte key={src} src={src}
                   alt={"Carte de l'étape " + etape.debut + " → " + etape.fin} />
          ))}
        </div>
      )}

      <dl className="fiche__grille">
        <div>
          <dt>Distance</dt>
          <dd className="fiche__chiffre">{fmtNombre(etape.km)} km</dd>
        </div>
        <div>
          <dt>Temps estimé</dt>
          <dd className="fiche__chiffre">{etape.temps}</dd>
        </div>
        <div>
          <dt>Dénivelé</dt>
          <dd className="fiche__chiffre">{etape.denivele}</dd>
        </div>
        <div>
          <dt>Piste cyclable</dt>
          <dd><PisteCyclable etape={etape} /></dd>
        </div>
        <div className="fiche__large">
          <dt>Pentes</dt>
          <dd>{etape.pentes}</dd>
        </div>
        <div className="fiche__large">
          <dt>Revêtement</dt>
          <dd>{etape.revetement}</dd>
        </div>
      </dl>

      {etape.note && (
        <div className="fiche__bloc">
          <span className="fiche__label">À noter</span>
          <p>{etape.note}</p>
        </div>
      )}

      {campings.length > 0 && (
        <div className="fiche__bloc">
          <span className="fiche__label">Campings — arrivée {etape.fin}</span>
          <div className="fiche__campings">
            {campings.map(c => (
              <a key={c.url} className="camping" href={c.url}
                 target="_blank" rel="noopener noreferrer">
                <span>{c.nom}</span><small>{c.detail}</small>
              </a>
            ))}
          </div>
        </div>
      )}

      {etape.url && (
        <a className="fiche__lien" href={etape.url} target="_blank" rel="noopener noreferrer">
          Ouvrir la fiche officielle ↗
        </a>
      )}

      <div className="fiche__nav">
        {prec && (
          <button type="button" className="fiche__nav-btn" data-carousel-go-prev>
            ← {prec.debut}
          </button>
        )}
        {suiv && (
          <button type="button" className="fiche__nav-btn" data-carousel-go-next>
            {suiv.fin} →
          </button>
        )}
      </div>
    </div>
  );
}
