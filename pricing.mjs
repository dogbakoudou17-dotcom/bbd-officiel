// Tarifs : les montants des données sont TTC, tels que transmis par BBD Officiel ;
// le HT en est déduit avec le taux de data/site.json (arrondi au centime).
// Partagé par build.mjs et check.mjs pour que les montants affichés et contrôlés soient identiques.
export const htFromTtc=(ttc,rate)=>Math.round(ttc*10000/(100+rate))/100;
export const euro=v=>{const n=Math.round(v*100)/100;return (Number.isInteger(n)?String(n):n.toFixed(2).replace('.',','))+' €';};
// Offres sélectionnables d'un produit (prix unitaires TTC) : déclarées dans `offers`, ou déduites des tarifs sans/avec logo.
export const offersOf=p=>p.offers||[
 {id:'sans',label:'Sans logo',unit:p.unitPlain,pack:p.packSize},
 {id:'avec',label:'Avec votre logo',unit:p.unitLogo,pack:p.packSize}
];
// Prix TTC d'un lot : le montant transmis quand l'offre en déclare un (`lot`), sinon prix unitaire × nombre de pièces.
export const lotTtc=o=>o.lot??Math.round(o.unit*o.pack*100)/100;
export const unitWords=p=>p.unitLabel||['pièce','pièces'];
