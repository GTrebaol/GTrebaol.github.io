/* ============================================================
   CLÉOPATTES v2 — Configuration des thèmes saisonniers

   Mettre "auto" pour activer la détection automatique par date.
   Mettre l'identifiant d'un thème pour le forcer manuellement.
   Mettre null pour désactiver tous les thèmes.

   Identifiants disponibles :
     'noel'            → 🎄 Noël           (1–30 déc)
     'nouvel-an'       → 🎆 Nouvel An      (31 déc – 1 jan)
     'saint-valentin'  → ❤️  Saint-Valentin (1–14 fév)
     'paques'          → 🐣 Pâques         (15 mar – 20 avr)
     'fete-nationale'  → 🇫🇷 14 Juillet     (14 jul)
     'octobre-rose'    → 🎀 Octobre Rose   (1–14 oct)
     'halloween'       → 🎃 Halloween      (15–31 oct)
   ============================================================ */

window.THEME_CONFIG = {

    /* 'auto' | 'noel' | 'halloween' | ... | null */
    activeTheme: 'auto',

    /* Affiche les boutons de prévisualisation (mettre false en prod) */
    showPreviewButtons: true,

};
