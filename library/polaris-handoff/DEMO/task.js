(() => {
  const task = document.querySelector('.task-page');
  const input = document.querySelector('.pl-composer__query');
  const send = document.querySelector('.pl-chat-send__button');
  const key = 'northstar.demo.query';
  let addMessageMark;
  let replyNumber = 1;
  if (task) {
    const summaryPanel = task.querySelector('#task-summary-panel');
    const summaryToggle = task.querySelector('[aria-controls="task-summary-panel"]');
    summaryToggle.addEventListener('click', () => {
      const open = summaryPanel.inert;
      summaryPanel.inert = !open;
      summaryToggle.setAttribute('aria-expanded', String(open));
      summaryToggle.classList.toggle('is-active', open);
      summaryToggle.querySelector('[role="tooltip"]').textContent = open ? '收起任务摘要' : '任务摘要';
      summaryToggle.setAttribute('aria-label', open ? '收起任务摘要' : '任务摘要');
    });
    const editor = document.querySelector('.task-editor');
    const summaryTip = summaryToggle.querySelector('[role="tooltip"]');
    summaryTip.popover = 'manual';
    let tipFrame;
    function positionSummaryTip() {
      if (!summaryTip.matches(':popover-open')) return;
      const rect = summaryToggle.getBoundingClientRect();
      const width = summaryTip.offsetWidth;
      const left = editor.inert ? rect.right - width : rect.left + (rect.width - width) / 2;
      summaryTip.style.left = Math.max(4, Math.min(left, innerWidth - width - 4)) + 'px';
      summaryTip.style.top = rect.bottom + 6 + 'px';
      tipFrame = requestAnimationFrame(positionSummaryTip);
    }
    function updateSummaryTip() {
      cancelAnimationFrame(tipFrame);
      if (summaryToggle.matches(':hover, :focus-visible') && !task.inert) {
        summaryTip.showPopover();
        positionSummaryTip();
      } else {
        summaryTip.hidePopover();
      }
    }
    for (const event of ['pointerenter', 'pointerleave', 'focus', 'blur']) {
      summaryToggle.addEventListener(event, updateSummaryTip);
    }
    const track = editor.querySelector('.pl-navbar-tabs__track');
    const tabStrip = track.parentElement;
    const [back, forward] = tabStrip.querySelectorAll('.pl-navbar-tabs__scroll');
    function updateScrollButtons() {
      back.hidden = track.scrollLeft <= 1;
      forward.hidden = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    }
    for (const [control, direction] of [[back, -1], [forward, 1]]) {
      control.querySelector('button').onclick = () => track.scrollBy({
        left: direction * Math.max(140, track.clientWidth - 48),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
    }
    new ResizeObserver(updateScrollButtons).observe(track);
    new MutationObserver(updateScrollButtons).observe(track, { childList: true });
    track.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();
    const tabTemplate = track.firstElementChild.cloneNode(true);
    const content = editor.querySelector('.task-editor__content');
    content.replaceChildren();
    track.replaceChildren();
    let fileSequence = 0;
    const panels = new Map();
    const fileIds = new WeakMap();
    const expand = editor.querySelector('[aria-label="展开"]');
    let opener;

    function setEditorExpanded(expanded) {
      document.body.classList.toggle('editor-expanded', expanded);
      task.inert = expanded;
      const label = expanded ? '收起' : '展开';
      const icon = expanded ? 'collapse' : 'expand';
      expand.setAttribute('aria-pressed', String(expanded));
      expand.setAttribute('aria-label', label);
      expand.querySelector('.pl-icon').style.setProperty('--icon-src', 'url(../assets/icons/' + icon + '.svg)');
      expand.querySelector('[role="tooltip"]').textContent = label;
    }

    function closeEditor() {
      editor.inert = true;
      setEditorExpanded(false);
      opener?.focus({preventScroll:true});
    }

    function selectTab(tab) {
      for (const item of track.children) {
        const selected = item === tab;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        panels.get(item).hidden = !selected;
      }
      tab.scrollIntoView({block:'nearest', inline:'nearest'});
    }

    function openEditor(file) {
      opener = file;
      editor.inert = false;
      let tab = track.querySelector('.is-active') || track.firstElementChild;
      if (file) {
        const name = file.querySelector('.pl-file-output__name, .pl-task-file__name').textContent;
        if (!fileIds.has(file)) fileIds.set(file, String(++fileSequence));
        const id = fileIds.get(file);
        tab = [...track.children].find(item => item.dataset.file === id);
        if (!tab) {
          tab = tabTemplate.cloneNode(true);
          tab.dataset.file = id;
          tab.id = 'artifact-tab-' + id;
          const panel = document.createElement('section');
          panel.id = 'artifact-panel-' + id;
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('aria-labelledby', tab.id);
          tab.setAttribute('aria-controls', panel.id);
          const label = document.createElement('small');
          label.textContent = name;
          panel.append('编辑器内容', label);
          content.append(panel);
          panels.set(tab, panel);
          tab.querySelector('.pl-navbar-tab__label').textContent = name;
          tab.querySelector('img').src = file.querySelector('img').src;
          if (!track.contains(tab)) track.append(tab);
        }
      }
      if (tab) selectTab(tab);
    }

    for (const file of task.querySelectorAll('.pl-file-output, .pl-task-file')) {
      file.tabIndex = 0;
      file.setAttribute('role','button');
      file.addEventListener('click', () => openEditor(file));
      file.addEventListener('keydown', event => {
        if (['Enter',' '].includes(event.key)) { event.preventDefault(); openEditor(file); }
      });
    }
    track.addEventListener('click', event => {
      const tab = event.target.closest('[role="tab"]');
      if (!tab) return;
      if (event.target.closest('.pl-navbar-tab__close')) {
        const next = tab.nextElementSibling || tab.previousElementSibling;
        const selected = tab.classList.contains('is-active');
        panels.get(tab).remove();
        panels.delete(tab);
        tab.remove();
        if (!next) closeEditor();
        else if (selected) selectTab(next);
      } else selectTab(tab);
    });
    track.addEventListener('keydown', event => {
      const tab = event.target.closest('[role="tab"]');
      const next = event.key === 'ArrowRight' ? tab?.nextElementSibling :
        event.key === 'ArrowLeft' ? tab?.previousElementSibling : null;
      if (next) { selectTab(next); next.focus(); }
    });
    editor.querySelector('[aria-label="收起侧边栏"]').onclick = closeEditor;
    setEditorExpanded(false);
    expand.onclick = () => setEditorExpanded(!document.body.classList.contains('editor-expanded'));
    const layout = location.hash.slice(1);
    if (['editor', 'editor-summary', 'editor-full'].includes(layout)) {
      openEditor(task.querySelector('.pl-file-output'));
      if (layout === 'editor-full') setEditorExpanded(true);
    }
    if (layout === 'summary' || layout === 'editor-summary') summaryToggle.click();
    const bubble = task.querySelector('.pl-chat-bubble__text');
    if (location.hash === '#submitted') {
      bubble.textContent = sessionStorage.getItem(key) ?? bubble.textContent;
      showAttachments(bubble.closest('.pl-chat-bubble'), JSON.parse(sessionStorage.getItem(key + '.files') || '[]'));
    }
    const firstAnswer = task.querySelector('#task-response');
    if (location.hash === '#submitted') {
      streamDemoReply(firstAnswer.parentElement, firstAnswer, Array.from(firstAnswer.children, p => p.textContent));
    }
    const stream = task.querySelector('.task-stream');
    const rail = task.querySelector('.message-rail');
    const messages = [];
    let pointerY = null;
    let frame = 0;
    function paintMarks() {
      frame = 0;
      const first = rail.firstElementChild?.getBoundingClientRect();
      if (!first || !first.height) return;
      Array.from(rail.children).forEach((mark, index) => {
        const center = first.top + (index + 0.5) * first.height;
        const distance = Math.abs(pointerY - center) / (first.height * 3.5);
        const weight = pointerY === null ? 0 : Math.max(0, 1 - distance);
        mark.style.setProperty('--mark-scale', (.23 + .77 * weight * weight).toFixed(3));
      });
    }
    function queueMarks() {
      if (!frame) frame = requestAnimationFrame(paintMarks);
    }
    rail.addEventListener('pointermove', event => {
      pointerY = event.clientY;
      queueMarks();
    });
    rail.addEventListener('pointerleave', () => {
      pointerY = null;
      queueMarks();
    });
    rail.addEventListener('scroll', queueMarks, {passive: true});

    function updatePosition() {
      const top = stream.getBoundingClientRect().top;
      let current = 0;
      messages.forEach((message, index) => {
        if (message.getBoundingClientRect().top <= top + 8) current = index;
      });
      if (stream.scrollTop > 0 && stream.scrollTop + stream.clientHeight >= stream.scrollHeight - 2) current = messages.length - 1;
      Array.from(rail.children).forEach((mark, index) => {
        mark.setAttribute('aria-current', String(index === current));
      });
    }
    const preview = task.querySelector('#message-preview');
    let previewMark = null;
    function showPreview(event) {
      const mark = event.target.closest('button');
      if (!mark || mark === previewMark) return;
      const message = messages[Array.prototype.indexOf.call(rail.children, mark)];
      const reply = message.nextElementSibling;
      const body = preview.querySelector('p');
      body.textContent = reply?.matches('article.pl-markdown')
        ? (reply.querySelector('.pl-markdown') || reply).textContent.trim() : '';
      body.hidden = !body.textContent;
      preview.querySelector('strong').textContent = message.querySelector('.pl-chat-bubble__text').textContent;
      const following = !preview.hidden;
      preview.hidden = false;
      const rect = mark.getBoundingClientRect();
      const top = Math.max(4, Math.min(rect.top + (rect.height - preview.offsetHeight) / 2,
        innerHeight - preview.offsetHeight - 4));
      preview.classList.toggle('is-following', following);
      preview.style.left = Math.min(rect.right + 6, innerWidth - preview.offsetWidth - 4) + 'px';
      preview.style.transform = 'translateY(' + top + 'px)';
      previewMark?.removeAttribute('aria-describedby');
      previewMark = mark;
      mark.setAttribute('aria-describedby', preview.id);
    }
    function hidePreview() {
      preview.hidden = true;
      previewMark?.removeAttribute('aria-describedby');
      previewMark = null;
    }
    rail.addEventListener('pointerover', showPreview);
    rail.addEventListener('pointerleave', hidePreview);
    rail.addEventListener('focusin', showPreview);
    rail.addEventListener('focusout', event => {
      if (!rail.contains(event.relatedTarget) && !rail.matches(':hover')) hidePreview();
    });
    addMessageMark = message => {
      messages.push(message);
      const label = message.querySelector('.pl-chat-bubble__text').textContent;
      const mark = document.createElement('button');
      mark.type = 'button';
      mark.setAttribute('aria-label', '定位到消息：' + label);
      mark.onclick = () => {
        stream.scrollTo({
          top: stream.scrollTop + message.getBoundingClientRect().top - stream.getBoundingClientRect().top,
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
      };
      rail.append(mark);
      updatePosition();
    };
    task.querySelectorAll('.task-stream .pl-chat-bubble').forEach(addMessageMark);
    stream.addEventListener('scroll', updatePosition, {passive:true});
    new ResizeObserver(updatePosition).observe(stream);
    task.querySelector('.pl-navbar__title-edit').onclick = () => {
      const title = task.querySelector('.pl-navbar__title');
      const value = prompt('任务名称',title.textContent)?.trim();
      if (value) title.textContent = value;
    };
    document.querySelector('.pl-mainbar-item').onclick = () => location.assign('./');
  }
  function showAttachments(message, files) {
    message.querySelector('.pl-chat-bubble__attachments')?.remove();
    message.querySelector('.pl-chat-bubble__body').hidden = !message.querySelector('.pl-chat-bubble__text').textContent;
    if (!files.length) return;
    const group = document.createElement('div');
    group.className = 'pl-chat-bubble__attachments';
    group.append(...files.map(file => attachmentCard(file, false)));
    message.prepend(group);
  }
  send.addEventListener('click', event => {
    const query = input.value.trim();
    const track = input.closest('.pl-composer').querySelector('.pl-chat-uploads__track');
    const files = Array.from(track?.children || [], card => attachmentData.get(card)).filter(Boolean);
    if (!query && !files.length) return;
    event.stopImmediatePropagation();
    if (!task) {
      try {
        sessionStorage.setItem(key + '.files', JSON.stringify(files));
      } catch {
        alert('附件预览占用空间过大，请减少图片数量后再发送。');
        return;
      }
      sessionStorage.setItem(key,query);
      location.assign('task.html#submitted');
      return;
    }
    const message = task.querySelector('.pl-chat-bubble').cloneNode(true);
    message.querySelector('.pl-chat-bubble__text').textContent = query;
    showAttachments(message, files);
    track?.replaceChildren();
    task.querySelector('.task-stream .task-column').append(message);
    const article = document.createElement('article');
    article.className = 'pl-markdown';
    const answer = document.createElement('div');
    answer.className = 'pl-markdown';
    article.append(answer);
    answer.id = 'task-response-' + ++replyNumber;
    const feedback = document.createElement('template');
    feedback.dataset.chatPart = 'feedback';
    feedback.dataset.copyTarget = answer.id;
    message.after(article, feedback);
    renderChatPart(feedback);
    streamDemoReply(article, answer, ['针对「' + (query || files.map(file => file.name).join('、')) + '」，可以先明确研究范围与时间区间，再从相关资料中提取指标，比较变化并核对来源。']);
    addMessageMark(message);
    input.value = '';
    input.dispatchEvent(new Event('input',{bubbles:true}));
    message.scrollIntoView({block:'nearest'});
  },true);
})();
