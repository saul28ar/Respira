const pathCopy = {
  respira: ['Una respiración contigo.', 'Encuentra una guía visual y sigue tu ritmo.'],
  escribe: ['Una página para lo que sientes.', 'Escribe por días y vuelve a tus propias palabras.'],
  compania: ['Una compañía para tu camino.', 'Conoce a Brotecito, Nubecita y Lunita al entrar.']
};
const panelCopy = {
  espacio: ['Pequeñas formas de cuidarte.', 'Ejercicios de respiración, momentos de meditación, consejos y un espacio para escribir lo que sientes.'],
  compania: ['Una compañía a tu ritmo.', 'Brotecito, Nubecita y Lunita pueden acompañarte mientras descubres tu espacio de calma.']
};

export function bindDesktopWelcome(scope) {
  const root = scope?.querySelector('.welcome-desktop-camino');
  if (!root) return () => {};
  const dialog = root.querySelector('[data-welcome-dialog]');
  let trigger = null;
  function dismiss() { if (dialog.open) dialog.close(); }
  function restoreFocus() { if (trigger?.isConnected) trigger.focus({ preventScroll: true }); }
  function click(event) {
    const button = event.target.closest('[data-welcome-path],[data-welcome-panel],[data-welcome-close]');
    if (!button || !root.contains(button)) return;
    if (button.hasAttribute('data-welcome-close')) { dismiss(); return; }
    const choice = button.dataset.welcomePath;
    if (Object.hasOwn(pathCopy, choice)) {
      root.querySelectorAll('[data-welcome-path]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const output = root.querySelector('[data-welcome-output]');
      const title = root.ownerDocument.createElement('strong');
      title.textContent = pathCopy[choice][0];
      output.replaceChildren(title, root.ownerDocument.createTextNode(pathCopy[choice][1]));
      return;
    }
    const data = panelCopy[button.dataset.welcomePanel];
    if (!data) return;
    trigger = button;
    dialog.querySelector('h2').textContent = data[0];
    dialog.querySelector('[data-welcome-panel-copy]').textContent = data[1];
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('[data-welcome-close]').focus({ preventScroll: true });
  }
  root.addEventListener('click', click);
  dialog.addEventListener('close', restoreFocus);
  return () => {
    root.removeEventListener('click', click);
    dialog.removeEventListener('close', restoreFocus);
    if (dialog.open) dialog.close();
    trigger = null;
  };
}
