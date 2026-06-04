# Jest → Vitest 迁移可行性 POC · 结论报告

> 方案 A（esbuild 原生路线）· 验证组件：Button / Modal / Table 完全并存：新增 vitest 配置与独立 script，不改任何现有 jest 配置与测试文件。

## 一、一句话结论

**建议「有条件全量迁移」**。组件测试主体与最独特的 demo 快照机制均已在 Vitest（esbuild）下跑通，快照 HTML 与 Jest 字节级一致，冷启动提速约 3 倍。阻塞点集中且可枚举：`jest.mock(path, factory)` 工厂用法与 fake-timer 配置差异需要手动迁移，约影响 16% 的用例。

## 二、四项验收结果

| # | 验收标准 | 结果 |
| --- | --- | --- |
| 1 | 组件测试跑通 | ✅ 无 `jest.mock` 工厂的组件测试近乎全通过：Modal.test 47/47、Table.test 30/31、Button index 65/67 |
| 2 | demo 测试跑通 | ✅ 全部通过：Button demo 23/24（1 skip）、demo-extend 21/22；Modal/Table demo 全绿 |
| 3 | LIB_DIR 重写 | ✅ `LIB_DIR=es` alias 正确指向 `es/` 产物，真实 demo 测试通过 |
| 4 | 性能对比数据 | ✅ 见下表 |

### `npm run test:vitest` 绿色门禁

当前配置下 **16 文件 / 272 用例全绿**（含全部 demo 测试 + 无 mock 工厂的组件测试）。已知需手动迁移的文件在 `vitest.config.ts` 的 `exclude` 中显式列出并注明原因。

## 三、性能对比（同一批 145 用例：Button index + Modal + Table）

| 场景                                                 | Jest   | Vitest | 对比                |
| ---------------------------------------------------- | ------ | ------ | ------------------- |
| 冷启动（`--no-cache`，**CI / npm script 实际场景**） | ~20.7s | ~6.5s  | **Vitest 快 ~3.2×** |
| 暖缓存（本地连续重跑）                               | ~2.0s  | ~6.7s  | Jest 快 ~3.4×       |

- 取 3 次中位数，相同机器，关闭 coverage。
- antd 所有测试 npm script 均带 `--no-cache`，故 **冷启动是真实对比口径**，Vitest 明显占优。
- Jest 的 transform 缓存让本地暖跑更快；Vitest 的真正 DX 优势在 watch 模式（仅重跑变更文件），本次未量化。

## 四、快照兼容性（关键结论）

- **HTML 内容字节级一致**：Button demo 整份快照（44 个 demo）`diff` 结果为 **0 行差异**。自定义 serializer（HTML 格式化 + demo SSR serializer）在 Vitest 下原样复用、输出完全相同。
- **唯一差异是 snapshot key 格式**：Jest 用 `A B`，Vitest 用 `A > B`（`>` 分隔）。
- **并存方案**：Vitest 基线写入测试同目录的 `components/**/__tests__/__snapshots__/vitest/`（与组件就近存放），**Jest 既有 `.snap` 零改动**。基线随 PR 提交，保证 `npm run test:vitest` 在干净 CI checkout 上可复现为绿色门禁。
  - 注：Jest 会全仓扫描 `.snap` 并在 `--ci` 下把无对应测试的快照判为 obsolete 而报错。故在 4 份 `.jest.*` 配置统一加入 `modulePathIgnorePatterns: '/__snapshots__/vitest/'`，让 Jest 忽略 Vitest 基线——这是本 POC 对现有 Jest 配置的**唯一改动**，不影响 Jest 测试行为。

## 五、阻塞点清单（全量迁移待解项）

### ❌ 必须手动迁移

1. **`jest.mock(path, factory)` 工厂用法（约 56 文件）** —— 最大阻塞项
   - 原因：`vi.mock` 会被提升到 import 之前，工厂内引用的 `jest.requireActual`（同步垫片）在提升作用域不可用。
   - 表现：`confirm.test`（26 失败）、`wave.test`（2 失败）等使用 `jest.mock('react-dom'|'@rc-component/util'|'../../_util/ActionButton', factory)` 的文件。
   - 迁移方式：改写为 `vi.mock(path, async () => { const actual = await vi.importActual(path); ... })`。

2. **fake-timer 配置差异**
   - 表现：`tests/utils.tsx` 的 `waitFakeTimer` 调用 `jest.advanceTimersByTime`，但 Vitest 未默认开启 fake timers，报 `Timers are not mocked`。
   - 迁移方式：在 `vitest.config.ts` 配置 `test.fakeTimers`，或在用例显式 `vi.useFakeTimers()`。

### ⚠️ 有差异但可解释（非阻塞）

3. **CSS 变量序列化差异**：`rgba(0, 0, 0, 0.1)` (Jest) vs `rgba(0,0,0,0.1)` (Vitest)。
   - 根因：`@ant-design/cssinjs` 经 esbuild（内联）与经 babel 编译的产物分支不同。影响 Button index 的 2 个 `toHaveStyle` 用例。

### ✅ 已解决（POC 中已攻克）

4. **CJS 依赖 `require('antd')` 绕过 alias**：`antd-style`、`@ant-design/happy-work-theme` 默认解析 CJS `lib/`，其 `require('antd')` 不走 Vite alias → 报 `Cannot find module 'antd'`。
   - 解法：alias 强制这些包走各自 ESM `es/` 入口（`import 'antd'` 可命中 alias）。
5. **`jest.requireActual` 同步动态加载**：demo 测试在 `test()` 体内同步调用。
   - 解法：`import.meta.glob` 预构建模块表 + setupFiles 顶层 await 预解析填充同步缓存，**demoTest.tsx 零改动**。

## 六、jest API 垫片覆盖率

`vitest.setup.ts` 的 `globalThis.jest = vi` 垫片覆盖（测试文件零改动）：

| API                                                    | 覆盖                             |
| ------------------------------------------------------ | -------------------------------- |
| `jest.fn` / `spyOn` / 各类 timer API / `setSystemTime` | ✅ 映射到 `vi`                   |
| `jest.requireActual`（同步动态路径）                   | ✅ 自定义实现（glob + 同步缓存） |
| `jest.mock(path, factory)`（工厂提升）                 | ❌ 见下方说明，垫片无法支持      |

> **`jest.mock` 为何无法用垫片支持**：测试里写 `jest.mock(...)`，运行时是经 `globalThis.jest.mock(...)` 这种属性访问间接调用 `vi.mock`。而 Vitest 的提升（hoisting）转换只识别**字面量** `vi.mock(...)` 的调用节点，间接调用不会被提升到 import 之前——mock 注册时目标模块已加载。结果是测试**假成功**：照常 pass，但跑的是真实模块而非 mock（已实证 `isMockFn: false`）。

### 垫片的定位：临时层，全量迁移时删除

`jestShim` 是 **POC 期的临时兼容层**，唯一目的是让现存测试文件**零改动**跑通以验证可行性，**不是长期设计**。全量切换到 Vitest 时应整体移除：

- `vitest.setup.ts` 中 `jestShim` 与 `globalThis.jest = jestShim` 整段删除；
- `jest.fn` / `spyOn` / timer 等别名类 API → codemod 批量替换为 `vi.*`；
- `jest.mock(path, factory)`（约 56 文件）→ 逐个手改为字面量 `vi.mock(path, async () => { const actual = await vi.importActual(path); ... })`；
- `jest.requireActual` 同步动态加载（垫片中最重的 `import.meta.glob` + 预加载缓存）→ 随 `demoTest.tsx` 改为异步 `await vi.importActual` 或用 `import.meta.glob` 重写 demo 加载后一并删除。

换言之，垫片为「不改测试文件」而生，而**迁移的终点恰是改测试文件**——终点到达时垫片使命即结束。它的附带价值是**枚举出哪些 API 可无痛替换、哪些必须手改**（即上表 ❌ 项与第五节阻塞清单）。

## 七、新增文件（零修改现有测试文件）

```text
vitest.config.ts     # jsdom + alias(含 LIB_DIR) + snapshot 路径(就近 __snapshots__/vitest/) + 内联依赖
vitest.setup.ts      # 合并两份 setup + jest→vi 垫片 + demo glob 预加载 + serializer
vitest/FINDINGS.md   # 本报告
components/**/__tests__/__snapshots__/vitest/  # Vitest 快照基线（随 PR 提交，与组件就近存放）
package.json         # 追加 test:vitest / test:vitest:watch；pin jest-canvas-mock=2.5.2
eslint.config.mjs    # 将两个 vitest 文件纳入 tests override
.jest.js / .jest.node.js / .jest.image.js / .jest.site.js
                     # 仅加 modulePathIgnorePatterns 忽略 Vitest 快照（不改测试行为）
```

## 八、全量迁移工作量估算

| 工作项                       | 规模                | 难度                                   |
| ---------------------------- | ------------------- | -------------------------------------- |
| `jest.mock` 工厂改写         | ~56 文件            | 中（模式固定，可半自动）               |
| fake-timer 全局配置          | 1 处配置 + 个别用例 | 低                                     |
| CSS 变量序列化对齐           | 个别 `toHaveStyle`  | 低（或接受差异）                       |
| node/site/image 三套配置迁移 | 3 套                | 中（image 依赖 puppeteer，需单独评估） |
| 全量 snapshot 重生成         | 310 个              | 低（内容一致，仅 key 迁移）            |

**结论**：主体迁移成本可控，最大投入在 `jest.mock` 工厂改写，且为固定模式可批量处理。建议按组件分批迁移，先迁无 mock 工厂的组件，再处理 mock 密集组件。
