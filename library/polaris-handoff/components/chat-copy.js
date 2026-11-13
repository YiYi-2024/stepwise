(() => {
  const timers = new WeakMap();
  document.addEventListener('click', async event => {
    const button = event.target.closest('.pl-icon-button--copy');
    if (!button) return;
    const message = button.dataset.copyTarget
      ? document.getElementById(button.dataset.copyTarget)
      : button.closest('.pl-chat-bubble')?.querySelector('.pl-chat-bubble__text');
    if (!message) return;
    const status = document.querySelector('[role="status"]');
    const tooltip = button.querySelector('[role="tooltip"]');
    const label = button.dataset.copyLabel || button.getAttribute('aria-label');
    try {
      await navigator.clipboard.writeText(message.textContent);
      button.dataset.copyLabel = label;
      clearTimeout(timers.get(button));
      if (status) status.textContent = '';
      button.classList.add('is-copied');
      button.setAttribute('aria-label', '已复制消息');
      if (tooltip) tooltip.textContent = '已复制';
      timers.set(button, setTimeout(() => {
        button.classList.remove('is-copied');
        button.setAttribute('aria-label', label);
        if (tooltip) tooltip.textContent = label;
        timers.delete(button);
      }, 3000));
    } catch {
      if (status) status.textContent = '未能访问剪贴板，请选中正文复制';
    }
  });
})();
