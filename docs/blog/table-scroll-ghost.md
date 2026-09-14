---
title: Table Scroll Goes Off Track
date: 2026-07-08
author: zombieJ
---

Recently we ran into a [Table horizontal scroll misalignment issue](https://github.com/ant-design/ant-design/issues/57850). In a virtual scrolling scenario, the user dragged the horizontal scrollbar and the table body had already reached the correct position, but the header would occasionally stay at an old position. This was especially obvious when scrolling back to the far left: the body was already at `0`, while the header still stayed somewhere in the middle.

![Table horizontal scroll misalignment](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/img/A*SkGeTa6hbf8AAAAARnAAAAgAeuN6AQ/original)

From the symptom, it looked like several scroll areas inside Table were not synchronized correctly. Since Table has scroll linkage among the fixed header, fixed columns, summary row, and sticky scrollbar, this kind of issue can be a little winding to investigate. This article records the debugging process.

### Start With Scroll Sync

When Table scrolls horizontally, there is not just one DOM element scrolling. The fixed header, body, summary row, and sticky scrollbar each maintain their own horizontal position. Therefore, once any area triggers `onScroll`, it enters the same synchronization flow:

```tsx
// Simplified Code
function onInternalScroll({ currentTarget, scrollLeft }) {
  const mergedScrollLeft = typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;

  // Sync other scroll areas
}
```

In this flow, the current `scrollLeft` is synchronized to the other areas:

```tsx
forceScroll(mergedScrollLeft, scrollHeaderRef.current);
forceScroll(mergedScrollLeft, scrollBodyRef.current);
forceScroll(mergedScrollLeft, scrollSummaryRef.current);
forceScroll(mergedScrollLeft, stickyRef.current?.setScrollLeft);
```

The job of `forceScroll` is also straightforward. It sets the target element to the same horizontal position:

```tsx
// Simplified Code
function forceScroll(scrollLeft, target) {
  if (typeof target === 'function') {
    target(scrollLeft);
  } else if (target.scrollLeft !== scrollLeft) {
    target.scrollLeft = scrollLeft;
  }
}
```

There is an easy-to-miss detail here: the source of `onScroll` is not necessarily the area the user is operating. It is only the element whose event surfaced first. Setting `scrollLeft` through code can also trigger that element's own `scroll` event. In other words, after the body scroll synchronizes the header, the header may trigger another `onScroll`.

So the first reaction was: are the header and body fighting over the scroll source?

### It Looked Like The Lock

rc-table has a short scroll lock internally to avoid scroll events triggering each other during synchronization. In a simplified way, it records the element that is currently scrolling, and ignores scroll events produced by other synchronized elements for a short period.

This logic is reasonable by itself. Without such a lock, body scrolling would synchronize the header, header scrolling would synchronize the body again, and they could end up triggering each other in a loop.

![Original Scroll Lock Flow](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*C3pFRIyRR68AAAAAQFAAAAgAeuN6AQ)

But in this issue, it also looked suspicious. The user was actually dragging the body, but when the header was synchronized, the header's `scroll` event would also fire. If the header grabbed the lock first, the following real body scroll might be ignored.

So we first tried one direction: record which scroll area the mouse is currently hovering over. The body, header, summary row, or sticky scrollbar under the user's mouse should be the real source that drives synchronization.

This solution seemed to explain the issue:

- When the user drags the body, the body should have priority;
- The header `scroll` triggered by synchronization should not grab the lock in return;
- The sticky scrollbar can use the same source check.

![Hover Based Scroll Sync](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*_cXgRpBxIsgAAAAAQGAAAAgAeuN6AQ)

But soon, we found that this direction was not the root cause.

### The Logs Did Not Match

To confirm who was really triggering the scroll, we directly added logs to rc-table inside antd's `node_modules`. The logs recorded the current source, the locked source, the input `scrollLeft`, and the value synchronized to the target element.

![Table scroll synchronization logs](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*vJx5SKSVUQMAAAAAXBAAAAgAeuN6AQ)

The key logs looked roughly like this:

```log
onInternalScroll { source: 'body', inputScrollLeft: 794.171875 }
onInternalScroll { source: 'body', inputScrollLeft: 688.171875 }
onInternalScroll { source: 'body', inputScrollLeft: 375.171875 }
onInternalScroll { source: 'body', inputScrollLeft: 55.171875 }
onInternalScroll { source: 'body', inputScrollLeft: 0 }
```

From this, the body's scroll events were reported normally. More importantly, `0` had already entered the synchronization flow. That means the body was not blocked by the lock when it scrolled back to `0`.

But another set of logs appeared after that:

```log
retry sync target element { targetName: 'header', from: 0, to: 794.171875 }
retry sync target element { targetName: 'header', from: 794, to: 688.171875 }
retry sync target element { targetName: 'header', from: 688, to: 375.171875 }
retry sync target element { targetName: 'header', from: 375, to: 55.171875 }
```

This was strange. Since `0` had already been synchronized, why was the header written back to old values?

So the question changed from "who grabbed the scroll source" to "who wrote the old value back later".

### Delayed Sync

Looking back at `forceScroll`, it does not simply set `scrollLeft` once. The real logic also has a delayed retry:

```tsx
function forceScroll(scrollLeft, target) {
  if (typeof target === 'function') {
    target(scrollLeft);
  } else if (target.scrollLeft !== scrollLeft) {
    target.scrollLeft = scrollLeft;

    // Delay to force scroll position if not sync
    if (target.scrollLeft !== scrollLeft) {
      setTimeout(() => {
        target.scrollLeft = scrollLeft;
      }, 0);
    }
  }
}
```

This logic exists for historical reasons. In scenarios such as dynamic columns or layout changes, after setting `scrollLeft`, some browsers may not leave the target element at the expected position. Therefore, the code reads it immediately after setting it. If `target.scrollLeft !== scrollLeft`, it schedules a `setTimeout` and writes it again in the next event loop.

In this issue, the body continuously reported several horizontal positions:

```log
794.171875
688.171875
375.171875
55.171875
```

This logic looks fine on its own. But during continuous scrolling, it can write old values back:

1. The body scrolls to `794.171875`;
2. The header is set to `794.171875`;
3. The code finds that the current header position is still not equal to the expected value, so it schedules a timeout to write `794.171875` back;
4. The user keeps dragging, and the body scrolls back to `0`;
5. The header is synchronized to `0`;
6. Immediately after this write, the read value is already `0`, so the old logic does not schedule another timeout to confirm `0`;
7. The previously scheduled old timeouts execute and write the header back to old values.

![Timeline diagram showing the timeouts for 794.171875/688.171875/375.171875/55.171875 executing after the 0 synchronization](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*UDgdQJPm2mYAAAAAQKAAAAgAeuN6AQ)

At this point, the issue became clear. The real cause of the misalignment was not the scroll lock, but the old `scrollLeft` value captured in the delayed retry closure.

### Fix

The most direct approach is to keep only the latest retry for each target element.

In other words, the old timeout was only a fallback for "this synchronization did not take effect". But once the same target element receives a new synchronization, the old timeout is no longer meaningful. It should be canceled first, and then the code should decide whether a new timeout is needed based on the latest `scrollLeft`:

```tsx
// Simplified Code. See rc-table for the complete implementation.
const [scrollRetryTimeoutMap] = React.useState(() => new WeakMap());

function forceScroll(scrollLeft, target) {
  clearTimeout(scrollRetryTimeoutMap.get(target));

  if (target.scrollLeft !== scrollLeft) {
    target.scrollLeft = scrollLeft;

    // Delay to force scroll position if not sync
    const retryTimeout = setTimeout(() => {
      if (target.scrollLeft !== scrollLeft) {
        target.scrollLeft = scrollLeft;
      }
    }, 0);

    scrollRetryTimeoutMap.set(target, retryTimeout);
  }
}
```

Here, `WeakMap` is used to record the retry timer for each DOM element. Its benefit is that DOM elements are used as keys, so we do not need extra lifecycle cleanup. When the header synchronizes from `794.171875` to `0`, the `0` synchronization first cancels the old timeout queued before it. As a result, the old value no longer has a chance to write back at the end, and the header can stay at the latest position.

### Summary

The interesting part of this issue is that the first guess was not completely wrong. Synchronizing `scrollLeft` does trigger scroll events, and the scroll lock does affect scroll synchronization. But the logs eventually proved that the issue was not in the scroll source. It was in the old value saved by a delayed task.

When debugging similar issues, if some state is "clearly set correctly, but becomes wrong later", it is worth checking whether there are delayed tasks, animation frames, Promises, or other asynchronous callbacks. Because the final value that lands on the DOM is often not the most correct write, but the last write.

That's all.
