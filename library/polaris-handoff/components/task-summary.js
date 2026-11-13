document.addEventListener('click', event => {
  const button = event.target.closest('.pl-task-memory__delete');
  if (!button) return;
  const group = button.closest('.pl-task-memories');
  const entry = button.closest('.pl-task-memory');
  if (group) group.querySelector('summary').focus();
  entry.remove();
  if (group) group.querySelector('[data-count]').textContent = group.querySelectorAll('.pl-task-memory').length + '条';
});

document.addEventListener('click', event => {
  const button = event.target.closest('.pl-task-section__more');
  if (!button) return;
  const extra = document.getElementById(button.getAttribute('aria-controls'));
  extra.hidden = !extra.hidden;
  button.setAttribute('aria-expanded', String(!extra.hidden));
  button.textContent = extra.hidden ? button.dataset.collapsedLabel : '收起';
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pl-task-memory__delete').forEach(button => {
    const tip = button.querySelector('[role="tooltip"]');
    if (!tip || !tip.showPopover) return;
    tip.popover = 'manual';

    function hide() {
      tip.hidePopover();
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    }

    function show() {
      const anchor = button.getBoundingClientRect();
      tip.showPopover();
      const width = tip.offsetWidth;
      const height = tip.offsetHeight;
      const left = Math.max(4, Math.min(anchor.left + (anchor.width - width) / 2,
        document.documentElement.clientWidth - width - 4));
      tip.style.left = left + 'px';
      tip.style.top = (anchor.top >= height + 6 ? anchor.top - height - 6 : anchor.bottom + 6) + 'px';
      window.addEventListener('scroll', hide, true);
      window.addEventListener('resize', hide);
    }

    button.addEventListener('pointerenter', show);
    button.addEventListener('pointerleave', hide);
    button.addEventListener('focus', show);
    button.addEventListener('blur', hide);
    button.addEventListener('click', hide);
  });
});
