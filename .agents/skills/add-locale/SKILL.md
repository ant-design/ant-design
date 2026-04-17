---
name: antd-add-locale
description: 为 ant-design 添加新的国际化语言支持。在用户提到添加语言、新增 locale、国际化支持、新增翻译、或处理 locale 文件时使用。覆盖从 rc-component 到 antd 的完整 locale 添加流程。
---

# Ant Design 添加新语言规范

## 目标

一、为 ant-design 添加新的国际化（i18n）语言支持，确保所有组件和模块的翻译完整一致。

二、遵循从底层 `@rc-component/*` 到上层 `antd` 的依赖链，正确添加 locale 文件。

三、更新文档、测试和类型定义，确保新语言可被开发者正常使用。

## 触发场景

当用户提到以下场景时使用：

- 添加新语言
- 新增 locale
- 新增国际化支持
- 添加翻译文件
- 支持新语言

## 核心原则

### 一、Locale 添加是多层级任务

ant-design 的 locale 系统涉及多个层级，必须逐层添加：

1. `@rc-component/picker` — DatePicker/TimePicker 底层组件 locale
2. `@rc-component/pagination` — Pagination 组件 locale
3. `antd` 组件 locale 文件
4. 测试、文档、类型更新

### 二、必须同时更新所有相关文件

添加一个语言不仅仅是创建一个 locale 文件，还需要：

- 更新所有组件的 locale 目录
- 更新测试用例
- 更新文档中的语言列表
- 确保中英文档同步

### 三、语言代码遵循 BCP 47

使用 `语言_地区` 格式，例如 `en_US`、`zh_CN`、`ja_JP`。

## 完整流程

### 阶段一：添加 rc-component locale

#### 1. @rc-component/picker

DatePicker 和 TimePicker 的底层 locale 来自 `@rc-component/picker`。

**步骤：**

1. Fork 或克隆 `https://github.com/react-component/picker`
2. 在 `src/locale/` 目录下添加新的 locale 文件，例如 `xx_XX.ts`
3. 参考现有文件结构（如 `en_US.ts`）编写翻译内容
4. 提交 PR 到 `@rc-component/picker`
5. 等待合并和发布新版本

**Locale 文件结构示例：**

```typescript
const locale = {
  locale: 'xx_XX',
  today: '今天',
  now: '此刻',
  backToToday: '返回今天',
  ok: '确定',
  clear: '清除',
  month: '月',
  year: '年',
  timeSelect: '选择时间',
  dateSelect: '选择日期',
  weekSelect: '选择周',
  monthSelect: '选择月份',
  yearSelect: '选择年份',
  decadeSelect: '选择年代',
  yearFormat: 'YYYY年',
  dateFormat: 'YYYY年M月D日',
  dayFormat: 'D日',
  dateTimeFormat: 'YYYY年M月D日 HH时mm分ss秒',
  monthBeforeYear: false,
  previousMonth: '上个月 (PageUp)',
  nextMonth: '下个月 (PageDown)',
  previousYear: '去年 (Control + left)',
  nextYear: '明年 (Control + right)',
  previousDecade: '上个年代',
  nextDecade: '下个年代',
  previousCentury: '上个世纪',
  nextCentury: '下个世纪',
};

export default locale;
```

#### 2. @rc-component/pagination

Pagination 组件的 locale 来自 `@rc-component/pagination`。

**步骤：**

1. Fork 或克隆 `https://github.com/react-component/pagination`
2. 在 `src/locale/` 目录下添加新的 locale 文件，例如 `xx_XX.ts`
3. 提交 PR 到 `@rc-component/pagination`
4. 等待合并和发布新版本

**Locale 文件结构示例：**

```typescript
const locale = {
  items_per_page: '条/页',
  jump_to: '跳至',
  jump_to_confirm: '确定',
  page: '页',
  prev_page: '上一页',
  next_page: '下一页',
  prev_5: '向前 5 页',
  next_5: '向后 5 页',
  prev_3: '向前 3 页',
  next_3: '向后 3 页',
  page_size: '页码',
};

export default locale;
```

### 阶段二：等待 rc-component 发布

**重要：** 必须等待 `@rc-component/picker` 和 `@rc-component/pagination` 的新版本发布后，才能在 antd 中使用。

可以通过以下方式检查：

```bash
npm view @rc-component/picker versions --json | tail -5
npm view @rc-component/pagination versions --json | tail -5
```

### 阶段三：在 antd 中添加 locale 文件

#### 1. 更新 package.json 中的 rc-component 版本

```json
{
  "dependencies": {
    "@rc-component/picker": "~x.x.x",
    "@rc-component/pagination": "~x.x.x"
  }
}
```

#### 2. 添加 DatePicker locale

在 `components/date-picker/locale/` 下创建 `xx_XX.ts`：

```typescript
import type { PickerLocale } from '../generatePicker';
import xxXX from '@rc-component/picker/lib/locale/xx_XX';

const locale: PickerLocale = {
  ...xxXX,
  // 如有 antd 特有的翻译，在此补充
};

export default locale;
```

#### 3. 添加 Calendar locale

在 `components/calendar/locale/` 下创建 `xx_XX.ts`：

```typescript
// Calendar 通常复用 DatePicker 的 locale
import xxXX from '../../date-picker/locale/xx_XX';

export default xxXX;
```

#### 4. 添加 TimePicker locale

在 `components/time-picker/locale/` 下创建 `xx_XX.ts`：

```typescript
import xxXX from '@rc-component/picker/lib/locale/xx_XX';

export default xxXX;
```

#### 5. 添加主 locale 文件

在 `components/locale/` 下创建 `xx_XX.ts`：

```typescript
import Pagination from '@rc-component/pagination/lib/locale/xx_XX';
import Calendar from '../calendar/locale/xx_XX';
import DatePicker from '../date-picker/locale/xx_XX';
import TimePicker from '../time-picker/locale/xx_XX';
import type { Locale } from '.';

const localeValues: Locale = {
  locale: 'xx_XX',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // 以下为 antd 组件的翻译，需要根据 Locale interface 补齐
  global: {
    placeholder: '请选择',
    close: '关闭',
    sortable: '可排序',
  },
  Table: {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    filterEmptyText: '无筛选项',
    selectAll: '全选',
    selectInvert: '反选',
    selectionAll: '全选所有列',
    sortTitle: '排序',
    expand: '展开行',
    collapse: '关闭行',
    triggerDesc: '点击降序',
    triggerAsc: '点击升序',
    cancelSort: '取消排序',
  },
  Modal: {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了',
  },
  Tour: {
    Next: '下一步',
    Previous: '上一步',
    Finish: '结束导览',
  },
  Popconfirm: {
    okText: '确定',
    cancelText: '取消',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: '请输入搜索内容',
    itemUnit: '项',
    itemsUnit: '项',
    remove: '移除',
    selectCurrent: '全选当前页',
    removeCurrent: '删除当前页',
    selectAll: '全选所有',
    removeAll: '删除所有',
    selectInvert: '反选当前页',
  },
  Upload: {
    uploading: '上传中...',
    removeFile: '删除文件',
    uploadError: '上传错误',
    previewFile: '预览文件',
    downloadFile: '下载文件',
  },
  Empty: {
    description: '暂无数据',
  },
  Text: {
    edit: '编辑',
    copy: '复制',
    copied: '复制成功',
    expand: '展开',
    collapse: '收起',
  },
  Form: {
    optional: '（可选）',
    defaultValidateMessages: {
      // 验证消息翻译
    },
  },
  QRCode: {
    expired: '二维码已过期',
    refresh: '点击刷新',
    scanned: '已扫描',
  },
  Icon: {},
  ColorPicker: {
    presetEmpty: '暂无预设颜色',
    transparent: '透明色',
    singleColor: '单色',
    gradientColor: '渐变色',
  },
};

export default localeValues;
```

**注意：** 以上翻译值为示例，实际应参考 `en_US.ts` 和 `zh_CN.ts` 确保翻译准确。

### 阶段四：更新测试

#### 1. 添加 locale 测试

在 `components/locale/__tests__/index.test.tsx` 中添加新语言的测试用例：

```typescript
import xxXX from '../xx_XX';

// 在现有的 describe 块中添加
it('should work for xx_XX', () => {
  expect(xxXX.locale).toBe('xx_XX');
  // 根据 Locale interface 验证关键字段
  expect(xxXX.Modal?.okText).toBeDefined();
  expect(xxXX.Table?.filterTitle).toBeDefined();
});
```

#### 2. 更新快照

```bash
npm run test -- components/locale -u
```

### 阶段五：更新文档

#### 1. 更新 i18n 文档

在 `docs/react/i18n.en-US.md` 和 `docs/react/i18n.zh-CN.md` 的语言列表中添加新语言：

```markdown
| 语言             | 文件名    | 包名     |
| ---------------- | --------- | -------- |
| 新语言名称       | `xx_XX`   | `xx_XX`  |
```

#### 2. 确认组件文档中的 locale 示例

检查各组件文档（`index.en-US.md` / `index.zh-CN.md`）中是否有 locale 相关示例需要更新。

### 阶段六：验证和提交

#### 1. 运行校验

```bash
# 运行 locale 测试
npm run test -- components/locale

# 运行 lint
npm run lint

# 类型检查
npm run tsc
```

#### 2. 提交 PR

- 分支命名：`feat/add-locale-xx_XX`
- PR 标题：`feat: add xx_XX locale support`
- 确保 CI 全部通过
- 需要至少一名维护者审核

## 语言代码参考

常用语言代码：

| 语言 | 代码 | 示例 |
|---|---|---|
| 英语（美国） | en_US | `en_US.ts` |
| 英语（英国） | en_GB | `en_GB.ts` |
| 中文（简体） | zh_CN | `zh_CN.ts` |
| 中文（繁体，台湾） | zh_TW | `zh_TW.ts` |
| 中文（繁体，香港） | zh_HK | `zh_HK.ts` |
| 日语 | ja_JP | `ja_JP.ts` |
| 韩语 | ko_KR | `ko_KR.ts` |
| 法语 | fr_FR | `fr_FR.ts` |
| 德语 | de_DE | `de_DE.ts` |
| 西班牙语 | es_ES | `es_ES.ts` |
| 俄语 | ru_RU | `ru_RU.ts` |
| 阿拉伯语 | ar_EG | `ar_EG.ts` |

完整列表参考 `components/locale/` 目录下的现有文件。

## 注意事项

- 翻译内容应为自然流畅的目标语言，不要机翻
- 保持与 `en_US.ts` 的字段对齐，不要遗漏
- 如果 `@rc-component/*` 中缺少目标语言的 locale，需要先在对应 rc-component 仓库添加
- 新增语言后，确保所有 locale 文件（DatePicker、Calendar、TimePicker、Pagination、主 locale）都已创建
- 测试和文档更新不可省略
