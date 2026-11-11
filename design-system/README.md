# 北极星设计规范 · Design System

独立存放的设计规范系统，源稿来自 Figma [北极星设计规范](https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL)。

当前已落地：**颜色（Colors）**。后续可在同级目录扩展字号、间距、圆角与组件 token。

## 目录

```
design-system/
├── index.ts                 # 总出口
├── colors/
│   ├── primitives.ts        # Color Primitives（基础色阶）
│   ├── semantic.ts          # Semantic Colors（语义色 + 别名）
│   ├── tokens.css           # CSS 自定义属性
│   ├── tokens.json          # 机器可读 token（含 Figma 溯源）
│   └── index.ts
└── README.md
```

## 颜色

| 层级 | 用途 | 文件 |
|------|------|------|
| **Primitives** | 原始色值，不直接绑 UI 角色 | `colors/primitives.ts` |
| **Semantic** | 按角色使用（text / bg / border / state） | `colors/semantic.ts` |

### Color Primitives

| 组 | Token | 色值 |
|----|-------|------|
| Base | `white` / `black` | `#FFFFFF` / `#000000` |
| Neutral | `100` … `900` | `#F7F7F7` → `#1D1D1D` |
| Red | `50` / `100` / `500` | `#FFEFEF` / `#FDDBDB` / `#F64D4D` |
| Brand | `100` / `500` | `#FFE0CF` / `#F36B24` |
| Green | `100` / `500` | `#DDFCDD` / `#39AD37` |
| Alpha | `500` | `#383838` @ 20% |

### Semantic Colors（常用）

| 角色 | Token | 解析值 | 别名 |
|------|-------|--------|------|
| Text | `primary` | `#383838` | `neutral/800` |
| Text | `brand` | `#F36B24` | `brand/500` |
| Background | `main` | `#F7F7F7` | `neutral/100` |
| Border | `primary` | `#E7E7E7` | `neutral/400` |
| Error | `primary` | `#F64D4D` | `red/500` |
| Success | `primary` | `#39AD37` | `green/500` |
| Mask | `primary` | `rgba(56,56,56,0.2)` | `alpha/500` |

完整别名表见 `colors/semantic.ts` → `semanticAliases`。

## 使用

**CSS**

```css
@import "./design-system/colors/tokens.css";

.button-primary {
  color: var(--color-text-primary);
  background: var(--color-brand-500);
  border: 1px solid var(--color-border-primary);
}
```

**TypeScript**

```ts
import { brand, text, semantic } from "./design-system";

text.primary;   // "#383838"
brand[500];     // "#F36B24"
semantic.error.primary;
```

## 预览

打开 [`preview/colors/index.html`](../preview/colors/index.html) 查看色卡标本页。

## Figma 溯源

| 节点 | Node ID |
|------|---------|
| ❖ Token 页 | `15:505` |
| Color Primitives | `30:906` |
| Semantic Colors | `30:1254` |
