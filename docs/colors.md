# 北极星 · Colors

颜色是北极星设计规范中独立存储的第一块基础层，对应 Figma「❖ Token」页。

**来源：** [北极星设计规范 · Token](https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL/?node-id=15-505)  
**Figma 集合：** `_primitives`（原始色）→ `color`（语义色，alias 指向原始色）

## 两层结构

| 层级 | Figma Collection | 用途 |
|------|------------------|------|
| Primitive | `_primitives` | 不可直接用于业务语义，只承载原始色值 |
| Semantic | `color` | UI 语义（文字、背景、边框、状态），alias 到 Primitive |

应用代码应优先使用 **Semantic**；仅在扩展色板时改动 Primitive。

## Color Primitives

### Base

| Token | Hex | 说明 |
|-------|-----|------|
| `Base/White` | `#FFFFFF` | 基础纯白 |
| `Base/Black` | `#000000` | 基础纯黑 |

### Neutral

中性色阶，用于文字、背景与边框。

| Token | Hex |
|-------|-----|
| `Neutral/100` | `#F7F7F7` |
| `Neutral/200` | `#F3F3F3` |
| `Neutral/300` | `#F2F2F2` |
| `Neutral/400` | `#E7E7E7` |
| `Neutral/500` | `#C5C5C5` |
| `Neutral/600` | `#ADADAD` |
| `Neutral/700` | `#8A8A8A` |
| `Neutral/800` | `#383838` |
| `Neutral/900` | `#1D1D1D` |

### Error source (Red)

| Token | Hex |
|-------|-----|
| `Red/50` | `#FFEFEF` |
| `Red/100` | `#FDDBDB` |
| `Red/500` | `#F64D4D` |

### Brand

| Token | Hex |
|-------|-----|
| `Brand/100` | `#FFE0CF` |
| `Brand/500` | `#F36B24` |

### Success source (Green)

| Token | Hex |
|-------|-----|
| `Green/100` | `#DDFCDD` |
| `Green/500` | `#39AD37` |

### Alpha

| Token | Value |
|-------|-------|
| `Alpha/500` | `#383838` @ 20% → `rgba(56, 56, 56, 0.2)` |

## Semantic Colors

| Semantic | Alias | Resolved |
|----------|-------|----------|
| `Text/Primary` | `Neutral/800` | `#383838` |
| `Text/Secondary` | `Neutral/700` | `#8A8A8A` |
| `Text/Tertiary` | `Neutral/600` | `#ADADAD` |
| `Text/Subtle` | `Neutral/500` | `#C5C5C5` |
| `Text/Brand` | `Brand/500` | `#F36B24` |
| `Text/Accent` | `Neutral/900` | `#1D1D1D` |
| `Text/White` | `Base/White` | `#FFFFFF` |
| `Hover/Subtle` | `Neutral/100` | `#F7F7F7` |
| `Hover/Default` | `Neutral/300` | `#F2F2F2` |
| `Hover/Strong_On-Bg` | `Neutral/400` | `#E7E7E7` |
| `Background/Grey` / `Main` | `Neutral/100` | `#F7F7F7` |
| `Background/White` | `Base/White` | `#FFFFFF` |
| `Background/Black` | `Neutral/800` | `#383838` |
| `Border/Primary` | `Neutral/400` | `#E7E7E7` |
| `Border/Secondary` | `Neutral/200` | `#F3F3F3` |
| `Border/Brand` | `Brand/100` | `#FFE0CF` |
| `Error/Primary` | `Red/500` | `#F64D4D` |
| `Error/Secondary` | `Red/100` | `#FDDBDB` |
| `Error/Tertiary` | `Red/50` | `#FFEFEF` |
| `Mask/Primary` | `Alpha/500` | `rgba(56,56,56,0.2)` |
| `Success/Primary` | `Green/500` | `#39AD37` |
| `Success/Secondary` | `Green/100` | `#DDFCDD` |

## 使用方式

### CSS

```css
@import '@stepwise/design-system/colors.css';

.title {
  color: var(--polar-text-accent);
}

.card {
  background: var(--polar-bg-white);
  border: 1px solid var(--polar-border-primary);
}
```

### JavaScript / TypeScript

```js
import { colors, text, brand } from '@stepwise/design-system';

text.primary.hex; // '#383838'
brand[500].hex;   // '#F36B24'
colors.aliases['Text/Brand']; // 'Brand/500'
```

### Design Tokens JSON (DTCG)

见 [`tokens/colors.json`](../tokens/colors.json)，可用 Style Dictionary 等工具再生成平台产物。
