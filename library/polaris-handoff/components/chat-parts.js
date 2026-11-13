// 预览和 DEMO 使用同一组静态模板。组件的样式和交互由 polaris.css、chat-copy.js 提供。
(() => {
  const assets = new URL('../assets/', document.currentScript.src).href;
  const templates = {
    summary: `<div class="pl-task-summary"><details class="pl-task-section" open>
  <summary>会话产物<span aria-hidden="true" class="pl-task-section__arrow pl-icon pl-icon--sm pl-icon--mask" style="--icon-src:url(${assets}icons/chevron-right.svg)"></span></summary>
  <div class="pl-task-section__body"><div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/word.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">宁德时代研究报告.docx</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/pdf.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">宁德时代研究报告.pdf</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/excel.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">宁德时代研究报告.xlsx</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
<div id="products-card" hidden>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/ppt.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">动力电池市场分析.pptx</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/excel.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">装机量数据.xlsx</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/md.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">行业研究摘要.md</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/word.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">竞争格局分析.docx</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/pdf.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">研究结论.pdf</span><span class="pl-task-file__version">V1</span></div><p class="pl-task-file__date">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p></div>
</div>
</div>
<button type="button" class="pl-task-section__more" data-collapsed-label="展开全部 (8)" aria-expanded="false" aria-controls="products-card">展开全部 (8)</button></div>
</details><details class="pl-task-section pl-task-section--sources" open>
  <summary>来源<span aria-hidden="true" class="pl-task-section__arrow pl-icon pl-icon--sm pl-icon--mask" style="--icon-src:url(${assets}icons/chevron-right.svg)"></span></summary>
  <div class="pl-task-section__body"><details class="pl-task-memories">
  <summary><span aria-hidden="true" class="pl-icon pl-icon--sm pl-icon--mask" style="--icon-src:url(${assets}icons/thinking.svg)"></span><span class="pl-task-memories__label">记忆<span aria-hidden="true" class="pl-task-memory__dot"></span><span data-count>3条</span></span><span aria-hidden="true" class="pl-task-memories__arrow pl-icon pl-icon--sm pl-icon--mask" style="--icon-src:url(${assets}icons/chevron-right.svg)"></span></summary>
  <div class="pl-task-memories__items"><article class="pl-task-memory">
  <button type="button" class="pl-task-memory__delete pl-icon-button pl-icon-button--small pl-icon-button--on-bg" aria-label="删除项目记忆"><span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src:url(${assets}icons/delete.svg)"></span><span class="pl-tooltip pl-icon-button__tooltip" role="tooltip">删除该记忆</span></button>
  <p class="pl-task-memory__text">汽车产业正经历一场深刻的变革，特别是在电动化和自动驾驶技术的推动下。</p>
  <p class="pl-task-memory__meta">项目记忆<span aria-hidden="true" class="pl-task-memory__dot"></span>AI汽车产业研究</p>
</article>
  <article class="pl-task-memory">
  <button type="button" class="pl-task-memory__delete pl-icon-button pl-icon-button--small pl-icon-button--on-bg" aria-label="删除用户记忆"><span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src:url(${assets}icons/delete.svg)"></span><span class="pl-tooltip pl-icon-button__tooltip" role="tooltip">删除该记忆</span></button>
  <p class="pl-task-memory__text">汽车产业正经历一场深刻的变革，特别是在电动化和自动驾驶技术的推动下。</p>
  <p class="pl-task-memory__meta">用户记忆</p>
</article>
<article class="pl-task-memory">
  <button type="button" class="pl-task-memory__delete pl-icon-button pl-icon-button--small pl-icon-button--on-bg" aria-label="删除项目记忆"><span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src:url(${assets}icons/delete.svg)"></span><span class="pl-tooltip pl-icon-button__tooltip" role="tooltip">删除该记忆</span></button>
  <p class="pl-task-memory__text">后续研究重点关注动力电池的装机量与市场份额。</p>
  <p class="pl-task-memory__meta">项目记忆<span aria-hidden="true" class="pl-task-memory__dot"></span>AI汽车产业研究</p>
</article></div>
</details>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/word.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">宁德时代报告.docx</span></div></div>
</div>
<div class="pl-task-file">
  <img class="pl-task-file__icon" src="${assets}file-type/ppt.png" alt="">
  <div class="pl-task-file__body"><div class="pl-task-file__heading"><span class="pl-task-file__name">宁德时代报告.pptx</span></div></div>
</div></div>
</details></div>`,
    bubble: `<article class="pl-chat-bubble">
  
  <div class="pl-chat-bubble__body"><p class="pl-chat-bubble__text">这是一句query</p></div>
  <div class="pl-chat-bubble__actions">
    <time datetime="2026-10-19T11:05">2026-10-19 11:05</time>
    <button class="pl-icon-button pl-icon-button--small pl-icon-button--copy" type="button" aria-label="复制消息"><span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src:url(${assets}icons/copy.svg)"></span></button>
  </div>
</article>`,
    elapsed: `<div class="pl-markdown__elapsed">已用时 1 分 14 秒<span class="pl-icon pl-icon--sm pl-icon--mask" aria-hidden="true" style="--icon-src:url(${assets}icons/chevron-right.svg)"></span></div>
        <hr class="pl-markdown__divider">`,
    file: `<article class="pl-file-output">
          <img class="pl-file-output__icon" src="${assets}file-type/word.png" alt="Word">
          <div class="pl-file-output__body">
            <div class="pl-file-output__heading">
              <p class="pl-file-output__name">文件名称.后缀</p>
              <span class="pl-file-output__version">V1</span>
            </div>
            <p class="pl-file-output__status">创建时间：<time datetime="2026-10-19T11:00">2026-10-19 11:00</time></p>
          </div>
        </article>`,
    feedback: `<div class="pl-chat-feedback" role="group" aria-label="对话反馈">
          <button type="button" class="pl-icon-button pl-icon-button--small pl-icon-button--copy" data-copy-target="feedback-message" aria-label="复制">
            <span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src: url(${assets}icons/copy.svg)"></span>
            <span class="pl-tooltip pl-icon-button__tooltip" role="tooltip">复制</span>
          </button>
          <button type="button" class="pl-icon-button pl-icon-button--small" aria-label="点赞">
            <span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src: url(${assets}icons/thumb-up.svg)"></span>
            <span class="pl-tooltip pl-icon-button__tooltip" role="tooltip">点赞</span>
          </button>
          <button type="button" class="pl-icon-button pl-icon-button--small" aria-label="点踩">
            <span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src: url(${assets}icons/thumb-down.svg)"></span>
            <span class="pl-tooltip pl-icon-button__tooltip" role="tooltip">点踩</span>
          </button>
          <button type="button" class="pl-icon-button pl-icon-button--small" aria-label="分享">
            <span aria-hidden="true" class="pl-icon-button__icon pl-icon--mask" style="--icon-src: url(${assets}icons/share.svg)"></span>
            <span class="pl-tooltip pl-icon-button__tooltip" role="tooltip">分享</span>
          </button>
        </div>`,
  };
  function renderChatPart(slot) {
    const template = document.createElement('template');
    template.innerHTML = templates[slot.dataset.chatPart];
    const fields = {
      bubble: ['.pl-chat-bubble__text', 'message'],
      elapsed: ['.pl-markdown__elapsed', 'elapsed'],
      file: ['.pl-file-output__name', 'fileName']
    };
    const field = fields[slot.dataset.chatPart];
    if (field && slot.dataset[field[1]]) {
      template.content.querySelector(field[0]).firstChild.textContent = slot.dataset[field[1]];
    }
    const copy = template.content.querySelector('[data-copy-target]');
    if (copy) copy.dataset.copyTarget = slot.dataset.copyTarget;
    slot.replaceWith(template.content);
  }
  window.renderChatPart = renderChatPart;
  document.querySelectorAll('template[data-chat-part]').forEach(renderChatPart);
})();
