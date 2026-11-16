---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 709956bc7e78d20f930279d5e2bd24f5_52940b78e0ba11f1913b525400393706
    ReservedCode1: XfCScQqLgXzrzGj/Of1sp0SI4m11/78Et909P3x0ju0uU66f7Z30W41eHFH0Olvy4AsmsffQOml6FgxEXATa97ANbDYuA6ZVGkoOE8Vo6qdEbDZe5Z9XiApDam5NeL2P6Vltxcu0AGPYkr0vt8YuyidwrFaTpiRBil33vkKOtkmJBJsxZVjtM6zMR4M=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 709956bc7e78d20f930279d5e2bd24f5_52940b78e0ba11f1913b525400393706
    ReservedCode2: XfCScQqLgXzrzGj/Of1sp0SI4m11/78Et909P3x0ju0uU66f7Z30W41eHFH0Olvy4AsmsffQOml6FgxEXATa97ANbDYuA6ZVGkoOE8Vo6qdEbDZe5Z9XiApDam5NeL2P6Vltxcu0AGPYkr0vt8YuyidwrFaTpiRBil33vkKOtkmJBJsxZVjtM6zMR4M=
---

# devtools — 开发调试页（非业务代码）

本目录存放仅用于本地开发与联调验证的页面，不承载任何业务逻辑，也不应被业务模块引用。

## 当前内容

| 文件 | 路由 | 说明 |
|---|---|---|
| `debugDemo.vue` | `/debug` | 组件与接口的联调样例页（校验码、弹窗、懒加载等能力的调试入口），由 `src/router/index.ts` 直接路由到本目录 |

## 约定

- 新增调试页放本目录，文件名用 `kebab-case`，路由统一挂在 `/debug` 前缀下。
- 页面内不得写入业务状态到全局 store，也不得被 `views` / `components` 引用。
- 生产构建如需排除，可在后续批次中把本目录路由改为按 `import.meta.env.DEV` 条件注册（本次 P1 批次未改动行为）。

> 迁移说明：P1 批次将本文件从 `src/views/debugDemo.vue` 迁至 `src/devtools/debugDemo.vue`，路由路径 `/debug` 保持不变。
*（内容由AI生成，仅供参考）*
