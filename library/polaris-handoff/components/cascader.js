/* 级联选择：悬停、聚焦或右方向键展开下一级。 */
(function () {
  function panelFor(trigger) {
    return document.getElementById(trigger.getAttribute('aria-controls'));
  }

  function position(panel, trigger) {
    const rect = trigger.getBoundingClientRect();
    const openRight = rect.right + panel.offsetWidth <= innerWidth - 8;
    panel.style.left = (openRight ? rect.right : rect.left - panel.offsetWidth) + 'px';
    panel.style.top = Math.max(8, Math.min(rect.top - (Number(panel.dataset.topOffset) || 8), innerHeight - panel.offsetHeight - 8)) + 'px';
  }

  function open(trigger) {
    const panel = panelFor(trigger);
    if (!panel) return;
    clearTimeout(panel._closeTimer);
    panel.showPopover({ source: trigger });
    trigger.setAttribute('aria-expanded', 'true');
    position(panel, trigger);
  }

  function closeLater(panel, trigger) {
    clearTimeout(panel._closeTimer);
    panel._closeTimer = setTimeout(function () {
      if (panel.matches(':popover-open')) panel.hidePopover();
      trigger.setAttribute('aria-expanded', 'false');
    }, 80);
  }

  function bind(trigger) {
    if (trigger.dataset.cascadeBound) return;
    trigger.dataset.cascadeBound = 'true';
    const panel = panelFor(trigger);
    if (!panel) return;
    trigger.addEventListener('pointerenter', function () { open(trigger); });
    trigger.addEventListener('pointerleave', function (event) {
      if (panel.contains(event.relatedTarget)) return;
      closeLater(panel, trigger);
    });
    trigger.addEventListener('focus', function () { open(trigger); });
    trigger.addEventListener('click', function () {
      open(trigger);
      panel.querySelector('.pl-select-option')?.focus();
    });
    panel.addEventListener('pointerenter', function () {
      clearTimeout(panel._closeTimer);
    });
    panel.addEventListener('pointerleave', function (event) {
      if (trigger.contains(event.relatedTarget)) return;
      closeLater(panel, trigger);
    });
    trigger.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight') return;
      event.preventDefault();
      open(trigger);
      panel.querySelector('.pl-select-option')?.focus();
    });
    panel.addEventListener('beforetoggle', function (event) {
      if (event.newState === 'closed') trigger.setAttribute('aria-expanded', 'false');
    });
    panel.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft') return;
      event.preventDefault();
      trigger.focus();
      panel.hidePopover();
    });
  }
  window.plBindCascader = bind;
  document.querySelectorAll('.pl-cascader__trigger').forEach(bind);

  function reposition() {
    document.querySelectorAll('.pl-cascader__trigger[aria-expanded="true"]').forEach(function (trigger) {
      const panel = panelFor(trigger);
      if (panel?.matches(':popover-open')) position(panel, trigger);
    });
  }
  addEventListener('resize', reposition);
  document.addEventListener('scroll', reposition, true);
})();
