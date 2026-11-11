# 北极星设计规范系统（Polaris Design System）

独立存放的设计 Token 与规范文档，与业务应用解耦，便于跨项目复用。

当前已收录：**颜色（Color）** —— 对应 Figma [`❖ Token`](https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL/%E5%8C%97%E6%9E%81%E6%98%9F%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=15-505) 中的 Color Primitives 与 Semantic Colors。

## 目录结构

```
design-system/
├── tokens/color/          # DTCG 格式 JSON（primitive + semantic）
├── css/colors.css         # CSS 自定义属性
├── src/colors.ts          # TypeScript 常量与类型
├── docs/colors.md         # 颜色规范说明
├── preview/colors.html    # 本地色板预览
└── README.md
```

## 使用原则

1. **产品 UI 优先用 Semantic tokens**（`text.*` / `bg.*` / `border.*` 等）
2. Primitive 仅用于扩展新语义色或需要原始色阶时
3. 新增规范模块（Typography、Spacing、Radius…）时，按同样分层放入 `tokens/`、`css/`、`src/`、`docs/`

## 快速开始

```html
<link rel="stylesheet" href="./css/colors.css" />
```

```ts
import { colorSemantic, colorPrimitives } from './src/colors.js';
```

本地预览色板：

```bash
# 在仓库根目录
python3 -m http.server 4173 --directory design-system
# 打开 http://127.0.0.1:4173/preview/colors.html
```

## 后续可扩展

| 模块 | 状态 |
|------|------|
| Color | ✅ 已收录 |
| Typography | 待补充 |
| Spacing / Radius | 待补充 |
| Elevation / Motion | 待补充 |
