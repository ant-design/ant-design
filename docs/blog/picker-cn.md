---
title: 为什么禁用日期这么难？
date: 2024-09-23
author: zombieJ
---

在 antd 中，DatePicker 的 issue 非常多。一来是由于日期选择需求的常见性，另一来是针对业务的需求会有各种各样的禁用选择组合。今天，我们就来聊聊 `disabledDate` 这个 API。

### disabledDate 不能控制时间

如其名，`disabledDate` 用于对日期进行禁用。所以当使用 DateTimePicker 时，时间部分并不会被 `disabledDate` 进行控制。而是需要通过 `disabledTime` 方法进行控制。这似乎有点反直觉，为什么需要用两个 API 管理呢？

#### 如何确定日期能选？

从直觉上看，一个日期是否禁用我们只需要将当前日期执行一次 `disabledDate` 即可知道。但是，如果当我们把面板切换成月份面板的时候，我们怎么知道当前月份是否可选呢？我们必须要对该月下的每个日期进行一次 `disabledDate` 才能确定该月下有可选日期，因此该月才能选择。

从目前看，这个逻辑似乎没问题。一个月 30 来天，月份面板 12 个月，最坏情况下，我们也只需要遍历 365 次就能知道 12 个月份是不可选的。但是以此类推，当面板切换为年、十年时。我们需要遍历的次数就会呈指数级增长，导致严重的性能问题（[#39991](https://github.com/ant-design/ant-design/issues/39991)）。

所以在 DatePicker 重构后，`disabledDate` 提供了额外的参数 `info.type`，告知提供的 date 对象来自于哪个 Panel。这样开发者就可以根据 Panel 来提供 `disabled` 信息，从而避免恐怖的调用循环。

但是作为兜底，DatePicker 会对当前 Panel 单元的第一天和最后一天进行 `disabledDate` 的调用。这样可以确保在常见的范围禁用场景下，仍能满足需求。

#### disabledTime

回到时间禁用，这是相同的问题。如果我们通过 `disabledDate` 进行时间维度的禁用，那么在 DateTimePicker 下该天是否可选，我们就需要对该天的每一秒进行 `disabledDate` 校验。在最坏情况下，一天是否可选就需要校验 86400 次。Date Panel 就需要执行 ~200 万次。显然这是不可接受的。

所以对于时间维度，我们提供了 `disabledTime` 方法。这个方法相比 `disabledDate` 会要求提供更细细粒度的时间禁用信息：

```tsx
type DisabledTime = (now: Dayjs) => {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  disabledMilliseconds?: (
    selectedHour: number,
    selectedMinute: number,
    selectedSecond: number,
  ) => number[];
};
```

（时间选择面板的每个单位都相当于日期面板的 Panel，后者通过前者单位的信息来推出当前禁用单位）

### 一些例子

在了解了上下文后，我们会发现 `disabledDate` 和 `disabledTime` 虽然设计是合理的，但是却有些偏底层。在业务中进行使用会比较麻烦，我们来看几个例子（当然，在业务中你需要考虑通过 HOC 来进行封装）：

#### 工作时间

暂时不考虑节假日的情况，我们选择工作日的 9:00 ~ 17:00 为可选时间：

```tsx
const disabledDate = (date, info) => {
  if (info.type === 'date') {
    return date.day() === 0 || date.day() === 6;
  }
  return false;
};

const disabledTime = () => ({
  disabledHours: () => {
    return Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < 9 || hour > 17);
  },
});
```

#### 时间日期范围

在 DatePicker 中有 `minDate` 和 `maxDate` 用于限制日期的选择范围，但是如果它们仅限于日期的限制。现在，假设我们有种场景需要带有时间的日期范围选择，比如 `2024-01-01 09:00:00` ~ `2024-01-02 17:00:00`，那么我们可以这样做：

```tsx
const disabledDate = (date, info) => {
  if (info.type === 'date') {
    return date.isBefore('2024-01-01', 'day') || date.isAfter('2024-01-02', 'day');
  }
  return !date.isSame('2024-01-01', info.type);
};

const disabledTime = (date) => {
  if (date.isSame('2024-01-01', 'day')) {
    return {
      disabledHours: () => Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < 9),
    };
  }

  if (date.isSame('2024-01-02', 'day')) {
    return {
      disabledHours: () => Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour > 17),
    };
  }

  // 只需要考虑开始和结束时间，范围外的本身已经被 `disabledDate` 禁用了
  return {};
};
```

### 总结

通过 `disabledDate` 和 `disabledTime`，我们可以对日期和时间进行更细粒度的控制，以实现不同的业务需求。通过以上示例，相信你已经对这两个 API 有了更深入的了解。在实际业务中，你可以根据具体需求，结合这两个 API 来实现更多的功能。
