(function(){
 if(!window.barba||!window.gsap)return;

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
 if(!curtain)return;

 barba.init({
  preventRunning:true,
  transitions:[{
   name:'page-curtain',
   async leave(data){
    await gsap.timeline()
     .set(curtain,{transformOrigin:'bottom'})
     .to(curtain,{scaleY:1,duration:.5,ease:'power4.inOut'});
   },
   async enter(data){
    window.scrollTo(0,0);
    initFounderReveal();
    await gsap.timeline()
     .set(curtain,{transformOrigin:'top'})
     .to(curtain,{scaleY:0,duration:.5,ease:'power4.inOut'});
   },
   async once(data){
    window.scrollTo(0,0);
    initFounderReveal();
   }
  }]
 });

 if(window.Lenis){
  document.querySelectorAll('a[href]').forEach(function(a){
   if(a.hostname!==location.hostname)return;
   if(a.hasAttribute('data-barba-prevent'))return;
   if(a.closest('[data-barba-prevent]'))return;
   a.addEventListener('click',function(e){
    if(a.hash&&a.pathname===location.pathname){
     e.preventDefault();
     var target=document.querySelector(a.hash);
     if(target&&window.lenis)lenis.scrollTo(target);
    }
   });
  });
 }
})();
