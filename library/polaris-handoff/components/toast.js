(() => {
  const titles = {loading: '加载提示', info: '普通提示', success: '成功提示', error: '失败提示'};
  function create(options = {}) {
    const card = document.createElement('div');
    card.innerHTML = '<span aria-hidden="true" class="pl-icon pl-icon--mask pl-toast__icon"></span><div class="pl-toast__body"><p class="pl-toast__title"></p></div>';
    return render(card, options);
  }
  function render(card, {type = 'info', title, description, closable = true}) {
    if (!Object.hasOwn(titles, type)) type = 'info';
    card.className = 'pl-toast pl-toast--' + type;
    card.setAttribute('role', type === 'error' ? 'alert' : 'status');
    card.querySelector('.pl-toast__title').textContent = title || titles[type];
    let text = card.querySelector('.pl-toast__description');
    if (description) {
      text ||= document.createElement('p');
      text.className = 'pl-toast__description';
      text.textContent = description;
      card.querySelector('.pl-toast__body').append(text);
    } else text?.remove();
    const close = card.querySelector('.pl-toast__close');
    if (!closable) close?.remove();
    if (closable && !close) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pl-icon-button pl-icon-button--small pl-toast__close';
      button.setAttribute('aria-label', '关闭提示');
      button.innerHTML = '<span aria-hidden="true" class="pl-icon-button__icon pl-icon pl-icon--mask"></span>';
      button.onclick = () => card.remove();
      card.append(button);
    }
    return card;
  }
  const layouts = new WeakMap();
  function mount(stack) {
    if (layouts.has(stack)) return layouts.get(stack);
    const measure = () => {
      const cards = Array.from(stack.children);
      const front = cards[0]?.offsetHeight || 0;
      let y = 0;
      cards.forEach((card, i) => {
        const h = card.offsetHeight || 1;
        const depth = Math.min(i, 2);
        card.style.zIndex = cards.length - i;
        card.style.setProperty('--stack-y', depth * 20 + 'px');
        card.style.setProperty('--stack-sx', Math.max(.5, 1 - depth * 32 / (card.offsetWidth || 420)));
        card.style.setProperty('--stack-sy', front / h);
        card.style.setProperty('--list-y', y + 'px');
        y += h + 16;
      });
      stack.style.setProperty('--stack-height', front + Math.min(2, Math.max(0, cards.length - 1)) * 20 + 'px');
      stack.style.setProperty('--list-height', Math.max(0, y - 16) + 'px');
      stack.classList.toggle('pl-toast-stack--scroll', y - 16 > window.innerHeight - 32);
    };
    const sizes = new ResizeObserver(measure);
    sizes.observe(document.documentElement);
    const watch = card => { if (card.nodeType === 1) sizes.observe(card); };
    Array.from(stack.children).forEach(watch);
    new MutationObserver(changes => {
      changes.forEach(change => {
        change.removedNodes.forEach(n => { if (n.nodeType === 1) sizes.unobserve(n); });
        change.addedNodes.forEach(watch);
      });
      measure();
    }).observe(stack, {childList: true});
    layouts.set(stack, measure);
    measure();
    return measure;
  }
  function show(options = {}) {
    let stack = document.querySelector('.pl-toast-stack--global');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'pl-toast-stack pl-toast-stack--global';
      document.body.append(stack);
    }
    const measure = mount(stack);
    const key = options.id == null ? null : String(options.id);
    const existing = key === null ? null : Array.from(stack.children).find(card => card.dataset.toastId === key);
    if (existing) {
      render(existing, options);
      measure();
      return existing;
    }
    const card = create(options);
    if (key !== null) card.dataset.toastId = key;
    stack.prepend(card);
    measure();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      card.animate([{translate: '0 -' + (card.offsetHeight + 16) + 'px', opacity: 0}, {translate: '0 0', opacity: 1}],
        {duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)'});
    return card;
  }
  const api = {create, show, mount};
  Object.keys(titles).forEach(type => { api[type] = options => show({...options, type}); });
  window.PolarisToast = api;
})();
