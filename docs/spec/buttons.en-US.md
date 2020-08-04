---
category: Design Patterns
type: Global Rules
order: 6
title: Button
---

## Design Principal

- Guide users to achieve the desired actions.
- Prevent user to make mistakes.

## Types

### Common Button Types

<div>
  <img alt="buttons" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*wsXrT7yQH2MAAAAAAAAAAABkARQnAQ">
</div>

#### ① Default Button

Default buttons are used for non-primary actions. If not sure which button type to choose from, the default button is always a safe bet.

#### ② Primary Button

Emphasize on "complete" or "recommend" action. There is at most one primary button per a button group.

#### ③ Text Button

Low emphasis and light-weight button type, such as actions in a table.

#### ④ Icon Button

Icon provides a visual clue.

- It could fit more buttons in a small space.
- Buttons with icon only need to provide Tooltip to indicate the meaning of the button.

#### ⑤ Text Button with Icon

Provides supplementary meaning to the button.

### Emphasis

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*guusTZ6ZPxkAAAAAAAAAAABkARQnAQ">

Common button types could be used to showcase to different **emphasis**.

### Do & Don't

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*di8jS5EWYSIAAAAAAAAAAABkARQnAQ" alt="Don't" description="Don't put more than 1 primary button in the same group.">
<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3WUkT5pD1SUAAAAAAAAAAABkARQnAQ" alt="Do" description="1. Emphasiz on the primary action. <br/>2. If there is no primary action, then default buttons is the safest choice.">

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zBtTRq2xbTYAAAAAAAAAAABkARQnAQ" alt="Don't" description="Put 2 icons in the same button.">
<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EpwSTpaGPBgAAAAAAAAAAABkARQnAQ" alt="Do" description="1. Should place the buttons in the order of importance. <br/>2. The less important actions should be place on right or at bottom.">

### Special Button Types

#### Dashed Button

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gPmNQ6_YCcoAAAAAAAAAAABkARQnAQ">

Guide users to add content in an area.

#### Danger Button

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*OvNaQJrmqVMAAAAAAAAAAABkARQnAQ">

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ujcXTqJ_IwwAAAAAAAAAAABkARQnAQ" alt="Do" description="If user's intention is to delete, use danger button to warn this action has risks.">

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*o7EySrBPX9oAAAAAAAAAAABkARQnAQ" alt="Do" description="When system does not recommend the deletion action, we could set 'Cancel' as the primary action.">

Warns users that there are risks involved in the action.

#### Ghost Button

Used in the dark or colored background.

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*-wORTrNJ6YUAAAAAAAAAAABkARQnAQ">

#### Call to Action

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*32zdRqTjDhYAAAAAAAAAAABkARQnAQ">

Usually appeared alone and intend to used as a command. For example, it is used in the landing page or welcome banner. It could be as wide as its parent container. It is recommend to have just 1 "Call to Action" button in 1 screen.

## Placement

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*B8D0RJnirLkAAAAAAAAAAABkARQnAQ">

Place buttons in the users' reading pattern for the ease of discovery, such as the "F-Shaped Reading Pattern" and "Z-Shaped Reading Pattern".

### How to Decide Button Placement?

#### Page/Card/Section presents a subject, where it could be broken into 3 areas:

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*iVZpRpdN_2AAAAAAAAAAAABkARQnAQ">

- Header: subject's heading, summary and navigation
- Body: detailed content
- Footer: supplementary information or toolbar

Place buttons in different areas could have different meanings.

### When to Put Buttons in the Footer?

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*KGGWQLCBfm0AAAAAAAAAAABkARQnAQ">

- Body section has collapsed or hidden content, such as it could not show the entire content in one screen;
- Body section has complex content. For example, it has multiple subgroups and each subgroup has its own actions. Now it is needed to separate "Complete" action from body section to avoid confusion.

In short, footer's purpose is to have a separation from body.

## Ordering

### Button Ordering

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NcPDQI3IX8YAAAAAAAAAAABkARQnAQ">

Recommend to start from the reading flow, collapsed content should always be on the right.

**How to Decide Button Ordering**

- Conversation Flow: place buttons in the order similar to a conversation between computers and users. **Ask users the needed actions or your desired actions, then present the risks involved.**
- Navigation Flow: for example, if a button represents going back, should be placed on the left implying it is going to the previous step.

### Button Group

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*tK-AQaE5h1YAAAAAAAAAAABkARQnAQ" alt="Do">

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_gU7ToHiZz4AAAAAAAAAAABkARQnAQ" alt="Don't" description="When button group has no space in betwee, it is easy to confuse it with Toggle Button.">

When multiple buttons form a group, align buttons in one line with spaces in between.

### Grouping Buttons

When there are too many buttons on the screen, we could group relevant buttons together and use similar design for that group. If one of the buttons is primary action, we could still use emphasis.

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*x7YsTafH5osAAAAAAAAAAABkARQnAQ">

**Collapse buttons in the order of importance**

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Qn-mQKxaQ5kAAAAAAAAAAABkARQnAQ" alt="Do">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3bUZRbPiVBEAAAAAAAAAAABkARQnAQ" alt="Don't" description="If buttons are in the same group, no need to add dividers between them.">

**Flat display of all the buttons**: could separate different groups using space; or use divider to group similar buttons.

## Label

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*33KsR66zTY8AAAAAAAAAAABkARQnAQ" alt="Do">

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*238RTb4kaPwAAAAAAAAAAABkARQnAQ" alt="Don't" description="Should use verb">

Labels should clearly indicate to users what would happen when buttons got clicked.

- Should use verb (except dropdown buttons)
- Should be relevant to the context and be concise.

Ant Design use "OK / Cancel" as default label, but you could still use below methods to customize the label text:

- Describe the action result.

  > Publish, Login, Register.

- If primary action means negative, stress the consequences.

  > Are you sure to delete it? Delete / Cancel
