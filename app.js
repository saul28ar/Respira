'use strict';
const app=document.getElementById('app');
// Fotografías locales: archivos originales sin alteraciones.
const welcomePhotos=['./fondos/fondo1.jpg','./fondos/fondo2.jpg','./fondos/fondo3.jpg','./fondos/fondo4.jpg'];
// Diez mensajes breves; rotan independientemente de las cuatro fotografías.
// No mostramos indicadores de progreso ni la cantidad de mensajes.
const welcomeMessages=[
  'Que el ruido espere; este instante es tuyo.',
  'También florecemos cuando descansamos.',
  'Hoy puedes caminar a tu propio ritmo.',
  'No hace falta llenar cada silencio.',
  'La calma también cabe en un minuto.',
  'Deja que tus pensamientos pasen como nubes.',
  'Hay días que se recorren paso a paso.',
  'Tu paz puede empezar en algo pequeño.',
  'No todo necesita resolverse hoy.',
  'Regálate un momento sin prisas.'
];
let slideshowTimer=null;
let currentSlide=0;
let currentMessage=0;
function stopWelcomeSlideshow(){
  if(slideshowTimer!==null){clearInterval(slideshowTimer);slideshowTimer=null}
}
function startWelcomeSlideshow(){
  stopWelcomeSlideshow();
  currentSlide=0;
  currentMessage=0;
  const photos=[...app.querySelectorAll('.welcome-slide')];
  const quotes=[...app.querySelectorAll('.welcome-quote')];
  if(photos.length<2)return;
  // Para quienes prefieren menos movimiento, mantenemos la imagen fija.
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  slideshowTimer=setInterval(()=>{
    if(document.hidden || view!=='welcome')return;
    const nextPhoto=(currentSlide+1)%photos.length;
    const nextMessage=(currentMessage+1)%quotes.length;
    // Imagen y mensaje cambian simultáneamente, cada uno en su propia secuencia.
    photos[nextPhoto].classList.add('is-active');
    photos[currentSlide].classList.remove('is-active');
    quotes[nextMessage].classList.add('is-active');
    quotes[nextMessage].setAttribute('aria-hidden','false');
    quotes[currentMessage].classList.remove('is-active');
    quotes[currentMessage].setAttribute('aria-hidden','true');
    currentSlide=nextPhoto;
    currentMessage=nextMessage;
  },10000);
}

const catalog={
 breath:{title:'Respiración 4-4-4-4',sub:'Una técnica para recuperar la calma',emoji:'💨',color:'blue',kind:'breath'},
 calm:{title:'Calma en 5 minutos',sub:'Un momento de atención plena',emoji:'🌿',color:'green',kind:'timer',duration:300,script:'Siéntate cómodamente. Nota cómo entra y sale el aire. Cuando aparezca un pensamiento, obsérvalo con amabilidad y vuelve a tu respiración.'},
 anxiety:{title:'Reducir la ansiedad',sub:'Relaja tu mente',emoji:'☀️',color:'yellow',kind:'timer',duration:600,script:'Siente el apoyo del suelo bajo tus pies. Suelta la tensión de los hombros. No necesitas resolverlo todo en este momento.'},
 sleep:{title:'Dormir mejor',sub:'Un descanso para cerrar el día',emoji:'🌙',color:'purple',kind:'timer',duration:600,script:'Afloja la mandíbula, descansa los hombros y respira suavemente. Dirige la atención a las sensaciones de tu cuerpo.'},
 selflove:{title:'Amor propio',sub:'Conecta contigo',emoji:'♡',color:'pink',kind:'timer',duration:480,script:'Reconoce lo que has hecho hoy, incluso las pequeñas cosas. Puedes tratarte con la misma amabilidad que darías a alguien querido.'},
 grounding:{title:'Técnica 5-4-3-2-1',sub:'Conecta con el presente · 2 min',emoji:'🖐️',color:'blue',kind:'ground'},
 muscle:{title:'Relajación muscular',sub:'Libera tensión · 3 min',emoji:'💪',color:'green',kind:'muscle'},
 reframe:{title:'Reencuadre mental',sub:'Cambia tu perspectiva · 2 min',emoji:'🧠',color:'purple',kind:'reframe'},
 journal:{title:'Escribe lo que sientes',sub:'Un espacio privado para ti',emoji:'📝',color:'yellow',kind:'journal'},
 caffeine:{title:'Evita la cafeína en exceso',sub:'En algunas personas aumenta el nerviosismo',emoji:'☕',color:'green',kind:'advice',script:'Observa si el café o las bebidas energéticas intensifican tu inquietud. Si es así, reduce el consumo gradualmente, especialmente por la tarde.'},
 move:{title:'Muévete un poco',sub:'El movimiento puede aliviar la tensión',emoji:'🚶',color:'yellow',kind:'advice',script:'Camina unos minutos, estírate suavemente o cambia de postura. Adapta la actividad a tus posibilidades y a cómo te sientes.'},
 unplug:{title:'Desconéctate un rato',sub:'Aléjate un momento de las pantallas',emoji:'📱',color:'pink',kind:'advice',script:'Prueba una pausa breve de las notificaciones. Mira por la ventana, bebe agua o toma contacto con lo que te rodea.'},
 talk:{title:'Habla con alguien',sub:'No tienes que afrontarlo todo a solas',emoji:'🫂',color:'blue',kind:'advice',script:'Si te resulta posible, conversa con alguien de confianza. Pedir acompañamiento también es una forma de cuidarte.'}
};
const groups={meditation:['calm','anxiety','sleep','selflove'],quick:['grounding','muscle','reframe','journal'],advice:['sleep','caffeine','move','unplug','talk']};
let view='welcome', activeId=null, running=false, remaining=0, interval=null, breathIndex=0, breathElapsed=0, breathCycles=0, groundStep=0, muscleStep=0;
const breathPhases=[['Inhala',4],['Mantén',4],['Exhala',4],['Mantén',4]];
const groundSteps=[['5 cosas que puedes ver','Mira a tu alrededor y nombra cinco objetos.'],['4 cosas que puedes sentir','Percibe el contacto de tu ropa, la silla o el suelo.'],['3 cosas que puedes oír','Escucha tres sonidos cercanos o lejanos.'],['2 cosas que puedes oler','Identifica dos aromas; si no los notas, recuerda algunos.'],['1 cosa que puedes saborear','Observa un sabor presente o toma un sorbo de agua.']];
const muscleSteps=[['Manos','Aprieta suavemente los puños por 5 segundos y suéltalos.'],['Hombros','Eleva suavemente los hombros, mantenlos 5 segundos y relaja.'],['Rostro','Arruga ligeramente la frente por 5 segundos y afloja.'],['Piernas','Tensa con suavidad las piernas por 5 segundos y suelta.'],['Descanso','Nota cómo se siente tu cuerpo. Respira con naturalidad.']];
function getStore(key,fallback){try{return JSON.parse(localStorage.getItem('respira_'+key))??fallback}catch{return fallback}}
function setStore(key,value){try{localStorage.setItem('respira_'+key,JSON.stringify(value));return true}catch{return false}}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function clearTimer(){if(interval!==null)clearInterval(interval);interval=null;running=false}
function navigate(next,id){clearTimer();view=next;activeId=id||null;groundStep=0;muscleStep=0;breathIndex=0;breathElapsed=0;breathCycles=0;render();window.scrollTo(0,0)}
function backhead(title){return `<div class="backhead"><button class="iconbtn" data-go="methods" aria-label="Volver">‹</button><strong>${safe(title)}</strong></div>`}
function bottom(active){return `<nav class="bottomnav" aria-label="Navegación principal">${[['home','⌂','Inicio'],['methods','▦','Métodos'],['favorites','♡','Favoritos'],['more','···','Más']].map(([id,ic,t])=>`<button class="navitem ${active===id?'active':''}" data-go="${id}" ${active===id?'aria-current="page"':''}><span class="navicon">${ic}</span>${t}</button>`).join('')}</nav>`}
function item(id){const x=catalog[id],fav=getStore('favorites',[]).includes(id);return `<div class="listbtn" style="cursor:default"><button class="round" data-open="${id}" aria-label="Abrir ${safe(x.title)}" style="border:0;background:var(--unused,#e6f7fc)">${x.emoji}</button><button class="copy" data-open="${id}" style="border:0;background:none;text-align:left;color:inherit;padding:0"><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></button><button class="iconbtn ${fav?'heart':''}" data-fav="${id}" aria-label="${fav?'Quitar de':'Añadir a'} favoritos: ${safe(x.title)}">${fav?'♥':'♡'}</button><button class="iconbtn" data-open="${id}" aria-label="Abrir">›</button></div>`}
function render(){let html='';
if(view==='welcome'){html=`<section class="welcome" aria-label="Bienvenida a Respira">
  <header class="welcome-top">
    <div class="welcome-overline"><span class="welcome-sparkle" aria-hidden="true">✦</span> UN MOMENTO PARA TI <span class="welcome-sparkle" aria-hidden="true">✦</span></div>
    <div class="welcome-quotes" aria-label="Frase para acompañarte">${welcomeMessages.map((text,i)=>`<span class="welcome-quote ${i===0?'is-active':''}" aria-hidden="${i!==0}">${text}</span>`).join('')}</div>
  </header>
  <div class="welcome-gallery">
    ${welcomePhotos.map((src,i)=>`<div class="welcome-slide ${i===0?'is-active':''}" style="--photo-matte:${['#256f79','#627f87','#294f5d','#527981'][i]}"><img class="welcome-photo" src="${src}" alt="" decoding="async" ${i===0?'fetchpriority="high"':'loading="lazy"'}></div>`).join('')}
    <div class="welcome-center"><img class="brandmark" src="./logo.svg" alt=""><h1>Respira</h1><p>Tu espacio de calma,<br>siempre contigo.</p></div>
  </div>
  <footer class="welcome-bottom"><button class="pill light full" data-go="home">Comenzar <span aria-hidden="true">→</span></button><small>Gratis · Sin registro</small></footer>
</section>`}
if(view==='home'){html=`<main class="view"><div class="brandhead"><img src="./logo.svg" alt=""><div><span class="eyebrow">Tu espacio de calma</span><h1>Hola ♡</h1></div></div><p class="muted">Tómate un momento, estás bien.</p><div class="intro"><div class="symbol">♡</div><div style="font-size:13px;line-height:1.5">El estrés es parte de la vida, pero no tiene que controlarte. Aquí tienes herramientas para sentirte mejor.</div></div><div class="tiles"><button class="tile blue" data-open="breath"><span class="tileicon">💨</span><strong>Respiración</strong><span>Calma tu mente en minutos →</span></button><button class="tile green" data-go="meditation"><span class="tileicon">🌿</span><strong>Meditación</strong><span>Enfócate y reduce la tensión →</span></button><button class="tile purple" data-go="quick"><span class="tileicon">🧠</span><strong>Técnicas rápidas</strong><span>Recursos para el momento →</span></button><button class="tile yellow" data-go="advice"><span class="tileicon">📋</span><strong>Consejos</strong><span>Hábitos y tips útiles →</span></button></div><div class="section note">🌱 Está bien necesitar una pausa. Respira a tu ritmo.</div></main>${bottom('home')}`}
if(view==='methods'){html=`<main class="view"><div class="topline"><div><span class="eyebrow">Explorar</span><h1>Métodos</h1></div><span style="font-size:33px">🌱</span></div><p class="muted">Encuentra una herramienta para este momento.</p><div class="list">${[['breath','Respiración guiada'],['meditation','Meditaciones'],['quick','Técnicas rápidas'],['advice','Consejos'],['journal','Mi espacio para escribir']].map(([dest,t])=>`<button class="listbtn" ${catalog[dest]?`data-open="${dest}"`:`data-go="${dest}"`}><span class="round">${({breath:'💨',meditation:'🌿',quick:'🧠',advice:'📋',journal:'📝'})[dest]}</span><span class="copy"><strong>${t}</strong></span><span class="chevron">›</span></button>`).join('')}</div></main>${bottom('methods')}`}
if(['meditation','quick','advice'].includes(view)){const headings={meditation:['Meditación','Dedica unos minutos a ti. No necesitas experiencia.'],quick:['Técnicas rápidas','Cuando no tienes mucho tiempo, estas técnicas pueden ayudarte.'],advice:['Consejos','Pequeños hábitos que pueden hacer una gran diferencia.']};html=`<main class="view">${backhead(headings[view][0])}<p class="muted center">${headings[view][1]}</p><div class="list">${groups[view].map(item).join('')}</div></main>${bottom('methods')}`}
if(view==='favorites'){const fav=getStore('favorites',[]).filter(i=>catalog[i]);html=`<main class="view"><h1>Favoritos ♡</h1><p class="muted">Tus métodos guardados para cuando más los necesites.</p>${fav.length?`<div class="list">${fav.map(item).join('')}</div>`:`<div class="empty">♡<h2>Aún no tienes favoritos</h2><p>Presiona el corazón de cualquier ejercicio para guardarlo aquí.</p><button class="pill" data-go="methods">Explorar métodos</button></div>`}</main>${bottom('favorites')}`}
if(view==='more'){html=`<main class="view"><h1>Más opciones</h1><div class="list"><button class="listbtn" data-open="journal"><span class="round">📝</span><span class="copy"><strong>Mi espacio para escribir</strong><small>Guardado solamente en este dispositivo</small></span>›</button><button class="listbtn" data-go="about"><span class="round">ℹ️</span><span class="copy"><strong>Acerca de Respira</strong><small>Información importante y privacidad</small></span>›</button></div></main>${bottom('more')}`}
if(view==='about'){html=`<main class="view">${backhead('Acerca de Respira')}<h2>Tu espacio de calma, siempre contigo.</h2><p>Respira es una aplicación gratuita con ejercicios sencillos de autocuidado emocional. No requiere una cuenta.</p><div class="note"><strong>Importante:</strong> Estas actividades no sustituyen la atención psicológica ni médica profesional. Si el malestar es intenso o persistente, busca ayuda profesional. Si estás en peligro inmediato, contacta con los servicios de emergencia de tu localidad.</div><div class="section"><h3>Privacidad</h3><p class="muted">Tus favoritos y notas se almacenan en este navegador mediante almacenamiento local; no se envían a un servidor. Pueden perderse al borrar datos del navegador. Si compartes el teléfono, otras personas podrían acceder a ellos.</p></div><div class="section"><h3>Fuentes de consulta</h3><p class="muted">OMS: salud mental y bienestar. Mayo Clinic: manejo del estrés. Los ejercicios son orientativos.</p></div><button class="softbtn" data-go="home">Volver al inicio</button></main>${bottom('more')}`}
if(view==='detail'){const x=catalog[activeId];if(!x){navigate('methods');return}let body='';
if(x.kind==='breath'){body=`<p class="muted center">La respiración consciente puede ayudarte a encontrar un momento de calma. Hazlo de forma cómoda, sin forzar el aire.</p><div class="breathwrap"><div class="breathcircle"><div id="breath-inner" class="breathinner"><strong id="phase">Inhala</strong><span id="phase-seconds">4 segundos</span></div></div><div class="breathhint" id="breath-status">Sigue el ritmo que te resulte cómodo.</div><p class="muted" id="breath-cycles">Ciclos completados: 0</p></div><div class="note">Si te mareas o sientes incomodidad, detente y vuelve a respirar naturalmente. Puedes reducir o eliminar las pausas.</div><div class="actions"><button class="pill" id="breath-toggle" data-action="breath-toggle">▶ Empezar</button><button class="softbtn" data-action="breath-reset">Reiniciar</button></div>`}
if(x.kind==='timer'){remaining=x.duration;body=`<div class="center section"><span class="tag">Ejercicio de atención plena</span><div class="count" id="clock">${clock(remaining)}</div><div class="progress"><div id="timer-progress" style="width:0%"></div></div></div><div class="card"><h3>Guía</h3><p>${safe(x.script)}</p><p class="muted">Realiza el ejercicio a tu ritmo. Puedes detenerte cuando quieras.</p></div><div class="actions"><button class="pill" id="timer-toggle" data-action="timer-toggle">▶ Empezar</button><button class="softbtn" data-action="timer-reset">Reiniciar</button></div>`}
if(x.kind==='ground'){body=`<div class="center section"><span class="tag" id="ground-count">Paso 1 de 5</span><h2 id="ground-title">${groundSteps[0][0]}</h2><p class="muted" id="ground-desc">${groundSteps[0][1]}</p><div class="progress"><div id="ground-progress" style="width:20%"></div></div></div><div class="note">Avanza con tranquilidad. Si alguna sensación es difícil de identificar, puedes pasar a la siguiente.</div><div class="actions"><button class="softbtn" data-action="ground-prev">Anterior</button><button class="pill" data-action="ground-next" id="ground-next">Siguiente →</button></div>`}
if(x.kind==='muscle'){body=`<div class="center section"><span class="tag" id="muscle-count">Paso 1 de 5</span><h2 id="muscle-title">${muscleSteps[0][0]}</h2><p class="muted" id="muscle-desc">${muscleSteps[0][1]}</p><div class="progress"><div id="muscle-progress" style="width:20%"></div></div></div><div class="note">No fuerces músculos o zonas doloridas. Evita tensar áreas lesionadas y detente si aparece dolor.</div><div class="actions"><button class="softbtn" data-action="muscle-prev">Anterior</button><button class="pill" data-action="muscle-next" id="muscle-next">Siguiente →</button></div>`}
if(x.kind==='reframe'){body=`<div class="card section"><h3>1. Identifica el pensamiento</h3><p>¿Qué me estoy diciendo ahora?</p><h3>2. Pregúntate</h3><p>¿Tengo pruebas de que eso siempre es cierto? ¿Existe otra explicación?</p><h3>3. Prueba una alternativa</h3><p>En lugar de “todo va a salir mal”, intenta “es difícil, pero puedo avanzar paso a paso”.</p></div><button class="pill full" data-open="journal">Escribir lo que siento</button>`}
if(x.kind==='journal'){const previous=getStore('journal','');body=`<p class="muted">Este espacio es tuyo. Escribe sin juzgar lo que sientes.</p><label for="journal-text"><strong>¿Cómo me siento hoy?</strong></label><textarea class="field section" id="journal-text" maxlength="10000" placeholder="Hoy me siento...">${safe(previous)}</textarea><div class="note">El texto se guarda solo en este dispositivo, no en una cuenta ni en la nube. Evita escribir información que no quieras dejar en un dispositivo compartido.</div><div class="actions"><button class="pill" data-action="journal-save">Guardar nota</button><button class="softbtn" data-action="journal-clear">Borrar nota</button></div><p id="journal-status" class="muted" role="status"></p>`}
if(x.kind==='advice'){body=`<div class="card section"><p>${safe(x.script)}</p></div><div class="note">Cada persona es distinta. Elige las recomendaciones que sean adecuadas para ti.</div>`}
const fav=getStore('favorites',[]).includes(activeId);html=`<main class="view">${backhead(x.title)}<div class="topline section"><span class="tag">${x.emoji} ${safe(x.title)}</span><button class="iconbtn ${fav?'heart':''}" data-fav="${activeId}" aria-label="${fav?'Quitar de':'Añadir a'} favoritos">${fav?'♥':'♡'}</button></div>${body}</main>${bottom('methods')}`}
app.innerHTML=html;
if(view==='welcome')startWelcomeSlideshow();else stopWelcomeSlideshow();}
function clock(seconds){return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}
function breathTick(){breathElapsed++;if(breathElapsed>=breathPhases[breathIndex][1]){breathElapsed=0;breathIndex=(breathIndex+1)%4;if(breathIndex===0)breathCycles++}updateBreath()}
function updateBreath(){const phase=document.getElementById('phase');if(!phase)return;phase.textContent=breathPhases[breathIndex][0];document.getElementById('phase-seconds').textContent=`${breathPhases[breathIndex][1]-breathElapsed} segundos`;document.getElementById('breath-cycles').textContent=`Ciclos completados: ${breathCycles}`;document.getElementById('breath-inner').classList.toggle('expand',breathIndex===0);document.getElementById('breath-status').textContent=running?'Respira cómodamente. Puedes pausar cuando quieras.':'Pausado. Continúa cuando quieras.';document.getElementById('breath-toggle').textContent=running?'Ⅱ Pausar':'▶ Continuar'}
function timerTick(){remaining=Math.max(remaining-1,0);document.getElementById('clock').textContent=clock(remaining);document.getElementById('timer-progress').style.width=`${100*(1-remaining/catalog[activeId].duration)}%`;if(remaining===0){clearTimer();document.getElementById('timer-toggle').textContent='✓ Terminado';document.getElementById('timer-toggle').disabled=true}}
function showStep(kind){const isGround=kind==='ground',idx=isGround?groundStep:muscleStep,steps=isGround?groundSteps:muscleSteps;document.getElementById(kind+'-count').textContent=`Paso ${idx+1} de ${steps.length}`;document.getElementById(kind+'-title').textContent=steps[idx][0];document.getElementById(kind+'-desc').textContent=steps[idx][1];document.getElementById(kind+'-progress').style.width=`${100*(idx+1)/steps.length}%`;document.getElementById(kind+'-next').textContent=idx===steps.length-1?'Volver a empezar':'Siguiente →'}
app.addEventListener('click',e=>{const el=e.target.closest('[data-go],[data-open],[data-fav],[data-action]');if(!el)return;if(el.dataset.go){navigate(el.dataset.go);return}if(el.dataset.open){navigate('detail',el.dataset.open);return}if(el.dataset.fav){const id=el.dataset.fav,arr=getStore('favorites',[]),next=arr.includes(id)?arr.filter(x=>x!==id):[...arr,id];setStore('favorites',next);render();return}const a=el.dataset.action;if(a==='breath-toggle'){if(running){clearTimer();updateBreath()}else{running=true;updateBreath();interval=setInterval(breathTick,1000)}}if(a==='breath-reset'){clearTimer();breathIndex=0;breathElapsed=0;breathCycles=0;updateBreath();document.getElementById('breath-toggle').textContent='▶ Empezar'}if(a==='timer-toggle'){if(remaining===0)return;if(running){clearTimer();el.textContent='▶ Continuar'}else{running=true;el.textContent='Ⅱ Pausar';interval=setInterval(timerTick,1000)}}if(a==='timer-reset'){clearTimer();remaining=catalog[activeId].duration;document.getElementById('clock').textContent=clock(remaining);document.getElementById('timer-progress').style.width='0%';const b=document.getElementById('timer-toggle');b.disabled=false;b.textContent='▶ Empezar'}if(a==='ground-next'||a==='ground-prev'){groundStep=a.endsWith('prev')?Math.max(0,groundStep-1):(groundStep+1)%5;showStep('ground')}if(a==='muscle-next'||a==='muscle-prev'){muscleStep=a.endsWith('prev')?Math.max(0,muscleStep-1):(muscleStep+1)%5;showStep('muscle')}if(a==='journal-save'){const ok=setStore('journal',document.getElementById('journal-text').value);document.getElementById('journal-status').textContent=ok?'Tu nota se guardó en este dispositivo.':'No fue posible guardar tu nota. Revisa el espacio o permisos del navegador.'}if(a==='journal-clear'){if(confirm('¿Quieres borrar tu nota guardada?')){const ok=setStore('journal','');if(ok){document.getElementById('journal-text').value='';document.getElementById('journal-status').textContent='Nota borrada.'}}}});
render();
if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
