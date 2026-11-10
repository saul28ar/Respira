import { adviceMethods } from '../advice-data.js';
import { adviceInfographics } from '../advice-infographic-data.js';
import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
const methodFor = id => typeof id === 'string' && Object.hasOwn(adviceMethods, id) ? adviceMethods[id] : null;
const infographicFor = id => typeof id === 'string' && Object.hasOwn(adviceInfographics, id) ? adviceInfographics[id] : null;
const adviceTitle = id => infographicFor(id)?.title || methodFor(id)?.title || 'Consejo';
const backButton = (label = 'Volver') => `<button type="button" class="back-button" data-advice-action="back">${icon('back')}<span>${safe(label)}</span></button>`;

function favoriteButton(id, favoriteIds) {
  const selected = favoriteIds.includes(id);
  return `<button type="button" class="advice-favorite${selected ? ' is-favorite' : ''}" data-advice-favorite="${safe(id)}" aria-pressed="${selected}" aria-label="${selected ? 'Quitar de favoritos' : 'Guardar en favoritos'}: ${safe(adviceTitle(id))}">${icon('heart')}</button>`;
}

function infographicMarkup(infographic) {
  const imageUrl = safe(infographic.image);
  const sources = infographic.sources.filter(({url}) => /^https:\/\//.test(url));
  return `<section class="advice-sheet" aria-label="Infografía">
    <figure class="advice-sheet-figure">
      <img src="${imageUrl}" width="1024" height="1536" alt="Ilustración de ${safe(infographic.title)}. El texto completo está disponible debajo." decoding="async">
      <figcaption><a href="${imageUrl}" target="_blank" rel="noopener noreferrer">Abrir imagen a tamaño completo${icon('arrow')}</a></figcaption>
    </figure>
    <details class="advice-sheet-details">
      <summary>Leer el texto de la infografía${icon('chevron')}</summary>
      <div class="advice-sheet-content">
        <p>${safe(infographic.subtitle)}</p>
        ${infographic.note ? `<p>${safe(infographic.note)}</p>` : ''}
        <h2>${safe(infographic.cloudTitle)}</h2>
        <p>${safe(infographic.cloud)}</p>
        ${infographic.blocks.map(([heading, body]) => `<h2>${safe(heading)}</h2><p>${safe(body)}</p>`).join('')}
        <p class="advice-sheet-footer">${safe(infographic.footer)}</p>
      </div>
    </details>
    ${sources.length ? `<details class="advice-sheet-details">
      <summary>Fuentes consultadas${icon('chevron')}</summary>
      <div class="advice-sheet-content"><ul>${sources.map(({url, label}) => `<li><a href="${safe(url)}" target="_blank" rel="noopener noreferrer">${safe(label)}</a></li>`).join('')}</ul></div>
    </details>` : ''}
  </section>`;
}

function guide(method) {
  const sourceLink = /^https:\/\//.test(method.source || '') ? `<a href="${safe(method.source)}" target="_blank" rel="noopener noreferrer">${safe(method.sourceLabel || 'Más información')}${icon('arrow')}</a>` : '';
  return `<details class="advice-guide"><summary>Cómo hacerlo con comodidad${icon('chevron')}</summary><div class="advice-guide-content"><ol>${(method.guide || []).map(item => `<li>${safe(item)}</li>`).join('')}</ol><p>${safe(method.comfort || '')}</p><details class="advice-benefits"><summary>¿Para qué puede servirte?${icon('chevron')}</summary><div><p>${safe(method.benefits || '')}</p>${sourceLink}</div></details></div></details>`;
}

function contentParts(value, fallbackTitle) {
  if (Array.isArray(value)) return [value[0] || fallbackTitle, value[1] || ''];
  if (value && typeof value === 'object') return [value.title || fallbackTitle, value.text || value.body || ''];
  return [fallbackTitle, value || ''];
}

function contentMarkup(value, fallbackTitle) {
  const [title, text] = contentParts(value, fallbackTitle);
  return `<h2>${safe(title)}</h2><p>${safe(text)}</p>`;
}

function generalPanel(id, method) {
  const initialExample = Math.floor(Math.random() * Math.max(1, method.examples?.length || 0));
  const tabs = [['today', 'Prueba hoy'], ['alternative', 'Si hoy cuesta'], ['example', 'Un ejemplo']];
  return `<section class="advice-reading-panel" aria-label="Una idea para poner en práctica"><span class="advice-panel-kicker">Consejos · Un cuidado posible</span><div class="advice-tabs" role="tablist" aria-label="Cómo probar este consejo">${tabs.map(([key, label], index) => `<button type="button" role="tab" id="advice-${safe(id)}-tab-${key}" aria-controls="advice-${safe(id)}-panel-${key}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-advice-tab="${key}">${label}</button>`).join('')}</div>
    <div class="advice-tab-panel" id="advice-${safe(id)}-panel-today" role="tabpanel" aria-labelledby="advice-${safe(id)}-tab-today" tabindex="0">${contentMarkup(method.today, 'Una pequeña idea para hoy')}</div>
    <div class="advice-tab-panel" id="advice-${safe(id)}-panel-alternative" role="tabpanel" aria-labelledby="advice-${safe(id)}-tab-alternative" tabindex="0" hidden>${contentMarkup(method.alternative, 'Hazlo más pequeño')}</div>
    <div class="advice-tab-panel" id="advice-${safe(id)}-panel-example" role="tabpanel" aria-labelledby="advice-${safe(id)}-tab-example" tabindex="0" hidden><div data-advice-example="${initialExample}" aria-live="polite" aria-atomic="true">${contentMarkup(method.examples?.[initialExample], 'Así podría verse en tu día')}</div><button type="button" class="secondary advice-example-button" data-advice-action="example">${icon('spark')}Otro ejemplo</button></div>
    <p class="advice-panel-note">Puedes adaptarlo a tu día, sin convertirlo en una obligación.</p>
  </section>`;
}

function foodPanel(method) {
  return `<section class="advice-reading-panel advice-food-panel" aria-labelledby="advice-food-title"><span class="advice-panel-kicker">Consejos · Una lectura para acompañarte</span><h2 id="advice-food-title">¿Qué necesitas ahora?</h2><p class="advice-panel-intro">Puedes elegir más de una opción.</p><div class="advice-food-options">${(method.foodOptions || []).map(([title, text], index) => `<details class="advice-food-choice"${index === 0 ? ' open' : ''}><summary>${safe(title)}<span aria-hidden="true">+</span></summary><p>${safe(text)}</p></details>`).join('')}</div><p class="advice-food-support">Si perder el control al comer se repite o te preocupa, un profesional puede ayudarte.</p></section><button type="button" class="secondary advice-journal" data-advice-action="journal">${icon('journal')}Escribir cómo me siento</button>`;
}

function griefPanel(method) {
  const reactions = method.griefReactions || [];
  const initial = reactions[0] || ['', '', ''];
  return `<section class="advice-reading-panel advice-grief-panel" aria-labelledby="advice-grief-title"><span class="advice-panel-kicker">Consejos · Un espacio para sentir</span><h2 id="advice-grief-title">El duelo no tiene un orden</h2><p class="advice-panel-intro">Estas son posibles reacciones, no etapas que debas completar. Puedes reconocer una, varias o ninguna, y volver a sentirlas en otros momentos.</p><div class="advice-reactions" role="group" aria-label="Posibles reacciones ante una pérdida">${reactions.map(([label], index) => `<button type="button" data-advice-reaction="${index}" aria-pressed="${index === 0}" aria-controls="advice-grief-reflection">${safe(label)}</button>`).join('')}</div><div class="advice-grief-reflection" id="advice-grief-reflection" aria-live="polite" aria-atomic="true"><h3 data-advice-reaction-title>${safe(initial[1])}</h3><p data-advice-reaction-text>${safe(initial[2])}</p></div><p class="advice-panel-note">No hay una forma correcta de sentir ni un plazo para hacerlo.</p></section>`;
}

export function renderAdviceDetail(id, { petId = null, favoriteIds = [] } = {}) {
  const method = methodFor(id);
  const infographic = infographicFor(id);
  if (!method && !infographic) return '';
  const selectedPet = typeof petId === 'string' && Object.hasOwn(pets, petId) ? petId : null;
  const petHtml = selectedPet ? `<img class="advice-intro-pet" data-companion-id="${safe(selectedPet)}" src="./imagenes/mascotas/${safe(selectedPet)}.png" width="724" height="724" alt="${safe(pets[selectedPet].name)} te acompaña">` : '';
  const eyebrow = id === 'food' ? 'UN ESPACIO SIN JUICIOS' : id === 'grief' ? 'UN ESPACIO PARA LO QUE SIENTES' : 'UN PEQUEÑO CUIDADO PARA TI';
  return `<main class="page detail-page consejos-detail" data-advice-id="${safe(id)}">
    ${backButton('Volver a consejos')}
    <div class="detail-heading advice-detail-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${safe(adviceTitle(id))}</h1></div>${favoriteButton(id, favoriteIds)}</div>
    <div class="advice-intro-heading"><p class="advice-intro">${safe(method?.intro || infographic?.subtitle || method?.subtitle)}</p>${petHtml}</div>
    ${infographic ? infographicMarkup(infographic) : ''}
    ${method ? `${guide(method)}
      ${id === 'food' ? foodPanel(method) : id === 'grief' ? griefPanel(method) : generalPanel(id, method)}
      <p class="advice-quiet">${id === 'food' ? 'Mereces alimentarte y recibir apoyo, sin culpa.' : id === 'grief' ? 'Puedes buscar compañía para atravesar lo que sientes.' : 'Puedes volver a esta idea cuando te venga bien.'}</p>` : ''}
  </main>`;
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

export function bindAdvice(scope, { open = () => {}, back = () => {}, toggleFavorite = () => {}, announce = () => {} } = {}) {
  const exampleQueues = new WeakMap();
  const withinScope = element => element && (scope === element || scope.contains(element));
  const selectTab = (button, focus = false) => {
    const panel = button.closest('.advice-reading-panel');
    panel.querySelectorAll('[data-advice-tab]').forEach(tab => {
      const active = tab === button;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panel.querySelector(`#${tab.getAttribute('aria-controls')}`).hidden = !active;
    });
    if (focus) button.focus();
  };

  const handleClick = event => {
    const button = event.target.closest('button[data-advice-action],button[data-advice-open],button[data-advice-favorite],button[data-advice-tab],button[data-advice-reaction]');
    if (!withinScope(button)) return;
    if (button.hasAttribute('data-advice-open')) {
      open(button.dataset.adviceOpen);
      return;
    }
    if (button.hasAttribute('data-advice-favorite')) {
      const id = button.dataset.adviceFavorite;
      const selected = button.getAttribute('aria-pressed') !== 'true';
      scope.querySelectorAll('[data-advice-favorite]').forEach(item => {
        if (item.dataset.adviceFavorite !== id) return;
        item.setAttribute('aria-pressed', String(selected));
        item.classList.toggle('is-favorite', selected);
        item.setAttribute('aria-label', `${selected ? 'Quitar de favoritos' : 'Guardar en favoritos'}: ${adviceTitle(id)}`);
      });
      toggleFavorite(id);
      announce(selected ? 'Consejo guardado en favoritos.' : 'Consejo quitado de favoritos.');
      return;
    }
    if (button.hasAttribute('data-advice-tab')) {
      selectTab(button);
      return;
    }
    const main = button.closest('.consejos-detail');
    const method = main ? methodFor(main.dataset.adviceId) : null;
    if (button.hasAttribute('data-advice-reaction') && method) {
      const reaction = method.griefReactions?.[Number(button.dataset.adviceReaction)];
      if (!reaction) return;
      main.querySelectorAll('[data-advice-reaction]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      main.querySelector('[data-advice-reaction-title]').textContent = reaction[1];
      main.querySelector('[data-advice-reaction-text]').textContent = reaction[2];
      return;
    }
    switch (button.dataset.adviceAction) {
      case 'back': back(); break;
      case 'journal': open('journal'); break;
      case 'example': {
        const examples = method?.examples || [];
        const output = main?.querySelector('[data-advice-example]');
        if (!output || !examples.length) break;
        const current = Number(output.dataset.adviceExample);
        let queue = exampleQueues.get(main);
        if (!queue) queue = shuffled(examples.map((_, index) => index).filter(index => index !== current));
        if (!queue.length) {
          queue = shuffled(examples.map((_, index) => index));
          if (queue.length > 1 && queue[0] === current) [queue[0], queue[1]] = [queue[1], queue[0]];
        }
        const next = queue.shift();
        exampleQueues.set(main, queue);
        output.dataset.adviceExample = String(next);
        output.innerHTML = contentMarkup(examples[next], 'Así podría verse en tu día');
        break;
      }
    }
  };

  const handleKeydown = event => {
    const button = event.target.closest('[data-advice-tab]');
    if (!withinScope(button) || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...button.closest('[role="tablist"]').querySelectorAll('[data-advice-tab]')];
    const current = tabs.indexOf(button);
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tabs[index], true);
  };

  scope.addEventListener('click', handleClick);
  scope.addEventListener('keydown', handleKeydown);
  return () => {
    scope.removeEventListener('click', handleClick);
    scope.removeEventListener('keydown', handleKeydown);
  };
}

