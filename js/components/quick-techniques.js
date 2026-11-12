import { catalog, pets, groundSteps, muscleSteps } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { backButton } from './common.js';

export const quickMethods = {
  grounding: {
    title: catalog.grounding.title,
    subtitle: 'Conecta con el presente',
    icon: 'leaf',
    minutes: 2,
    intro: 'Una pausa para volver a lo que te rodea, a través de tus sentidos.',
    guide: [
      'Busca una postura cómoda y observa el lugar en el que estás.',
      'Recorre los sentidos con calma. Puedes nombrar lo que notas en voz baja o en tu mente.',
      'Si un sentido no está disponible o algo te incomoda, puedes pasar al siguiente paso.'
    ],
    comfort: 'No necesitas encontrar todas las sensaciones. Mantén los ojos abiertos si te resulta cómodo y respira con naturalidad.',
    benefits: 'Dirigir la atención a lo que ves, sientes y escuchas puede ayudarte a volver al presente cuando los pensamientos o la ansiedad se sienten abrumadores. El efecto puede variar de una persona a otra.',
    source: 'https://www.nhsinform.scot/healthy-living/mental-wellbeing/breathing-and-relaxation-exercises/grounding-exercises',
    sourceLabel: 'NHS inform · Ejercicios de grounding',
    steps: groundSteps,
    labels: ['Ver', 'Sentir', 'Oír', 'Oler', 'Saborear'],
    note: 'Puedes dedicar a cada sentido el tiempo que necesites.',
    complete: 'Has recorrido tus sentidos. Quédate un momento con lo que notas ahora, sin exigirte sentir algo concreto.'
  },
  muscle: {
    title: catalog.muscle.title,
    subtitle: 'Afloja el cuerpo con suavidad',
    icon: 'bolt',
    minutes: 3,
    intro: 'Un recorrido breve para notar la diferencia entre tensar suavemente y soltar.',
    guide: [
      'Siéntate con apoyo y acomoda el cuerpo antes de comenzar.',
      'Tensa cada zona con suavidad unos 5 segundos. Después, suelta y descansa unos 10 segundos antes de continuar.',
      'Evita tensar zonas lesionadas o doloridas. Si tienes una lesión o un problema físico, consulta antes con un profesional de salud.'
    ],
    comfort: 'Respira con naturalidad, sin retener el aire. No fuerces los músculos y detente si aparece dolor.',
    benefits: 'Alternar una tensión suave con el descanso puede ayudar a reconocer y aflojar la tensión muscular asociada al estrés. La práctica regular puede facilitar que distingas ambas sensaciones.',
    source: 'https://www.cci.health.wa.gov.au/~/media/CCI/Mental%20Health%20Professionals/Panic/Panic%20-%20Information%20Sheets/Panic%20Information%20Sheet%20-%2005%20-%20Progressive%20Muscle%20Relaxation.pdf',
    sourceLabel: 'CCI · Relajación muscular progresiva (PDF)',
    steps: muscleSteps,
    labels: ['Manos', 'Hombros', 'Rostro', 'Piernas', 'Descanso'],
    note: 'Después de soltar, date un momento de descanso antes de avanzar.',
    complete: 'Deja que el cuerpo descanse un momento. Observa cómo se siente ahora, sin buscar una sensación concreta.'
  },
  reframe: {
    title: catalog.reframe.title,
    subtitle: 'Mira un pensamiento con más perspectiva',
    icon: 'spark',
    minutes: 2,
    paceLabel: '6 pasos',
    intro: 'Seis pasos para mirar un pensamiento con más perspectiva, sin luchar contigo.',
    guide: [
      'Elige una idea concreta que te preocupe. Puedes recorrer los pasos a tu ritmo.',
      'Ponle nombre y observa cómo te sientes. No necesitas borrar el pensamiento ni forzarte a pensar en positivo.',
      'Revisa los hechos, prueba una frase más equilibrada y vuelve a una pequeña acción del presente.'
    ],
    comfort: 'Puedes detenerte o saltarte un paso. Si mirar hacia dentro te incomoda, observa algo que tengas cerca.',
    benefits: 'Puede ayudarte a tomar distancia de un pensamiento y explorar una interpretación más realista y amable.',
    source: 'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/reframing-unhelpful-thoughts/',
    sourceLabel: 'NHS · Reencuadrar pensamientos',
    steps: [
      ['Reconoce la idea', 'Identifica un pensamiento que te esté pesando. Por ejemplo: «No soy suficiente».'],
      ['Ponle nombre', 'Prueba decir: «Estoy teniendo el pensamiento de que no soy suficiente». Es un pensamiento que estás notando, no una definición de quién eres.'],
      ['Observa lo que sientes', 'Nota qué emoción aparece y dónde la sientes en el cuerpo. No necesitas cambiarla ahora.'],
      ['Mira los hechos', '¿Qué apoya esa idea? ¿Qué muestra otra cara? Piensa qué le dirías a alguien que quieres.'],
      ['Busca una frase más justa', 'Por ejemplo: «Hoy algo me cuesta, pero eso no define todo lo que soy ni lo que puedo aprender».'],
      ['Vuelve al presente', 'Puedes dejar que el pensamiento esté ahí sin seguirlo. Mira a tu alrededor y elige un pequeño paso para continuar.']
    ],
    labels: ['Reconoce', 'Nombra', 'Observa', 'Cuestiona', 'Reformula', 'Vuelve'],
    note: 'No hace falta dejar de sentir lo que sientes para tratarte con amabilidad.',
    complete: 'Has dedicado un momento a mirar ese pensamiento. Puedes quedarte con una alternativa realista, aunque hoy no cambie lo que sientes.'
  }
};

export function renderQuickDetail(id, { petId = null, favoriteHtml = '', petReturn = null } = {}) {
  const method = Object.hasOwn(quickMethods, id) ? quickMethods[id] : null;
  if (!method) return '';
  const selectedPet = typeof petId === 'string' && Object.hasOwn(pets, petId) ? petId : null;
  const petHtml = selectedPet ? `<img class="quick-intro-pet" src="./imagenes/mascotas/${selectedPet}.png" width="724" height="724" alt="${safe(pets[selectedPet].name)} te acompaña">` : '';
  return `<main class="page detail-page quick-session-page" data-quick-id="${safe(id)}" data-state="step">
    ${backButton()}
    <div class="detail-heading quick-detail-heading"><div><span class="eyebrow">UNA PAUSA PARA VOLVER A TI</span><h1>${safe(method.title)}</h1></div>${favoriteHtml}</div>
    <div class="quick-intro-heading"><p class="quick-intro">${safe(method.intro)}</p>${petHtml}</div>
    <details class="quick-guide"><summary>Cómo hacerlo con comodidad${icon('chevron')}</summary><div class="quick-guide-content">
      <ol>${method.guide.map(step => `<li>${safe(step)}</li>`).join('')}</ol>
      <p>${safe(method.comfort)}</p>
      <details class="quick-benefits"><summary>¿Para qué puede servirte?${icon('chevron')}</summary><div><p>${safe(method.benefits)}</p><a href="${safe(method.source)}" target="_blank" rel="noopener noreferrer">${safe(method.sourceLabel)}${icon('arrow')}</a></div></details>
    </div></details>
    <section class="quick-session" aria-label="Práctica de ${safe(method.title)}">
      <span class="quick-session-duration">${icon(method.icon)}${safe(method.paceLabel || `${method.minutes} min orientativos`)}<span aria-hidden="true">·</span>A tu ritmo</span>
      <div class="quick-progress-heading"><span data-quick-count>Paso 1 de ${method.steps.length}</span><span data-quick-progress-caption>Sin prisa</span></div>
      <progress class="quick-progress" data-quick-progress max="${method.steps.length}" value="1" aria-label="Avance de los pasos"></progress>
      <div class="quick-step-content"><span class="quick-step-symbol" aria-hidden="true">${icon(method.icon)}</span><h2 data-quick-title>${safe(method.steps[0][0])}</h2><p data-quick-text>${safe(method.steps[0][1])}</p></div>
      <nav class="quick-step-nav" aria-label="Pasos del ejercicio"><ol class="quick-step-list" style="--quick-step-count:${method.steps.length}">${method.labels.map((label, index) => `<li><button type="button" class="quick-step-chip${index === 0 ? ' is-active' : ''}" data-quick-action="step" data-quick-step="${index}" aria-label="Paso ${index + 1}: ${safe(method.steps[index][0])}"${index === 0 ? ' aria-current="step"' : ''}><span aria-hidden="true">${index + 1}</span><strong>${safe(label)}</strong></button></li>`).join('')}</ol></nav>
      <div class="quick-actions"><button type="button" class="secondary" data-quick-action="previous" disabled>${icon('back')}Anterior</button><button type="button" class="primary" data-quick-action="next"><span data-quick-next-label>Siguiente</span>${icon('arrow')}</button></div>
      <p class="quick-small-note" data-quick-note>${safe(method.note)}</p>
    </section>
    ${id === 'reframe' ? `<button type="button" class="secondary quick-journal-link" data-open="journal">${icon('journal')} Escribir lo que siento</button>` : ''}
    <p class="quick-quiet">Puedes parar y volver cuando lo necesites.</p>
    ${petReturn ? `<button type="button" class="text-button return-companion" data-pet-view="${safe(petReturn)}">${icon('back')} Volver a mi compañía</button>` : ''}
  </main>`;
}
