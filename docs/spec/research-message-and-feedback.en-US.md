---
group: Design Patterns (Research)
type: Global Rules
order: 2
title: Message and Feedback
skip: true
---

Used to provide feedback to the user on the results of their actions or to convey messages when necessary.

## Design Goals

Ensure that users receive feedback or messages that match the context and urgency of their actions under different scenarios, achieving reasonable and effective communication.

## Feedback Methods

When designing, consider the task the user is attempting to complete and the method of attention required. The feedback methods are listed below:

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SKfjS7vyRP4AAAAAAAAAAABkARQnAQ">
</div>

## When to Use

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*vv37RaVAXhAAAAAAAAAAAABkARQnAQ">
</div>

### Success

#### Stay in Place

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*qQ8NTKMH-2IAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Modal Dialog**

Notify users of important success results without interrupting their workflow.

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NPVGQr6f5-4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Global Message**

Display a brief success message without interrupting the user’s ongoing task.

#### Redirect

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*0EdyRa7WeUAAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Inline Text & Illustration**

- Notify users of success at the end of a long-form process;
- Provide detailed supplementary information (e.g., configuration details).

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*524fSKE97wYAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Global Message**

Display a brief success message without interrupting the user’s ongoing task.

### Failure

#### Stay in Place

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*S03WS5uHqDsAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Modal Dialog**

Alert users to important actions outside the current workflow (e.g., safety warnings).

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*4sHLQowCs6IAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Alert**

Inform users of critical errors that require immediate attention.

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Qg51Sq2A_M4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Form Validation**

- User input does not meet field or form requirements;
- User skipped required fields;
- System detects errors in form data.

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QeWqTIWqrWEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Notification**

- Inform users of important issues or failure statuses that require immediate decisions;
- Feedback on backend process failures & alerts.

#### Redirect

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*7ES2TrY6UJgAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Inline Text & Illustration**

- Notify users of failure at the end of a long-form process due to third-party causes (e.g., application engine creation failure);
- Provide detailed failure information.

### Background Operations

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*owL_SK1xmggAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Notification**

- Inform users of important issues or failure statuses that require immediate decisions;
- Feedback on backend process results.

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*IGpqRbPGZxQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Notification Center**

Notify users of related activity information (e.g., items that need user approval or the progress of user-submitted approvals).
