// Espace pro : connexion par lien e-mail et suivi des demandes, via l'API Supabase (sans bibliothèque).
// Configuration injectée au build dans <meta name="bbd-supabase-url"> et <meta name="bbd-supabase-key">
// (clé publique « anon » : la sécurité repose sur les règles RLS de supabase/schema.sql).
(()=>{
const meta=n=>document.querySelector(`meta[name="${n}"]`)?.content||'';
const BASE=meta('bbd-supabase-url').replace(/\/$/,''),KEY=meta('bbd-supabase-key');
const configured=Boolean(BASE&&KEY);
const STORE='bbd-espace-session';
const STATUS={recue:'Demande reçue',devis_envoye:'Devis envoyé',validee:'Commande validée',preparation:'En préparation',expediee:'Expédiée',livree:'Livrée',annulee:'Annulée'};
const STEPS=['recue','devis_envoye','validee','preparation','expediee','livree'];
const read=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'null');}catch{return null;}};
const write=s=>{try{s?localStorage.setItem(STORE,JSON.stringify(s)):localStorage.removeItem(STORE);}catch{}};
const money=n=>n==null?'':new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(Number(n));
const date=d=>new Date(d).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
const el=(tag,attrs={},...kids)=>{const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(v==null||v===false)continue;if(k==='class')e.className=v;else if(k==='text')e.textContent=v;else e.setAttribute(k,v===true?'':v);}for(const k of kids.flat())if(k!=null&&k!==false)e.append(k.nodeType?k:document.createTextNode(String(k)));return e;};

// Retour du lien de connexion : Supabase place les jetons dans l'ancre de l'URL.
let linkError='';
(()=>{const h=new URLSearchParams(location.hash.slice(1));if(h.get('access_token')){write({access_token:h.get('access_token'),refresh_token:h.get('refresh_token'),expires_at:Date.now()+Number(h.get('expires_in')||3600)*1000});history.replaceState(null,'',location.pathname+location.search);}else if(h.get('error_description')){linkError=h.get('error_description');history.replaceState(null,'',location.pathname+location.search);}})();

async function refresh(s){
 try{const r=await fetch(BASE+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:s.refresh_token})});
  if(!r.ok)throw new Error();const j=await r.json();const n={access_token:j.access_token,refresh_token:j.refresh_token,expires_at:Date.now()+j.expires_in*1000};write(n);return n;}
 catch{write(null);return null;}
}
async function session(){let s=read();if(s&&s.expires_at<Date.now()+60000)s=await refresh(s);return s;}
async function api(path,{method='GET',body,prefer}={}){
 const s=await session();
 const r=await fetch(BASE+path,{method,headers:{apikey:KEY,'Content-Type':'application/json',...(s?{Authorization:'Bearer '+s.access_token}:{}),...(prefer?{Prefer:prefer}:{})},body:body===undefined?undefined:JSON.stringify(body)});
 if(r.status===401){write(null);throw new Error('Votre session a expiré. Reconnectez-vous.');}
 if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(j.msg||j.message||j.error_description||'Le service ne répond pas pour le moment.');}
 return r.status===204?null:r.json().catch(()=>null);
}
const sendLink=email=>fetch(BASE+'/auth/v1/otp?redirect_to='+encodeURIComponent(location.origin+(location.pathname.startsWith('/espace-pro/admin')?'/espace-pro/admin/':'/espace-pro/')),{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({email,create_user:true})}).then(async r=>{if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(j.msg||j.message||'Envoi impossible pour le moment.');}});
const me=()=>api('/auth/v1/user');
const logout=async()=>{try{await api('/auth/v1/logout',{method:'POST'});}catch{}write(null);location.reload();};

// Compte validé par BBD (ou administrateur) : seul cas où les devis s'ajoutent au suivi.
let validCache;
const validated=()=>validCache??=api('/rest/v1/rpc/est_valide',{method:'POST',body:{}}).then(Boolean).catch(()=>false);

// Enregistrement automatique d'une demande de devis quand le client est connecté (appelé par app.js).
async function record(form){
 if(!configured||!(await session())||!(await validated()))return null;
 const v=n=>(form.elements.namedItem(n)?.value||'').trim()||null;
 const q=Number(v('quantite'));
 const rows=await api('/rest/v1/requests',{method:'POST',prefer:'return=representation',body:{profil:v('profil'),famille:v('famille'),objet:v('objet'),produit:v('produit'),version:v('version'),coloris:v('coloris'),quantite:Number.isInteger(q)&&q>0?q:null,structure:v('structure'),message:v('message'),utiliser_cagnotte:Boolean(form.elements.namedItem('cagnotte')?.checked)}});
 return rows&&rows[0];
}
window.bbdEspace={configured,record,signedIn:async()=>Boolean(configured&&await session())};

// Formulaire de devis : client connecté → e-mail prérempli et mention du suivi automatique.
const quote=document.querySelector('#quote-form');
if(quote&&configured)(async()=>{if(!(await session())||!(await validated()))return;try{const u=await me();const mail=quote.elements.namedItem('email');if(mail&&!mail.value)mail.value=u.email;const hint=document.querySelector('.espace-hint');if(hint){hint.querySelector('strong').textContent=u.email;hint.hidden=false;}}catch{}})();

// ---------------------------------------------------------------------------
// Pages Espace pro (client et administration)
// ---------------------------------------------------------------------------
const root=document.querySelector('[data-espace]');
if(!root)return;
const mode=root.dataset.espace;
const show=state=>root.querySelectorAll('[data-state]').forEach(p=>p.hidden=p.dataset.state!==state);
const flash=(msg,kind='')=>{const f=root.querySelector('.espace-flash');f.textContent=msg;f.dataset.kind=kind;f.hidden=!msg;};
if(!configured){show('off');return;}

const loginForm=root.querySelector('.espace-login');
loginForm?.addEventListener('submit',async e=>{
 e.preventDefault();const email=loginForm.elements.email.value.trim();const btn=loginForm.querySelector('button');
 if(!loginForm.reportValidity())return;btn.disabled=true;flash('');
 try{await sendLink(email);root.querySelector('.espace-sent-email').textContent=email;show('sent');}
 catch(err){flash(err.message,'error');}finally{btn.disabled=false;}
});
root.querySelectorAll('[data-espace-logout]').forEach(b=>b.addEventListener('click',logout));
root.querySelector('[data-espace-retry]')?.addEventListener('click',()=>show('login'));

function timeline(r){
 if(r.status==='annulee')return el('p',{class:'espace-cancel',text:'Demande annulée.'});
 const at=STEPS.indexOf(r.status);
 return el('ol',{class:'espace-steps','aria-label':'Avancement'},STEPS.map((s,i)=>el('li',{class:i<at?'done':i===at?'current':'','aria-current':i===at?'step':null},el('span',{class:'espace-dot','aria-hidden':'true'}),el('span',{text:STATUS[s]}))));
}
function details(r){
 const rows=[['Version',r.version],['Coloris',r.coloris],['Quantité',r.quantite],['Structure',r.structure]].filter(([,x])=>x);
 return el('dl',{class:'espace-details'},rows.map(([k,x])=>el('div',{},el('dt',{text:k}),el('dd',{text:String(x)}))));
}
function trackingNode(t){
 if(!t)return null;const isUrl=/^https:\/\/\S+$/.test(t);
 return el('p',{class:'espace-tracking'},'Suivi du colis : ',isUrl?el('a',{href:t,target:'_blank',rel:'noopener noreferrer',text:'suivre mon colis'}):el('strong',{text:t}));
}
function cagnotteNode(r){
 if(Number(r.cagnotte_deduite)>0)return el('p',{class:'espace-amount espace-amount--pot'},'Cagnotte de parrainage déduite : ',el('strong',{text:money(r.cagnotte_deduite)}));
 return r.utiliser_cagnotte?el('p',{class:'espace-date',text:'Utilisation de votre cagnotte de parrainage demandée.'}):null;
}
function requestCard(r){
 return el('article',{class:'espace-card'},
  el('header',{class:'espace-card-head'},el('div',{},el('p',{class:'espace-ref',text:r.reference}),el('h3',{text:r.objet||r.produit||'Demande de devis'}),el('p',{class:'espace-date',text:'Envoyée le '+date(r.created_at)})),el('span',{class:'espace-badge','data-status':r.status,text:STATUS[r.status]||r.status})),
  timeline(r),details(r),
  r.amount_ttc!=null?el('p',{class:'espace-amount'},'Montant du devis : ',el('strong',{text:money(r.amount_ttc)+' TTC'})):null,
  cagnotteNode(r),
  r.note?el('p',{class:'espace-note'},el('strong',{text:'Message de BBD : '}),r.note):null,
  trackingNode(r.tracking));
}

async function parrainView(){
 const box=root.querySelector('.espace-parrain');if(!box)return;
 let rows;try{rows=await api('/rest/v1/parrainages?select=code,statut,cagnotte,note');}catch{return;}
 const p=rows&&rows[0];
 if(!p){box.replaceChildren(el('div',{class:'espace-parrain-none'},el('p',{},el('strong',{text:'Programme de parrainage. '}),'Partagez un code promo à votre nom : chaque achat de vos contacts sur bbd-officiel.fr alimente une cagnotte déduite de vos devis.'),el('a',{class:'btn outline',href:'/espace-pro/parrainage/#demande',text:'Demander mon code'})));box.hidden=false;return;}
 const copy=el('button',{type:'button',class:'btn outline',text:'Copier le code'});
 copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(p.code);copy.textContent='Code copié';}catch{copy.textContent='Sélectionnez le code pour le copier';}setTimeout(()=>{copy.textContent='Copier le code';},2500);});
 box.replaceChildren(el('div',{class:'espace-parrain-card'},
  el('div',{class:'espace-parrain-part'},el('p',{class:'espace-ref',text:'Mon code de parrainage'}),el('p',{class:'espace-parrain-code',text:p.code}),p.statut==='suspendu'?el('p',{class:'espace-cancel',text:'Code suspendu : contactez BBD Officiel.'}):el('p',{class:'espace-date',text:'À partager : vos contacts le saisissent sur bbd-officiel.fr.'}),copy),
  el('div',{class:'espace-parrain-part espace-parrain-pot'},el('p',{class:'espace-ref',text:'Ma cagnotte'}),el('p',{class:'espace-parrain-amount',text:money(p.cagnotte)}),el('p',{class:'espace-date',text:'Déduite de vos devis : cochez « utiliser ma cagnotte » dans votre demande.'}),el('a',{class:'btn',href:'/devis/?cagnotte=1&source=cagnotte',text:'Utiliser ma cagnotte'})),
  p.note?el('p',{class:'espace-note'},el('strong',{text:'Message de BBD : '}),p.note):null));
 box.hidden=false;
}
async function accessGate(user){
 if(await validated())return true;
 const rows=await api('/rest/v1/membres?select=statut,note');const m=rows&&rows[0];
 if(!m){const form=root.querySelector('.espace-access');form.elements.email.value=user.email;show('access');return false;}
 if(m.statut==='refuse'){const n=root.querySelector('.espace-refused-note');if(m.note){n.textContent='Message de BBD : '+m.note;n.hidden=false;}show('refused');return false;}
 show('pending');return false;
}
const accessForm=root.querySelector('.espace-access');
accessForm?.addEventListener('submit',async e=>{
 e.preventDefault();if(!accessForm.reportValidity())return;const btn=accessForm.querySelector('[type=submit]');btn.disabled=true;flash('');
 const v=n=>accessForm.elements.namedItem(n).value.trim()||null;
 try{
  await api('/rest/v1/membres',{method:'POST',prefer:'return=minimal',body:{nom:v('acces-nom'),structure:v('acces-structure'),profil:v('acces-profil'),telephone:v('acces-telephone'),site:v('acces-site')}});
  // Copie par e-mail à BBD via Netlify Forms (site publié uniquement) ; un échec n'empêche pas la demande.
  if(accessForm.hasAttribute('data-netlify'))fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(accessForm)).toString()}).catch(()=>{});
  show('pending');window.scrollTo({top:root.offsetTop-90});
 }catch(err){flash(/duplicate|unique/i.test(err.message)?'Une demande d’accès existe déjà pour cette adresse.':err.message,'error');}
 finally{btn.disabled=false;}
});
async function clientView(){
 const user=await me();root.querySelectorAll('.espace-user').forEach(n=>n.textContent=user.email);
 if(!(await accessGate(user)))return;
 const list=await api('/rest/v1/requests?select=*&order=created_at.desc');
 const box=root.querySelector('.espace-list');box.replaceChildren();
 const open=list.filter(r=>!['livree','annulee'].includes(r.status)).length;
 root.querySelector('.espace-count').textContent=list.length?`${list.length} demande${list.length>1?'s':''} · ${open} en cours`:'Aucune demande pour le moment';
 root.querySelector('.espace-empty').hidden=list.length>0;
 list.forEach(r=>box.append(requestCard(r)));
 await parrainView();
 show('dashboard');
}

function adminRow(r){
 const status=el('select',{'aria-label':'Statut de '+r.reference},Object.entries(STATUS).map(([k,t])=>{const o=el('option',{value:k,text:t});if(k===r.status)o.selected=true;return o;}));
 const amount=el('input',{type:'number',min:'0',step:'0.01',value:r.amount_ttc??'','aria-label':'Montant TTC'});
 const tracking=el('input',{type:'text',maxlength:'300',value:r.tracking||'',placeholder:'Numéro ou lien https:// de suivi','aria-label':'Suivi du colis'});
 const note=el('textarea',{maxlength:'2000',rows:'2',placeholder:'Message visible par le client','aria-label':'Message au client'});note.value=r.note||'';
 const pot=el('input',{type:'number',min:'0',step:'0.01',value:r.cagnotte_deduite??'','aria-label':'Cagnotte déduite'});
 const save=el('button',{type:'button',class:'btn',text:'Enregistrer'});const msg=el('span',{class:'espace-saved',role:'status'});
 save.addEventListener('click',async()=>{save.disabled=true;msg.textContent='';
  try{await api('/rest/v1/requests?id=eq.'+encodeURIComponent(r.id),{method:'PATCH',prefer:'return=minimal',body:{status:status.value,amount_ttc:amount.value===''?null:Number(amount.value),tracking:tracking.value.trim()||null,note:note.value.trim()||null,cagnotte_deduite:pot.value===''?null:Number(pot.value)}});msg.textContent='Enregistré';}
  catch(err){msg.textContent=err.message;}finally{save.disabled=false;}});
 return el('article',{class:'espace-card espace-card--admin','data-status':r.status},
  el('header',{class:'espace-card-head'},el('div',{},el('p',{class:'espace-ref',text:r.reference+' · '+date(r.created_at)}),el('h3',{text:r.objet||r.produit||'Demande de devis'}),el('p',{class:'espace-date',text:r.client_email+(r.structure?' · '+r.structure:'')})),el('span',{class:'espace-badge','data-status':r.status,text:STATUS[r.status]})),
  details(r),r.utiliser_cagnotte?el('p',{class:'espace-flag',text:'Souhaite utiliser sa cagnotte de parrainage'}):null,r.message?el('p',{class:'espace-message',text:r.message}):null,
  el('div',{class:'espace-admin-form'},el('label',{},'Statut',status),el('label',{},'Montant TTC (€)',amount),el('label',{},'Suivi du colis',tracking),el('label',{},'Cagnotte déduite (€)',pot),el('label',{class:'full'},'Message au client',note),el('div',{class:'espace-admin-actions'},save,msg)));
}
function parrainRow(p){
 const statut=el('select',{'aria-label':'Statut du code '+p.code},[['actif','Actif'],['suspendu','Suspendu']].map(([k,t])=>{const o=el('option',{value:k,text:t});if(k===p.statut)o.selected=true;return o;}));
 const pot=el('input',{type:'number',min:'0',step:'0.01',value:p.cagnotte,'aria-label':'Cagnotte de '+p.code});
 const note=el('input',{type:'text',maxlength:'1000',value:p.note||'',placeholder:'Message visible par le professionnel','aria-label':'Message pour '+p.code});
 const save=el('button',{type:'button',class:'btn',text:'Enregistrer'});const msg=el('span',{class:'espace-saved',role:'status'});
 save.addEventListener('click',async()=>{if(!pot.reportValidity())return;save.disabled=true;msg.textContent='';
  try{await api('/rest/v1/parrainages?id=eq.'+encodeURIComponent(p.id),{method:'PATCH',prefer:'return=minimal',body:{statut:statut.value,cagnotte:Number(pot.value||0),note:note.value.trim()||null}});msg.textContent='Enregistré';}
  catch(err){msg.textContent=err.message;}finally{save.disabled=false;}});
 return el('article',{class:'espace-parrain-row'},el('div',{},el('p',{class:'espace-parrain-code',text:p.code}),el('p',{class:'espace-date',text:p.email})),el('label',{},'Statut',statut),el('label',{},'Cagnotte (€)',pot),el('label',{class:'wide'},'Message',note),el('div',{class:'espace-admin-actions'},save,msg));
}
const MEMBRE={en_attente:'En attente',valide:'Validé',refuse:'Refusé'};
function membreRow(m){
 const statut=el('select',{'aria-label':'Accès de '+m.email},Object.entries(MEMBRE).map(([k,t])=>{const o=el('option',{value:k,text:t});if(k===m.statut)o.selected=true;return o;}));
 const note=el('input',{type:'text',maxlength:'1000',value:m.note||'',placeholder:'Message visible par le professionnel (motif d’un refus…)','aria-label':'Message pour '+m.email});
 const save=el('button',{type:'button',class:'btn',text:'Enregistrer'});const msg=el('span',{class:'espace-saved',role:'status'});
 const badge=el('span',{class:'espace-badge','data-status':m.statut,text:MEMBRE[m.statut]});
 save.addEventListener('click',async()=>{save.disabled=true;msg.textContent='';
  try{await api('/rest/v1/membres?user_id=eq.'+encodeURIComponent(m.user_id),{method:'PATCH',prefer:'return=minimal',body:{statut:statut.value,note:note.value.trim()||null}});m.statut=statut.value;badge.dataset.status=m.statut;badge.textContent=MEMBRE[m.statut];msg.textContent='Enregistré';}
  catch(err){msg.textContent=err.message;}finally{save.disabled=false;}});
 const PROFIL={eleveur:'Éleveur',club:'Club',organisateur:'Organisateur',partenaire:'Partenaire',autre:'Autre structure'};
 const facts=[PROFIL[m.profil]||m.profil,m.telephone,m.site].filter(Boolean).join(' · ');
 return el('article',{class:'espace-parrain-row espace-membre-row'},
  el('div',{},el('p',{class:'espace-membre-name',text:m.structure}),el('p',{class:'espace-date',text:m.nom+' · '+m.email}),facts?el('p',{class:'espace-date',text:facts}):null,el('p',{class:'espace-date',text:'Demande du '+date(m.created_at)}),badge),
  el('label',{},'Accès',statut),el('label',{class:'wide'},'Message',note),el('div',{class:'espace-admin-actions'},save,msg));
}
async function adminMembres(){
 const box=root.querySelector('.espace-membres-admin');if(!box)return;
 let rows;try{rows=await api('/rest/v1/membres?select=*&order=created_at.desc');}catch{box.replaceChildren(el('p',{class:'espace-flash',text:'Demandes d’accès indisponibles : exécutez la dernière version de supabase/schema.sql.'}));return;}
 rows.sort((a,b)=>(a.statut==='en_attente'?0:1)-(b.statut==='en_attente'?0:1));
 const waiting=rows.filter(m=>m.statut==='en_attente').length;
 box.replaceChildren(el('p',{class:'espace-count',text:waiting?waiting+' demande'+(waiting>1?'s':'')+' en attente de validation':'Aucune demande en attente'}),...rows.map(membreRow));
}
async function adminParrains(){
 const box=root.querySelector('.espace-parrain-admin');if(!box)return;
 let rows;try{rows=await api('/rest/v1/parrainages?select=*&order=created_at.desc');}catch{box.replaceChildren(el('p',{class:'espace-flash',text:'Codes de parrainage indisponibles : exécutez la dernière version de supabase/schema.sql.'}));return;}
 const email=el('input',{type:'email',required:true,maxlength:'200',placeholder:'adresse@exemple.fr'});
 const code=el('input',{type:'text',required:true,maxlength:'30',pattern:'[A-Za-z0-9\\-]{3,30}',placeholder:'ELEVAGE-DES-PLAINES',title:'3 à 30 caractères : lettres, chiffres et tirets'});
 const pot=el('input',{type:'number',min:'0',step:'0.01',value:'0'});
 const add=el('button',{type:'submit',class:'btn',text:'Créer le code'});const msg=el('span',{class:'espace-saved',role:'status'});
 const form=el('form',{class:'espace-parrain-new'},el('label',{},'E-mail du professionnel',email),el('label',{},'Code',code),el('label',{},'Cagnotte de départ (€)',pot),el('div',{class:'espace-admin-actions'},add,msg));
 const list=el('div',{class:'espace-parrain-rows'});
 const render=()=>list.replaceChildren(...(rows.length?rows.map(parrainRow):[el('p',{class:'espace-date',text:'Aucun code pour le moment.'})]));
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;add.disabled=true;msg.textContent='';
  try{const created=await api('/rest/v1/parrainages',{method:'POST',prefer:'return=representation',body:{email:email.value.trim().toLowerCase(),code:code.value.trim().toUpperCase(),cagnotte:Number(pot.value||0)}});rows.unshift(created[0]);form.reset();render();msg.textContent='Code créé';}
  catch(err){msg.textContent=/duplicate|unique/i.test(err.message)?'Ce code ou cette adresse a déjà un code.':err.message;}finally{add.disabled=false;}});
 box.replaceChildren(form,list);render();
}
async function adminView(){
 const user=await me();root.querySelectorAll('.espace-user').forEach(n=>n.textContent=user.email);
 const isAdmin=await api('/rest/v1/rpc/is_admin',{method:'POST',body:{}});
 if(!isAdmin){show('denied');return;}
 const list=await api('/rest/v1/requests?select=*&order=created_at.desc');
 const box=root.querySelector('.espace-list'),filter=root.querySelector('.espace-filter');
 const render=()=>{box.replaceChildren(...list.filter(r=>!filter.value||r.status===filter.value).map(adminRow));root.querySelector('.espace-count').textContent=`${list.length} demande${list.length>1?'s':''} au total`;};
 filter.addEventListener('change',render);render();await adminMembres();await adminParrains();show('dashboard');
}

(async()=>{
 if(linkError)flash('Le lien de connexion n’est plus valable. Demandez-en un nouveau.','error');
 if(!(await session())){show('login');return;}
 show('loading');
 try{await(mode==='admin'?adminView():clientView());}
 catch(err){flash(err.message,'error');show(read()?'dashboard':'login');}
})();
})();
