---
group: Design Patterns (Research)
type: Template Document
order: 4
title: Result Page
skip: true
---

A result page is a page that provides feedback on the outcome of an operation. It is the strongest form of feedback mode.

## When to Use

When an operation process is completed and clear feedback is needed for the user, such as the final step of a step form.<br/> When a large amount of information needs to be displayed on the result page.

## Design Goals

Convey the task completion result to the user, guide the user to the next operation, and establish the user's trust in the system through effective feedback.

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*HHLnR5RgpWQAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Use Cautiously</h4>
      <p>The result page is a heavy feedback method, only suitable for scenarios where strong user attention is needed, the information volume is large, and the page stays permanently. It is not recommended for other scenarios.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*hglURJfVdHoAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>End Instantly</h4>
      <p>When the result status is successful, it can automatically jump after a few seconds (3-5 seconds is recommended).</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*tJC7RZviqzwAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Simplify Information</h4>
      <p>The information on the result page should be the result triggered by the submission action, such as validation should be completed in the form. The information on the result page should be concise, only displaying result-related content. Additional information can be added for special scenarios.</p>
    </div>
  </div>
</div>

## Design Suggestions

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*98B4QKjg-QoAAAAAAAAAAABkARQnAQ" alt="Correct Example">
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EgnGQ4zImuMAAAAAAAAAAABkARQnAQ" alt="Incorrect Example">
</ImagePreview>

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lVo2RKb6mL4AAAAAAAAAAABkARQnAQ" alt="Correct Example">
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*4RFCTLatKrcAAAAAAAAAAABkARQnAQ" alt="Incorrect Example">
</ImagePreview>

The title should be constructed as "Object + Action + Result/Status" or "Action + Result/Status".

<br />

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*r7UFSLbqTdYAAAAAAAAAAABkARQnAQ" alt="Correct Example">
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zXk0SI4qqYMAAAAAAAAAAABkARQnAQ" alt="Incorrect Example">
</ImagePreview>

It is recommended to limit the guidance operations to no more than 2 items, as too many operations can cause confusion for users.

<br />

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*9gvmRq3RmnQAAAAAAAAAAABkARQnAQ" alt="Correct Example">
</ImagePreview>

For lighter feedback, it is not recommended to use a result page. Use global tips, warning tips, notification boxes, etc. Refer to feedback design guidelines for details.

<br />

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*JY1kR4qIR1wAAAAAAAAAAABkARQnAQ" alt="Correct Example">
</ImagePreview>

If the result status is successful, inform the user that it will automatically jump after a few seconds on the main button.

## How to Design

### Basic Layout

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PQotS7GJC1gAAAAAAAAAAABkARQnAQ">
</ImagePreview>

The result page can provide the following content:

1. Result Feedback: Clearly inform the user of the submission result;

2. Result Explanation (optional): Used for brief explanations of the result if needed;

3. Suggested Actions: Guide the user to continue with subsequent tasks;

4. Additional Information (optional): Provide supplementary information to the user along with the result; marketing modules.

#### Template - Basic Result Page

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*uXFNR4eef2oAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Displays the result status and guides the user to the next operation.

#### Template - Complex Result Page

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SWabTZptxEcAAAAAAAAAAABkARQnAQ">
</ImagePreview>

In addition to basic information like result status and guidance operations, it also displays related recommendations, process progress, error details, etc.

#### Additional Information Types

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*avS5TZcMawwAAAAAAAAAAABkARQnAQ">
</ImagePreview>

## Further Reading

### Relevant Global Rules

- [Feedback](/docs/spec/research-message-and-feedback)

### Relevant Modules or Components

- [Form Page](/components/form-cn/)

### External Reference Articles

- [Fiori Message Feedback Component Rules](https://experience.sap.com/fiori-design-web/message-box/)
- [Aliyun Result Page Design](https://xconsole.aliyun-inc.com/scenes/resultpage)
- [CANVAS Message Feedback Component Rules](https://canvas.hubspot.com/components/alerts-messaging)
- [PREDIX Notification and Alert Component Rules](https://www.predix-ui.com/#/design/communication/notifications)
