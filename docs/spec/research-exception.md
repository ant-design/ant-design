---
group: Design Patterns (Research)
type: Template Document
order: 5
title: Exception Page
skip: true
---

For displaying page error states.

## Design Goals

Explain what went wrong, provide appropriate suggestions or actions to the user, and avoid confusion and disorientation.

---

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*te8yTbLcqrgAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Friendly</h4>
      <p>Use friendly, clear language to express, avoiding confusing terms that might bewilder the user.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zHCcQqaRvmoAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Provide Invitation</h4>
      <p>Guide users to the next level of interaction with reminders and hints, indicating what can be done on the next screen.</p>
    </div>
  </div>
</div>

---

## Types

### Error Page

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*OIo9TYjVhAEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Displayed when a page encounters an error, it includes the following elements:

1. Illustration: Add a bit of fun to the heavy error, easing user frustration;
2. Error Code/Issue: Display specific HTTP error codes if available;
3. Error Description: Briefly describe the error cause, making it easier for users to report the issue;
4. Suggested Actions: Help users deal with the error or guide them back on the right path.

#### Template - 404

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*tVUkTr052wUAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

When the page, item, resource, etc., the user requested is not found.

#### Template - 403

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*j5LCQabCiz8AAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

No permission, which might include no application or data permissions, depending on the situation.

#### Template - 500

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PRRMRY9cMPIAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

When the server encounters an error and cannot provide service to the user.

#### Template - Browser Incompatibility

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*bowLQ7DhaKsAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

When the browser is incompatible, preventing users from opening the webpage.

<br>

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PpLRQb0Rc5gAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Design Recommendations**

When the browser is incompatible, affecting the operation to different extents, use global prompts if it does not seriously impact usage, allowing users to continue.

### Empty State

Displayed when there is no content/data to show to the user. An empty state is also a specific type of error page. For detailed content, please refer to the [Empty State](/docs/spec/research-empty) document.

### Load Failure

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NfSZSb3jGl8AAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

Displayed when a page fails to load content due to various reasons such as network issues, generally combined with retry options.

### Design Recommendations

The overall interaction flow of a page may consist of different states. Designers should not only focus on the ideal state but also consider various unexpected scenarios comprehensively, preventing interruptions in the user experience.

- Ideal State: The state where all page modules are displayed normally;

- Partial State: Some modules are missing or some content is in an empty state, refer to the design of [Empty State](/docs/spec/research-empty);

- Loading State: Use Spin or Skeleton to indicate the loading state;

- Error State: System errors, no permissions, etc.;

- Empty State: The state where the content is completely empty, it is recommended to use guide-like [Empty State](/docs/spec/research-empty) prompts. For new users, refer to the new user guide page.

---

## Further Reading

### Related Template Documents

- [Empty State](/docs/spec/research-empty)

### External Reference

- [Avoid Being Embarrassed by Your Error Messages](https://www.uxmatters.com/mt/archives/2010/08/avoid-being-embarrassed-by-your-error-messages.php)
- [How to fix a bad user interface](https://www.scotthurff.com/posts/why-your-user-interface-is-awkward-youre-ignoring-the-ui-stack/#partial)
