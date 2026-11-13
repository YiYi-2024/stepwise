// 同一页面内的主导航和组件示例共用置顶设置。
(() => {
  const key = 'polaris.research.pinned';
  let saved = [];
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(value)) saved = value;
  } catch {}
  const pins = new Set(saved);
  const menus = [];
  const tip = document.createElement('span');
  tip.className = 'pl-tooltip pl-research-pin-tip';
  tip.popover = 'manual';
  tip.setAttribute('role', 'tooltip');
  document.body.append(tip);
  function hideTip() { if (tip.matches(':popover-open')) tip.hidePopover(); }
  function showTip(button) {
    tip.textContent = button.getAttribute('aria-label');
    tip.showPopover();
    const rect = button.getBoundingClientRect();
    tip.style.left = rect.left + rect.width / 2 + 'px';
    tip.style.top = rect.top - 6 + 'px';
  }
  function pinButton(label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pl-icon-button pl-research-pin';
    button.innerHTML = '<span class="pl-icon pl-icon--mask pl-icon-button__icon" aria-hidden="true"></span>';
    button.addEventListener('pointerenter', () => showTip(button));
    button.addEventListener('pointerleave', hideTip);
    button.addEventListener('focus', () => { if (button.matches(':focus-visible')) showTip(button); });
    button.addEventListener('blur', hideTip);
    button.addEventListener('click', () => {
      if (pins.has(label)) pins.delete(label);
      else pins.add(label);
      try { localStorage.setItem(key, JSON.stringify([...pins])); } catch {}
      hideTip();
      render();
    });
    return button;
  }
  function updateButton(button, pinned) {
    button.setAttribute('aria-pressed', String(pinned));
    button.setAttribute('aria-label', pinned ? '取消固定' : '固定到左侧');
  }
  function wrap(item, label) {
    const row = document.createElement('div');
    row.className = 'pl-research-feature';
    const button = pinButton(label);
    row.append(item, button);
    return { row, item, button, label };
  }
  document.querySelectorAll('.pl-research-menu').forEach(menu => {
    const shortcuts = document.createElement('div');
    if (menu.closest('nav')) menu.before(shortcuts);
    const panel = menu.querySelector('.pl-research-menu__panel');
    const entries = [...panel.children].map(item => {
      const entry = wrap(item, item.querySelector('.pl-mainbar-item__name').textContent.trim());
      panel.append(entry.row);
      return entry;
    });
    menus.push({shortcuts, entries});
  });
  function render() {
    for (const {shortcuts, entries} of menus) {
      shortcuts.replaceChildren();
      for (const entry of entries) updateButton(entry.button, pins.has(entry.label));
      if (!shortcuts.isConnected) continue;
      for (const label of pins) {
        const entry = entries.find(item => item.label === label);
        if (!entry) continue;
        shortcuts.append(entry.item.cloneNode(true));
      }
    }
  }
  document.addEventListener('scroll', hideTip, true);
  render();
})();
