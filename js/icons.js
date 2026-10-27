const paths = {
 home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
 methods: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
 heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
 more: '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="12" r=".5"/><circle cx="12" cy="12" r=".5"/><circle cx="16" cy="12" r=".5"/>',
 settings: '<path fill-rule="evenodd" d="m10 2-.5 2.2-1.7.9-2.2-.7-2 3.5 1.7 1.5v2l-1.7 1.5 2 3.5 2.2-.7 1.7.9.5 2.2h4l.5-2.2 1.7-.9 2.2.7 2-3.5-1.7-1.5v-2l1.7-1.5-2-3.5-2.2.7-1.7-.9L14 2Zm5 8.4a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" transform="translate(0 1.5)"/>',
 arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
 back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
 chevron: '<path d="m9 5 7 7-7 7"/>',
 menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
 leaf: '<path d="M20 4C8 1 1 10 7 17c7 6 15-1 13-13Z"/><path d="m5 21 10-11M9 16v-5m0 5h5"/>',
 lotus: '<path d="M12 3c-5 4-6 9 0 16 6-7 5-12 0-16Z"/><path d="M12 20C5 20 2 16 2 9c6 0 10 5 10 11Zm0 0c7 0 10-4 10-11-6 0-10 5-10 11Z"/>',
 bolt: '<path d="m14 2-9 12h6l-1 8 9-12h-6Z"/>',
 bulb: '<path d="M9 18h6m-5 3h4m-5-6c0-2-3-3-3-6a6 6 0 0 1 12 0c0 3-3 4-3 6Z"/>',
 breath: '<path d="M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h5a3 3 0 1 1-3 3"/>',
 moon: '<path d="M20.7 13a9 9 0 0 1-9.7-9.7A9 9 0 1 0 20.7 13Z"/>',
 spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
 sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 journal: '<path d="M6 3h13v18H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 0v18m4-12h5m-5 4h5"/>',
 info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
 play: '<path d="m8 4 13 8-13 8Z"/>',
 pause: '<path d="M8 4v16M16 4v16"/>',
 check: '<path d="m5 12 4 4L19 6"/>',
 close: '<path d="m6 6 12 12M6 18 18 6"/>',
 download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>'
};
export function icon(name, className = '') {
 return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.leaf}</svg>`;
}
