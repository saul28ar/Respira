import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { backButton } from './common.js';

export function renderMore(petId) {
 const options = [
   ['journal', 'Mi espacio para escribir', 'Lo que sientes también merece un lugar.', 'data-open="journal"'],
   ['leaf', 'Mi compañía de hoy', petId ? `Hoy te acompaña ${pets[petId].name}.` : 'Puedes elegir una compañía, si te apetece.', petId ? `data-pet-view="${petId}"` : 'data-go="pet-select"'],
   ['info', 'Acerca de Respira', 'Conoce este espacio y cómo cuida tus datos.', 'data-go="about"']
 ];
 return `<main class="page settings-page"><div class="page-intro"><span class="eyebrow">ESTE ESPACIO ES TUYO</span><h1>Un poquito más</h1><p class="muted">Tu compañía, tus notas y lo que necesitas saber.</p></div><div class="settings-list">${options.map(([symbol,title,sub,attrs]) => `<button class="settings-row" type="button" ${attrs}><span class="settings-icon">${icon(symbol)}</span><span><strong>${title}</strong><small>${safe(sub)}</small></span>${icon('chevron')}</button>`).join('')}</div><aside class="quiet-note">Un momento pequeño también cuenta.</aside></main>`;
}
export function renderAbout() {
 return `<main class="page detail-page">${backButton()}<div class="page-intro"><span class="eyebrow">CONOCE ESTE ESPACIO</span><h1>Acerca de Respira</h1><p class="muted">Tu espacio de calma, siempre contigo.</p></div><article class="content-card"><h2>A tu ritmo</h2><p>Respira es una aplicación gratuita con ejercicios sencillos de autocuidado emocional. No requiere una cuenta.</p><p>Estas actividades no sustituyen la atención psicológica ni médica profesional. Si el malestar es intenso o persistente, busca ayuda profesional. Si estás en peligro inmediato, contacta con los servicios de emergencia de tu localidad.</p></article><article class="content-card"><h2>Tu privacidad</h2><p>Tu elección de mascota, tus favoritos y tus notas se guardan en este navegador y dispositivo. No se envían a un servidor ni se sincronizan entre dispositivos.</p><p>Pueden perderse al borrar los datos del navegador. Si compartes el dispositivo, otras personas con acceso al navegador podrían leer tus notas.</p></article><article class="content-card"><h2>Tu compañía de hoy</h2><p>Puedes elegir una mascota cada día. También puedes usar Respira sin elegir ninguna. Mañana tendrás una nueva oportunidad de elegir.</p></article><button type="button" class="secondary" data-go="home">Volver al inicio ${icon('arrow')}</button></main>`;
}
