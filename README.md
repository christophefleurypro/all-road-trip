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

`legacy/` contient l'ancienne version sans build (HTML + JS vanilla),
conservée pour référence : elle peut être supprimée sans conséquence.
