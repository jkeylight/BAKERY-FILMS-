(function(){
'use strict';
var preloader=document.querySelector('.preloader');
function killPreloader() {
  if (preloader) { preloader.style.display='none'; }
  var first=document.querySelector('.scene-0')||document.querySelector('.scene');
  if(first){document.querySelectorAll('.scene').forEach(function(s){s.classList.remove('active')});first.classList.add('active');}
}
if(!window.gsap||!window.Lenis){killPreloader();return;}
var lenis=null;
try{lenis=new Lenis({duration:1.2,lerp:.075,smoothWheel:true,smoothTouch:true});}catch(e){killPreloader();return;}
// safety: never trap user behind preloader
setTimeout(function(){if(preloader&&getComputedStyle(preloader).display!=='none'&&!window.__bfStarted){killPreloader();}},4000);
const scenes=[...document.querySelectorAll('.scene')],num=document.querySelector('#num'),bar=document.querySelector('#bar');
const videoScenes=new Set(scenes.filter(scene=>scene.querySelector('.hero-video')));
let index=0,busy=false,open=false,startX=0;
const cardW=()=>Math.min(innerWidth*.68,960),cardH=()=>cardW()*9/16;

function raf(t){lenis.raf(t);requestAnimationFrame(raf)} requestAnimationFrame(raf);
window.__bfStarted=false;

function setUI(){num.textContent=String(index+1).padStart(2,'0');gsap.to(bar,{scaleX:(index+1)/scenes.length,duration:.7,ease:'power3.out'});}
function prep(scene,dir){
 const media=scene.querySelector('.image-frame,.video-wrap,.split');
 const text=scene.querySelectorAll('.headline,.eyebrow,.side-note,.video-caption,.cta,.video-play-state');
 gsap.set(media,{autoAlpha:0,scale:1.1,x:dir>0?'4%':'-4%'});
 gsap.set(text,{autoAlpha:0,y:dir>0?42:-42});
}
function enter(scene){
 const media=scene.querySelector('.image-frame,.video-wrap,.split');
 const text=scene.querySelectorAll('.headline,.eyebrow,.side-note,.video-caption,.cta,.video-play-state');
 if(videoScenes.has(scene)){
  const currentVideo=scene.querySelector('.hero-video'),desktopVideo=innerWidth>700;
    gsap.set(media,{autoAlpha:1,scale:1.02,...(desktopVideo?{x:0}:{}),width:cardW(),height:cardH(),borderRadius:14,borderColor:'rgba(255,255,255,.18)'});
  gsap.timeline()
   .to(text,{autoAlpha:1,y:0,duration:.8,stagger:.05,ease:'power4.out'},0)
     .to(media,{scale:1,...(desktopVideo?{x:0}:{}),width:'100%',height:'100%',borderRadius:0,borderColor:'rgba(255,255,255,0)',duration:1.2,ease:'power4.inOut'},.05);
  currentVideo.currentTime=0;currentVideo.play().catch(()=>{});
  setUI();
  return;
 }
 gsap.timeline().to(media,{autoAlpha:1,scale:1,x:0,duration:1.15,ease:'power4.out'},0)
 .to(text,{autoAlpha:1,y:0,duration:.85,stagger:.055,ease:'power4.out'},.25);
 setUI();
}
const intro=gsap.timeline();
const titleEl=document.getElementById('preloader-title');
const originalText=titleEl.textContent;
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!';
let glitchInterval;
function startGlitch(){
 let iteration=0;
 glitchInterval=setInterval(()=>{
  titleEl.textContent=originalText.split('').map((ch,i)=>{
   if(ch===' ')return ' ';
   if(i<iteration)return originalText[i];
   return chars[Math.floor(Math.random()*chars.length)];
  }).join('');
  iteration+=1/2;
  if(iteration>originalText.length){clearInterval(glitchInterval);titleEl.textContent=originalText;}
 },40);
}
intro.to('.preloader-bar i',{width:'100%',duration:1.25,ease:'power2.inOut'})
 .call(startGlitch,null,0)
 .to('.preloader-bar i',{opacity:0,duration:.3},1.25)
 .to('.preloader span',{opacity:0,duration:.3},1.25)
 .to('.preloader-mark',{opacity:0,scale:1.05,duration:.3,ease:'power2.in'},1.55)
 .to('.preloader',{yPercent:-100,duration:1,ease:'power4.inOut'})
 .add(()=>{window.__bfStarted=true;prep(scenes[0],1);enter(scenes[0])},'-=.45');

function go(dir){
 if(busy||open)return;
 const next=(index+dir+scenes.length)%scenes.length;if(next===index)return;
 busy=true;
 const out=scenes[index],inn=scenes[next];
 out.querySelector('.hero-video')?.pause();
 prep(inn,dir);gsap.set(inn,{autoAlpha:1});
 const outMedia=out.querySelector('.image-frame,.video-wrap,.split');
 const outText=out.querySelectorAll('.headline,.eyebrow,.side-note,.video-caption,.cta,.video-play-state');
 const tl=gsap.timeline({onComplete:()=>{gsap.set(out,{autoAlpha:0});index=next;busy=false;enter(inn)}});
 tl.to(outText,{y:dir>0?-45:45,autoAlpha:0,duration:.55,ease:'power3.in'},0);
 if(videoScenes.has(out)){
  tl.to(outMedia,{scale:1,width:cardW(),height:cardH(),borderRadius:14,borderColor:'rgba(255,255,255,.14)',duration:.85,ease:'power3.inOut'},0);
 }else{
  tl.to(outMedia,{scale:1.08,x:dir>0?'-4%':'4%',duration:.7,ease:'power3.inOut'},0);
 }
 if(!videoScenes.has(inn)){
  tl.to(inn.querySelector('.image-frame,.video-wrap,.split'),{autoAlpha:1,scale:1,x:0,duration:1.05,ease:'power4.out'},.18);
 }
}
document.querySelector('#next').onclick=()=>go(1);document.querySelector('#prev').onclick=()=>go(-1);
addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>16)go(e.deltaY>0?1:-1)},{passive:true});
addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowDown')go(1);if(e.key==='ArrowLeft'||e.key==='ArrowUp')go(-1);if(e.key==='Escape')closeMenu()});
document.querySelector('.stage').addEventListener('pointerdown',e=>startX=e.clientX);
document.querySelector('.stage').addEventListener('pointerup',e=>{const d=e.clientX-startX;if(Math.abs(d)>55)go(d<0?1:-1)});
addEventListener('mousemove',e=>{
 gsap.to('.cursor',{x:e.clientX,y:e.clientY,duration:.42,ease:'power3.out'});
 if(!open){const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);gsap.to(scenes[index].querySelectorAll('.image-frame img,.hero-video'),{x:x*-9,y:y*-7,duration:1,ease:'power2.out',overwrite:true});}
});
addEventListener('mouseenter',()=>gsap.to('.cursor',{scale:1}));addEventListener('mouseleave',()=>gsap.to('.cursor',{scale:0}));

const curtainL=document.querySelector('.curtain-left'),curtainR=document.querySelector('.curtain-right'),curtainWord=document.querySelector('.curtain strong'),menu=document.querySelector('.menu');
function openMenu(){
 if(open)return;open=true;lenis.stop();
 gsap.timeline().to([curtainL,curtainR],{scaleX:1,duration:.65,ease:'power4.inOut'})
 .to(curtainWord,{opacity:1,scale:1,duration:.35},.3)
 .set(menu,{visibility:'visible'})
 .to([curtainL,curtainR],{scaleX:0,duration:.7,ease:'power4.inOut'})
 .to(curtainWord,{opacity:0,duration:.2},'-=.5')
 .to(menu,{autoAlpha:1,duration:.35},'-=.45')
 .from('.menu nav a',{y:70,autoAlpha:0,stagger:.07,duration:.8,ease:'power4.out'},'-=.1');
}
function closeMenu(){
 if(!open)return;open=false;
 gsap.timeline().to(menu,{autoAlpha:0,duration:.25})
 .to([curtainL,curtainR],{scaleX:1,duration:.6,ease:'power4.inOut'})
 .to(curtainWord,{opacity:1,scale:1,duration:.25},.25)
 .to([curtainL,curtainR],{scaleX:0,duration:.7,ease:'power4.inOut'})
 .to(curtainWord,{opacity:0,duration:.2},'-=.5')
 .add(()=>{gsap.set(menu,{visibility:'hidden'});lenis.start()});
}
document.querySelector('.menu-open').onclick=openMenu;document.querySelector('.menu-close').onclick=closeMenu;

// Page-transition curtain helpers (no Barba — normal navigation = full reload so videos/text always init).
})();
