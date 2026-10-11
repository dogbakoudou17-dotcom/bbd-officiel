// Tarifs : les montants des données sont HT ; le TTC est calculé avec le taux de data/site.json.
// Partagé par build.mjs et check.mjs pour que les montants affichés et contrôlés soient identiques.
export const ttc=(ht,rate)=>Math.round(ht*(100+rate))/100;
export const euro=n=>(Number.isInteger(n)?String(n):n.toFixed(2).replace('.',','))+' €';
// Offres sélectionnables d'un produit : déclarées dans `offers`, ou déduites des tarifs sans/avec logo.
export const offersOf=p=>p.offers||[
 {id:'sans',label:'Sans logo',unit:p.unitPlain,pack:p.packSize},
 {id:'avec',label:'Avec votre logo',unit:p.unitLogo,pack:p.packSize}
];
export const unitWords=p=>p.unitLabel||['pièce','pièces'];
