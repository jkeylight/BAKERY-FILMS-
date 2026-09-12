(function(){
 // NOTE: Barba.js page-transition hijacking is intentionally DISABLED.
 // It swapped <main> without re-running each page's <script>,
 // which is why videos/text only appeared after a manual reload.
 // This file now only provides smooth-scroll + reveal helpers.
 // (window.barba is ignored on purpose — normal <a> navigation = full reload = videos always init.)

 function initFounderReveal(){
  var media=document.querySelectorAll('.founder-media');
  if(!media.length)return;
  document.documentElement.classList.add('js');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   media.forEach(function(item){item.classList.add('is-visible')});
   return;
  }
  var observer=new IntersectionObserver(function(entries){
   entries.forEach(function(entry){
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
   });
  },{threshold:.2});
  media.forEach(function(item){observer.observe(item)});
 }

 const curtain=document.querySelector('.page-transition .curtain');

 const smoothScroll=window.Lenis?new Lenis({duration:1.1,lerp:.08,smoothWheel:true,smoothTouch:true}):null;
 if(smoothScroll){
  window.siteLenis=smoothScroll;
  function raf(time){smoothScroll.raf(time);requestAnimationFrame(raf)}
  requestAnimationFrame(raf);
 }

 // Plain curtain wipe for in-page transitions only (no Barba container swap).
 initFounderReveal();

 if(window.Lenis){
  document.querySelectorAll('a[href]').forEach(function(a){
   if(a.hasAttribute('data-barba-prevent'))return;
   if(a.closest('[data-barba-prevent]'))return;
   a.addEventListener('click',function(e){
    if(a.hash&&a.pathname===location.pathname){
     e.preventDefault();
     var target=document.querySelector(a.hash);
    if(target&&window.siteLenis)window.siteLenis.scrollTo(target);
    }
   });
  });
 }
})();
