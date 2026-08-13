import ROADTRIPS from "../data/roadtrips.js";
import { periode, totaux, fmtPeriode, fmtNombre, aujourdhui } from "../utils.js";

/* Listing des road trips : « À venir » du plus proche au plus lointain,
   « Déjà roulés » du plus récent au plus ancien. */

function CarteVoyage({ entree, passe }) {
  const { rt, periode: p, totaux: t } = entree;
  const d = p.debut;
  return (
    <a className={"trip" + (passe ? " trip--passe" : "")}
       href={"#/roadtrip/" + encodeURIComponent(rt.id)}>
      <span className="trip-date">
        <span className="trip-date__jour">{d.getDate()}</span>
        <span className="trip-date__mois">
          {d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "")}
        </span>
        <span className="trip-date__annee">{d.getFullYear()}</span>
      </span>
      <span className="trip-main">
        <span className="trip-titre">{rt.titre}</span>
        {rt.itineraire && <span className="trip-itineraire">{rt.itineraire}</span>}
      </span>
      <span className="trip-stats">
        <span>{fmtPeriode(p.debut, p.fin)}</span>
        <span>{t.jours} jour{t.jours > 1 ? "s" : ""}</span>
        <span>{fmtNombre(t.km)} km</span>
        <span>+{fmtNombre(t.dplus)} m</span>
      </span>
      <span className="trip-go">Voir ↗</span>
    </a>
  );
}

export default function Listing() {
  const today = aujourdhui();
  const entrees = ROADTRIPS.map(rt => ({ rt, periode: periode(rt), totaux: totaux(rt) }));
  const aVenir = entrees.filter(e => e.periode.fin >= today)
    .sort((a, b) => a.periode.debut - b.periode.debut);
  const passes = entrees.filter(e => e.periode.fin < today)
    .sort((a, b) => b.periode.debut - a.periode.debut);

  const cumul = entrees.reduce((s, e) => ({
    jours: s.jours + e.totaux.jours,
    km: s.km + e.totaux.km,
    dplus: s.dplus + e.totaux.dplus
  }), { jours: 0, km: 0, dplus: 0 });

  return (
    <div className="wrap">
      <h1>🚴 Mes road trips</h1>
      <p className="subtitle">Un voyage par ligne, classé par date de départ.</p>

      {entrees.length > 0 && (
        <div className="totals">
          <div className="tile">
            <div className="label">Voyages</div>
            <div className="value">{entrees.length}</div>
          </div>
          <div className="tile">
            <div className="label">Jours de vélo</div>
            <div className="value">{cumul.jours}</div>
          </div>
          <div className="tile">
            <div className="label">Distance cumulée</div>
            <div className="value">{fmtNombre(cumul.km)} <small>km</small></div>
          </div>
          <div className="tile">
            <div className="label">Dénivelé + cumulé</div>
            <div className="value">{fmtNombre(cumul.dplus)} <small>m</small></div>
          </div>
        </div>
      )}

      {aVenir.length > 0 && (
        <section>
          <h2 className="section-title">À venir</h2>
          <div className="trip-list">
            {aVenir.map(e => <CarteVoyage key={e.rt.id} entree={e} passe={false} />)}
          </div>
        </section>
      )}

      {passes.length > 0 && (
        <section>
          <h2 className="section-title">Déjà roulés</h2>
          <div className="trip-list">
            {passes.map(e => <CarteVoyage key={e.rt.id} entree={e} passe={true} />)}
          </div>
        </section>
      )}

      {entrees.length === 0 && (
        <p className="empty">
          Aucun road trip pour l'instant — ajoute un fichier dans <code>src/data/</code>.
        </p>
      )}
    </div>
  );
}
