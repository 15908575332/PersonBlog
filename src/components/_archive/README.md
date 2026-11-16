---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 709956bc7e78d20f930279d5e2bd24f5_539bd92ee0ba11f189bc525400248c00
    ReservedCode1: ofOsMMMpC7yMJcMF5R10q/SyegycLxxov0BYC7Lf92STWM6xwUCnZBIttilfdzQ/pOlvOaZ3to9CU8bYUP+Xctlh1Z+LBTdk1nwD3LlMj6ZUaUYyJVid7y5PUgBRs4tLXkxQWDT8PV6EXnULIZFyXHWY1KjehcQjvbcyX0ZqEF895pp54o+taTA4g8g=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 709956bc7e78d20f930279d5e2bd24f5_539bd92ee0ba11f189bc525400248c00
    ReservedCode2: ofOsMMMpC7yMJcMF5R10q/SyegycLxxov0BYC7Lf92STWM6xwUCnZBIttilfdzQ/pOlvOaZ3to9CU8bYUP+Xctlh1Z+LBTdk1nwD3LlMj6ZUaUYyJVid7y5PUgBRs4tLXkxQWDT8PV6EXnULIZFyXHWY1KjehcQjvbcyX0ZqEF895pp54o+taTA4g8g=
---

# _archive — 归档组件（已停用，仅保留备查）

本目录存放当前代码库中**已无任何引用**的历史组件。归档 ≠ 删除：文件内容原样保留，随时可恢复，不参与任何业务渲染。

## 归档清单

| 组件 | 原路径 | 归档路径 | 归档原因 |
|---|---|---|---|
| `MeihuaSvg` | `src/components/MeihuaSvg/` | `src/components/_archive/MeihuaSvg/` | 全项目 0 处引用（`.vue` / `.ts` / `.js` 全量扫描无命中），保留以备后期改版复用 |

`MeihuaSvg/` 内含 `MeihuaSvg.vue`（272 行）与说明文件 `分支.txt`。

## 恢复方式

1. 将目录移回组件层目标位置，例如：
   `Move-Item src\components\_archive\MeihuaSvg src\components\business\effect\MeihuaSvg`
2. 在需要使用的页面/组件中按新路径 `import MeihuaSvg from '@/components/business/effect/MeihuaSvg/MeihuaSvg.vue'`。
3. 若该组件内部有相对路径引用（图标、字体），恢复时同步核对 `MeihuaSvg.vue` 内的资源路径。

## 约定

- 只有**确认 0 引用**的组件才允许进入本目录，且必须先做引用扫描。
- 本目录不接受新建业务代码；确认永不使用后，由用户单独授权删除。
- 目录名 `_archive` 前置下划线，便于按名称排序时与在用组件区分。
*（内容由AI生成，仅供参考）*
