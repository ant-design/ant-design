---
title: Why is it so hard to disable the date?
date: 2024-09-23
author: zombieJ
---

In antd, there are many question about DatePicker. One is due to the commonality of date selection requirements, and the other is that there are various combinations of disabled selections for business requirements. Today, let's talk about the `disabledDate` API.

### disableDate cannot control time

As its name suggests, `disabledDate` is used to disable dates. So when using DateTimePicker, the time part is not controlled by `disabledDate`. Instead, it needs to be controlled through the `disabledTime` method. This seems a bit counterintuitive. Why do antd need two APIs to manage it?

#### How to determine if a date can be selected?

In terms of intuition, we only need to execute `disabledDate` once for a date to determine if it is disabled. However, if we switch the panel to the month panel, how do we know if the current month is selectable? We must execute `disabledDate` for each date in that month to determine if there are selectable dates in that month, so that month can be selected.

This logic seems fine for now. A month has about 30 days, and there are 12 months in the month panel. In the worst case, we only need to iterate 365 times to know that 12 months are not selectable. But as the panel switches to years and decades, the number of iterations required will increase exponentially, leading to serious performance issues ([#39991](https://github.com/ant-design/ant-design/issues/39991))

So after the DatePicker refactoring, `disabledDate` provides an additional parameter `info.type`, which tells you which Panel the provided date object comes from. This allows developers to provide `disabled` information based on the Panel, thus avoiding the terrifying call loop.

But as a fallback, DatePicker will call `disabledDate` for the first and last days of the current Panel unit. This ensures that common range disable scenarios are still met.

#### disabledTime

Back to time disable, this is the same problem. If we use `disabledDate` to disable time dimensions, then whether a day is selectable in DateTimePicker, we need to check each second of that day with `disabledDate`. In the worst case, whether a day is selectable needs to be checked 86400 times. The Date Panel needs to execute ~2 million times. Obviously, this is unacceptable.

So for the time dimension, we provide the `disabledTime` method. This method requires more granular time disable information than `disabledDate`:

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

(Each unit of the time selection panel is equivalent to the Panel of the date panel, and the latter infers the current disabled unit from the information of the former unit)

### Some examples

After understanding the context, we will find that `disabledDate` and `disabledTime` are designed to be reasonable, but they are somewhat low-level. It is more troublesome to use them in business. Let's look at a few examples (of course, you need to consider encapsulating them through HOC in business):

#### Working hours

Temporarily ignore the situation of holidays and choose 9:00 ~ 17:00 on working days as the selectable time:

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

#### Date and time range

In DatePicker, there are `minDate` and `maxDate` to limit the date selection range. But they only limit to date range. Now, suppose we have a scenario that requires a date range selection with time, such as `2024-01-01 09:00:00` ~ `2024-01-02 17:00:00`, then we can do this:

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

  // Only need to consider the start and end time
  // the range itself has been disabled by `disabledDate`
  return {};
};
```

### Summary

Through `disabledDate` and `disabledTime`, we can control the date and time more finely to meet different business requirements. With the examples above, I believe you have a deeper understanding of these two APIs. In actual business, you can combine these two APIs to achieve more functions.
