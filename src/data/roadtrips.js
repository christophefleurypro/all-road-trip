/* ------------------------------------------------------------------
   MANIFESTE — la liste des road trips.
   Un voyage = un fichier dans ce dossier.

   Pour ajouter un voyage :
     1. créer src/data/mon-voyage.js (copier nevers-dijon.js comme modèle),
        avec un champ `id` identique au nom du fichier
     2. l'importer et l'ajouter à la liste ci-dessous

   Les captures de carte vont dans public/img/<id>/step-<n>.png,
   n = numéro d'étape dans l'ordre du fichier (1, 2, 3…).

   L'ordre de cette liste n'a pas d'importance : le listing trie par date.
   ------------------------------------------------------------------ */

import neversDijon from "./nevers-dijon.js";
import dijonNevers from "./dijon-nevers.js";

export default [
  neversDijon,
  dijonNevers
];
