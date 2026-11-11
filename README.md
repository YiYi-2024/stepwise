# 北极星设计规范 · Design System

独立存储的北极星（Polar Star）设计规范系统。当前已落盘 **Colors** 基础层，后续可在同包扩展 Typography、Spacing、Radius、Components 等。

## 来源

- Figma：[北极星设计规范 · ❖ Token](https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL/%E5%8C%97%E6%9E%81%E6%98%9F%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=15-505)
- Variable collections：`_primitives` → `color`（semantic aliases）

## 目录

```text
tokens/colors.json      # DTCG design tokens（含 alias）
src/colors/             # JS/TS 可引用 token
src/css/colors.css      # CSS custom properties（--polar-*）
docs/colors.md          # 颜色规范说明
showcase/colors.html    # 本地色板预览
scripts/validate-colors.mjs
```

## 使用

### CSS

```css
@import '@stepwise/design-system/colors.css';

button {
  color: var(--polar-text-white);
  background: var(--polar-brand-500);
}
```

### JavaScript

```js
import { colors, text, brand } from '@stepwise/design-system';

console.log(text.primary.hex); // #383838
console.log(brand[500].hex);   // #F36B24
console.log(colors.aliases['Error/Primary']); // Red/500
```

## 本地预览

```bash
npm run validate:colors
python3 -m http.server 4173 --bind 127.0.0.1
# open http://127.0.0.1:4173/showcase/colors.html
```

## 扩展约定

后续规范模块建议按同结构追加：

1. `tokens/<domain>.json`
2. `src/<domain>/`
3. `src/css/<domain>.css`
4. `docs/<domain>.md`
5. `showcase/<domain>.html`
