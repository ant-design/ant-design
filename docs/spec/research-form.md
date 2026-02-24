---
group: Design Patterns (Research)
type: Template Document
order: 1
title: Form Page
skip: true
---

A form page is a type of page used for information addition and entry. It ensures that users enter information according to requirements and submit it for system use or guide users in application settings.

## Design Goals

Help users clearly understand the current page tasks, quickly find and locate modification targets, easily and accurately understand the meaning and effects of form items, while simplifying the filling process, ensuring that users can complete tasks accurately, easily, and quickly.

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*4IjJTbMSsmEAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Efficient</h4>
      <p>Use reasonable information organization and form components to enable users to quickly complete form page tasks.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lEtuTZi2GvIAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Clear</h4>
      <div>1. Quickly locate important information and target options;</div>
      <div>2. Titles, options, and prompts accurately convey meanings;</div>
      <div>3. Allow users to perceive the cause and effect of different operations and respond promptly with relevant feedback.</div>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*R9PIRbGpFfYAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Security</h4>
      <p>Reasonable mechanisms to ensure the consequences of operations, such as providing distributed or instant save mechanisms for complex forms; offering regret and quick fix functions like return, reset, cancel, clear, and undo for different scenario tasks.</p>
    </div>
  </div>
</div>

### Do & Don’t

When organizing and presenting form items on the form page, pay attention to concise expression, efficiency, and accuracy to avoid increasing the cost of user input.

<ImagePreview>
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*k9DyRYLzjcoAAAAAAAAAAABkARQnAQ" alt="Incorrect Example" />
</ImagePreview>

Do not use different components or presentation forms for the same type of content in a form page, as it increases the user's comprehension cost.

<br />

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*A0EBQ6eAkiwAAAAAAAAAAABkARQnAQ" alt="Correct Example" />
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*V56PRpofMRUAAAAAAAAAAABkARQnAQ" alt="Incorrect Example" />
</ImagePreview>

The titles and prompts of form items should not use incomprehensible words or be too long, causing high comprehension costs. If uncommon words are unavoidable, use auxiliary elements like help descriptions.

<br />

<ImagePreview>
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EC9uR6LiI0IAAAAAAAAAAABkARQnAQ" alt="Incorrect Example" />
</ImagePreview>

Avoid filling hints with redundant correct statements, e.g., an input hint for a form item called "Name" is "Please enter your name."

<br>

## How to Design

Form page templates focus on the experience of submitting a single form. According to the task complexity, four layout solutions are provided:

- Normal Layout
- Task Decomposition and Arrangement
- Specific Scenarios

### Normal Layout

Lay out all the information that needs to be filled in. Suitable for forms with few content items that cannot be grouped by relevance.

#### Template - Basic Form

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*c7b6TpKWl-cAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

**When to Use**

When a simple and quick task needs to be completed, e.g., creating with minimal information input.

### Task Decomposition and Arrangement

Decompose large, complex tasks into multiple parts and group them by relevance to reduce user input burden. Although each part is handled individually, they are ultimately submitted together. Suitable for large, complex forms. Proper task segmentation can reduce user error rates.

#### Template - Basic Step Form

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*E8wRRpLbdyoAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

**When to Use**

Organize the information users need to fill and confirm in a linear process, using step bars to inform users of the complete process and progress. Often, users are asked to confirm the information again before the final submission, and clear feedback is provided at the end of the process. Suitable for tasks with clear linear logic.

#### Template - Grouped Form

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*k6kGSLGZsT0AAAAAAAAAAABkARQnAQ" />
</ImagePreview>

**When to Use**

When the form page requires a lot of content to be filled in a single task, and different content can be classified and summarized.

#### Template - Editable List (In Development)

**When to Use**

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NLEeSLhLA3EAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Dynamic Increase/Decrease: Recommended when the number of form items ≤3, and each input box does not require a separate title.

<br />

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PvoTSbqKywEAAAAAAAAAAABkARQnAQ"/>
</ImagePreview>

Editable Table: Recommended when the number of form items is between 2 and 5, so each row of content can be fully displayed.

<br />

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DWlCQazb-HQAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Collapsible Panel Editing: Recommended when the number of form items is between 6 and 8.

<br />

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ttDGTLid8M4AAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Drawer Editing: Recommended when the number of form items is >8.

<br />

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*p_wLTJEYOBgAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Rule Tree: Applied in rule editing scenarios.

Suitable for pages that need to add one or more objects, and each object requires multiple groups of data to be added or edited.

### Specific Scenario Templates

#### Template - Settings

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*n9zkSKrDU8MAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

**When to Use**

Personal profiles, application configuration, and other settings pages are infrequently used. Generally, users will not frequently modify them after operation.

**Usage Suggestions**

Choose one setting mode per page:

> - Instant Effect Mode: Changes take effect immediately when users modify options;
> - Submission Effect Mode: Use submission effect mode when there are interdependencies among settings items.

Determine whether to group according to the number of settings items:

> - Number <7, grouping is not recommended;
> - Number 7~15, grouping is recommended;
> - Number >15, tab grouping is recommended.

#### [Template - Login](https://preview.pro.ant.design/user/login)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ba6DR5U23nAAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Ant Design standard login template

#### [Template - Register](https://preview.pro.ant.design/user/register)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*6U_gQ6MbrSYAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Ant Design standard registration template

## Design Suggestions

### Preparation

- The core of a form page consists of form items. It is recommended to familiarize yourself with the [basic rules of forms](/components/form/) before designing;
- Organize the information types involved in the user's current information entry tasks, and determine the components to be used according to the [Ant Design data entry rules](/docs/spec/data-entry/).

### Layout Methods

In a single form page, reasonable layout should be made according to the amount of content to balance page display and user efficiency. Form page layout can be divided into four gradients from simple to complex, and each gradient is compatible with the previous layout method.

#### Basic Layout

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lacoSZduvVQAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Arrange all the information to be filled out from top to bottom in a single column within one area, guiding users to read vertically. According to [research](https://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php), this is the most efficient layout method for task completion.

#### Weak Grouping

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*E7YuRo094e0AAAAAAAAAAABkARQnAQ" />
</ImagePreview>

<ImagePreview>
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Nd_nQLmFQQwAAAAAAAAAAABkARQnAQ" alt="Incorrect Example" description="To avoid confusion with the reading order of weakly grouped layouts, multiple column forms are prohibited within one area." />
</ImagePreview>

When space is limited, form items with shorter widths and relevant content can be grouped into one line, suggesting grouping.

#### In-Area Grouping

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*eU8dRZUTEM8AAAAAAAAAAABkARQnAQ" />
</ImagePreview>

When there is a lot of content in one area that can be categorized, in-area grouping can be achieved by distinguishing titles.

#### Card Grouping

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*VPEZRLBm1zwAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

When there is a lot of content on a page (usually more than two screens) that can be categorized, card grouping can be used to carry it. Each card needs to include a large title.

#### Determine Layout Method

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DoKmSYGaYtYAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

The determination of which layout method to use is similar to the [Detail Page](/docs/spec/detail-page#%E8%AE%BE%E8%AE%A1%E5%BB%BA%E8%AE%AE), and should be sorted out from the two dimensions of information complexity and relevance. Then choose the appropriate template to quickly build the page.

<br>

## Further Reading

### Which Modules or Components to Use

- [Form](/components/form-cn#header)
- [Steps](/components/steps-cn#header)

### External Reference

- [Label Placement in Forms](https://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php)
