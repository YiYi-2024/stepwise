/* Select 下拉选择：展开/收起交互（可选，纯 JS，无依赖）
 * 点击触发器切换 .pl-select / .pl-select-field 的 is-open，并同步 aria-expanded。
 * 点击选项后关闭；点击外部关闭。
 */
(function () {
  function rootOf(el) {
    return el.closest('.pl-select, .pl-select-field');
  }

  function setOpen(root, open) {
    root.classList.toggle('is-open', open);
    var trigger = root.querySelector('.pl-select-filter, .pl-select-field__control');
    if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var option = e.target.closest('.pl-select-option');
    if (option) {
      var root = rootOf(option);
      if (root) setOpen(root, false);
      return;
    }

    var trigger = e.target.closest('.pl-select-filter, .pl-select-field__control');
    if (trigger) {
      var root = rootOf(trigger);
      if (!root) return;
      setOpen(root, !root.classList.contains('is-open'));
      return;
    }

    document.querySelectorAll('.pl-select.is-open, .pl-select-field.is-open').forEach(function (el) {
      setOpen(el, false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.pl-select.is-open, .pl-select-field.is-open').forEach(function (el) {
      setOpen(el, false);
    });
  });
})();
