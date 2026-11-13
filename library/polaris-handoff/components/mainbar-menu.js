// 所有导航实例共用一个下拉面板。各项操作只修改当前示例。
(() => {
  const iconRoot = new URL('../assets/icons/', document.currentScript.src);
  const iconUrl = name => new URL(name + '.svg', iconRoot).href;
  const menu = document.createElement('div');
  menu.className = 'pl-select-panel pl-mainbar-menu';
  menu.id = 'mainbar-more-menu';
  menu.popover = 'auto';
  menu.setAttribute('role', 'menu');
  document.body.append(menu);
  let active;
  const previousParents = new WeakMap();

  function option(label, icon, run, danger = false, panel = menu) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pl-select-option';
    button.setAttribute('role', 'menuitem');
    if (danger) button.classList.add('is-danger');
    const glyph = document.createElement('span');
    glyph.className = 'pl-select-option__icon';
    glyph.style.setProperty('--icon-src', 'url("' + iconUrl(icon) + '")');
    button.append(glyph, document.createTextNode(label));
    button.addEventListener('click', run);
    panel.append(button);
    return button;
  }

  function divider(panel = menu) {
    const line = document.createElement('div');
    line.className = 'pl-select-panel__divider';
    line.setAttribute('role', 'separator');
    panel.append(line);
  }

  function pinnedList(nav) {
    let list = nav.querySelector('[id$="-items"]');
    if (list) return list;
    const section = document.createElement('section');
    list = document.createElement('div');
    list.id = nav.querySelector('[data-project-list]').id + '-items';
    const header = document.createElement('div');
    header.className = 'pl-mainbar-section';
    const toggle = document.createElement('button');
    toggle.className = 'pl-mainbar-section__toggle';
    toggle.innerHTML = '置顶<span aria-hidden="true" class="pl-icon pl-icon--mask pl-mainbar-section__arrow"></span>';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-controls', list.id);
    toggle.addEventListener('click', () => toggleList(toggle, list));
    header.append(toggle);
    section.append(header, list);
    nav.querySelector('.pl-mainbar__lists').prepend(section);
    return list;
  }

  function render(trigger) {
    const row = trigger.closest('.pl-mainbar-item');
    const nav = row.closest('nav');
    const group = row.closest('.pl-mainbar-group');
    const project = row.classList.contains('pl-mainbar-item--project');
    const inside = !project && !!row.closest('.pl-mainbar-group__children,.pl-mainbar-conversations--project');
    const entity = project ? group : row;
    const name = row.querySelector('.pl-mainbar-item__name');
    const pinned = inside ? row.classList.contains('pl-mainbar-item--pinned') :
      entity.parentElement.matches('[id$="-items"]') || entity.dataset.pinned === 'true';
    function finish(fn) {
      return event => {
        menu.hidePopover();
        trigger.setAttribute('aria-expanded', 'false');
        if (event.detail > 0 && row.contains(document.activeElement)) {
          document.activeElement.blur();
        }
        fn();
      };
    }
    menu.replaceChildren();
    option(pinned ? (inside ? '取消在项目中置顶' : '取消置顶') :
      (inside ? '在项目中置顶' : project ? '置顶项目' : '置顶对话'), pinned ? 'unpin' : 'pin', finish(() => {
      if (inside) {
        row.classList.toggle('pl-mainbar-item--pinned', !pinned);
        if (pinned) row.querySelector('.pl-mainbar-item__icon')?.remove();
        else {
          const pin = document.createElement('span');
          pin.className = 'pl-icon pl-icon--mask pl-mainbar-item__icon';
          pin.style.setProperty('--icon-src','url("' + iconUrl('pin') + '")');
          row.prepend(pin);
          row.parentElement.prepend(row);
        }
      } else if (nav) {
        const list = pinnedList(nav);
        if (pinned) (previousParents.get(entity) || nav.querySelector(project ? '[data-project-list]' : '[id$="-chats"]')).prepend(entity);
        else { previousParents.set(entity,entity.parentElement); list.prepend(entity); }
        if (!project) {
          const icon = row.querySelector(':scope > .pl-mainbar-item__icon');
          if (pinned) icon?.remove();
          else if (!icon) {
            const message = document.createElement('span');
            message.className = 'pl-icon pl-icon--mask pl-mainbar-item__icon';
            message.setAttribute('aria-hidden', 'true');
            message.style.setProperty('--icon-src', 'url("' + iconUrl('message') + '")');
            row.prepend(message);
          }
        }
        list.parentElement.hidden = !list.childElementCount;
      } else entity.dataset.pinned = String(!pinned);
    }));
    if (project) {
      option('查看项目主页','folder',finish(() => {
        const dialog = document.createElement('dialog');
        const title = document.createElement('h2');
        title.textContent = name.textContent;
        dialog.append(title);
        group.querySelectorAll('.pl-mainbar-group__children .pl-mainbar-item__name').forEach(label => {
          const line = document.createElement('p'); line.textContent = label.textContent; dialog.append(line);
        });
        const done = document.createElement('button'); done.textContent = '关闭'; done.onclick = () => dialog.close();
        dialog.append(done); dialog.className = 'pl-mainbar-project-dialog';
        document.body.append(dialog); dialog.onclose = () => dialog.remove(); dialog.showModal();
      }));
    }
    option(project ? '项目设置' : '重命名',project ? 'settings' : 'write',finish(() => {
      const value = window.prompt(project ? '项目名称' : '重命名对话',name.textContent);
      if (value?.trim()) name.textContent = value.trim();
    }));
    function moveTo(list) {
      if (!list) return;
      row.classList.remove('pl-mainbar-item--pinned');
      row.querySelector('.pl-mainbar-item__icon')?.remove();
      list.append(row);
    }
    if (inside) option('从该项目中移除','folder-off',finish(() => moveTo((nav || document).querySelector('[id$="-chats"],[data-chat-examples]'))));
    if (!project) {
      const panel = document.createElement('div');
      panel.className = 'pl-select-panel pl-cascader__panel pl-move-targets';
      panel.id = 'mainbar-move-targets';
      panel.dataset.topOffset = '2';
      panel.popover = 'auto';
      panel.setAttribute('role', 'menu');
      const move = option('移动到项目', 'project-move', () => {});
      move.classList.add('pl-cascader__trigger');
      move.setAttribute('aria-haspopup', 'menu');
      move.setAttribute('aria-expanded', 'false');
      move.setAttribute('aria-controls', panel.id);
      const arrow = document.createElement('span');
      arrow.className = 'pl-select-option__arrow pl-icon pl-icon--sm pl-icon--mask';
      move.append(arrow);
      menu.append(panel);

      const scope = nav || document.querySelector('nav');
      const groups = [...scope.querySelectorAll('.pl-mainbar-group')];
      for (const target of groups) {
        const list = target.querySelector('.pl-mainbar-group__children');
        if (target === group || !list) continue;
        const label = target.querySelector('.pl-mainbar-item__name').textContent;
        option(label, 'folder', finish(() => moveTo(list)), false, panel);
      }
      if (panel.childElementCount) divider(panel);
      option('新建项目', 'add-lg', finish(() => {
        const name = window.prompt('新建项目名称')?.trim();
        if (!name) return;
        const target = projectTemplate.cloneNode(true);
        const header = target.querySelector('.pl-mainbar-item--project');
        const list = target.querySelector('.pl-mainbar-group__children');
        header.querySelector('.pl-mainbar-item__name').textContent = name;
        header.setAttribute('aria-expanded', 'true');
        list.replaceChildren();
        list.hidden = false;
        scope.querySelector('[data-project-list]').append(target);
        moveTo(list);
        header.addEventListener('click', () => toggleList(header, list));
        bindMore(header.querySelector('.pl-mainbar-item__action'));
      }), false, panel);
      window.plBindCascader(move);
    }
    divider();
    if (project) option('归档项目','archive',finish(() => entity.remove()));
    option(project ? '删除项目' : '删除对话','delete',finish(() => {
      if (confirm('删除「' + name.textContent + '」？')) entity.remove();
    }),true);
  }

  function open(trigger) {
    if (menu.matches(':popover-open') && active === trigger) { menu.hidePopover(); return; }
    active?.setAttribute('aria-expanded','false');
    active = trigger;
    trigger.setAttribute('aria-expanded','true');
    if (typeof closeDetails === 'function') closeDetails();
    render(trigger);
    menu.showPopover();
    const rect = trigger.getBoundingClientRect();
    menu.style.left = Math.max(4, Math.min(rect.left, innerWidth - menu.offsetWidth - 4)) + 'px';
    menu.style.top = (rect.bottom + menu.offsetHeight + 4 <= innerHeight ? rect.bottom + 4 : Math.max(4,rect.top - menu.offsetHeight - 4)) + 'px';
    menu.querySelector('button').focus({preventScroll:true});
  }

  const projectTemplate = document.querySelector('nav .pl-mainbar-group').cloneNode(true);
  function bindMore(trigger) {
    const icon = document.createElement('img');
    icon.className = 'pl-icon pl-mainbar-more-icon';
    icon.alt = '';
    icon.src = iconUrl('more');
    trigger.replaceChildren(icon);
    trigger.setAttribute('role','button');
    trigger.tabIndex = 0;
    trigger.setAttribute('aria-label','更多操作');
    trigger.setAttribute('aria-controls',menu.id);
    trigger.setAttribute('aria-haspopup','menu');
    trigger.setAttribute('aria-expanded','false');
    trigger.addEventListener('click',event => { event.stopPropagation(); open(trigger); });
    trigger.addEventListener('keydown',event => {
      if (['Enter',' '].includes(event.key)) { event.preventDefault(); event.stopPropagation(); open(trigger); }
    });
  }
  document.querySelectorAll('.pl-mainbar-item__action:not(.pl-mainbar-item__action--new-task)').forEach(bindMore);
  menu.addEventListener('keydown',event => {
    const items = [...event.target.closest('[role=menu]').querySelectorAll(':scope > button')];
    if (['ArrowUp','ArrowDown'].includes(event.key)) {
      event.preventDefault();
      items[(items.indexOf(document.activeElement) + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length].focus();
    }
  });
  menu.addEventListener('toggle',() => {
    if (!menu.matches(':popover-open')) active?.setAttribute('aria-expanded','false');
  });
})();
