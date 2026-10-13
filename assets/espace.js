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

// Enregistrement automatique d'une demande de devis quand le client est connecté (appelé par app.js).
async function record(form){
 if(!configured||!(await session()))return null;
 const v=n=>(form.elements.namedItem(n)?.value||'').trim()||null;
 const q=Number(v('quantite'));
 const rows=await api('/rest/v1/requests',{method:'POST',prefer:'return=representation',body:{profil:v('profil'),famille:v('famille'),objet:v('objet'),produit:v('produit'),version:v('version'),coloris:v('coloris'),quantite:Number.isInteger(q)&&q>0?q:null,structure:v('structure'),message:v('message')}});
 return rows&&rows[0];
}
window.bbdEspace={configured,record,signedIn:async()=>Boolean(configured&&await session())};

// Formulaire de devis : client connecté → e-mail prérempli et mention du suivi automatique.
const quote=document.querySelector('#quote-form');
if(quote&&configured)(async()=>{if(!(await session()))return;try{const u=await me();const mail=quote.elements.namedItem('email');if(mail&&!mail.value)mail.value=u.email;const hint=document.querySelector('.espace-hint');if(hint){hint.querySelector('strong').textContent=u.email;hint.hidden=false;}}catch{}})();

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
function requestCard(r){
 return el('article',{class:'espace-card'},
  el('header',{class:'espace-card-head'},el('div',{},el('p',{class:'espace-ref',text:r.reference}),el('h3',{text:r.objet||r.produit||'Demande de devis'}),el('p',{class:'espace-date',text:'Envoyée le '+date(r.created_at)})),el('span',{class:'espace-badge','data-status':r.status,text:STATUS[r.status]||r.status})),
  timeline(r),details(r),
  r.amount_ttc!=null?el('p',{class:'espace-amount'},'Montant du devis : ',el('strong',{text:money(r.amount_ttc)+' TTC'})):null,
  r.note?el('p',{class:'espace-note'},el('strong',{text:'Message de BBD : '}),r.note):null,
  trackingNode(r.tracking));
}

async function clientView(){
 const user=await me();root.querySelectorAll('.espace-user').forEach(n=>n.textContent=user.email);
 const list=await api('/rest/v1/requests?select=*&order=created_at.desc');
 const box=root.querySelector('.espace-list');box.replaceChildren();
 const open=list.filter(r=>!['livree','annulee'].includes(r.status)).length;
 root.querySelector('.espace-count').textContent=list.length?`${list.length} demande${list.length>1?'s':''} · ${open} en cours`:'Aucune demande pour le moment';
 root.querySelector('.espace-empty').hidden=list.length>0;
 list.forEach(r=>box.append(requestCard(r)));
 show('dashboard');
}

function adminRow(r){
 const status=el('select',{'aria-label':'Statut de '+r.reference},Object.entries(STATUS).map(([k,t])=>{const o=el('option',{value:k,text:t});if(k===r.status)o.selected=true;return o;}));
 const amount=el('input',{type:'number',min:'0',step:'0.01',value:r.amount_ttc??'','aria-label':'Montant TTC'});
 const tracking=el('input',{type:'text',maxlength:'300',value:r.tracking||'',placeholder:'Numéro ou lien https:// de suivi','aria-label':'Suivi du colis'});
 const note=el('textarea',{maxlength:'2000',rows:'2',placeholder:'Message visible par le client','aria-label':'Message au client'});note.value=r.note||'';
 const save=el('button',{type:'button',class:'btn',text:'Enregistrer'});const msg=el('span',{class:'espace-saved',role:'status'});
 save.addEventListener('click',async()=>{save.disabled=true;msg.textContent='';
  try{await api('/rest/v1/requests?id=eq.'+encodeURIComponent(r.id),{method:'PATCH',prefer:'return=minimal',body:{status:status.value,amount_ttc:amount.value===''?null:Number(amount.value),tracking:tracking.value.trim()||null,note:note.value.trim()||null}});msg.textContent='Enregistré';}
  catch(err){msg.textContent=err.message;}finally{save.disabled=false;}});
 return el('article',{class:'espace-card espace-card--admin','data-status':r.status},
  el('header',{class:'espace-card-head'},el('div',{},el('p',{class:'espace-ref',text:r.reference+' · '+date(r.created_at)}),el('h3',{text:r.objet||r.produit||'Demande de devis'}),el('p',{class:'espace-date',text:r.client_email+(r.structure?' · '+r.structure:'')})),el('span',{class:'espace-badge','data-status':r.status,text:STATUS[r.status]})),
  details(r),r.message?el('p',{class:'espace-message',text:r.message}):null,
  el('div',{class:'espace-admin-form'},el('label',{},'Statut',status),el('label',{},'Montant TTC (€)',amount),el('label',{},'Suivi du colis',tracking),el('label',{class:'full'},'Message au client',note),el('div',{class:'espace-admin-actions'},save,msg)));
}
async function adminView(){
 const user=await me();root.querySelectorAll('.espace-user').forEach(n=>n.textContent=user.email);
 const isAdmin=await api('/rest/v1/rpc/is_admin',{method:'POST',body:{}});
 if(!isAdmin){show('denied');return;}
 const list=await api('/rest/v1/requests?select=*&order=created_at.desc');
 const box=root.querySelector('.espace-list'),filter=root.querySelector('.espace-filter');
 const render=()=>{box.replaceChildren(...list.filter(r=>!filter.value||r.status===filter.value).map(adminRow));root.querySelector('.espace-count').textContent=`${list.length} demande${list.length>1?'s':''} au total`;};
 filter.addEventListener('change',render);render();show('dashboard');
}

(async()=>{
 if(linkError)flash('Le lien de connexion n’est plus valable. Demandez-en un nouveau.','error');
 if(!(await session())){show('login');return;}
 show('loading');
 try{await(mode==='admin'?adminView():clientView());}
 catch(err){flash(err.message,'error');show(read()?'dashboard':'login');}
})();
})();
