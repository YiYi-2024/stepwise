(() => {
const assets = new URL('../assets/', document.currentScript.src).href;
function defaultPanel() {
  const template = document.createElement('template');
  template.innerHTML = `<div role="dialog" aria-label="搜索对话" class="pl-modal__dialog pl-chat-search">
        <div class="pl-chat-search__header">
          <label class="pl-search"><span aria-hidden="true" class="pl-search__icon pl-icon--mask" style="--icon-src:url(${assets}icons/search.svg)"></span><input aria-label="搜索对话" class="pl-search__field" placeholder="搜索对话" value=""></label>
          <button type="button" data-close-search class="pl-icon-button" aria-label="关闭搜索"><span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src:url(${assets}icons/close.svg)"></span></button>
        </div>
        <div class="pl-chat-search__body">
          <p class="pl-chat-search__label" aria-live="polite">最近对话</p>
          <div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">金融决策支持</span><span class="pl-chat-search__project" hidden><span aria-hidden="true" class="pl-icon pl-icon--sm pl-icon--mask" style="--icon-src:url(${assets}icons/folder.svg)"></span>金融项目</span><time data-full="2026-10-21 10:00" data-short="10-22 19:00">2026-10-21 10:00</time></div>
  <p class="pl-chat-search__snippet" hidden>这是一句关于 金融 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，</p><p class="pl-chat-search__snippet" hidden>这是一句关于 金融 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，</p><p class="pl-chat-search__snippet" hidden>这是一句关于 金融 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，这是一句关于 Hi 的话，</p>
</div><div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">风险评估引擎</span><time data-full="2026-10-22 11:15" data-short="10-22 19:00">2026-10-22 11:15</time></div>
  
</div><div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">投资组合优化工具</span><time data-full="2026-10-23 14:45" data-short="10-22 19:00">2026-10-23 14:45</time></div>
  
</div><div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">市场趋势预测仪</span><time data-full="2026-10-24 08:30" data-short="10-22 19:00">2026-10-24 08:30</time></div>
  
</div><div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">用户资产管理系统</span><time data-full="2026-10-26 15:30" data-short="10-22 19:00">2026-10-26 15:30</time></div>
  
</div><div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">个性化投资建议</span><time data-full="2026-10-27 16:00" data-short="10-22 19:00">2026-10-27 16:00</time></div>
  
</div><div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">智能财务顾问</span><time data-full="2026-10-25 12:00" data-short="10-22 19:00">2026-10-25 12:00</time></div>
  
</div><div class="pl-chat-search__group" data-recent>
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">用户资产管理系统</span><time data-full="2026-10-26 15:30" data-short="10-22 19:00">2026-10-26 15:30</time></div>
  
</div><div class="pl-chat-search__group">
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">金融优化工具</span><time data-full="2026-10-22 19:00" data-short="10-22 19:00">2026-10-22 19:00</time></div>
  
</div><div class="pl-chat-search__group">
  <div class="pl-chat-search__row"><span aria-hidden="true" class="pl-icon pl-icon--mask" style="--icon-src:url(${assets}icons/message.svg)"></span><span class="pl-chat-search__name">个性化金融建议</span><time data-full="2026-10-22 19:00" data-short="10-22 19:00">2026-10-22 19:00</time></div>
  
</div>
          <div class="pl-empty-state" hidden><div class="pl-empty-state__content"><img class="pl-empty-state__illustration" src="${assets}illustrations/search.png" alt=""><p class="pl-empty-state__description">暂无搜索结果</p></div></div>
        </div>
      </div>`;
  return template.content.firstElementChild;
}
document.querySelector('template[data-default-search]')?.replaceWith(defaultPanel());
const sidebarTriggers = document.querySelectorAll('.pl-mainbar__header [aria-label="搜索"]');
if (sidebarTriggers.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'pl-modal pl-chat-search-modal';
  dialog.id = 'sidebar-chat-search';
  dialog.setAttribute('aria-label', '搜索对话');
  dialog.append(defaultPanel());
  document.body.append(dialog);
}
document.querySelectorAll('.pl-chat-search').forEach(panel => {
  const field = panel.querySelector('input');
  const body = panel.querySelector('.pl-chat-search__body');
  const label = body.querySelector('.pl-chat-search__label');
  const empty = body.querySelector('.pl-empty-state');
  const stage = panel.closest('.pl-modal');
  const modal = stage instanceof HTMLDialogElement;
  const triggers = modal ? sidebarTriggers : stage.parentElement.querySelectorAll('[data-open-search]');
  let opener = triggers[0];

  function highlight(element, query) {
    const parts = query ? element.textContent.split(query) : [element.textContent];
    element.replaceChildren(parts[0]);
    for (const part of parts.slice(1)) {
      const mark = document.createElement('mark');
      mark.textContent = query;
      element.append(mark, part);
    }
    return parts.length > 1;
  }

  function render() {
    const query = field.value.trim();
    let count = 0;
    body.classList.toggle('is-filtered', Boolean(query));
    for (const group of body.querySelectorAll('.pl-chat-search__group')) {
      const titleHit = highlight(group.querySelector('.pl-chat-search__name'), query);
      let hits = Number(titleHit);
      for (const snippet of group.querySelectorAll('.pl-chat-search__snippet')) {
        const hit = highlight(snippet, query);
        snippet.hidden = !hit;
        hits += Number(hit);
      }
      group.hidden = query ? !hits : !group.hasAttribute('data-recent');
      count += hits;
      const project = group.querySelector('.pl-chat-search__project');
      if (project) project.hidden = !query;
      const time = group.querySelector('time');
      time.textContent = query ? time.dataset.short : time.dataset.full;
    }
    empty.hidden = !query || count > 0;
    label.hidden = !empty.hidden;
    label.textContent = '最近对话';
    if (query && count) {
      const mark = document.createElement('mark');
      mark.textContent = ' ' + count + ' ';
      label.replaceChildren('搜索到', mark, '个结果');
    }
    body.scrollTop = 0;
  }

  function close() {
    if (modal) stage.close();
    else {
      stage.hidden = true;
      opener.hidden = false;
    }
    opener.focus({preventScroll:true});
  }
  panel.querySelector('[data-close-search]').addEventListener('click', close);
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
  });
  for (const trigger of triggers) {
    if (modal) {
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', stage.id);
    }
    trigger.addEventListener('click', () => {
      opener = trigger;
      if (modal) {
        field.value = '';
        render();
        stage.showModal();
      } else {
        opener.hidden = true;
        stage.hidden = false;
      }
      field.focus();
    });
  }
  if (modal) stage.addEventListener('click', event => {
    if (event.target === stage) close();
  });
  field.addEventListener('input', render);
  render();
});

})();
