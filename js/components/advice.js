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

function guidanceMarkup(method, infographic) {
  const instructions = method
    ? `<ol>${method.guide.map(step => `<li>${safe(step)}</li>`).join('')}</ol><p>${safe(method.comfort)}</p>`
    : `<ul>${infographic.blocks.map(([heading, text]) => `<li><strong>${safe(heading)}</strong><p>${safe(text)}</p></li>`).join('')}</ul>`;
  const source = /^https:\/\//.test(method?.source || '')
    ? `<a href="${safe(method.source)}" target="_blank" rel="noopener noreferrer">${safe(method.sourceLabel || 'Más información')}${icon('arrow')}</a>`
    : '';
  return `<details class="advice-sheet-details advice-guide">
    <summary>Cómo hacerlo con comodidad${icon('chevron')}</summary>
    <div class="advice-sheet-content">${instructions}</div>
  </details>
  <details class="advice-sheet-details advice-benefits">
    <summary>¿Para qué puede servirte?${icon('chevron')}</summary>
    <div class="advice-sheet-content"><p>${safe(method?.benefits || infographic.cloud)}</p>${source}</div>
  </details>`;
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
    ${guidanceMarkup(method, infographic)}
  </main>`;
}

export function bindAdvice(scope, { open = () => {}, back = () => {}, toggleFavorite = () => {}, announce = () => {} } = {}) {
  const handleClick = event => {
    const button = event.target.closest('button[data-advice-action="back"],button[data-advice-open],button[data-advice-favorite]');
    if (!button || !scope.contains(button)) return;
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
    back();
  };

  scope.addEventListener('click', handleClick);
  return () => scope.removeEventListener('click', handleClick);
}

