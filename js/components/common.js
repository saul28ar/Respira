import { icon } from '../icons.js';
import { safe } from '../utils.js';
export { brand } from './interface.js';
export function backButton(label = 'Volver') {
 return `<button class="back-button" type="button" data-action="back">${icon('back')}<span>${safe(label)}</span></button>`;
}
