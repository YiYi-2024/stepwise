# 北极星设计系统 V1.0（交接包）

静态 HTML/CSS/JS 组件库与产品 DEMO 交接包，源文件来自「北极星设计系统 V1.0」。

## 入口

| 文件 | 说明 |
|------|------|
| [北极星组件库与产品DEMO交接指南.md](./北极星组件库与产品DEMO交接指南.md) | 人 / AI 共用交接与封装指引 |
| [CONVENTIONS.md](./CONVENTIONS.md) | 还原与组件规范 |
| [index.html](./index.html) | 组件预览壳 |
| [DEMO/](./DEMO/) | 产品 DEMO |
| [polaris.css](./polaris.css) | 样式唯一入口（`@import` tokens / base / components） |

## 本地预览

在本目录执行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

然后打开 <http://127.0.0.1:8765/index.html> 或 <http://127.0.0.1:8765/DEMO/>。

## 目录约定

见 `CONVENTIONS.md`：`tokens/`、`base.css`、`components/`、`assets/`、`pages/`、`DEMO/`。`work/` 为工作草稿区，正式入口以根级 `polaris.css` 与预览页为准。
