'use strict';
const app=document.getElementById('app');
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
  brotecito:{name:'Brotecito',image:'./imagenes/perfiles/escena-brotecito.png',subtitle:'Un pequeño impulso para un gran día.',theme:'verde',essence:'Crecimiento y esperanza',story:'Brotecito nació de una pequeña semilla que descansó bajo la tierra. Aprendió que las raíces también crecen en silencio y que cada persona avanza a su propio ritmo.',personality:'Curioso, paciente y alentador.',quote:'No necesitas florecer todos los días para seguir creciendo.',messages:['¡Qué bonito verte por aquí! Podemos empezar con calma.','Un paso pequeñito también cuenta.','Descansar es parte de crecer.','Hoy no tienes que compararte con nadie.','¿Quieres regalarte un momento para ti?']},
  nubecita:{name:'Nubecita',image:'./imagenes/perfiles/escena-nubecita.png',subtitle:'Una respiración contigo, siempre.',theme:'azul',essence:'Ligereza y serenidad',story:'Nubecita nació de una brisa sobre el océano. Descubrió que el cielo puede ser hermoso incluso cuando pasan nubes oscuras: no tiene que despejarlo todo para acompañarte.',personality:'Dulce, soñadora y tranquila.',quote:'No todos los pensamientos necesitan quedarse.',messages:['Podemos ir despacito.','No tienes que resolverlo todo ahora.','Si te apetece, hagamos una pausa.','Respira como te resulte cómodo.','Los pensamientos pueden pasar como nubes.']},
  lunita:{name:'Lunita',image:'./imagenes/perfiles/escena-lunita.png',subtitle:'Encuentra tu equilibrio, siempre contigo.',theme:'lila',essence:'Equilibrio y conexión interior',story:'Lunita nació del reflejo de la luna en un lago silencioso. Aprendió que, aunque el agua se agite, su luz no desaparece. Le gusta acompañarte en los momentos de reflexión.',personality:'Reflexiva, serena y cariñosa.',quote:'A veces, para encontrarte, solo necesitas escucharte.',messages:['Tu voz interior merece un momento de escucha.','No necesitas tener todas las respuestas.','Tus emociones merecen espacio.','Puedes sentir muchas cosas a la vez.','¿Te gustaría escribir cómo va tu día?']}
};
const petProfiles={"brotecito":{"short":"Brotecito nació de una pequeña semilla que descansó bajo la tierra. Aprendió que las raíces también crecen en silencio y que cada persona avanza a su propio ritmo.","long":"En un valle escondido, donde la lluvia caía suavemente y las montañas protegían pequeñas flores silvestres, vivía una semillita que creía que nunca llegaría a crecer. Veía cómo las demás plantas florecían, mientras ella permanecía bajo la tierra. Una mañana comprendió que no estaba llegando tarde. Durante todo ese tiempo había estado formando sus raíces. Cuando finalmente apareció sobre la superficie, se convirtió en Brotecito, una pequeña criatura que decidió acompañar a quienes a veces sienten que avanzan demasiado despacio. Desde entonces recuerda a sus amigos que descansar también forma parte de crecer.","personality":"Curioso, optimista, juguetón, paciente y cariñoso.","meaning":"Crecimiento, esperanza y nuevos comienzos.","quote":"No necesitas florecer todos los días para seguir creciendo.","message":"Hoy también podemos empezar de nuevo. Un paso suave sigue siendo un paso.","activities":[["✿","Respirar juntos","Una pausa para comenzar de nuevo"],["✎","Escribir en mi diario","Un pensamiento amable para hoy"],["✧","Consejo para hoy","Un pequeño paso a tu ritmo"]],"color":"#3b958c","gradient":"linear-gradient(145deg,#eef8e7,#d2e8d7)"},"nubecita":{"short":"Nubecita nació de una brisa suave sobre el océano. Aprendió que los pensamientos y las emociones, como las nubes, llegan, cambian y pueden seguir su camino.","long":"Muy arriba, sobre un océano tranquilo, una pequeña nube apareció durante el primer amanecer de primavera. Al principio, Nubecita intentaba mantener siempre el cielo despejado. Cada vez que aparecía una nube oscura, se preocupaba y trataba de alejarla. Hasta que una tarde el viento le enseñó algo importante: el cielo no necesita estar completamente despejado para seguir siendo hermoso. Desde entonces, Nubecita viaja acompañando a quienes sienten que tienen demasiadas cosas en la mente. No intenta borrar sus emociones; simplemente les recuerda que pueden observarlas con paciencia.","personality":"Dulce, soñadora, tranquila, sensible y un poquito distraída.","meaning":"Calma, ligereza y atención al presente.","quote":"No todos los pensamientos necesitan quedarse.","message":"Tomemos un momento para respirar. Puedes hacerlo a tu ritmo; yo te acompaño.","activities":[["◌","Respirar juntos","Respira de la manera más cómoda para ti"],["☁","Hacer una pausa","Unos minutos sin exigencias"],["✧","Técnica rápida","Regresa suavemente al presente"]],"color":"#448cc0","gradient":"linear-gradient(145deg,#eaf7ff,#d3eaf8)"},"lunita":{"short":"Lunita nació del reflejo de la luna sobre un lago silencioso. Comprendió que las emociones pueden agitar nuestro mundo interior sin hacernos perder lo que somos.","long":"En lo profundo de un bosque existía un lago que reflejaba las estrellas. Cada noche, la luna se miraba sobre su superficie. Una vez, el viento agitó tanto el agua que su reflejo desapareció. La luna creyó que había perdido su luz, pero cuando el lago recuperó la tranquilidad, su imagen volvió a aparecer. De aquel reflejo nació Lunita, una pequeña criatura que comprendió que las emociones pueden agitar nuestro mundo interior sin hacernos perder lo que somos. Ahora acompaña a quienes desean conocerse mejor y encontrar pequeños espacios de serenidad.","personality":"Reflexiva, observadora, tierna, reservada y afectuosa.","meaning":"Equilibrio, serenidad y conexión interior.","quote":"A veces, para encontrarte, solo necesitas escucharte.","message":"Aquí tienes un espacio para ti. Escúchate con amabilidad.","activities":[["☾","Meditar juntos","Un momento tranquilo para ti"],["✎","Escribir en mi diario","Dale espacio a lo que sientes"],["✧","Relajarse","Un descanso para tu cuerpo y tu mente"]],"color":"#7f77b4","gradient":"linear-gradient(145deg,#f2eeff,#e3e9f9)"}};
let petProfileReturn='pet-select';
let petProfileExpanded=false;
let petActivityReturn=null;
function dateAtDevice(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
let sessionPetChoice=null;
let petSaveLocalOk=true;
let currentPetProfile='brotecito';
let petMessageIndex=0;
function companionToday(){const x=sessionPetChoice||getStore('petOfDay',null);return x&&x.day===dateAtDevice()&&pets[x.id]?x.id:null}
function companionSentence(){const id=companionToday();if(!id)return '';return pets[id].messages[petMessageIndex%pets[id].messages.length]}
function petHeader(){return `<header class="pet-header"><img src="./imagenes/inicio/logo.svg" width="40" height="40" alt=""><div><strong>Respira</strong><span>TU ESPACIO DE CALMA</span></div></header>`}

function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function clearTimer(){if(interval!==null)clearInterval(interval);interval=null;running=false}
// Historial ligero para Esc en computadora. No altera los botones actuales.
const viewHistory=[];
function navigate(next,id,restoreHistory=false){
  const targetId=id||null;
  if(!restoreHistory){
    if(next==='home'||next==='welcome'||next==='pet-confirm'){
      viewHistory.length=0;
    }else if(next!==view||targetId!==activeId){
      const previousIndex=viewHistory.findLastIndex(page=>page.view===next&&(next!=='detail'||page.activeId===targetId));
      if(previousIndex!==-1)viewHistory.splice(previousIndex);
      else viewHistory.push({view,activeId,currentPetProfile,petProfileReturn,petActivityReturn});
    }
  }
  clearTimer();view=next;activeId=targetId;groundStep=0;muscleStep=0;breathIndex=0;breathElapsed=0;breathCycles=0;render();window.scrollTo(0,0);
}
// Esc vuelve una pantalla atrás, salvo en las pantallas iniciales/de elección.
// Un diálogo abierto conserva su cierre nativo con Esc.
document.addEventListener('keydown',event=>{
  if(event.key!=='Escape'||event.repeat||event.altKey||event.ctrlKey||event.metaKey)return;
  if(document.querySelector('dialog[open]'))return;
  if(['welcome','pet-select','pet-confirm','home'].includes(view))return;
  const el=document.activeElement;
  if(el&&el.matches('input,textarea,select,[contenteditable="true"]'))return;
  let prior=viewHistory.pop();
  if(!prior){
    const fallback=view==='pet-library'?'pet-select':view==='pet-detail'?petProfileReturn:view==='about'?'more':view==='detail'&&petActivityReturn?'pet-detail':'home';
    prior={view:fallback,activeId:null,currentPetProfile,petProfileReturn,petActivityReturn};
  }
  event.preventDefault();
  currentPetProfile=prior.currentPetProfile;
  petProfileReturn=prior.petProfileReturn;
  petActivityReturn=prior.petActivityReturn;
  navigate(prior.view,prior.activeId,true);
});
function backhead(title){return `<div class="backhead"><button class="iconbtn" data-go="methods" aria-label="Volver">‹</button><strong>${safe(title)}</strong></div>`}
function bottom(active){
  // Cuatro imágenes oficiales: mismo diseño, solo cambia la sección resaltada.
  const tabs=[['home','Inicio'],['methods','Métodos'],['favorites','Favoritos'],['more','Más']];
  const selected=['home','methods','favorites','more'].includes(active)?active:'home';
  return `<nav class="bottomnav respira-tabbar" aria-label="Navegación principal">
    <img class="respira-tabbar-image" src="./imagenes/navegacion/${selected}.png" alt="" aria-hidden="true" draggable="false">
    ${tabs.map(([id,label])=>`<button type="button" class="navitem ${id===selected?'active':''}" data-go="${id}" aria-label="${label}" ${id===selected?'aria-current="page"':''}><span class="sr-only">${label}</span></button>`).join('')}
  </nav>`;
}
function item(id){const x=catalog[id],fav=getStore('favorites',[]).includes(id);return `<div class="listbtn" style="cursor:default"><button class="round" data-open="${id}" aria-label="Abrir ${safe(x.title)}" style="border:0;background:var(--unused,#e6f7fc)">${x.emoji}</button><button class="copy" data-open="${id}" style="border:0;background:none;text-align:left;color:inherit;padding:0"><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></button><button class="iconbtn ${fav?'heart':''}" data-fav="${id}" aria-label="${fav?'Quitar de':'Añadir a'} favoritos: ${safe(x.title)}">${fav?'♥':'♡'}</button><button class="iconbtn" data-open="${id}" aria-label="Abrir">›</button></div>`}
function render(){let html='';
if(view==='welcome'){
  html=`<main class="welcome25" aria-label="Bienvenida a Respira">
    <div class="welcome-final-artboard">
      <img class="welcome-final-art" src="./imagenes/portada/portada-aprobada.png" alt="" fetchpriority="high" draggable="false">
      <img class="welcome-sprout-leaf welcome-sprout-leaf-left" src="./imagenes/portada/hoja-izquierda.png" alt="" aria-hidden="true" draggable="false">
      <img class="welcome-sprout-leaf welcome-sprout-leaf-right" src="./imagenes/portada/hoja-derecha.png" alt="" aria-hidden="true" draggable="false">
      <button class="welcome25-cta" data-go="home" aria-label="Comenzar: elegir mi compañía de hoy"><span class="sr-only">Comenzar</span></button>
    </div>
    <div class="sr-only"><h1>Respira</h1><p>Tu espacio de calma. Pequeños momentos para una vida más tranquila.</p><p>Brotecito, Nubecita y Lunita junto a un lago de montañas, plantas y flores.</p></div>
  </main>`;
}
if(view==='home'){
  const cp=companionToday();
  // Portadas aprobadas 25/10/2026: conservar el PNG original, sin modificaciones.
  // Solo se selecciona el recurso correspondiente a la mascota del día.
  // Navegación, ejercicios, perfiles, favoritos y diario siguen siendo HTML y JS funcionales.
  const homeImage=cp?`./imagenes/inicio/capa-interfaz-${cp}.png`:'./imagenes/inicio/capa-interfaz-sin-compania.png';
  const areas=[
    ['home40-menu', 'data-go="more"', 'Abrir menú de opciones'],
    ...(cp?
      [[`home40-pet home40-pet-${cp}`,`data-pet-view="${cp}"`,`Abrir el perfil completo de ${pets[cp].name}`]]:
      [['home40-choose','data-go="pet-select"','Elegir mascota: volver a la pantalla de selección']]),
    ['home40-calm', 'data-open="grounding"', 'Necesito calma: comenzar técnica 5-4-3-2-1'],
    ['home40-breath', 'data-open="breath"', 'Respiración: abrir ejercicios para relajarte'],
    ['home40-meditation', 'data-go="meditation"', 'Meditación: encontrar un momento de calma'],
    ['home40-quick', 'data-go="quick"', 'Técnicas rápidas: para cuando lo necesites'],
    ['home40-advice', 'data-go="advice"', 'Consejos: pequeñas ideas para ti'],
    ['home40-diary', 'data-open="journal"', 'Mi espacio para escribir: compartir lo que sientes']
  ];
  html=`<main class="home40-page ${cp?'home40-haspet':'home40-nopet'}" aria-label="Inicio de Respira${cp?`, con ${safe(pets[cp].name)}`:', sin mascota elegida'}">
    <div class="home40-artboard">
      <img class="home40-art" src="${homeImage}" width="941" height="1672" alt="" aria-hidden="true" draggable="false" fetchpriority="high">
      <h1 class="sr-only">¡Qué bueno verte aquí! Hoy también es un buen día para cuidar de ti.</h1>
      ${areas.map(([cls,attr,label])=>`<button type="button" class="home40-hit ${cls}" ${attr} aria-label="${safe(label)}"><span class="sr-only">${safe(label)}</span></button>`).join('')}
    </div>
    <div class="home40-tail" aria-hidden="true"></div>
    ${bottom('home')}
  </main>`;
}
if(view==='pet-select'){
  // Ilustración intacta; la zona completa de «Quiénes somos??» abre la sección de perfiles.
  // No se superponen textos ni se modifica el diseño ilustrado.
  html=`<main class="pet34-page" aria-label="¿Quién te acompañará hoy?">
    <div class="pet34-artboard">
      <img class="pet34-art" src="./imagenes/seleccion/seleccion-aprobada.png" alt="¿Quién te acompañará hoy? Elige a quien quieras tener cerquita hoy. Sin prisas y a tu manera. Brotecito: Un pequeño impulso para un gran día. Nubecita: Una respiración contigo, siempre. Lunita: Encuentra tu equilibrio, siempre contigo. Los tres tienen la opción Elegir. Tu compañía es opcional. Puedes entrar a Respira sin elegir. Ahora no, ir al inicio." width="941" height="1672" draggable="false" fetchpriority="high">
      <button type="button" class="pet34-hit pet34-who" data-go="pet-library" aria-label="Quiénes somos: conocer a Brotecito, Nubecita y Lunita"><span class="sr-only">Conocer a las tres mascotas</span></button>
      <button type="button" class="pet34-hit pet34-pick pet34-pick-brotecito" data-action="pet-pick" data-pet-id="brotecito" aria-label="Elegir a Brotecito"></button>
      <button type="button" class="pet34-hit pet34-pick pet34-pick-nubecita" data-action="pet-pick" data-pet-id="nubecita" aria-label="Elegir a Nubecita"></button>
      <button type="button" class="pet34-hit pet34-pick pet34-pick-lunita" data-action="pet-pick" data-pet-id="lunita" aria-label="Elegir a Lunita"></button>
      <button type="button" class="pet34-hit pet34-skip" data-go="home" aria-label="Ahora no, ir al inicio"></button>
    </div>
  </main>`;
}
if(view==='pet-library'){
  const infos=[
    ['brotecito','Brotecito','Un pequeño impulso para un gran día.'],
    ['nubecita','Nubecita','Una respiración contigo, siempre.'],
    ['lunita','Lunita','Encuentra tu equilibrio, siempre contigo.']
  ];
  html=`<main class="pet-library" aria-label="Conoce a tus acompañantes">
    <header class="pet-library-header">
      <button class="pet-library-back" type="button" data-go="pet-select" aria-label="Volver a elegir acompañante">←</button>
      <span>SI QUIERES, CONOCE SU HISTORIA</span>
      <h1>Conoce a tus acompañantes</h1>
      <p>Elige a quién quieres conocer. Cada uno tiene una historia para compartir contigo.</p>
    </header>
    <div class="pet-library-items">${infos.map(([id,name,subtitle])=>`<button class="pet-library-card pet-library-${id}" type="button" data-pet-view="${id}" aria-label="Conocer el perfil de ${name}"><img src="./imagenes/mascotas/${id}.png" alt="" width="724" height="724" loading="lazy"><span><strong>${name}</strong><small>${subtitle}</small><em>Conocer su historia <span aria-hidden="true">→</span></em></span></button>`).join('')}</div>
  </main>`;
}
if(view==='pet-detail'){
  const p=pets[currentPetProfile],f=petProfiles[currentPetProfile];
  if(!p||!f){navigate('pet-select');return}
  const chosen=companionToday();
  const chosenText=chosen===currentPetProfile?'Es tu compañía de hoy. Mañana podrás elegir nuevamente. ♡':chosen?`Hoy te acompaña ${safe(pets[chosen].name)}. Mañana podrás elegir nuevamente. ♡`:'Puedes elegir a tu compañía de hoy o seguir explorando Respira. ♡';
  const petActions={
    brotecito:['breath','journal','move'],
    nubecita:['breath','calm','grounding'],
    lunita:['calm','journal','muscle']
  };
  const activities=f.activities.map(([icon,title,subtitle],idx)=>`<button class="pet23-activity" data-open="${petActions[currentPetProfile][idx]}" aria-label="${safe(title)}: ${safe(subtitle)}"><span class="pet23-act-icon" aria-hidden="true">${safe(icon)}</span><span class="pet23-act-copy"><strong>${safe(title)}</strong><small>${safe(subtitle)}</small></span><span class="pet23-act-arrow" aria-hidden="true">›</span></button>`).join('');
  html=`<main class="pet-page pet31-page pet31-${p.theme}" aria-label="Perfil de ${safe(p.name)}">
    <div class="pet31-artboard">
      <img class="pet31-art" src="./imagenes/perfiles/${currentPetProfile}.png" width="941" height="1672" alt="Perfil ilustrado de ${safe(p.name)}, con su paisaje natural, un mensajito y las tarjetas Su historia, Su personalidad y Lo que representa" draggable="false" fetchpriority="high">
      <button class="pet31-hit pet31-back" type="button" data-go="${petProfileReturn}" aria-label="Volver a la pantalla anterior"><span class="sr-only">Volver</span></button>
      <button class="pet31-hit pet31-card pet31-card-story" type="button" data-action="pet31-open" data-section="story" aria-label="Leer la historia completa de ${safe(p.name)}"><span class="sr-only">Abrir Su historia</span></button>
      <button class="pet31-hit pet31-card pet31-card-personality" type="button" data-action="pet31-open" data-section="personality" aria-label="Conocer la personalidad de ${safe(p.name)}"><span class="sr-only">Abrir Su personalidad</span></button>
      <button class="pet31-hit pet31-card pet31-card-meaning" type="button" data-action="pet31-open" data-section="meaning" aria-label="Descubrir lo que representa ${safe(p.name)}"><span class="sr-only">Abrir Lo que representa</span></button>
    </div>
    <div class="pet31-more">
      <blockquote class="pet23-quote">“${safe(f.quote)}”</blockquote>
      <section class="pet23-acts"><h2>Hoy pueden hacer juntos…</h2><p>Elige algo que te venga bien. Sin ninguna prisa.</p>${activities}</section>
      <footer class="pet23-end"><p>${chosenText}</p>${!chosen?`<button class="pet23-footer-btn" data-action="pet-pick" data-pet-id="${currentPetProfile}">Elegir a ${safe(p.name)} <span aria-hidden="true">→</span></button>`:`<button class="pet23-footer-btn" data-go="home">Volver al inicio <span aria-hidden="true">→</span></button>`}</footer>
    </div>
    <dialog class="pet31-dialog" id="pet31-dialog" aria-labelledby="pet31-dialog-title">
      <button type="button" class="pet31-dialog-close" data-action="pet31-close" aria-label="Cerrar información">×</button>
      <div id="pet31-dialog-content"></div>
    </dialog>
  </main>`;
}
if(view==='pet-confirm'){
  const id=companionToday();
  if(!id){navigate('pet-select');return}
  const p=pets[id];
  html=`<main class="pet-page pet-confirm-page">${petHeader()}<div class="pet-confirm-copy"><span class="pet-confetti" aria-hidden="true">✧ ✿ ✧</span><h1>¡${safe(p.name)} te acompañará hoy!</h1><p>Qué bonito tenerte por aquí.<br>Hoy podemos avanzar a tu ritmo.</p></div><img class="pet-confirm-scene" src="${p.image}" alt="${safe(p.name)} en su paisaje original"><blockquote class="pet-quote">“${safe(p.quote)}”</blockquote>${!petSaveLocalOk?'<p class="pet-storage-warning">Tu elección funciona ahora, pero no se pudo guardar para la próxima visita en este dispositivo.</p>':''}<button class="pet-primary" data-go="home">Comenzar <span aria-hidden="true">→</span></button><p class="pet-confirm-tomorrow">Mañana podrás elegir de nuevo ♡</p></main>`
}
if(['methods','meditation','quick','advice','favorites'].includes(view)){
  const groupTitles={methods:'Explora los métodos',meditation:'Meditación',quick:'Técnicas rápidas',advice:'Consejos',favorites:'Mis favoritos'};
  const ids=view==='favorites'?getStore('favorites',[]).filter(id=>catalog[id]):view==='methods'?['breath','calm','grounding','muscle','journal','sleep','selflove','move']:groups[view];
  html=`<main class="view">${view==='methods'?'<span class="eyebrow">UN MOMENTO PARA TI</span>':''}<h1>${groupTitles[view]}</h1><p class="muted">${view==='favorites'?'Tus ejercicios guardados para cuando los necesites.':'Elige lo que te resulte útil y hazlo a tu ritmo.'}</p><div class="list">${ids.length?ids.map(item).join(''):'<div class="empty">Todavía no hay ejercicios guardados.</div>'}</div></main>${bottom(view==='favorites'?'favorites':'methods')}`;
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
const fav=getStore('favorites',[]).includes(activeId);html=`<main class="view">${backhead(x.title)}<div class="topline section"><span class="tag">${x.emoji} ${safe(x.title)}</span><button class="iconbtn ${fav?'heart':''}" data-fav="${activeId}" aria-label="${fav?'Quitar de':'Añadir a'} favoritos">${fav?'♥':'♡'}</button></div>${body}${petActivityReturn?`<button class="softbtn full" style="margin-top:18px" data-action="pet-activity-return">← Volver a mi compañía</button>`:''}</main>${bottom('methods')}`}
app.classList.toggle('pet-mode',['pet-select','pet-library','pet-detail','pet-confirm'].includes(view));
app.classList.toggle('welcome-mode',view==='welcome');
app.innerHTML=html;
}

// Respira 3.1: mascotas estáticas. Sus animaciones se desarrollarán por separado.

function clock(seconds){return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}
function breathTick(){breathElapsed++;if(breathElapsed>=breathPhases[breathIndex][1]){breathElapsed=0;breathIndex=(breathIndex+1)%4;if(breathIndex===0)breathCycles++}updateBreath()}
function updateBreath(){const phase=document.getElementById('phase');if(!phase)return;phase.textContent=breathPhases[breathIndex][0];document.getElementById('phase-seconds').textContent=`${breathPhases[breathIndex][1]-breathElapsed} segundos`;document.getElementById('breath-cycles').textContent=`Ciclos completados: ${breathCycles}`;document.getElementById('breath-inner').classList.toggle('expand',breathIndex===0);document.getElementById('breath-status').textContent=running?'Respira cómodamente. Puedes pausar cuando quieras.':'Pausado. Continúa cuando quieras.';document.getElementById('breath-toggle').textContent=running?'Ⅱ Pausar':'▶ Continuar'}
function timerTick(){remaining=Math.max(remaining-1,0);document.getElementById('clock').textContent=clock(remaining);document.getElementById('timer-progress').style.width=`${100*(1-remaining/catalog[activeId].duration)}%`;if(remaining===0){clearTimer();document.getElementById('timer-toggle').textContent='✓ Terminado';document.getElementById('timer-toggle').disabled=true}}
function showStep(kind){const isGround=kind==='ground',idx=isGround?groundStep:muscleStep,steps=isGround?groundSteps:muscleSteps;document.getElementById(kind+'-count').textContent=`Paso ${idx+1} de ${steps.length}`;document.getElementById(kind+'-title').textContent=steps[idx][0];document.getElementById(kind+'-desc').textContent=steps[idx][1];document.getElementById(kind+'-progress').style.width=`${100*(idx+1)/steps.length}%`;document.getElementById(kind+'-next').textContent=idx===steps.length-1?'Volver a empezar':'Siguiente →'}
function openPet31Info(section){
 const pet=pets[currentPetProfile],data=petProfiles[currentPetProfile];
 const dialog=document.getElementById('pet31-dialog');
 const content=document.getElementById('pet31-dialog-content');
 if(!pet||!data||!dialog||!content)return;
 const intro={story:'La historia de',personality:'La personalidad de',meaning:'Lo que representa'};
 if(!Object.prototype.hasOwnProperty.call(intro,section))return;
 const title=section==='story'?'Su historia':section==='personality'?'Su personalidad':'Lo que representa';
 let body='';
 if(section==='story')body=`<p>${safe(data.short)}</p><p>${safe(data.long)}</p>`;
 if(section==='personality')body=`<p class="pet31-details-lead">${safe(data.personality)}</p><p class="pet31-details-foot">Cada compañía tiene su propia manera de cuidarte. Descubre la historia de ${safe(pet.name)} cuando te apetezca.</p>`;
 if(section==='meaning')body=`<p class="pet31-details-lead">${safe(data.meaning)}</p><blockquote>“${safe(data.quote)}”</blockquote>`;
 const symbol=section==='story'?'✧':section==='personality'?'♡':'✦';
 content.innerHTML=`<div class="pet31-dialog-symbol" aria-hidden="true">${symbol}</div><span class="pet31-dialog-eyebrow">${safe(pet.name)} · TU ESPACIO DE CALMA</span><h2 id="pet31-dialog-title">${title}</h2><div class="pet31-dialog-text">${body}</div>`;
 try{dialog.showModal()}catch(err){dialog.setAttribute('open','')}
}
app.addEventListener('click',e=>{const el=e.target.closest('[data-go],[data-open],[data-fav],[data-action],[data-pet-view]');if(!el)return;if(el.dataset.petView){petProfileReturn=['pet-select','pet-library'].includes(view)?view:'home';currentPetProfile=el.dataset.petView;petProfileExpanded=false;navigate('pet-detail');return}if(el.dataset.go){if(view==='welcome'&&el.dataset.go==='home'&&!companionToday()){navigate('pet-select')}else{navigate(el.dataset.go)}return}if(el.dataset.open){petActivityReturn=view==='pet-detail'?currentPetProfile:null;navigate('detail',el.dataset.open);return}if(el.dataset.fav){const id=el.dataset.fav,arr=getStore('favorites',[]),next=arr.includes(id)?arr.filter(x=>x!==id):[...arr,id];setStore('favorites',next);render();return}const a=el.dataset.action;
if(a==='pet31-open'){openPet31Info(el.dataset.section);return;}
if(a==='pet31-close'){const dialog=document.getElementById('pet31-dialog');if(dialog)dialog.close();return;}

if(a==='pet-activity-return'){currentPetProfile=petActivityReturn||companionToday()||'brotecito';petProfileReturn='home';petProfileExpanded=false;petActivityReturn=null;navigate('pet-detail');return;}
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
if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {})); }

// Cerrar fichas al tocar fuera del panel (comportamiento nativo de dialog).
app.addEventListener('click',event=>{if(event.target instanceof HTMLDialogElement && event.target.id==='pet31-dialog')event.target.close()});
