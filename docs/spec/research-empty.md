---
group: Design Patterns (Research)
type: Global Rules
order: 3
title: Empty Status
skip: true
---

## Design Goals

- The empty state should provide a prompt to help users understand the reason for the empty state, avoiding confusion and misunderstanding;
- Provide recommended action tips to help users get out of the empty state.

---

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*q5MRQ6TBR0EAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Clarity</h4>
      <p>Inform users of the specific reason for the empty state through clear language, illustrations, etc.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*wOoaT6juZqwAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Provide Invitation</h4>
      <p>Provide help text, suggested actions, and other solutions to indicate what can be done on the next screen, guiding users to take action.</p>
    </div>
  </div>
</div>

### Do & Don’t

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Bh_yRKPOByUAAAAAAAAAAABkARQnAQ" alt="Correct Example" description="Display clear empty state prompt.">
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*yiIXR4u8s2wAAAAAAAAAAABkARQnAQ" alt="Incorrect Example" description="No prompt for the empty state.">
</ImagePreview>

---

## Use Cases

### New User Guidance

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*UyVCTaiJ3icAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Generally, new users expect empty states to have explanatory notes and recommended actions. Empty states are very useful in scenarios of first-time use of an application or feature, as they show the functionality and process to users and help them get started quickly. To assist new users in their first use, the empty state can be filled with feature guides, help documents, etc.

#### Using Guide Variations

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Pf8HSa477DQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

The guide consists of three parts: state prompt, help guide, and suggested actions. During design, you can choose modules based on the business process to form the page and variations. For empty state pages within a complex process, you can also provide process guide modules to help users understand the operation process globally, and provide text buttons for quick operations related to the process.

### Completion or Clearance

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SIZBTJs3O4kAAAAAAAAAAABkARQnAQ">
</ImagePreview>

This empty state occurs when users voluntarily delete data from the feature. For example, customers have completed all items on their task list or read all notifications. Generally, this type of scenario does not require action guidance, just use graphical elements or prompt information to explain the empty state.

### No Data

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*utf3Qr-9VssAAAAAAAAAAABkARQnAQ">
</ImagePreview>

The scenario of no data in the content area is displayed with a combination of graphical elements, prompt information, and suggested actions. Whether to provide suggested actions depends on the use case.

---

## Further Reading

### External Reference Articles

- [Salesforce Empty State Design Guidelines](https://www.lightningdesignsystem.com/guidelines/empty-state/#Message)
- [PREDIX Empty State Design Guidelines](https://www.predix-ui.com/#/design/communication/empty-states)
- [Material Design Empty State Design Guidelines](https://material.io/design/communication/empty-states.html#content)
