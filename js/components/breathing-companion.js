import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { backButton } from './common.js';

export function renderBreathingCompanion({ petId = null, mobile = false, favoriteHtml = '', petReturn = null } = {}) {
  const selected = typeof petId === 'string' && Object.hasOwn(pets, petId) ? petId : null;
  const pet = selected ? pets[selected] : null;
  return `<main class="page detail-page breath-companion${pet ? '' : ' breath-companion-without-pet'}" data-breath-pet="${selected || ''}">
    ${backButton()}
    <div class="detail-heading bc-heading"><div><span class="eyebrow">UN MOMENTO PARA TI</span><h1>Respiración 4-4-4-4</h1></div>${favoriteHtml}</div>
    <p class="bc-intro">Un ritmo suave. Un momento para volver a ti.</p>
    <div class="bc-layout">
      <details class="bc-guide" data-breath-guide${mobile ? '' : ' open'}>
        <summary>Cómo hacerlo con comodidad${icon('chevron')}</summary>
        <div class="bc-guide-content">
          <ol><li>Busca una postura cómoda y afloja los hombros.</li><li>Inhala suavemente durante 4 segundos, sin forzar.</li><li>Mantén el aire 4 segundos, solo si te resulta cómodo.</li><li>Exhala despacio durante 4 segundos.</li><li>Haz una pausa de 4 segundos tras exhalar, antes de volver a tomar aire.</li></ol>
          <p>Un ciclo dura 16 segundos. Puedes detenerte cuando quieras.</p>
          <details class="bc-benefits"><summary>¿Para qué puede servirte?${icon('chevron')}</summary><div>
            <p>Esta práctica puede ayudarte a:</p>
            <ul><li>Hacer una pausa en un momento de estrés.</li><li>Centrar tu atención en la respiración.</li><li>Sentirte más tranquilo antes de estudiar, un examen o hablar en público.</li></ul>
            <p>No tienes que completar todos los ciclos. Sigue el ritmo que te resulte cómodo.</p>
            <p class="bc-sources">Información: <a href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/" target="_blank" rel="noopener noreferrer">NHS</a> y <a href="https://www.heart.org/en/news/2023/07/07/its-not-just-inspiration-careful-breathing-can-help-your-health" target="_blank" rel="noopener noreferrer">American Heart Association</a>.</p>
          </div></details>
        </div>
      </details>
      <section class="bc-session" aria-label="Guía de respiración">
        <span class="bc-duration">4 ciclos <span aria-hidden="true">·</span> 1 min 4 s</span>
        <div class="bc-orbit">
          <svg class="bc-time-ring" viewBox="0 0 280 280" aria-hidden="true" focusable="false"><circle class="bc-ring-track" cx="140" cy="140" r="130"/><circle data-breath-ring cx="140" cy="140" r="130" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
          <div class="bc-orbit-copy">${pet ? `<img class="bc-pet" src="./imagenes/mascotas/${selected}.png" alt="${safe(pet.name)} te acompaña" width="724" height="724">` : ''}<span class="bc-clock-label">Tiempo restante</span><output id="breath-clock" role="timer" aria-live="off">01:04</output><h2 id="phase">Inhala</h2><span id="phase-seconds">4 segundos</span><button type="button" class="primary bc-start" id="breath-toggle" data-breath-action="toggle">Iniciar</button></div>
          <svg class="timer-seek-overlay" viewBox="0 0 280 280" aria-label="Cambiar momento de respiración"><circle class="timer-seek-hit" data-circular-seek role="slider" tabindex="0" aria-label="Momento de la respiración" aria-valuemin="0" aria-valuemax="64" aria-valuenow="0" cx="140" cy="140" r="130" stroke-width="44"/><circle class="timer-seek-thumb" data-seek-thumb cx="140" cy="10" r="5" aria-hidden="true"/></svg>
          <span class="bc-seek-caption">Toca o arrastra el aro</span>
        </div>
        <div class="bc-phases" role="group" aria-label="Las cuatro fases del ciclo actual">${['Inhala','Mantén','Exhala','Pausa'].map((name, i) => `<button type="button" data-breath-action="phase" data-breath-phase="${i}"${i === 0 ? ' class="is-active" aria-current="step"' : ''}><span>${name}</span><small>4 s</small></button>`).join('')}</div>
        <p id="breath-status" class="bc-status">Cuando quieras, empezamos.</p>
        <div class="bc-session-bottom"><span id="breath-cycles">Ciclos completados: 0 de 4</span><button class="bc-reset" type="button" data-breath-action="reset">${icon('back')}Reiniciar</button></div>
      </section>
      <aside class="bc-notes"><p class="bc-care">${icon('leaf')}<span>Si te mareas o sientes incomodidad, detente y respira con naturalidad. Las pausas no deben sentirse forzadas.</span></p><p class="bc-quiet">Aquí no hay prisa.</p></aside>
    </div>
    ${petReturn ? `<button type="button" class="text-button return-companion" data-pet-view="${safe(petReturn)}">${icon('back')} Volver a mi compañía</button>` : ''}
  </main>`;
}
