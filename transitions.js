(function(){
 if(!window.barba||!window.gsap)return;

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
    await gsap.timeline()
     .set(curtain,{transformOrigin:'top'})
     .to(curtain,{scaleY:0,duration:.5,ease:'power4.inOut'});
   },
   async once(data){
    window.scrollTo(0,0);
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
