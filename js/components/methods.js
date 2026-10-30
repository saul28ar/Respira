import { catalog, pets } from '../data.js';
import { methodCategories } from '../method-categories.js';
import { favorites } from '../storage.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';

const scenes={breath:'lago',calm:'meditacion',anxiety:'consejos',sleep:'meditacion',selflove:'consejos',grounding:'tecnicas',muscle:'tecnicas',reframe:'lago',journal:'gatito',caffeine:'consejos',move:'tecnicas',unplug:'lago',talk:'consejos'};
const symbols={breath:'breath',calm:'lotus',anxiety:'sun',sleep:'moon',selflove:'heart',grounding:'leaf',muscle:'bolt',reframe:'spark',journal:'journal',caffeine:'bulb',move:'sun',unplug:'leaf',talk:'heart'};
const tabs=[['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];
const asset=name=>'./imagenes/'+name;

function isolate(markup) {
  return markup.replace(/class="([^"]*)"/g,(_,names)=>'class="'+names.split(/\s+/).filter(Boolean).map(name=>'m10-'+name).join(' ')+'"');
}
function navigation(className) {
  return `<nav class="${className}" aria-label="Navegación principal">${tabs.map(([route,label,symbol])=>`<a href="#${route}" data-go="${route}" class="${route==='methods'?'active':''}" ${route==='methods'?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span>${route==='methods'?'<i class="active-dot" aria-hidden="true"></i>':''}</a>`).join('')}</nav>`;
}
function picture(id) {
  return `<span class="method-picture ${id==='journal'?'picture-cat':''}"><img src="${asset('inicio-web/'+scenes[id]+'-hd.png')}" alt=""><span class="method-symbol">${icon(symbols[id])}</span></span>`;
}
function card(id,selected) {
  const item=catalog[id];
  return `<article class="method-card tone-${safe(item.color)}" data-method-id="${id}"><a class="method-open" href="#detail/${id}" data-open="${id}" aria-label="Abrir ${safe(item.title)}">${picture(id)}<span class="method-copy"><strong>${safe(item.title)}</strong><small>${safe(item.sub)}</small></span><span class="method-arrow">${icon('chevron')}</span></a><button class="favorite" type="button" data-fav="${id}" aria-label="${selected.has(id)?'Quitar de':'Añadir a'} favoritos: ${safe(item.title)}" aria-pressed="${selected.has(id)}">${icon('heart')}</button></article>`;
}
function category(category,selected) {
  return `<section class="category-section ${category.id==='escribir'?'writing-section':''}" data-category="${category.id}" id="m10-category-${category.id}" tabindex="-1" aria-labelledby="m10-title-${category.id}"><h2 class="category-heading" id="m10-title-${category.id}"><span class="category-symbol tone-${category.color}">${icon(category.icon)}</span><span class="category-copy"><span class="category-label">${category.title}</span><span class="category-description">${category.description}</span></span><span class="category-count">${category.ids.length} ${category.ids.length===1?'opción':'opciones'}</span></h2><div class="category-body"><div class="method-grid">${category.ids.map(id=>card(id,selected)).join('')}</div></div></section>`;
}
function chapterNavigation() {
  return `<nav class="chapter-nav" aria-label="Ir a una categoría">${methodCategories.map(category=>`<button type="button" data-method-category="${category.id}" aria-controls="m10-category-${category.id}">${icon(category.icon)}<span>${category.title}</span></button>`).join('')}</nav>`;
}

// Propuesta 1 aprobada: cinco secciones abiertas, favoritos y ejercicios reales.
export function renderMethods({petId=null}={}) {
  const selected=new Set(favorites());
  const companion=Object.hasOwn(pets,petId)?`<img class="intro-pet" src="${asset('mascotas/'+petId+'.png')}" data-companion-id="${petId}" alt="${safe(pets[petId].name)}, tu compañía de hoy" width="724" height="724">`:'';
  return '<div class="methods-jardin">'+isolate(`<div class="page"><div class="ambient" aria-hidden="true"></div><svg class="waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><image href="${asset('paisajes/ondas-original.png')}" width="941" height="1672"/></svg><div class="frame"><header class="topbar"><a class="brand" href="#welcome" data-go="welcome" aria-label="Respira, tu espacio de calma"><img src="${asset('welcome/logo-aprobado-v2.png')}" alt="Respira. Tu espacio de calma." width="1774" height="887"></a>${navigation('top-nav')}<a class="menu" href="#more" data-go="more" aria-label="Más opciones">${icon('menu')}</a></header><main><section class="intro" aria-labelledby="methods-title"><div class="intro-copy"><span class="eyebrow">A TU RITMO</span><h1 id="methods-title">Encuentra tu momento</h1><p>No tienes que hacerlo todo. Elige algo que te venga bien hoy.</p></div>${companion}</section><div class="section-line"><h2>Métodos para ti</h2><span>${Object.keys(catalog).length} opciones · ${methodCategories.length} categorías</span></div>${chapterNavigation()}<div class="categories">${methodCategories.map(item=>category(item,selected)).join('')}</div><p class="quiet-note">Un momento pequeño también cuenta.</p></main></div>${navigation('bottom-nav')}</div>`)+'</div>';
}
