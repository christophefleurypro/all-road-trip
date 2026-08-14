# Mes road trips à vélo

App React (Vite) : listing des voyages, détail par étape, fiches en lightbox.

## Commandes

```bash
npm install        # une fois
npm run dev        # développement — http://localhost:5173
npm run build      # produit le site statique dans dist/
npm run preview    # sert dist/ pour vérifier le build
```

## Ajouter un voyage

1. Créer `src/data/mon-voyage.js` (copier `nevers-dijon.js` comme modèle),
   avec `id: "mon-voyage"` identique au nom du fichier.
2. L'importer et l'ajouter à la liste dans `src/data/roadtrips.js`.

## Captures de carte

Déposer les captures dans `public/img/<id-du-voyage>/step-<n>.png`,
`n` = numéro de l'étape dans l'ordre du fichier de données (1, 2, 3…).
Rien d'autre à faire — voir `public/img/LISEZMOI.md`.

## Déploiement

Site en prod : <https://christophefleury.fr/roadtrip/> (o2switch, derrière Cloudflare).

Tout ce qui arrive sur `main` est déployé automatiquement :

```
merge de PR (ou push direct sur main)
  → GitHub Actions build le site            (.github/workflows/deploy.yml)
  → publie dist/ sur la branche `deploy`
  → appelle https://christophefleury.fr/deploy-hook (jeton secret DEPLOY_TOKEN)
  → le serveur fait un git pull de son clone (~/christophefleury.fr/roadtrip)
  → en ligne ~1 minute après le merge
```

| Action | Effet |
|---|---|
| push sur une branche de travail | rien ne se déploie |
| ouvrir une PR | rien ne se déploie — relecture tranquille |
| **merger la PR** (ou push direct sur `main`) | **mise en prod automatique** |

Le merge **est** le bouton de déploiement. Le run est visible dans l'onglet
[Actions](https://github.com/christophefleurypro/all-road-trip/actions) ;
un bouton « Run workflow » permet de redéployer à la main sans pousser.

Particularités du serveur (découvertes à la mise en place, ne pas « simplifier ») :

- le pare-feu o2switch bloque le SSH hors IP françaises → pas de déploiement
  SSH depuis GitHub ; SSH manuel possible uniquement via ProtonVPN (IP fixe) ;
- son WAF coupe toute URL contenant `.php` pour les IP de datacenters → le
  webhook s'appelle `/deploy-hook`, réécrit vers `deploy-roadtrip.php` par le
  `.htaccess` à la racine du domaine. Ne pas renommer l'un sans l'autre.

À faire un jour : un contrôle de build sur les PR (le build tourne à
l'ouverture de la PR et affiche ✓/✗ avant merge, sans rien déployer).

`legacy/` contient l'ancienne version sans build (HTML + JS vanilla),
conservée pour référence : elle peut être supprimée sans conséquence.
