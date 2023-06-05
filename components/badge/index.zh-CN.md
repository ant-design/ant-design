---
category: Components
subtitle: 徽标数
title: Badge
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e0qITYqF394AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*v8EQT7KoGbcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group: 数据展示
---

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/no-wrapper.tsx">独立使用</code>
<code src="./demo/overflow.tsx">封顶数字</code>
<code src="./demo/dot.tsx">讨嫌的小红点</code>
<code src="./demo/change.tsx">动态</code>
<code src="./demo/link.tsx">可点击</code>
<code src="./demo/offset.tsx">自定义位置偏移</code>
<code src="./demo/size.tsx">大小</code>
<code src="./demo/status.tsx">状态点</code>
<code src="./demo/colorful.tsx">多彩徽标</code>
<code src="./demo/ribbon.tsx">缎带</code>
<code src="./demo/ribbon-debug.tsx" debug>Ribbon Debug</code>
<code src="./demo/mix.tsx" debug>各种混用的情况</code>
<code src="./demo/title.tsx" debug>自定义标题</code>
<code src="./demo/colorful-with-count-debug.tsx" debug>多彩徽标支持 count 显示 Debug</code>

## API

### Badge

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| color | 自定义小圆点的颜色 | string | - |  |
| count | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | ReactNode | - |  |
| dot | 不展示数字，只有一个小红点 | boolean | false |  |
| offset | 设置状态点的位置偏移 | \[number, number] | - |  |
| overflowCount | 展示封顶的数字值 | number | 99 |  |
| showZero | 当数值为 0 时，是否展示 Badge | boolean | false |  |
| size | 在设置了 `count` 的前提下有效，设置小圆点的大小 | `default` \| `small` | - | 4.6.0 |
| status | 设置 Badge 为状态点 | `success` \| `processing` \| `default` \| `error` \| `warning` | - |  |
| text | 在设置了 `status` 的前提下有效，设置状态点的文本 | ReactNode | - |  |
| title | 设置鼠标放在状态点上时显示的文字 | string | - |  |

### Badge.Ribbon (4.5.0+)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| color | 自定义缎带的颜色 | string | - |  |
| placement | 缎带的位置，`start` 和 `end` 随文字方向（RTL 或 LTR）变动 | `start` \| `end` | `end` |  |
| text | 缎带中填入的内容 | ReactNode | - |  |

## Design Token

<ComponentTokenTable component="Badge"></ComponentTokenTable>
