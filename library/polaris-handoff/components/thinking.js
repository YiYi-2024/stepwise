// 本地 DEMO 的分段数据源。每次调用只更新本轮消息。
window.streamDemoReply = async function (article, answer, paragraphs) {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const started = performance.now();
  const details = document.createElement('details');
  details.className = 'pl-thinking';
  const pending = document.createElement('span');
  pending.className = 'pl-thinking__pending pl-markdown__elapsed';
  pending.textContent = '正在思考...';
  details.innerHTML = '<summary class="pl-markdown__elapsed"><span></span><i class="pl-icon pl-icon--sm pl-icon--mask"></i></summary><div class="pl-thinking__steps"></div>';
  const steps = details.lastElementChild;
  const header = details.querySelector('summary span');
  const oldHeader = article.querySelector('.pl-markdown__elapsed');
  if (oldHeader) oldHeader.replaceWith(pending);
  else article.prepend(pending);
  const scroller = article.closest('.task-stream');
  function append(target, text) {
    const follow = scroller && scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 28;
    target.append(text);
    if (follow) scroller.scrollTop = scroller.scrollHeight;
  }
  async function type(target, text) {
    for (let i = 0; i < text.length; i += 4) {
      append(target, text.slice(i, i + 4));
      await wait(32);
    }
  }
  article.classList.add('is-streaming');
  answer.replaceChildren();
  if (!article.querySelector(':scope > .pl-markdown__divider')) {
    const divider = document.createElement('hr');
    divider.className = 'pl-markdown__divider';
    answer.before(divider);
  }
  await wait(1100);
  details.open = true;
  pending.replaceWith(details);
  function elapsed() {
    const seconds = Math.floor((performance.now() - started) / 1000);
    const minutes = Math.floor(seconds / 60);
    return '已用时 ' + (minutes ? minutes + ' 分 ' : '') + seconds % 60 + ' 秒';
  }
  const tick = () => { header.textContent = elapsed(); };
  tick();
  const timer = setInterval(tick, 1000);
  const stages = [
    ['先梳理问题，再核对相关资料。', 'web-search', '网页搜索'],
    ['整理资料中的数据与统计口径。', 'read', '读取文件'],
    ['将核对后的发现整理为报告。', 'write', '编辑文件'],
    ['汇总主要结论。', 'skill', '使用技能 研究分析']
  ];
  for (const [description, icon, label] of stages) {
    const line = document.createElement('p');
    steps.append(line);
    await type(line, description);
    const row = document.createElement('div');
    row.className = 'pl-thinking__tool is-running';
    row.innerHTML = '<i class="pl-icon pl-icon--mask"></i><span></span>';
    row.firstChild.style.setProperty('--icon-src', 'url(' + new URL('../assets/icons/' + icon + '.svg', window.streamDemoReply.assets) + ')');
    row.lastChild.textContent = label;
    steps.append(row);
    await wait(420);
    row.classList.remove('is-running');
    if (icon === 'web-search') {
      const group = document.createElement('details');
      const title = document.createElement('summary');
      title.textContent = '共检索 2 个网页';
      group.className = 'pl-thinking__search';
      row.replaceWith(group);
      group.append(title, row, row.cloneNode(true));
    }
  }
  clearInterval(timer);
  header.textContent = '思考完成，' + elapsed();
  if (details.open && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    details.classList.add('is-closing');
    const motion = steps.animate([
      {height: steps.offsetHeight + 'px', opacity: 1},
      {height: '0px', marginTop: '0px', paddingTop: '0px', borderTopWidth: '0px', opacity: 0}
    ], {duration: 240, easing: 'cubic-bezier(.22,.68,.2,1)', fill: 'forwards'});
    await motion.finished;
    details.open = false;
    motion.cancel();
    details.classList.remove('is-closing');
  } else {
    details.open = false;
  }
  for (const text of paragraphs) {
    const line = document.createElement('p');
    answer.append(line);
    await type(line, text);
  }
  article.classList.remove('is-streaming');
};
window.streamDemoReply.assets = document.currentScript.src;
