/* Tree 树状组件：展开/收起交互（可选，纯 JS，无依赖）
 * 引入后点击或按 Enter/Space 切换 .pl-tree-node 的 is-expanded，并同步 aria-expanded。
 */
(function () {
  function toggle(item) {
    var node = item.closest('.pl-tree-node');
    if (!node) return;
    var expanded = node.classList.toggle('is-expanded');
    item.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var item = e.target.closest('.pl-tree-item[aria-expanded]');
    if (item) toggle(item);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var item = e.target.closest('.pl-tree-item[aria-expanded]');
    if (!item) return;
    e.preventDefault();
    toggle(item);
  });
})();
