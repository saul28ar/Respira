import { catalog } from '../data.js';
import { favorites } from '../storage.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';

const scenes = {breath:'lago',calm:'meditacion',anxiety:'consejos',sleep:'meditacion',selflove:'consejos',grounding:'tecnicas',muscle:'tecnicas',reframe:'lago',journal:'gatito',caffeine:'consejos',move:'tecnicas',unplug:'lago',talk:'consejos'};
const symbols = {breath:'breath',calm:'lotus',anxiety:'sun',sleep:'moon',selflove:'heart',grounding:'leaf',muscle:'bolt',reframe:'spark',journal:'journal',caffeine:'bulb',move:'sun',unplug:'leaf',talk:'heart'};
const tabs = [['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];

function navigation(className) {
  return `<nav class="${className}" aria-label="Navegación principal">${tabs.map(([route,label,symbol])=>`<a href="#${route}" data-go="${route}" class="${route==='methods'?'m10-active':''}" ${route==='methods'?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span>${route==='methods'?'<i class="m10-active-dot" aria-hidden="true"></i>':''}</a>`).join('')}</nav>`;
}

// Métodos 10 · Jardín ligero. Conserva los métodos y favoritos de la app.
export function renderMethods() {
  const selected = new Set(favorites());
  return `<div class="methods-jardin"><main class="m10-main">
    <header class="m10-topbar"><a class="m10-brand" href="#welcome" data-go="welcome" aria-label="Respira, tu espacio de calma"><img src="./imagenes/welcome/logo-aprobado-v2.png" width="1774" height="887" alt="Respira. Tu espacio de calma."></a>${navigation('m10-top-nav')}<button class="m10-menu" type="button" aria-label="Más opciones" data-go="more">${icon('menu')}</button></header>
    <section class="m10-intro" aria-labelledby="methods-title"><div class="m10-intro-copy"><span class="m10-eyebrow">A TU RITMO</span><h1 id="methods-title">Encuentra tu momento</h1><p>No tienes que hacerlo todo. Elige algo que te venga bien hoy.</p></div><div class="m10-intro-art" aria-hidden="true"><img class="m10-cloud" src="./imagenes/mascotas/nubecita.png" width="724" height="724" alt=""></div></section>
    <div class="m10-section-line"><h2>Métodos para ti</h2><span class="m10-count">${Object.keys(catalog).length} opciones, a tu ritmo</span></div>
    <section class="m10-method-grid" aria-label="Todos los métodos de Respira">${Object.entries(catalog).map(([id,item])=>`<article class="m10-method-card m10-tone-${safe(item.color)}" data-method-id="${id}"><button class="m10-method-open" type="button" data-open="${id}" aria-label="Abrir ${safe(item.title)}"><span class="m10-method-picture ${id==='journal'?'m10-picture-cat':''}"><img src="./imagenes/inicio-web/${scenes[id]}-hd.png" alt="" width="1774" height="887"><span class="m10-method-symbol">${icon(symbols[id])}</span></span><span class="m10-method-content"><span class="m10-method-title">${safe(item.title)}</span><span class="m10-method-sub">${safe(item.sub)}</span></span><span class="m10-method-arrow">${icon('chevron')}</span></button><button class="m10-favorite favorite-button ${selected.has(id)?'is-favorite':''}" type="button" data-fav="${id}" aria-label="${selected.has(id)?'Quitar de':'Añadir a'} favoritos: ${safe(item.title)}" aria-pressed="${selected.has(id)}">${icon('heart')}</button></article>`).join('')}</section>
  </main>${navigation('m10-bottom-nav')}</div>`;
}
