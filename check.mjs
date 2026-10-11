import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');let files=[],links=0;
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(p.endsWith('.html'))files.push(p);}}walk(root);
const titles=new Set();
for(const file of files){
 const html=fs.readFileSync(file,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+' : un seul H1');
 const title=html.match(/<title>(.*?)<\/title>/s)[1];assert(!titles.has(title),'Titre dupliqué : '+title);titles.add(title);
 assert(html.includes('lang="fr"'),file+' : langue');
 assert(!html.includes('undefined'),'Valeur manquante : '+file);
 for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
  const href=match[1].replaceAll('&amp;','&');if(!href.startsWith('/'))continue;
  const url=new URL(href,'http://localhost');let target=path.join(root,decodeURIComponent(url.pathname));
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  assert(fs.existsSync(target),`${file} : lien absent ${href}`);links++;
  if(url.hash){const destination=fs.readFileSync(target,'utf8');assert(destination.includes(`id="${url.hash.slice(1)}"`),'Ancre absente : '+href);}
 }
}
for(const p of JSON.parse(fs.readFileSync('data/products.json','utf8'))){
 const product=fs.readFileSync(path.join(root,'produits',p.id,'index.html'),'utf8');
 for(const price of [p.unitPlain+' €',p.unitLogo+' €',p.unitPlain*p.packSize+' € HT',p.unitLogo*p.packSize+' € HT'])assert(product.includes(price),'Prix absent : '+p.id+' '+price);
 assert(product.includes('data-product="'+p.id+'"'),'Contexte produit absent');
}
const form=fs.readFileSync(path.join(root,'devis/index.html'),'utf8');
assert(form.includes('name="version"'),'Version produit à transmettre');
assert(form.includes('name="campagne"'),'Provenance QR à transmettre');
if(form.includes('data-preview="true"'))assert(form.includes('disabled data-preview-submit'),'Envoi sans JS bloqué en aperçu');
console.log(`${files.length} pages, ${links} liens et ressources internes valides ; titres, H1, tarifs HT et structure de devis vérifiés.`);
