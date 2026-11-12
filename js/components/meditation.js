import { meditationMethods } from '../meditation-data.js';
import { pets } from '../data.js';
import { safe, clock } from '../utils.js';
import { icon } from '../icons.js';
import { backButton } from './common.js';
export { meditationMethods } from '../meditation-data.js';

function companion(petId, className) {
  return typeof petId === 'string' && Object.hasOwn(pets, petId)
    ? `<img class="${className}" src="./imagenes/mascotas/${petId}.png" width="724" height="724" alt="${safe(pets[petId].name)} te acompaña">` : '';
}

export function renderMeditationDetail(id, {petId = null, favoriteHtml = '', petReturn = null} = {}) {
  const method = meditationMethods[id];
  const petHtml = companion(petId, 'med-clock-pet');
  return `<main class="page detail-page meditation-session-page" data-meditation-id="${id}">
    ${backButton()}
    <div class="detail-heading med-detail-heading"><div><span class="eyebrow">UN MOMENTO PARA VOLVER A TI</span><h1>${safe(method.title)}</h1></div>${favoriteHtml}</div>
    <p class="med-intro">${safe(method.intro)}</p>
    <details class="med-guide"><summary>Cómo hacerlo con comodidad${icon('chevron')}</summary><div class="med-guide-content">
      <ol>${method.guide.map(step => `<li>${safe(step)}</li>`).join('')}</ol>
      <p class="med-comfort">Puedes mantener los ojos abiertos. Respira con naturalidad, sin retener el aire. Si aumenta la incomodidad, mira algo a tu alrededor y pausa.</p>
      <details class="med-benefits"><summary>¿Para qué puede servirte?${icon('chevron')}</summary><div><p>${safe(method.benefits)}</p><a href="${safe(method.source)}" target="_blank" rel="noopener noreferrer">Más información</a></div></details>
    </div></details>
    <button type="button" class="med-example-card" data-med-action="example" aria-label="Ver otro ejemplo para ${safe(method.title)}"><span class="med-example-label">${icon('spark')}Puedes probarlo así${icon('arrow')}</span><span data-med-example>${safe(method.examples[0])}</span><small>Toca para ver otro ejemplo</small></button>
    <section class="med-session" aria-label="Práctica de ${safe(method.title)}">
      <span class="med-session-duration">${icon(method.icon)}${method.duration / 60} minutos</span>
      <div class="med-time-orbit${petHtml ? '' : ' med-time-orbit-without-pet'}">
        <svg class="med-time-ring" viewBox="0 0 280 280" aria-hidden="true" focusable="false"><circle class="med-ring-track" cx="140" cy="140" r="130"/><circle data-med-ring cx="140" cy="140" r="130" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
        <div class="med-time-center">${petHtml}<span>Tiempo restante</span><output data-med-clock role="timer" aria-live="off">${clock(method.duration)}</output></div>
        <svg class="timer-seek-overlay" viewBox="0 0 280 280"><circle class="timer-seek-hit" data-circular-seek cx="140" cy="140" r="130" fill="none" stroke="transparent" stroke-width="44" role="slider" tabindex="0" aria-label="Tiempo transcurrido de la meditación" aria-describedby="med-seek-hint"/><circle class="timer-seek-thumb" data-seek-thumb cx="140" cy="10" r="5" aria-hidden="true"/></svg>
      </div>
      <p class="timer-seek-hint" id="med-seek-hint">Toca o arrastra el aro para cambiar el tiempo.</p>
      <div class="med-stage-message"><h2 data-med-stage-title>${safe(method.phases[0].label)}</h2><p data-med-stage-text>${safe(method.phases[0].text)}</p></div>
      <progress class="med-progress" data-med-progress value="0" max="${method.duration}" aria-label="Avance de la práctica"></progress>
      <div class="med-timeline-heading"><span>Momentos de la práctica</span><span data-med-elapsed>Transcurrido 0:00 de ${clock(method.duration).replace(/^0/, '')}</span></div>
      <ol class="med-stages">${method.phases.map((phase, index) => `<li><button type="button" data-med-action="stage" data-med-stage="${index}"${index === 0 ? ' class="is-active" aria-current="step"' : ''}><span class="med-stage-dot" aria-hidden="true"></span><strong>${safe(phase.label)}</strong><small>${clock(phase.at).replace(/^0/, '')} – ${clock(method.phases[index + 1]?.at ?? method.duration).replace(/^0/, '')}</small></button></li>`).join('')}</ol>
      <div class="med-actions"><button type="button" class="primary" data-med-toggle data-med-action="toggle">Iniciar</button><button type="button" class="secondary" data-med-action="reset">Reiniciar</button></div>
      <p class="med-small-note">Puedes pausar cuando lo necesites.</p>
    </section>
    <p class="med-quiet">A tu ritmo. Sin exigirte sentir algo concreto.</p>
    ${petReturn ? `<button type="button" class="text-button return-companion" data-pet-view="${safe(petReturn)}">${icon('back')} Volver a mi compañía</button>` : ''}
  </main>`;
}
