import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';

function isolate(markup) { return markup.replace(/class="([^"]*)"/g, (_, names) => 'class="' + names.split(/\s+/).filter(Boolean).map(name => 'm3-' + name).join(' ') + '"'); }
const tabs=[['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];
const nav=cls=>`<nav class="${cls}" aria-label="Navegación principal">${tabs.map(([id,label,symbol])=>`<a href="#${id}" data-go="${id}" class="${id==='more'?'active':''}" ${id==='more'?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span>${id==='more'?'<i class="active-dot" aria-hidden="true"></i>':''}</a>`).join('')}</nav>`;
const trio=()=>`<span class="trio" aria-hidden="true">${['brotecito','nubecita','lunita'].map(id=>`<img src="./imagenes/mascotas/${id}.png" width="724" height="724" alt="">`).join('')}</span>`;

export function renderMoreJardin(petId = null) {
  const pet = Object.hasOwn(pets, petId) ? pets[petId] : null;
  const companionAttrs = pet ? `href="#pet-detail/${safe(petId)}" data-pet-view="${safe(petId)}"` : 'href="#pet-select" data-go="pet-select"';
  return '<div class="more-jardin">' + isolate(`<div class="page"><div class="ambient" aria-hidden="true"></div><svg class="waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg><div class="frame">
 <header class="topbar"><a class="brand" href="#welcome" data-go="welcome"><img src="./imagenes/welcome/logo-aprobado-v2.png" width="1774" height="887" alt="Respira. Tu espacio de calma."></a>${nav('top-nav')}<a class="menu" href="#more" data-go="more" aria-label="Más opciones">${icon('menu')}</a></header>
 <main><section class="intro"><div class="intro-copy"><span class="eyebrow">ESTE ESPACIO ES TUYO</span><h1>Un poquito más</h1><p>Tu compañía, tus notas y lo que necesitas saber.</p></div><img class="intro-pet" src="./imagenes/mascotas/nubecita.png" alt="" width="724" height="724"></section>
 <section class="options" aria-label="Tu espacio en Respira">
  <a class="option journal" href="#detail/journal" data-open="journal"><div class="option-art"><img class="cat" src="./imagenes/inicio-web/gatito-hd.png" width="1536" height="1024" alt=""></div><div class="option-panel"><span class="symbol">${icon('journal')}</span><span class="option-copy"><strong>Mi espacio para escribir</strong><small>Lo que sientes también merece un lugar.</small></span><span class="arrow">${icon('chevron')}</span></div></a>
  <a class="option companion" ${companionAttrs}><div class="option-art">${pet ? `<span class="trio chosen-pet" aria-hidden="true"><img src="./imagenes/mascotas/${safe(petId)}.png" width="724" height="724" alt=""></span>` : trio()}</div><div class="option-panel"><span class="symbol">${icon('leaf')}</span><span class="option-copy"><strong>Mi compañía de hoy</strong><small>${pet ? `Hoy te acompaña ${safe(pet.name)}.` : 'Puedes elegir una compañía, si te apetece.'}</small></span><span class="arrow">${icon('chevron')}</span></div></a>
  <a class="option about" href="#about" data-go="about"><div class="option-art"><img class="landscape" src="./imagenes/inicio-web/lago-hd.png" alt="" width="1942" height="809"><span class="art-leaf">${icon('leaf')}</span></div><div class="option-panel"><span class="symbol">${icon('info')}</span><span class="option-copy"><strong>Acerca de Respira</strong><small>Conoce este espacio y cómo cuida tus datos.</small></span><span class="arrow">${icon('chevron')}</span></div></a>
 </section><aside class="quiet-note">${icon('leaf')}<p>Un momento pequeño también cuenta.</p></aside>
 </main><footer class="privacy">Tus notas y favoritos se guardan en este navegador y dispositivo.</footer>
 </div>${nav('bottom-nav')}</div>`) + '</div>';
}
