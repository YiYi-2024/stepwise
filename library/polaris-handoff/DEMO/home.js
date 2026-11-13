const suggestions = [...document.querySelectorAll('.suggestions button')];
const sector = suggestions.map(row => [row.querySelector('b').textContent, row.querySelector('span').textContent]);
const topics = {
  公司研究: [['公司概览','梳理业务结构与核心产品'],['财报分析','比较收入、盈利与现金流'],['竞争分析','对比主要竞争者'],['公司估值','梳理估值方法与关键假设']],
  板块研究: sector,
  资讯解读: [['事件梳理','提取新闻要点与时间线'],['政策解读','分析政策内容与影响'],['市场反应','梳理相关资产表现'],['后续观察','整理值得跟踪的问题']],
  宏观研究: [['经济增长','梳理主要经济指标'],['通胀观察','比较价格变化与驱动因素'],['货币政策','跟踪流动性与利率'],['资产配置','分析宏观环境与资产表现']]
};
const tabs = [...document.querySelectorAll('.prompts .pl-tab')];
const list = document.querySelector('.suggestions');
tabs.forEach(tab => tab.addEventListener('click', () => {
  const previous = tabs.find(item => item.classList.contains('is-active'));
  if (tab === previous) return;
  const from = previous.getBoundingClientRect();
  const to = tab.getBoundingClientRect();
  const offset = from.top === to.top ? from.left + from.width / 2 - to.left - to.width / 2 : 0;
  tab.style.setProperty('--indicator-from', offset + 'px');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const direction = Math.sign(tabs.indexOf(tab) - tabs.indexOf(previous));
    list.getAnimations().forEach(animation => animation.cancel());
    list.animate([
      { opacity: 0, transform: 'translateX(' + direction * 10 + 'px)' },
      { opacity: 1, transform: 'translateX(0)' }
    ], { duration: 180, easing: 'ease-out' });
  }
  tabs.forEach(item => {
    item.classList.toggle('is-active', item === tab);
    item.setAttribute('aria-pressed', String(item === tab));
  });
  topics[tab.textContent].forEach(([title, description], index) => {
    suggestions[index].querySelector('b').textContent = title;
    suggestions[index].querySelector('span').textContent = description;
  });
}));
suggestions.forEach(row => row.addEventListener('click', () => {
  const input = document.querySelector('.pl-composer__query');
  input.value = row.querySelector('b').textContent + '：' + row.querySelector('span').textContent;
  input.dispatchEvent(new Event('input', { bubbles:true }));
  input.focus();
}));
