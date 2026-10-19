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
let messageBag=[];
// Elegimos al azar sin repetir frases hasta agotar las pendientes.
// Al reiniciar la bolsa, se evita repetir la última frase de inmediato.
function shuffledRemainingMessages(exceptIndex){
  const indices=welcomeMessages.map((_,index)=>index).filter(index=>index!==exceptIndex);
  for(let i=indices.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [indices[i],indices[j]]=[indices[j],indices[i]];
  }
  return indices;
}
function nextRandomMessage(){
  if(!messageBag.length)messageBag=shuffledRemainingMessages(currentMessage);
  return messageBag.pop();
}
function stopWelcomeSlideshow(){
  if(slideshowTimer!==null){clearInterval(slideshowTimer);slideshowTimer=null}
}
function startWelcomeSlideshow(){
  stopWelcomeSlideshow();
  currentSlide=0;
  const photos=[...app.querySelectorAll('.welcome-slide')];
  const quotes=[...app.querySelectorAll('.welcome-quote')];
  if(photos.length<2)return;
  // Si el dispositivo prefiere menos movimiento, el CSS elimina las transiciones.
  slideshowTimer=setInterval(()=>{
    if(document.hidden || view!=='welcome')return;
    const nextPhoto=(currentSlide+1)%photos.length;
    const nextMessage=nextRandomMessage();
    // Los dos cambian al mismo tiempo: el paisaje rota y la frase es aleatoria.
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

// Respira 2.0 — Mascotas oficiales: arte extraído SIN redibujar de la lámina aprobada.
const pets={
  brotecito:{name:'Brotecito',image:'./mascotas/brotecito.png',subtitle:'Un pequeño impulso para un gran día.',theme:'verde',essence:'Crecimiento y esperanza',story:'Brotecito nació de una pequeña semilla que descansó bajo la tierra. Aprendió que las raíces también crecen en silencio y que cada persona avanza a su propio ritmo.',personality:'Curioso, paciente y alentador.',quote:'No necesitas florecer todos los días para seguir creciendo.',messages:['¡Qué bonito verte por aquí! Podemos empezar con calma.','Un paso pequeñito también cuenta.','Descansar es parte de crecer.','Hoy no tienes que compararte con nadie.','¿Quieres regalarte un momento para ti?']},
  nubecita:{name:'Nubecita',image:'./mascotas/nubecita.png',subtitle:'Una respiración contigo, siempre.',theme:'azul',essence:'Ligereza y serenidad',story:'Nubecita nació de una brisa sobre el océano. Descubrió que el cielo puede ser hermoso incluso cuando pasan nubes oscuras: no tiene que despejarlo todo para acompañarte.',personality:'Dulce, soñadora y tranquila.',quote:'No todos los pensamientos necesitan quedarse.',messages:['Podemos ir despacito.','No tienes que resolverlo todo ahora.','Si te apetece, hagamos una pausa.','Respira como te resulte cómodo.','Los pensamientos pueden pasar como nubes.']},
  lunita:{name:'Lunita',image:'./mascotas/lunita.png',subtitle:'Encuentra tu equilibrio, siempre contigo.',theme:'lila',essence:'Equilibrio y conexión interior',story:'Lunita nació del reflejo de la luna en un lago silencioso. Aprendió que, aunque el agua se agite, su luz no desaparece. Le gusta acompañarte en los momentos de reflexión.',personality:'Reflexiva, serena y cariñosa.',quote:'A veces, para encontrarte, solo necesitas escucharte.',messages:['Tu voz interior merece un momento de escucha.','No necesitas tener todas las respuestas.','Tus emociones merecen espacio.','Puedes sentir muchas cosas a la vez.','¿Te gustaría escribir cómo va tu día?']}
};
function dateAtDevice(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
let sessionPetChoice=null;
let petSaveLocalOk=true;
let currentPetProfile='brotecito';
let petMessageIndex=0;
function companionToday(){const x=sessionPetChoice||getStore('petOfDay',null);return x&&x.day===dateAtDevice()&&pets[x.id]?x.id:null}
function companionSentence(){const id=companionToday();if(!id)return '';return pets[id].messages[petMessageIndex%pets[id].messages.length]}
function petHeader(){return `<header class="pet-header"><img src="./logo.svg" width="40" height="40" alt=""><div><strong>Respira</strong><span>TU ESPACIO DE CALMA</span></div></header>`}

function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function clearTimer(){if(interval!==null)clearInterval(interval);interval=null;running=false}
function navigate(next,id){clearTimer();view=next;activeId=id||null;groundStep=0;muscleStep=0;breathIndex=0;breathElapsed=0;breathCycles=0;render();window.scrollTo(0,0)}
function backhead(title){return `<div class="backhead"><button class="iconbtn" data-go="methods" aria-label="Volver">‹</button><strong>${safe(title)}</strong></div>`}
function bottom(active){return `<nav class="bottomnav" aria-label="Navegación principal">${[['home','⌂','Inicio'],['methods','▦','Métodos'],['favorites','♡','Favoritos'],['more','···','Más']].map(([id,ic,t])=>`<button class="navitem ${active===id?'active':''}" data-go="${id}" ${active===id?'aria-current="page"':''}><span class="navicon">${ic}</span>${t}</button>`).join('')}</nav>`}
function item(id){const x=catalog[id],fav=getStore('favorites',[]).includes(id);return `<div class="listbtn" style="cursor:default"><button class="round" data-open="${id}" aria-label="Abrir ${safe(x.title)}" style="border:0;background:var(--unused,#e6f7fc)">${x.emoji}</button><button class="copy" data-open="${id}" style="border:0;background:none;text-align:left;color:inherit;padding:0"><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></button><button class="iconbtn ${fav?'heart':''}" data-fav="${id}" aria-label="${fav?'Quitar de':'Añadir a'} favoritos: ${safe(x.title)}">${fav?'♥':'♡'}</button><button class="iconbtn" data-open="${id}" aria-label="Abrir">›</button></div>`}
function render(){let html='';
if(view==='welcome'){
  currentMessage=Math.floor(Math.random()*welcomeMessages.length);
  messageBag=shuffledRemainingMessages(currentMessage);
  html=`<section class="welcome" aria-label="Bienvenida a Respira">
  <header class="welcome-top">
    <div class="welcome-overline"><span class="welcome-sparkle" aria-hidden="true">✦</span> UN MOMENTO PARA TI <span class="welcome-sparkle" aria-hidden="true">✦</span></div>
    <div class="welcome-quotes" aria-label="Frase para acompañarte">${welcomeMessages.map((text,i)=>`<span class="welcome-quote ${i===currentMessage?'is-active':''}" aria-hidden="${i!==currentMessage}">${text}</span>`).join('')}</div>
  </header>
  <div class="welcome-gallery">
    ${welcomePhotos.map((src,i)=>`<div class="welcome-slide ${i===0?'is-active':''}" style="--photo-matte:${['#256f79','#627f87','#294f5d','#527981'][i]}"><img class="welcome-photo" src="${src}" alt="" decoding="async" ${i===0?'fetchpriority="high"':'loading="lazy"'}></div>`).join('')}
    <div class="welcome-center"><img class="brandmark" src="./logo.svg" alt=""><h1>Respira</h1><p>Tu espacio de calma,<br>siempre contigo.</p></div>
  </div>
  <footer class="welcome-bottom"><button class="pill light full welcome-cta" data-go="home" aria-label="Comenzar a usar Respira"><span class="welcome-cta-sparkle" aria-hidden="true">✦</span><span class="welcome-cta-label">Comenzar</span><span class="welcome-cta-arrow" aria-hidden="true">→</span></button><small>Gratis · Sin registro</small></footer>
</section>`}
if(view==='home'){html=`<main class="view home3-view">
  <header class="home3-top"><div class="home3-identity"><img src="./logo.svg" alt="" width="42" height="42"><div><strong>Respira</strong><span>TU ESPACIO DE CALMA</span></div></div><span class="home3-top-decoration" aria-hidden="true">✦</span></header>
  <section class="home3-hero" aria-label="Bienvenida al menú principal"><div class="home3-hero-landscape" aria-hidden="true"></div><div class="home3-hero-copy"><span class="home3-overline">UN MOMENTO PARA TI</span><h1>¡Qué bueno<br>verte por aquí!</h1><p>Hoy también es un buen día para cuidarte.</p></div>${companionToday()?`<button class="home3-companion-avatar" data-pet-view="${companionToday()}" aria-label="Conocer a ${safe(pets[companionToday()].name)}"><img src="${pets[companionToday()].image}" alt="${safe(pets[companionToday()].name)}"></button>`:`<span class="home3-brand-orb" aria-hidden="true">✧</span>`}</section>
  <button class="home3-calm" data-open="grounding" aria-label="Necesito calma: abrir técnica 5-4-3-2-1"><span class="home3-calm-heart" aria-hidden="true">♡</span><span class="home3-calm-copy"><strong>Necesito calma</strong><small>Vuelve al presente a tu ritmo</small></span><span class="home3-calm-go" aria-hidden="true">→</span></button>
  ${companionToday()?`<section class="home3-pet-note" aria-label="Tu mascota de hoy"><div class="home3-pet-note-head"><span class="home3-pet-dot" aria-hidden="true">✿</span><div><strong>${safe(pets[companionToday()].name)} te acompaña hoy</strong><small>Tu compañero de calma</small></div><button data-pet-view="${companionToday()}" class="home3-pet-see">Su historia ›</button></div><p class="pet-message-text" role="status">“${safe(companionSentence())}”</p><button class="home3-pet-other" data-action="pet-message">Otro mensajito ✨</button></section>`:`<button class="home3-choose-pet" data-go="pet-select">🌱 ☁️ 🌙 &nbsp; Elige tu compañía de hoy <span aria-hidden="true">→</span></button>`}
  <section class="home3-explore" aria-label="Ejercicios de bienestar"><div class="home3-section-heading"><h2>Encuentra tu momento</h2><span aria-hidden="true">✧</span></div>
  <div class="home3-cards">
    <button class="home3-card home3-blue" data-open="breath"><span class="home3-art" style="background-image:url('./arte/respiracion.svg')" aria-hidden="true"></span><span class="home3-card-copy"><strong>Respiración</strong><small>Una pausa consciente</small><span class="home3-card-arrow" aria-hidden="true">›</span></span></button>
    <button class="home3-card home3-peach" data-go="meditation"><span class="home3-art" style="background-image:url('./arte/meditacion.svg')" aria-hidden="true"></span><span class="home3-card-copy"><strong>Meditación</strong><small>Encuentra tu calma</small><span class="home3-card-arrow" aria-hidden="true">›</span></span></button>
    <button class="home3-card home3-mint" data-go="quick"><span class="home3-art" style="background-image:url('./arte/tecnicas.svg')" aria-hidden="true"></span><span class="home3-card-copy"><strong>Técnicas rápidas</strong><small>Para cuando lo necesites</small><span class="home3-card-arrow" aria-hidden="true">›</span></span></button>
    <button class="home3-card home3-cream" data-go="advice"><span class="home3-art" style="background-image:url('./arte/consejos.svg')" aria-hidden="true"></span><span class="home3-card-copy"><strong>Consejos</strong><small>Pequeñas ideas para ti</small><span class="home3-card-arrow" aria-hidden="true">›</span></span></button>
  </div></section>
  <button class="home3-journal" data-open="journal"><span class="home3-journal-picture" aria-hidden="true">✎</span><span class="home3-journal-text"><strong>Mi espacio para escribir</strong><small>Un lugar para tus pensamientos</small></span><span class="home3-journal-arrow" aria-hidden="true">›</span></button>
  <p class="home3-footnote">✦ &nbsp; Un pequeño momento también cuenta &nbsp; ✦</p>
</main>${bottom('home')}`}

if(view==='pet-select'){
  // Una sola pulsación sobre Elegir hoy guarda la elección y abre Inicio.
  // Conocer más sigue siendo completamente opcional.
  const selected=companionToday();
  html=`<main class="pet-page pet-select-page">${petHeader()}
    <div class="pet-select-intro"><span class="pet-sky" aria-hidden="true">✦ &nbsp; ✧</span><h1>${selected?'Tu compañía de hoy':'¿Quién te acompañará hoy?'}</h1><p>${selected?'Hoy te acompaña '+safe(pets[selected].name)+'. Mañana podrás elegir de nuevo.':'Elige a quien quieras tener cerquita hoy. Sin prisas y a tu manera.'}</p></div>
    <div class="pet-choices">${Object.entries(pets).map(([id,p])=>`<article class="pet-choice pet-choice-${p.theme}"><img src="${p.image}" alt="Ilustración original de ${safe(p.name)}" loading="lazy"><div class="pet-choice-main"><strong>${safe(p.name)}</strong><small>${safe(p.subtitle)}</small><div class="pet-choice-actions">${!selected?`<button class="pet-choice-pick" data-action="pet-pick" data-pet-id="${id}" aria-label="Elegir a ${safe(p.name)} para hoy">Elegir hoy <span aria-hidden="true">→</span></button>`:`<span class="pet-choice-chosen">${selected===id?'✓ Tu compañía de hoy':'Disponible mañana'}</span>`}<button class="pet-choice-learn" data-pet-view="${id}" aria-label="Conocer la historia de ${safe(p.name)}">Conocer más ›</button></div></div></article>`).join('')}</div>
    <div class="pet-choice-footer"><p>Tu compañía es opcional. Puedes entrar a Respira sin elegir. ♡</p><button class="pet-link" data-go="home">${selected?'Ir al inicio':'Ahora no, ir al inicio'}</button></div>
  </main>`
}
if(view==='pet-detail'){
  const p=pets[currentPetProfile];
  if(!p){navigate('pet-select');return}
  const chosen=companionToday();
  html=`<main class="pet-page pet-detail-page pet-detail-${p.theme}">
    <div class="pet-detail-top"><button class="pet-back" data-go="pet-select" aria-label="Volver a la elección">‹</button><span>SI QUIERES, CONOCE SU HISTORIA</span></div>
    <div class="pet-detail-landscape"><h1>${safe(p.name)}</h1><p>${safe(p.subtitle)}</p><img class="pet-detail-scene" src="${p.image}" alt="Ilustración original de ${safe(p.name)} con su entorno natural"></div>
    <div class="pet-detail-body">
      <section class="pet-story-lines"><div class="pet-story-line"><span class="pet-story-icon" aria-hidden="true">❧</span><div><h2>Su historia</h2><p>${safe(p.story)}</p></div></div><div class="pet-story-line"><span class="pet-story-icon" aria-hidden="true">♡</span><div><h2>Su personalidad</h2><p>${safe(p.personality)}</p></div></div><div class="pet-story-line"><span class="pet-story-icon" aria-hidden="true">✧</span><div><h2>Lo que representa</h2><p>${safe(p.essence)}</p></div></div></section>
      <blockquote class="pet-quote">“${safe(p.quote)}”</blockquote>
      ${!chosen?`<button class="pet-primary" data-action="pet-pick" data-pet-id="${currentPetProfile}">Elegir a ${safe(p.name)} <span aria-hidden="true">→</span></button>`:`<p class="pet-locked-text">${chosen===currentPetProfile?'Es tu compañía de hoy.':'Hoy te acompaña '+safe(pets[chosen].name)+'.'} Mañana podrás elegir nuevamente.</p><button class="pet-primary" data-go="home">Volver al inicio <span aria-hidden="true">→</span></button>`}
    </div>
  </main>`
}
if(view==='pet-confirm'){
  const id=companionToday();
  if(!id){navigate('pet-select');return}
  const p=pets[id];
  html=`<main class="pet-page pet-confirm-page">${petHeader()}<div class="pet-confirm-copy"><span class="pet-confetti" aria-hidden="true">✧ ✿ ✧</span><h1>¡${safe(p.name)} te acompañará hoy!</h1><p>Qué bonito tenerte por aquí.<br>Hoy podemos avanzar a tu ritmo.</p></div><img class="pet-confirm-scene" src="${p.image}" alt="${safe(p.name)} en su paisaje original"><blockquote class="pet-quote">“${safe(p.quote)}”</blockquote>${!petSaveLocalOk?'<p class="pet-storage-warning">Tu elección funciona ahora, pero no se pudo guardar para la próxima visita en este dispositivo.</p>':''}<button class="pet-primary" data-go="home">Comenzar <span aria-hidden="true">→</span></button><p class="pet-confirm-tomorrow">Mañana podrás elegir de nuevo ♡</p></main>`
}
if(view==='more'){html=`<main class="view"><h1>Más opciones</h1><div class="list"><button class="listbtn" data-open="journal"><span class="round">📝</span><span class="copy"><strong>Mi espacio para escribir</strong><small>Guardado solamente en este dispositivo</small></span>›</button><button class="listbtn" ${companionToday()?`data-pet-view="${companionToday()}"`:`data-go="pet-select"`}><span class="round">🌿</span><span class="copy"><strong>Mi compañía de hoy</strong><small>${companionToday()?safe(pets[companionToday()].name):"Elige una mascota para acompañarte"}</small></span>›</button><button class="listbtn" data-go="about"><span class="round">ℹ️</span><span class="copy"><strong>Acerca de Respira</strong><small>Información importante y privacidad</small></span>›</button></div></main>${bottom('more')}`}
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
app.classList.toggle('pet-mode',['pet-select','pet-detail','pet-confirm'].includes(view));
app.innerHTML=html;
if(view==='welcome')startWelcomeSlideshow();else stopWelcomeSlideshow();}
function clock(seconds){return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}
function breathTick(){breathElapsed++;if(breathElapsed>=breathPhases[breathIndex][1]){breathElapsed=0;breathIndex=(breathIndex+1)%4;if(breathIndex===0)breathCycles++}updateBreath()}
function updateBreath(){const phase=document.getElementById('phase');if(!phase)return;phase.textContent=breathPhases[breathIndex][0];document.getElementById('phase-seconds').textContent=`${breathPhases[breathIndex][1]-breathElapsed} segundos`;document.getElementById('breath-cycles').textContent=`Ciclos completados: ${breathCycles}`;document.getElementById('breath-inner').classList.toggle('expand',breathIndex===0);document.getElementById('breath-status').textContent=running?'Respira cómodamente. Puedes pausar cuando quieras.':'Pausado. Continúa cuando quieras.';document.getElementById('breath-toggle').textContent=running?'Ⅱ Pausar':'▶ Continuar'}
function timerTick(){remaining=Math.max(remaining-1,0);document.getElementById('clock').textContent=clock(remaining);document.getElementById('timer-progress').style.width=`${100*(1-remaining/catalog[activeId].duration)}%`;if(remaining===0){clearTimer();document.getElementById('timer-toggle').textContent='✓ Terminado';document.getElementById('timer-toggle').disabled=true}}
function showStep(kind){const isGround=kind==='ground',idx=isGround?groundStep:muscleStep,steps=isGround?groundSteps:muscleSteps;document.getElementById(kind+'-count').textContent=`Paso ${idx+1} de ${steps.length}`;document.getElementById(kind+'-title').textContent=steps[idx][0];document.getElementById(kind+'-desc').textContent=steps[idx][1];document.getElementById(kind+'-progress').style.width=`${100*(idx+1)/steps.length}%`;document.getElementById(kind+'-next').textContent=idx===steps.length-1?'Volver a empezar':'Siguiente →'}
app.addEventListener('click',e=>{const el=e.target.closest('[data-go],[data-open],[data-fav],[data-action],[data-pet-view]');if(!el)return;if(el.dataset.petView){currentPetProfile=el.dataset.petView;navigate('pet-detail');return}if(el.dataset.go){if(view==='welcome'&&el.dataset.go==='home'&&!companionToday()){navigate('pet-select')}else{navigate(el.dataset.go)}return}if(el.dataset.open){navigate('detail',el.dataset.open);return}if(el.dataset.fav){const id=el.dataset.fav,arr=getStore('favorites',[]),next=arr.includes(id)?arr.filter(x=>x!==id):[...arr,id];setStore('favorites',next);render();return}const a=el.dataset.action;
if(a==='pet-pick'){
  if(companionToday()){navigate('home');return}
  const petId=el.dataset.petId;
  if(!petId||!pets[petId])return;
  const choice={day:dateAtDevice(),id:petId};
  petSaveLocalOk=setStore('petOfDay',choice);
  sessionPetChoice=choice;
  petMessageIndex=0;
  navigate('home');return;
}
if(a==='pet-message'){
  if(!companionToday())return;
  petMessageIndex++;
  const text=app.querySelector('.pet-message-text');
  if(text)text.textContent='“'+companionSentence()+'”';return;
}
if(a==='breath-toggle'){if(running){clearTimer();updateBreath()}else{running=true;updateBreath();interval=setInterval(breathTick,1000)}}if(a==='breath-reset'){clearTimer();breathIndex=0;breathElapsed=0;breathCycles=0;updateBreath();document.getElementById('breath-toggle').textContent='▶ Empezar'}if(a==='timer-toggle'){if(remaining===0)return;if(running){clearTimer();el.textContent='▶ Continuar'}else{running=true;el.textContent='Ⅱ Pausar';interval=setInterval(timerTick,1000)}}if(a==='timer-reset'){clearTimer();remaining=catalog[activeId].duration;document.getElementById('clock').textContent=clock(remaining);document.getElementById('timer-progress').style.width='0%';const b=document.getElementById('timer-toggle');b.disabled=false;b.textContent='▶ Empezar'}if(a==='ground-next'||a==='ground-prev'){groundStep=a.endsWith('prev')?Math.max(0,groundStep-1):(groundStep+1)%5;showStep('ground')}if(a==='muscle-next'||a==='muscle-prev'){muscleStep=a.endsWith('prev')?Math.max(0,muscleStep-1):(muscleStep+1)%5;showStep('muscle')}if(a==='journal-save'){const ok=setStore('journal',document.getElementById('journal-text').value);document.getElementById('journal-status').textContent=ok?'Tu nota se guardó en este dispositivo.':'No fue posible guardar tu nota. Revisa el espacio o permisos del navegador.'}if(a==='journal-clear'){if(confirm('¿Quieres borrar tu nota guardada?')){const ok=setStore('journal','');if(ok){document.getElementById('journal-text').value='';document.getElementById('journal-status').textContent='Nota borrada.'}}}});
render();
if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
