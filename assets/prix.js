// Chargé avant l'affichage des fiches produits : applique le mode de prix mémorisé (HT ou TTC) sans clignotement.
try{if(localStorage.getItem('bbd-prix')==='ttc')document.documentElement.dataset.prix='ttc';}catch{}
