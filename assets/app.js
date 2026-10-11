document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.navlinks');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
nav?.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
const params=new URLSearchParams(location.search);
// Only a short, declared campaign tag; no personal data or browsing history saved.
const campaign=(params.get('campagne')||params.get('utm_campaign')||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,60);
if(campaign){document.querySelectorAll('a[href]').forEach(a=>{const u=new URL(a.href,location.href);if(u.origin===location.origin){u.searchParams.set('campagne',campaign);a.href=u.pathname+u.search+u.hash;}});}
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('[data-family]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.family!==button.dataset.filter;if(!card.hidden)count++;});const status=document.querySelector('#filter-status');if(status)status.textContent=count+' famille'+(count>1?'s':'')+' affichée'+(count>1?'s':'');}));
const form=document.querySelector('#quote-form');
if(form){
 form.querySelector('[data-preview-submit]')?.removeAttribute('disabled');
 const set=(key,value)=>{const field=form.elements.namedItem(key);if(field&&value)field.value=value.slice(0,160);};
 set('profil',params.get('profil'));set('objet',params.get('objet'));set('famille',params.get('famille'));set('produit',params.get('produit'));set('campagne',campaign);
 set('quantite',params.get('quantite'));set('version',params.get('version'));set('coloris',params.get('coloris'));
 const choice=(params.get('choix')||'Version').replace(/[^\p{L} -]/gu,'').slice(0,30);
 const lines=[params.get('version')&&choice+' souhaitée : '+params.get('version'),params.get('coloris')&&'Coloris souhaité : '+params.get('coloris')].filter(Boolean);
 if(lines.length)form.elements.message.value=lines.join('\n').slice(0,400);
 const source=params.get('source')||'devis';set('provenance',source.replace(/[^a-zA-Z0-9_/-]/g,'').slice(0,100));
 const sync=()=>{const event=form.elements.profil.value==='evenements',textile=form.elements.famille.value==='textiles',pack=form.elements.famille.value==='packs';for(const [id,show]of [['event-fields',event],['textile-fields',textile],['pack-fields',pack]]){const group=document.getElementById(id);group.hidden=!show;group.querySelectorAll('input,textarea').forEach(input=>input.disabled=!show);}};
 sync();form.elements.profil.addEventListener('change',sync);form.elements.famille.addEventListener('change',sync);
 const status=document.querySelector('#form-status');
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  if(form.dataset.preview==='true'){status.textContent='Votre demande est correctement renseignée. Cet aperçu ne transmet aucune donnée. L’envoi sera activé après configuration et test de la réception.';status.focus();return;}
  const button=form.querySelector('[type=submit]');button.disabled=true;button.textContent='Envoi en cours…';status.textContent='';
  try{const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()});if(!response.ok)throw new Error('Envoi refusé');location.assign('/merci/');}
  catch{status.textContent='Votre demande n’a pas pu être envoyée. Vos champs sont conservés sur cette page. Vérifiez votre connexion, puis réessayez ou utilisez le contact indiqué.';status.focus();button.disabled=false;button.textContent='Envoyer ma demande →';}
 });
}
// Prix HT (professionnels) ou TTC (particuliers) : choix mémorisé sur cet appareil uniquement.
const taxButtons=document.querySelectorAll('.tax-switch [data-prix]');
let updateTotal=()=>{};
const applyTax=mode=>{if(mode==='ttc')document.documentElement.dataset.prix='ttc';else delete document.documentElement.dataset.prix;taxButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.prix===(mode==='ttc'?'ttc':'ht'))));updateTotal();};
taxButtons.forEach(b=>b.addEventListener('click',()=>{try{localStorage.setItem('bbd-prix',b.dataset.prix);}catch{}applyTax(b.dataset.prix);}));
if(taxButtons.length)applyTax(document.documentElement.dataset.prix);
const productConfig=document.querySelector('.product-config');
if(productConfig){
 const version=document.querySelector('#product-version'),lots=document.querySelector('#product-lots'),coloris=document.querySelector('#product-coloris'),total=document.querySelector('#product-total'),quote=document.querySelector('#product-quote');
 const {rate,one,many}=productConfig.dataset;
 const money=n=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',minimumFractionDigits:Number.isInteger(n)?0:2,maximumFractionDigits:2}).format(n);
 const update=updateTotal=()=>{const count=Number(lots.value);if(!Number.isInteger(count)||count<1||count>10000){total.textContent='Indiquez un nombre entier de lots, de 1 à 10 000.';quote.setAttribute('aria-disabled','true');return;}
 quote.removeAttribute('aria-disabled');const option=version.selectedOptions[0],quantity=count*Number(option.dataset.pack),withTax=Math.round(quantity*Number(option.dataset.unit)*100)/100,ht=Math.round(withTax*10000/(100+Number(rate)))/100;
 const parts=[money(ht)+' HT',money(withTax)+' TTC'];if(document.documentElement.dataset.prix==='ttc')parts.reverse();
 total.textContent=quantity+' '+(quantity>1?many:one)+' · '+parts.join(' · ');
 const url=new URL(quote.href);url.searchParams.set('quantite',quantity);url.searchParams.set('version',option.dataset.label);if(coloris?.value)url.searchParams.set('coloris',coloris.value);else url.searchParams.delete('coloris');quote.href=url.pathname+url.search;
 const shortcut=document.querySelector('.mobile-cta .btn');if(shortcut)shortcut.href=quote.href;};
 version.addEventListener('change',update);lots.addEventListener('input',update);quote.addEventListener('click',e=>{if(quote.getAttribute('aria-disabled')==='true'){e.preventDefault();lots.focus();}});window.addEventListener('pageshow',()=>requestAnimationFrame(update));update();
 // Coloris : la vignette choisie remplace la grande photo et renseigne le coloris du devis, et inversement.
 const main=document.querySelector('#swatch-main'),caption=document.querySelector('#swatch-caption'),swatches=[...document.querySelectorAll('.swatch')];
 const show=swatch=>{main.src=swatch.dataset.image;main.alt=swatch.dataset.alt;caption.textContent=swatch.dataset.label;swatches.forEach(s=>s===swatch?s.setAttribute('aria-current','true'):s.removeAttribute('aria-current'));};
 swatches.forEach(s=>s.addEventListener('click',e=>{e.preventDefault();show(s);if(coloris&&s.dataset.coloris){coloris.value=s.dataset.coloris;update();}}));
 coloris?.addEventListener('change',()=>{const match=swatches.find(s=>s.dataset.coloris===coloris.value);if(match)show(match);update();});
}

// Progressive enhancement: all content remains visible without JavaScript.
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion&&'IntersectionObserver' in window){
 document.documentElement.classList.add('motion-ready');
 const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}
 }),{threshold:.12,rootMargin:'0px 0px -45px'});
 document.querySelectorAll('.section-head,.universe,.formula,.family-row,.process,.faq details,.product-feature,.rail-card,.campaign-panel,.club-moment-copy').forEach((node,index)=>{
  node.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*70}ms`);reveal.observe(node);
 });
 document.querySelectorAll('[data-depth]').forEach(frame=>{
  const image=frame.querySelector('img');
  frame.addEventListener('pointermove',event=>{const rect=frame.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;image.style.transform=`scale(1.035) translate(${x*-8}px,${y*-8}px)`;});
  frame.addEventListener('pointerleave',()=>image.style.transform='');
 });
}
