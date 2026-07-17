---
title: A Question Raised by a Refactor
date: 2026-07-14
author: zombieJ
---

We recently moved the duplicated delay logic in Button, Form, Slider, and Upload into `useDelayState`. The code became cleaner, but the Button Loading animation suddenly jumped.

![Button Loading animation jump](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*BiMUQ6EGJ1IAAAAATgAAAAgAeuN6AQ)

Button previously used `setTimeout` for reset and cleanup. In theory, moving the logic into a Hook did not change its timing. Even so, we still needed to determine whether the PR had introduced the issue.

## Was It the Hook?

Button supports delaying its Loading state through `loading.delay`. Each component previously managed its own timer. After the refactor, `useDelayState` handled it instead:

```tsx
const [innerLoading, setInnerLoading] = useDelayState(loadingOrDelay.loading);

useLayoutEffect(() => {
  if (loadingOrDelay.delay > 0) {
    setInnerLoading(true, { ms: loadingOrDelay.delay });
  } else {
    setInnerLoading(loadingOrDelay.loading, true);
  }
}, [loadingOrDelay.delay, loadingOrDelay.loading]);
```

The update timing looked suspicious. The Loading icon animation relies on Motion, so a missing frame could prevent its initial styles from being prepared.

However, temporarily restoring the previous call did not remove the jump. We had merely noticed the problem while working on this PR. The Hook itself was not the cause.

## An Extra div

Inspecting the DOM showed an empty `div` inserted as the first child of Button after every click:

```html
<button class="ant-btn">
  <div style="..." />
  <!-- Button content -->
</button>
```

Button uses `inline-flex`, while `gap` keeps the icon and text apart. Creating this extra `div` on every click could force a repaint and cause the animation to end unexpectedly.

The node comes from Wave. Wave creates a holder on every click and renders the effect inside it:

```tsx
const holder = document.createElement('div');
holder.style.position = 'absolute';
holder.style.left = '0px';
holder.style.top = '0px';
target.insertBefore(holder, target.firstChild);
```

However, this `div` is absolutely positioned and therefore does not participate in normal layout. It cannot create another `gap`. After temporarily removing Wave, the issue remained.

## 14px and 8px

With no extra gap appearing from nowhere, we returned to the Loading icon itself.

The icon expands from `width: 0`. Although its width starts at zero, it is still a Flex item, so the `gap` already exists. A negative margin cancels that gap at the beginning of the animation:

```tsx
// start
{
  width: 0,
  marginInlineEnd: -iconGap,
}

// active
{
  width: node.scrollWidth,
  marginInlineEnd: 0,
}
```

These styles did take effect. However, the final width jump appeared to happen when Motion finished and released the locked `width`. This suggested that `scrollWidth` itself might be incorrect, so I added a log to the complete `onAppearActive` callback:

```diff
 const onAppearActive = (node: HTMLElement): React.CSSProperties => {
+   console.log('scrollWidth:', node.scrollWidth);
   return {
     width: node.scrollWidth,
     // ...
   };
 };
```

The icon was `14px`, but its `scrollWidth` was only `8px`.

![scrollWidth is 8px](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*5lVQSLI_GZ0AAAAAQIAAAAgAeuN6AQ)

After seeing the console output, I continued debugging with a breakpoint. The `scrollWidth` switched between `7px` and `8px` because the inner Loading icon was still rotating. Once the rotation animation was temporarily removed, the value remained at `7px`.

The numbers finally matched what we saw. Motion was not using the icon's stable natural width, but the `7px` to `8px` measured during rotation. Once Motion finished and removed the inline `width`, the container returned to its natural width of `14px`. The remaining `6px` to `7px` was outside the transition, so it appeared all at once.

## Case Closed

Once the rotation was removed, `7px` stood out: it was exactly half of the icon's natural width of `14px`.

```text
14 / 2 = 7
```

If this were only an accidental measurement error, changing the icon size should have broken the relationship. I temporarily changed the icon width to `22px`, and its `scrollWidth` became `11px`.

```text
22 / 2 = 11
```

At this point, the answer started to reveal itself. The Loading icon wrapper is a Flex container whose width is locked at `0` when the animation starts, while its inner icon is horizontally centered with `justify-content: center`. The icon therefore overflows equally to both sides of that zero-width center point. In this layout, `scrollWidth` only captured the right half: `14px` became `7px`, and `22px` became `11px`. The rotation introduced fractional boundaries and rounding, explaining the earlier changes between `7px` and `8px`.

Looking back at [#58584](https://github.com/ant-design/ant-design/pull/58584), these styles were introduced to vertically align a Button icon inside Card extra. In other words, this case only needs vertical centering, not horizontal centering.

With the root cause identified, we only needed to remove the horizontal centering:

```diff
[`${componentCls}-icon`]: {
  display: 'inline-flex',
  alignItems: 'center',
- justifyContent: 'center',
},
```

The Loading icon and regular icons now share the same layout logic. Its `scrollWidth` returned to the full width, and the final jump disappeared.

## Finally

Both the Hook and the extra DOM node were reasonable suspects, but neither could explain the icon size changing in the Performance frames. Only when the two pairs of numbers appeared—`14px` and `7px`, then `22px` and `11px`—did the clue point clearly to horizontal centering under zero width.

When an animation jumps, checking state and DOM is useful, but measuring its start, target, and final natural size can be even more direct. If those values disagree, a smooth transition will still reveal the difference at the end.

The fix will ship with the next minor release.
