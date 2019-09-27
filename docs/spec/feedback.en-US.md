---
category: Patterns
order: 11
title: Feedback
---

In order to help users understand what the application is currently doing, and to refer to the user's next behavior, and to understand the results of the operation, when the user need to interact with the system , use different modes to feedback information or results. When the designer uses feedback or customizes some feedback, please note:

- Provide users with necessary, positive and immediate feedback at all stages;
- Avoid excessive feedback, so as not to cause unnecessary disturbance to the user, you can omit the feedback prompt at the results users can see immediately and simple operation.

---

## Prompt message

Any product can not be separated from user guidance and information prompts even if the user interface is doing well. The prompt information is used to tell the user what needs to be known and what action to take.

### Alert

#### Alert

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/eviVRYTdxOxOfVENLnxq.png">

It is a non-blocking information display. It does not interrupt the user's current operation. It usually stays at a certain position on the page (top preferentially). The static display form of the non-floating layer is always displayed and will not disappear automatically. The user can click shut down.

> Note: The close button can be added or hidden according to business needs.

### Notification

#### Notification

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/nElczRfDzAXRZSkpiJBQ.png" description="Used when the notification content is complex">

The important global notification information actively pushed by the system is displayed in the upper right corner of the system.

#### Badge

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/bVonmOmmkuvybQxTDGTC.png" description="When there is an icon, it is usually in the upper right corner of the icon; in the case of no icon, it is usually at the back of the title.">

The message prompt for the aggregate type, generally appearing in the upper right corner of the notification icon or avatar, attracts the user's eye through a striking visual form.

> Note: Relatively important and user-related information prompts, use digital precision prompts; weights are not high and are not the user's special concern message prompts, use red dot to make tips.

### Help

#### Popover

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/zsPOjQqkiwMnMhIsbDHz.png">

When the target element has further description and related operations, it can be stored in the card and displayed according to the user's operation behavior.

> Note: The difference between Tooltip and Popover is that Popover can carry more complex content, such as links or buttons.

#### Tooltip

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/CKDiGEsluwkRRGqujpgv.png">

Used to accurately describe the pointed object, such as icons, graphics, links, etc. When the mouse is moved in, the prompt is displayed, when the mouse is moved out, the prompt is disappeared. And the complex text and operations are not carried.

---

## Process feedback

Feedback of the status is given to the user as much as possible during the operation, and the immediate response will give the user a sense of trust.

### Loading status progress feedback

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/cHaaqZTvzgCZiYUnfNom.png" description="Used when users don't have to wait for a long time to load.">

When the operation takes a while (usually more than 2 seconds) to complete, the system should immediately give a reminder, clearly inform the loading status or loading progress bar, and maintain communication with the user.

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/j6XiEx6UUV/676a18a1-bf60-4d93-8f94-55f1882dd13e.png" description="Used when the operation takes a long time to complete, showing the current progress and status of the operation.">

> Note: If the loading time is long, a cancel operation should be provided.

### Input feedback

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/CCeqqndHQgWnqVqvRptA.png">

During the operation, different verification rules and forms can be used to allow users to find and correct errors in time.

> Note: The feedback text is followed by the block to be explained (the feedback content is generally an error description) and does not disappear automatically (it disappears when the user performs the corresponding interaction).

#### Popconfirm

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/lPZZxOAakfNhwfrpRPht.png" description="The interaction form is lighter than the full-screen centered mode dialog.">

When the operation of the target element requires further confirmation by the user, a floating layer prompt is ejected near the target element to inquire the user.

---

## Result feedback

Feedback of the status is given to the user as much as possible during the operation, and the immediate response will give the user a sense of trust.

### Message

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/pqJMJfJGLkYTDbLyJwIg.png" description="When users don't have to wait for a long time to load.">

The feedback floating layer triggered by an operation is centered on the top and disappears automatically, which is a lightweight reminder that does not interrupt the user's operation.

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/DrKzGoqfLRtrPuZaHUiq.png" alt="Correct Sample" description="Important failure messages suggest using dialog box prompts and telling the reason for the failure.">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/akPBJQUiUWNsULtGOnyx.png" alt="Incorrect Sample" description="Lightweight prompts are not recommended for important failure messages.">

Since the feedback floating layer has a short presentation time (default 3s), for more important failure notifications, it is recommended to use a dialog box to notify you to avoid missing information.

### Dialog feedback

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/OTzldmUjUgERMbUCHwzt.png">

The feedback floating layer triggered by an operation is located at the center of the page, and the feedback content can be closed by the confirmation or cancel button. The user cannot perform any operation when the feedback layer appears, it's for important feedback.

> Note: Avoid displaying unnecessary reminders except it fails. Dialog is a strong feedback mechanism that is only needed when passing on very important and actionable information.
