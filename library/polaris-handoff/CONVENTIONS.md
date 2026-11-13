# 北极星设计系统：还原与组件规范

给负责还原设计稿的 agent / 开发者。设计稿来源：Figma 文件 `lHZQFXZ9mCxnwUxC50IgxL`（北极星设计规范），按用户发来的节点链接逐个还原。

## 1. 技术栈与目标

- 纯 HTML + CSS，无框架、无构建、无 Tailwind。
- 仅浅色模式。
- 面向前端开发者，附带 HTML 预览页。

## 2. 目录结构

```
polaris.css          唯一样式入口，@import tokens、base、所有组件
tokens/
  primitive.css      原始色板（--color-*）
  semantic.css       语义色（--text-*、--background-*、--border-*、--hover-*、--error-*、--success-*、--mask-primary）
  foundation.css     字体、字号、字重、行高
base.css
components/<name>.css   一个组件一个文件
assets/
  icons/             通用图标（一个文件夹，每图标一个 SVG，默认色 #383838）
  file-type/         文件类型图标（位图 PNG，特殊）
  avatar/            头像 PNG
pages/<分类>/<name>.html   预览页，样式用 pages/preview.css
index.html           预览壳，左侧导航按分类链接各预览页
```

分类：通用、导航、对话组件、数据录入、数据展示、反馈。新增组件后，必须同时：
1. 在 `polaris.css` 对应分类下 `@import` 组件 CSS；
2. 在 `index.html` 对应分组下加预览页链接。

## 3. 还原流程

1. 用 Figma MCP：先 `create_session`，再对用户给的节点调用 `get_design_context`（必要时 `get_screenshot`）。
2. 返回的是 React + Tailwind 参考代码，不能直接用。必须转成纯 HTML/CSS，并换成项目 token。
3. 返回的资源 URL 是 7 天过期的临时链接，必须 `curl -L` 下载到 `assets/` 再引用，禁止在代码里留 Figma 临时链接。
4. 设计稿里没有的状态（如未提供的 disabled、error 边框）不要自己编造，做完后在回复里说明哪些没做。
5. 遇到设计稿有歧义、图片需要用户导出（如 PNG 头像、文件类型图标），先问用户或让用户放到指定路径，不要猜。

## 4. 颜色与 token（硬性要求）

- 组件 CSS 只能用语义 token，禁止出现裸 hex、禁止直接引用 `--color-*` 原始色。
- 设计稿里的颜色要对应到语义 token（如 `text/tertiary` → `var(--text-tertiary)`）。设计稿标了 token 名就用该名；没标就按取色匹配语义 token，对不上再问用户。
- 常用语义 token：
  - 文字：`--text-primary / secondary / tertiary / subtle / accent / brand / white`
  - 背景：`--background-white / grey / primary`
  - 边框：`--border-primary / secondary / brand`
  - 悬停：`--hover-subtle / default / strong-on-bg`
  - 状态：`--error-*`、`--success-*`
  - 遮罩：`--mask-primary`
- 字号、字重、行高用 foundation 里的变量（`--font-size-text-sm` 等）。若设计稿用到没有的字重等，加到 foundation 并说明。

## 5. 命名与 CSS 约定

- 类名前缀 `pl-`，BEM：`.pl-button`、`.pl-button--small`、`.pl-button__icon`。
- 状态用 `is-*`（如 `is-hover`、`is-active`），预览页里用来展示静态 hover 等状态。
- 每个组件 CSS 文件顶部写使用注释：HTML 示例、变体、可替换项。
- 尺寸、间距、圆角按 Figma 像素值还原，不做近似。
- 组件只负责自身外观；定位和显隐由使用方控制（例：`pl-tooltip` 只管样式，图标按钮的 `.pl-icon-button__tooltip` 管位置和 hover 显示）。已有组件要复用，不要重复造（按钮 hover 提示用 `pl-tooltip`、图标用 `pl-icon`）。
- 原子组件优先：能抽成单个元素的就做成原子组件，不要只做状态穷举的拼盘（如侧边导航单项）。可省略/可替换的部分（icon、箭头）做成可选或可替换，并在注释里说明。

## 6. 图标

- 通用图标全部放 `assets/icons/`，一个图标一个文件，不按组件分目录、不做颜色副本。
- 用法（颜色跟随 `color`，由组件的 token 设置）：
  `<span class="pl-icon pl-icon--mask" style="--icon-src: url(...)"></span>`
  尺寸默认 16px，`--sm` 14px，`--lg` 20px，组件内按设计稿覆盖。
- 复选框的勾等一次性图形可内联 data-URI，不单独建文件。
- 文件类型图标是彩色位图，直接 `<img>`，放 `assets/file-type/`，不走 mask。
- mask 在 `file://` 下不显示，预览必须走 http（见第 9 节）。

## 7. 预览页规范

- 页面结构：`main.preview-page` → `h1.preview-page__title` → 多个 `section.preview-section`（含 `header` 标题 + 描述，内容放 `.preview-panel`）。可参考 `pages/general/icon.html`、`pages/general/button.html`。
- 标题用用户的原话。类型命名：“类型一：… / 类型二：…”；子组件放最后。
- 变体多时用矩阵布局，并像按钮页那样加标注（行列标签说明是什么状态/变体）。
- Figma 的拼写错误按正确的写（如 “Seconday” 写 “Secondary”）。
- 预览用的样式只放 `pages/preview.css`，不污染 `components/`。

## 8. 交互还原细节（已踩过的坑）

- Hover 提示要和 Figma 位置一致（显示在元素上方），并复用 tooltip。
- 并列按钮间距按设计稿，目前按钮之间统一 8px。
- 网格用 `minmax(0, 1fr)`，避免输入框等固有宽度撑破列。
- 删除类图标（如上传右上角）用图标库里的删除图标，颜色按设计稿的 token（如 `text/tertiary`）。

## 9. 本地预览与验证

- 在项目根目录起服务：`python3 -m http.server 8765`，访问 `http://localhost:8765/index.html`。
- 在浏览器里逐页检查：颜色（是否来自 token）、尺寸、间距、hover。可用 DevTools/脚本读 computed style 对照设计稿数值。
- 缓存导致看不到改动时，URL 加 `?v=N`。

## 10. 交付检查清单

- [ ] 组件 CSS 里没有裸 hex 和 `--color-*`。
- [ ] 类名全部 `pl-` + BEM，状态用 `is-*`。
- [ ] 资源已下载到 `assets/`，没有 Figma 临时链接。
- [ ] 已加入 `polaris.css` 和 `index.html`。
- [ ] 预览页按第 7 节结构，已在浏览器验证。
- [ ] 回复里说明了：没做的状态、对设计稿的任何推断、需要用户补充的资源。
