# Stepwise · 北极星设计规范

本仓库独立存储 **北极星（Polaris）设计规范系统**，与产品业务代码解耦，便于设计与工程共用同一套 token。

## 当前范围

| 模块 | 状态 | 路径 |
|------|------|------|
| **Colors** | ✅ 已落地 | [`design-system/colors`](./design-system/colors) |
| Typography / Spacing / Radius | 待扩展 | — |
| Components | 待扩展 | — |

颜色源稿：[Figma · ❖ Token / Color](https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL/%E5%8C%97%E6%9E%81%E6%98%9F%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=15-505)

## 快速开始

1. 阅读 [`design-system/README.md`](./design-system/README.md)
2. 在样式中引入 CSS 变量：

```css
@import "./design-system/colors/tokens.css";
```

3. 或在 TypeScript 中引用：

```ts
import { text, brand, semantic } from "./design-system";
```

4. 打开标本页查看色卡：[`preview/colors/index.html`](./preview/colors/index.html)
