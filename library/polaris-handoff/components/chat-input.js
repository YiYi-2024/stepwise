const attachmentAssets = new URL('../assets/', document.currentScript.src);
const attachmentData = new WeakMap();

async function describeAttachment(file) {
  const data = {name: file.name, size: file.size};
  if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, 160 / Math.max(image.width, image.height));
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      data.thumbnail = canvas.toDataURL('image/webp', 0.8);
    } catch { /* 不支持解码的图片使用文件块展示。 */ }
    finally { URL.revokeObjectURL(url); }
  }
  return data;
}

function attachmentCard(data, removable) {
  const card = document.createElement('div');
  card.title = data.name;
  if (data.thumbnail) {
    card.className = 'pl-chat-image';
    card.innerHTML = '<span class="pl-chat-image__crop"><img></span>';
    card.querySelector('img').src = data.thumbnail;
    card.querySelector('img').alt = data.name;
  } else {
    const ext = data.name.match(/\.([^.]+)$/)?.[1].toLowerCase() || '';
    const icons = {pdf:'pdf', doc:'word', docx:'word', xls:'excel', xlsx:'excel', csv:'excel', ppt:'ppt', pptx:'ppt', md:'md'};
    card.className = 'pl-chat-file';
    card.innerHTML = '<img class="pl-chat-file__icon" alt=""><div class="pl-chat-file__info"><p class="pl-chat-file__name"></p><p class="pl-chat-file__meta"><span></span><span class="pl-chat-file__dot"></span></p></div>';
    card.firstChild.src = new URL('file-type/' + (Object.hasOwn(icons,ext) ? icons[ext] : 'txt') + '.png', attachmentAssets);
    card.querySelector('.pl-chat-file__name').textContent = data.name;
    const meta = card.querySelector('.pl-chat-file__meta');
    meta.firstChild.textContent = ext.toUpperCase() || '文件';
    meta.append(data.size < 1024 ? data.size + ' B' : data.size < 1048576 ? Math.ceil(data.size / 1024) + ' KB' : (data.size / 1048576).toFixed(1) + ' MB');
  }
  if (removable) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pl-chat-attachment__remove';
    button.setAttribute('aria-label', '移除附件');
    button.innerHTML = '<img class="pl-icon pl-icon--lg" alt="">';
    button.firstChild.src = new URL('icons/close-circle.svg', attachmentAssets);
    card.append(button);
  }
  attachmentData.set(card, data);
  return card;
}

// 附件列表按实际溢出和滚动位置显示箭头。
function initUploadRow(row) {
  const track = row.querySelector('.pl-chat-uploads__track');
  const [previous, next] = row.querySelectorAll('.pl-chat-uploads__edge');
  function update() {
    previous.hidden = track.scrollLeft <= 1;
    next.hidden = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }
  previous.querySelector('button').addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
  next.querySelector('button').addEventListener('click', () => track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  new MutationObserver(update).observe(track, { childList: true });
  update();
}
document.querySelectorAll('.pl-chat-uploads').forEach(initUploadRow);

document.addEventListener('click', (event) => {
  const remove = event.target.closest('.pl-chat-attachment__remove');
  if (remove) remove.closest('.pl-chat-file, .pl-chat-image').remove();
});

document.querySelectorAll('.pl-composer').forEach((composer) => {
  const query = composer.querySelector('textarea');
  const send = composer.querySelector('.pl-chat-send__button');
  const mode = composer.querySelector('.pl-chat-send__mode');
  const add = composer.querySelector('.pl-composer__add');
  const tooltip = composer.querySelector('.pl-chat-send__action .pl-tooltip');
  const placeholder = query.getAttribute('placeholder') || '';
  let running = send.classList.contains('pl-chat-send__button--pause');

  function update() {
    query.style.height = '56px';
    query.style.height = Math.min(108, query.scrollHeight) + 'px';
    const hasFile = composer.querySelector('.pl-chat-file, .pl-chat-image');
    const hasSkill = composer.querySelector('.pl-skill-reference');
    if (query.value || hasSkill) query.removeAttribute('placeholder');
    else query.setAttribute('placeholder', placeholder);
    send.disabled = !running && !hasFile && !hasSkill && !query.value.trim();
    tooltip.textContent = running ? '暂停' : send.disabled ? '当前不可发送' : '发送';
  }
  query.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    if (!event.repeat && !running && !send.disabled) send.click();
  });
  send.addEventListener('click', () => {
    running = !running;
    send.classList.toggle('pl-chat-send__button--pause', running);
    send.setAttribute('aria-label', running ? '暂停' : '发送');
    send.replaceChildren();
    if (!running) {
      const arrow = document.createElement('img');
      arrow.src = composer.querySelector('.pl-chat-send__mode img').src.replace('chat-mode-chevron.svg', 'chat-send.svg');
      arrow.alt = '';
      send.append(arrow);
    } else {
      query.value = '';
      composer.querySelector('.pl-skill-reference')?.remove();
    }
    mode.disabled = add.disabled = running;
    update();
  });
  query.addEventListener('input', update);
  composer.addEventListener('click', event => {
    const skill = event.target.closest('.pl-skill-reference:not(.pl-skill-reference--readonly)');
    if (!skill || !composer.contains(skill)) return;
    skill.remove();
    update();
    query.focus();
  });
  let track = composer.querySelector('.pl-chat-uploads__track');
  const picker = document.createElement('input');
  picker.type = 'file';
  picker.multiple = true;
  picker.hidden = true;
  composer.append(picker);
  composer.addEventListener('pl-composer-add', event => {
    if (event.detail.action === 'upload') picker.click();
  });
  picker.addEventListener('change', async () => {
    const files = Array.from(picker.files);
    picker.value = '';
    if (!files.length) return;
    const cards = await Promise.all(files.map(describeAttachment));
    if (!track) {
      const row = document.createElement('div');
      row.className = 'pl-chat-uploads';
      row.innerHTML = '<div class="pl-chat-uploads__track" tabindex="0"></div><div class="pl-chat-uploads__edge" hidden><button type="button" class="pl-page-button" aria-label="向左滑动"></button></div><div class="pl-chat-uploads__edge pl-chat-uploads__edge--end" hidden><button type="button" class="pl-page-button pl-page-button--next" aria-label="向右滑动"></button></div>';
      composer.querySelector('.pl-composer__content').prepend(row);
      track = row.firstChild;
      initUploadRow(row);
      observeAttachments();
    }
    track.parentElement.hidden = false;
    track.append(...cards.map(data => attachmentCard(data, true)));
    update();
  });
  function observeAttachments() {
    new MutationObserver(() => {
      track.parentElement.hidden = !track.childElementCount;
      update();
    }).observe(track, {childList: true});
  }
  if (track) observeAttachments();
  update();
  query.scrollTop = query.scrollHeight;
});

document.addEventListener('click', (event) => {
  const clear = event.target.closest('.pl-project-selector__clear');
  if (!clear) return;
  const selector = clear.closest('.pl-project-selector');
  selector.classList.remove('is-selected', 'is-hover');
  selector.querySelector('.pl-project-selector__name').textContent = '选择项目';
  selector.querySelector('.pl-composer__project').focus();
});

// 所有项目选择器共用一个下拉面板；已有项目区超过可用高度时单独滚动。
(() => {
  const triggers = Array.from(document.querySelectorAll('.pl-composer__project'));
  if (!triggers.length) return;
  const assetRoot = new URL('../assets/icons/', document.currentScript.src);
  const projects = ['已有项目A', '已有项目B', '已有项目C', '已有项目D'];
  const menu = document.createElement('div');
  menu.className = 'pl-select-panel pl-project-menu';
  menu.id = 'pl-project-menu';
  menu.popover = 'manual';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', '选择项目');

  const projectList = document.createElement('div');
  projectList.className = 'pl-project-menu__projects';
  const divider = document.createElement('div');
  divider.className = 'pl-select-panel__divider';
  divider.setAttribute('role', 'separator');

  function option(label, iconName, action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pl-select-option';
    button.setAttribute('role', 'menuitem');
    button.dataset.action = action;
    const icon = document.createElement('span');
    icon.className = 'pl-select-option__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.style.setProperty('--icon-src', 'url("' + new URL(iconName + '.svg', assetRoot) + '")');
    const text = document.createElement('span');
    text.className = 'pl-select-option__text';
    text.textContent = label;
    button.append(icon, text);
    return button;
  }

  const createProject = option('新建项目', 'add-lg', 'create-project');
  const withoutProject = option('不在项目中工作', 'folder-off', 'without-project');
  menu.append(projectList, divider, createProject, withoutProject);
  document.body.append(menu);

  let active;
  let keyboardOpen = false;

  function renderProjects() {
    const selector = active.closest('.pl-project-selector');
    const selected = selector.classList.contains('is-selected');
    const selectedName = selector.querySelector('.pl-project-selector__name').textContent.trim();
    projectList.replaceChildren();
    projectList.hidden = divider.hidden = !selected;
    if (!selected) return;
    for (const name of projects) {
      const item = option(name, 'folder', 'select-project');
      item.dataset.project = name;
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('aria-checked', String(name === selectedName));
      if (name === selectedName) {
        item.classList.add('is-selected');
        const check = document.createElement('span');
        check.className = 'pl-select-option__check';
        check.setAttribute('aria-hidden', 'true');
        item.append(check);
      }
      projectList.append(item);
    }
  }

  function position() {
    if (!menu.matches(':popover-open') || !active) return;
    const rect = active.getBoundingClientRect();
    const availableBelow = innerHeight - rect.bottom - 8;
    menu.style.maxHeight = Math.min(300, Math.max(72, availableBelow)) + 'px';
    menu.style.left = Math.max(8, Math.min(rect.left, innerWidth - menu.offsetWidth - 8)) + 'px';
    menu.style.top = rect.bottom + 4 + 'px';
  }

  for (const trigger of triggers) {
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-controls', menu.id);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', event => {
      if (active === trigger && menu.matches(':popover-open')) {
        menu.hidePopover();
        return;
      }
      active?.setAttribute('aria-expanded', 'false');
      active = trigger;
      keyboardOpen = event.detail === 0;
      renderProjects();
      menu.showPopover({source: trigger});
      trigger.setAttribute('aria-expanded', 'true');
      position();
      if (keyboardOpen) {
        (menu.querySelector('[aria-checked="true"]') || menu.querySelector('button'))?.focus({preventScroll: true});
      }
    });
  }

  menu.addEventListener('beforetoggle', event => {
    if (event.newState === 'closed') active?.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('pointerdown', event => {
    if (menu.matches(':popover-open') && !menu.contains(event.target) &&
        !triggers.some(trigger => trigger.contains(event.target))) menu.hidePopover();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.matches(':popover-open')) {
      event.preventDefault();
      menu.hidePopover();
      active?.focus();
    }
  });
  menu.addEventListener('click', event => {
    const item = event.target.closest('.pl-select-option');
    if (!item || !active) return;
    const selector = active.closest('.pl-project-selector');
    const name = selector.querySelector('.pl-project-selector__name');
    if (item.dataset.action === 'select-project') {
      selector.classList.add('is-selected');
      name.textContent = item.dataset.project;
    } else if (item.dataset.action === 'without-project') {
      selector.classList.remove('is-selected', 'is-hover');
      name.textContent = '选择项目';
    } else {
      active.dispatchEvent(new CustomEvent('pl-project-create', {bubbles: true}));
    }
    menu.hidePopover();
    active.focus();
  });
  menu.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const items = Array.from(menu.querySelectorAll('button:not([hidden])'));
    if (!items.length) return;
    event.preventDefault();
    if (event.key === 'Home') return items[0].focus();
    if (event.key === 'End') return items.at(-1).focus();
    const current = items.indexOf(document.activeElement);
    const step = event.key === 'ArrowUp' ? -1 : 1;
    items[(current + step + items.length) % items.length].focus();
  });
  window.addEventListener('resize', position);
  document.addEventListener('scroll', position, true);
})();

// 所有发送组件共用一个浮层，当前模式由各自的触发按钮保存。
(() => {
  const triggers = document.querySelectorAll('.pl-chat-send__mode');
  if (!triggers.length) return;
  const assetRoot = new URL('../assets/icons/', document.currentScript.src);
  const modes = [
    ['自动模式', 'auto', '根据任务复杂程度自动选择合适模式'],
    ['快速模式', 'lightning', '快速响应，适合资讯解读、简单问答和日常整理'],
    ['思考模式', 'thinking', '深入分析，适合复杂研究、逻辑推演和综合判断'],
  ];
  const menu = document.createElement('div');
  menu.className = 'pl-select-panel pl-mode-menu';
  menu.id = 'pl-chat-mode-menu';
  menu.popover = 'manual';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', '选择模式');
  let active;

  function icon(name, classes) {
    const span = document.createElement('span');
    span.className = 'pl-icon pl-icon--mask ' + classes;
    span.style.setProperty('--icon-src', 'url("' + new URL(name + '.svg', assetRoot) + '")');
    return span;
  }
  for (const [name, glyph, description] of modes) {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'pl-select-option pl-mode-menu__option';
    option.setAttribute('role', 'menuitemradio');
    option.dataset.mode = name;
    const title = document.createElement('span');
    title.className = 'pl-mode-menu__title';
    title.append(icon(glyph, 'pl-icon--sm'), name, icon('check', 'pl-mode-menu__check'));
    const detail = document.createElement('span');
    detail.className = 'pl-mode-menu__description';
    detail.textContent = description;
    option.append(title, detail);
    menu.append(option);
    option.addEventListener('click', () => {
      active.firstChild.textContent = name;
      menu.hidePopover();
      active.focus();
    });
  }
  document.body.append(menu);
  function opensAbove(trigger) {
    return trigger.closest('.pl-composer')?.dataset.modePlacement === 'top';
  }
  function position() {
    if (!menu.matches(':popover-open')) return;
    const rect = active.getBoundingClientRect();
    const above = opensAbove(active);
    const space = above ? rect.top : innerHeight - rect.bottom;
    menu.style.maxHeight = Math.max(0, space - 16) + 'px';
    menu.style.top = (above ? rect.top - 8 - menu.offsetHeight : rect.bottom + 8) + 'px';
    menu.style.left = Math.max(8, Math.min(rect.right - menu.offsetWidth, innerWidth - menu.offsetWidth - 8)) + 'px';
  }
  for (const trigger of triggers) {
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-controls', menu.id);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', () => {
      if (active === trigger && menu.matches(':popover-open')) {
        menu.hidePopover();
        return;
      }
      active?.setAttribute('aria-expanded', 'false');
      active = trigger;
      for (const option of menu.children) {
        option.setAttribute('aria-checked', String(option.dataset.mode === trigger.textContent.trim()));
      }
      // 给下拉菜单留出至少一个选项的可见空间。
      if (!opensAbove(trigger) && innerHeight - trigger.getBoundingClientRect().bottom < 110) {
        trigger.scrollIntoView({block: 'center', inline: 'nearest'});
      }
      menu.showPopover({source: trigger});
      trigger.setAttribute('aria-expanded', 'true');
      position();
      menu.querySelector('[aria-checked="true"]').focus({preventScroll: true});
    });
  }
  menu.addEventListener('beforetoggle', event => {
    if (event.newState === 'closed') active?.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('pointerdown', event => {
    if (menu.matches(':popover-open') && !menu.contains(event.target) &&
        !Array.from(triggers).some(trigger => trigger.contains(event.target))) menu.hidePopover();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.matches(':popover-open')) {
      event.preventDefault();
      menu.hidePopover();
      active?.focus();
    }
  });
  menu.addEventListener('keydown', event => {
    const options = Array.from(menu.children);
    const index = options.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      options[(index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length].focus();
    }
  });
  window.addEventListener('resize', position);
  document.addEventListener('scroll', position, true);
})();

(() => {
  const menu = document.querySelector('.pl-add-menu');
  if (!menu) return;
  const skills = document.getElementById('composer-skills');
  const trigger = menu.querySelector('[data-action="skills"]');
  if (!skills || !trigger) return;
  const tip = skills.querySelector('.pl-skills-menu__tip');
  let described;
  function hideTip() {
    tip.hidePopover();
    described?.removeAttribute('aria-describedby');
    described = null;
  }
  function positionTip() {
    const left = skills.getBoundingClientRect().right;
    tip.style.left = left + 'px';
    tip.style.maxWidth = Math.min(240, Math.max(16, innerWidth - left - 8)) + 'px';
    const top = described.getBoundingClientRect().top;
    tip.style.top = Math.max(0, Math.min(top, innerHeight - tip.offsetHeight)) + 'px';
  }
  function showTip(event) {
    const item = event.target.closest('[data-description]');
    if (!item) return hideTip();
    described?.removeAttribute('aria-describedby');
    described = item;
    tip.textContent = item.dataset.description;
    item.setAttribute('aria-describedby', tip.id);
    tip.showPopover();
    positionTip();
  }
  skills.addEventListener('pointerover', showTip);
  skills.addEventListener('focusin', showTip);
  skills.addEventListener('pointerleave', hideTip);
  skills.addEventListener('beforetoggle', event => {
    if (event.newState === 'closed') hideTip();
  });
  let keyboardOpen = false;
  let active;

  function writeSkillToComposer(item) {
    const composer = active?.closest('.pl-composer');
    const query = composer?.querySelector('.pl-composer__query');
    if (!query) return;

    const name = item.querySelector('.pl-select-option__text')?.textContent.trim();
    if (!name) return;

    let reference = composer.querySelector('.pl-skill-reference');
    if (!reference) {
      reference = document.createElement('button');
      reference.type = 'button';
      reference.className = 'pl-skill-reference';
      reference.innerHTML = '<span class="pl-skill-reference__icon" aria-hidden="true"></span><span class="pl-skill-reference__label"></span>';
      query.before(reference);
    }
    reference.dataset.skillId = item.dataset.skillId || '';
    reference.querySelector('.pl-skill-reference__label').textContent = name;
    reference.setAttribute('aria-label', `移除技能：${name}`);
    query.dispatchEvent(new Event('input', {bubbles: true}));
    query.focus();

    active.dispatchEvent(new CustomEvent('pl-composer-add', {
      bubbles: true,
      detail: {
        action: 'skill',
        skillId: item.dataset.skillId,
        skillName: name
      }
    }));
  }

  function position() {
    if (!menu.matches(':popover-open')) return;
    const rect = active.getBoundingClientRect();
    menu.style.left = Math.max(8, Math.min(rect.left, innerWidth - menu.offsetWidth - 8)) + 'px';
    const fitsBelow = rect.bottom + 8 + menu.offsetHeight <= innerHeight;
    menu.style.top = (fitsBelow ? rect.bottom + 8 : Math.max(8, rect.top - menu.offsetHeight - 8)) + 'px';
    if (described) positionTip();
  }
  for (const add of document.querySelectorAll('.pl-composer__add')) {
    add.setAttribute('aria-haspopup', 'menu');
    add.setAttribute('aria-controls', menu.id);
    add.setAttribute('aria-expanded', 'false');
    add.setAttribute('popovertarget', menu.id);
    add.addEventListener('click', event => {
      keyboardOpen = event.detail === 0;
      if (active && active !== add) {
        menu.hidePopover();
        active.setAttribute('aria-expanded', 'false');
      }
      active = add;
    });
  }
  menu.addEventListener('toggle', () => {
    const open = menu.matches(':popover-open');
    active?.setAttribute('aria-expanded', String(open));
    if (open) {
      position();
      if (keyboardOpen) menu.querySelector('button').focus({preventScroll: true});
    }
  });
  menu.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const items = Array.from(event.target.closest('[role=menu]').querySelectorAll(':scope > button'));
    const next = items.indexOf(document.activeElement) + (event.key === 'ArrowUp' ? -1 : 1);
    items[(next + items.length) % items.length].focus();
  });
  menu.addEventListener('click', event => {
    const item = event.target.closest('[data-action]');
    if (!item) return;
    if (item === trigger) return;
    menu.hidePopover();
    active.focus();
    active.dispatchEvent(new CustomEvent('pl-composer-add', {
      bubbles: true,
      detail: {action: item.dataset.action, skillId: item.dataset.skillId}
    }));
  });
  skills.addEventListener('click', event => {
    const item = event.target.closest('[data-action="skill"]');
    if (!item) return;
    hideTip();
    skills.hidePopover();
    menu.hidePopover();
    trigger.setAttribute('aria-expanded', 'false');
    writeSkillToComposer(item);
  });
  window.addEventListener('resize', position);
  document.addEventListener('scroll', position, true);
})();
