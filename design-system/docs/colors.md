# Color · 颜色规范

来源：[北极星设计规范 · ❖ Token](https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL/?node-id=15-505)

颜色分为两层：

| 层级 | 用途 | 文件 |
|------|------|------|
| **Primitive** | 原始色阶，不直接绑业务语义 | `tokens/color/primitives.json` |
| **Semantic** | 组件与业务优先使用的语义色，引用 primitive | `tokens/color/semantic.json` |

运行时推荐：

- CSS：`css/colors.css` 中的 `--color-*` 变量（优先语义变量）
- TypeScript：`src/colors.ts` 中的 `colorSemantic` / `colorPrimitives`

---

## Color Primitives

### Base

基础黑白色，提供纯白与纯黑两种颜色。

| Token | Hex |
|-------|-----|
| `base.white` | `#FFFFFF` |
| `base.black` | `#000000` |

### Neutral

中性色阶，用于文字、背景与边框。

| Token | Hex |
|-------|-----|
| `neutral.100` | `#F7F7F7` |
| `neutral.200` | `#F3F3F3` |
| `neutral.300` | `#F2F2F2` |
| `neutral.400` | `#E7E7E7` |
| `neutral.500` | `#C5C5C5` |
| `neutral.600` | `#ADADAD` |
| `neutral.700` | `#8A8A8A` |
| `neutral.800` | `#383838` |
| `neutral.900` | `#1D1D1D` |

### Error

错误状态色，用于异常提示与校验反馈。

| Token | Hex |
|-------|-----|
| `error.50` | `#FFEFEF` |
| `error.100` | `#FDDBDB` |
| `error.500` | `#F64D4D` |

### Brand

品牌橙色，用于品牌表达与重点强调。

| Token | Hex |
|-------|-----|
| `brand.100` | `#FFE0CF` |
| `brand.500` | `#F36B24` |

### Success

成功状态色，用于操作成功与正向反馈。

| Token | Hex |
|-------|-----|
| `success.100` | `#DDFCDD` |
| `success.500` | `#39AD37` |

### Alpha

深灰色，20% 不透明度，用于遮罩与蒙层。

| Token | Value |
|-------|-------|
| `alpha.500` | `#38383833` / `rgba(56, 56, 56, 0.2)` |

---

## Semantic Colors

语义色映射到 primitive 别名，用于具体 UI 元素。

### Text

| Token | Resolved | Alias |
|-------|----------|-------|
| `text.primary` | `#383838` | `neutral.800` |
| `text.secondary` | `#8A8A8A` | `neutral.700` |
| `text.tertiary` | `#ADADAD` | `neutral.600` |
| `text.subtle` | `#C5C5C5` | `neutral.500` |
| `text.brand` | `#F36B24` | `brand.500` |
| `text.accent` | `#1D1D1D` | `neutral.900` |

### Hover

| Token | Resolved | Alias |
|-------|----------|-------|
| `hover.subtle` | `#F7F7F7` | `neutral.100` |
| `hover.default` | `#F2F2F2` | `neutral.300` |
| `hover.strong-on-bg` | `#E7E7E7` | `neutral.400` |

### Background

| Token | Resolved | Alias |
|-------|----------|-------|
| `background.main` | `#F7F7F7` | `neutral.100` |
| `background.white` | `#FFFFFF` | `base.white` |

### Border

| Token | Resolved | Alias |
|-------|----------|-------|
| `border.primary` | `#E7E7E7` | `neutral.400` |
| `border.secondary` | `#F3F3F3` | `neutral.200` |
| `border.brand` | `#FFE0CF` | `brand.100` |

### Error

| Token | Resolved | Alias |
|-------|----------|-------|
| `error.primary` | `#F64D4D` | `error.500` |
| `error.secondary` | `#FDDBDB` | `error.100` |
| `error.tertiary` | `#FFEFEF` | `error.50` |

### Mask

| Token | Resolved | Alias |
|-------|----------|-------|
| `mask.primary` | `rgba(56, 56, 56, 0.2)` | `alpha.500` |

### Success

| Token | Resolved | Alias |
|-------|----------|-------|
| `success.primary` | `#39AD37` | `success.500` |
| `success.secondary` | `#DDFCDD` | `success.100` |

---

## 使用示例

```css
@import "../css/colors.css";

.button-primary {
  background: var(--color-text-brand);
  color: var(--color-bg-white);
}

.page {
  background: var(--color-bg-main);
  color: var(--color-text-primary);
}
```

```ts
import { colorSemantic } from '../src/colors.js';

const styles = {
  color: colorSemantic.text.primary,
  backgroundColor: colorSemantic.background.main,
};
```
