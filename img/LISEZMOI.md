# Captures de carte des étapes

Elles s'affichent dans la popup qui s'ouvre au clic sur « Voir », en haut de la
fiche de l'étape.

## Convention — rien à déclarer

Dépose les fichiers ici, dans un sous-dossier au nom du voyage :

```
public/img/<id-du-voyage>/step-<n>.png
```

- `<id-du-voyage>` = le champ `id` du fichier de données, qui est aussi son nom
  de fichier. Pour `src/data/nevers-dijon.js` → `public/img/nevers-dijon/`
- `<n>` = le **numéro de l'étape dans le parcours**, à partir de 1, dans l'ordre
  du fichier de données. Attention : c'est le numéro de tronçon, pas de journée —
  une journée peut compter deux étapes.

Exemple, pour un voyage dont les trois premiers tronçons sont
Nevers → Decize, Decize → Cercy-la-Tour, Cercy-la-Tour → Saint-Honoré :

```
public/img/nevers-dijon/step-1.png     Nevers → Decize
public/img/nevers-dijon/step-2.png     Decize → Cercy-la-Tour
public/img/nevers-dijon/step-3.png     Cercy-la-Tour → Saint-Honoré
```

Aucune ligne à ajouter dans le fichier de données : la page cherche le fichier
toute seule. S'il n'existe pas, la fiche s'affiche simplement sans carte.

## Si la convention ne convient pas

Dans le fichier de données, sur l'étape concernée :

```js
carte: "img/nevers-dijon/autre-nom.png"   // remplace la capture
carte: ["img/…/carte.png", "img/…/profil.png"] // plusieurs, empilées
carte: false                                   // aucune capture ici
```

Et au niveau du voyage, `cartes: false` désactive la convention partout.

## Format

- **Carré**, comme convenu. La popup plafonne l'affichage à 46 % de la hauteur
  d'écran et centre l'image, pour qu'une capture carrée ne repousse pas le reste
  de la fiche hors de vue.
- **Taille** : vise **1200 × 1200 px**. La popup fait 660 px de large, le double
  couvre les écrans denses ; au-delà c'est du poids pour rien.
- **PNG** pour une capture de carte (aplats et traits nets). JPEG seulement si la
  capture contient beaucoup de photo ou de relief ombré.
- **Poids** : reste sous ~300 Ko par image.
