const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));
// Rozwijanie pełnej galerii bez wydłużania strony na starcie
const galleryMore=document.getElementById('gallery-more');
const galleryGrid=document.querySelector('.all-gallery-grid');
galleryMore?.addEventListener('click',()=>{const expanded=galleryGrid?.classList.toggle('expanded') ?? false;galleryMore.setAttribute('aria-expanded',String(expanded));galleryMore.innerHTML=expanded?'Pokaż mniej zdjęć <span>−</span>':'Zobacz wszystkie zdjęcia <span>＋</span>';});
document.getElementById('year').textContent=new Date().getFullYear();
const date=document.getElementById('guest-date');
if(date){const now=new Date();date.min=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);}
document.getElementById('inquiry-form')?.addEventListener('submit',e=>{
  e.preventDefault();const f=new FormData(e.currentTarget);
  const lines=['Dzień dobry, chciał(a)bym zapytać o nocleg.','Imię / firma: '+(f.get('name')||'-'),'Planowany przyjazd: '+(f.get('date')||'do ustalenia'),'Liczba osób: '+f.get('count'),'Rodzaj pobytu: '+f.get('type'),'Dodatkowe informacje: '+(f.get('message')||'brak')];
  const url='https://wa.me/48601461707?text='+encodeURIComponent(lines.join('\n'));
  window.open(url,'_blank','noopener');
});

// Pełna galeria zdjęć z nawigacją klawiaturą i przyciskami
const galleryButtons=[...document.querySelectorAll('.all-gallery-item')];
const lightbox=document.getElementById('lightbox');
if(lightbox && galleryButtons.length){
 let active=0;const image=lightbox.querySelector('figure img');const caption=lightbox.querySelector('figcaption');const count=lightbox.querySelector('.lightbox-count');
 const show=(index)=>{active=(index+galleryButtons.length)%galleryButtons.length;const thumb=galleryButtons[active].querySelector('img');image.src=thumb.src;image.alt=thumb.alt;caption.textContent=thumb.alt;count.textContent=(active+1)+' / '+galleryButtons.length;};
 const open=(index)=>{show(index);lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';lightbox.querySelector('.lightbox-close').focus();};
 const close=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';};
 galleryButtons.forEach((button,index)=>button.addEventListener('click',()=>open(index)));
 lightbox.querySelector('.lightbox-close').addEventListener('click',close);
 lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>show(active-1));
 lightbox.querySelector('.lightbox-next').addEventListener('click',()=>show(active+1));
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)close();});
 document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(active-1);if(e.key==='ArrowRight')show(active+1);});
}
