---
order: 2
title: Form
---

As an important interface to obtain user input, forms play the important role of matching answers to questions.

When designing a form, it's recommended to:

1. Make sure users know what is required to enter and why.

  Use sample language as `label` for ordinary users and professional terms for experts. If sensitive information (for example ID card number, mobile phone number) is required, explain why.

2. Provide rich context to help users complete the form.

  Using "proper default value", "structured format", "tooltip" and "reminder" are practical for describing such context.

3. Be error-sensitive and fault-tolerant.

  Be error-sensitive means giving feedback to users quickly through a variety of validation rules of user input. If the validation starts only after a form is submitted, it would be too late. Being fault-tolerant means it should be allowed to use different kinds of formats as well as syntax. For example, if a user types in some spaces into a phone number input box, the system should delete those spaces automatically instead of telling the user to correct them.

4. Don't ask unnecessary questions.

---

## Content

<img class="preview-img" align="right" alt="Example of a form" src="https://os.alipayobjects.com/rmsportal/mLkQbODgVsdGUTe.png">

A form usually consists of 4 parts:

1. Label
2. Input box
3. Validation feedback
4. Action

> Note: `*` indicates that the input is required.


## Interactions

### Gap filling input

<img class="preview-img" align="right" alt="Example of gap filling input" src="https://os.alipayobjects.com/rmsportal/SdzCTaevNMvJFBR.png">

Gap filling input usually appears in a descriptive context to help users understand the current situation and provide information correctly.

### Combined input

<img class="preview-img" align="right" alt="Example of combined input" src="https://os.alipayobjects.com/rmsportal/waStvhMnuoqqsCE.png">

When two input boxes have strong correlation, they can be combined together so as to save some space.

### Alignment

<img class="preview-img" align="right" alt="Example of alignment" src="https://os.alipayobjects.com/rmsportal/cjHTEtXFxUSdHnE.png">

When designing a form, button groups should be aligned to the left of the input boxes.

### Disabled main button

When there are just a few (less than 3) input boxes in a form, "submit" button or other main buttons should be disabled if a user has not yet filled in all required input boxes. However, when there are too many input boxes (more than 5), do not disable those main buttons.


<br>

<img class="preview-img" align="right" alt="main button is disabled when there are not enough characters" src="https://os.alipayobjects.com/rmsportal/VabHKlbouFxSQXz.png">

<img class="preview-img" align="right" alt="main button is enabled when there are enough characters" src="https://os.alipayobjects.com/rmsportal/usdFxJmWDawqUuq.png">

When there are just a few input boxes, users can see feedback once they type in something and thus the rule is easy to understand.

<br>

<img class="preview-img" align="right" alt="Don't use disabled main button" src="https://os.alipayobjects.com/rmsportal/GwZhvOuXmwqUIUW.png">

When there are many input boxes (especially when required input boxes are altogether with optional ones), the logic of feedback can be very complicated. Thus, disabling main buttons may cause confusion.

### Structured format

<img class="preview-img" align="right" alt="Example of structured format" src="https://os.alipayobjects.com/rmsportal/SQgGfreRAqPZPsm.png">

The structured format can be used if users are familiar with the input content and the system doesn't accept any deviation from the desired format.

### Tooltip & reminder

<img class="preview-img inline" align="right" alt="Example of tooltip" description="when an input box is focused, the tooltip will appear until the input box loses focus again" src="https://os.alipayobjects.com/rmsportal/cTlmdEprGSzMZfs.png">
<img class="preview-img inline" align="right" alt="Example of reminder" description="when an input box is focused, the reminder will appear until a user types in at least one character" src="https://os.alipayobjects.com/rmsportal/QPhvLWfMbLTvjRw.png">

Use a tooltip if a brief input label may cause confusion while you still want to keep the label text to be short.

Use a reminder if you want users to pay attention to the format or purpose of an input box. A reminder will disappear once there is something typed in the input box, so it should be used only when users are familiar with the content.

### Password input box

<img class="preview-img" align="right" alt="Example of password input box" src="https://os.alipayobjects.com/rmsportal/wKpOgeyyoOUeCrk.png">

Password input box provides real time feedback on password strength and validity. It's quite applicable to a registration page.

### Validation

<img class="preview-img inline" align="right" description="Validation in real time" src="https://os.alipayobjects.com/rmsportal/urCdIJFuNYCenqH.png">
<img class="preview-img inline" align="right" description="Validation after losing focus" src="https://os.alipayobjects.com/rmsportal/KkcSBkbTJirIxCw.png">

<img class="preview-img" align="right" description="When a 'submit' button is clicked, the system will deal with user inputs and display feedback (the number of errors and the types of errors) on the page." src="https://zos.alipayobjects.com/rmsportal/xTtVSREbASRMstTggVGD.png">

Use different validation rules and a variety of feedback to help users correct errors before they click on a "submit" button.

### Character counting box

<img class="preview-img" align="right" alt="Example of word counting" src="https://os.alipayobjects.com/rmsportal/JxzQIRfMCtMjuaH.png">

A character counting box can show the current number of characters and checks if this number exceeds the limit.

## Format

### Margin

<img class="preview-img" align="right" alt="Example of margin between inputs" src="https://os.alipayobjects.com/rmsportal/dlTiHzZvCGRbMzL.png">

A typical example of using margin between inputs.

### Width

<img class="preview-img good" align="right" alt="Good" src="https://os.alipayobjects.com/rmsportal/vypllNQZsEHRszB.png">
<img class="preview-img bad" align="right" alt="Bad" src="https://os.alipayobjects.com/rmsportal/XSLwnrlLbKFjiNj.png">

If the maximum length of an input content is known, it's recommended to define the input width according to the maximum length.

<br>

### Alignment

There are both advantages and disadvantages for any particular alignment. Thus, you need to be clear about your purposes (if you want to speed up or slow down a user) and the limitations (screen width restrictions, problems of localization, etc.) before choosing one of those alignments.

<br>

<img class="preview-img" align="right" alt="Right alignment (recommended)" src="https://os.alipayobjects.com/rmsportal/UxGJfenYBKvkEEB.png">

Right alignment (recommended)

- Advantage: saves vertical space.
- Disadvantages: reduces readability; reduces flexibility of the input length
- When to use: you want to save more vertical space and speed up users for filling a form.

<br>

<img class="preview-img" align="right" alt="Top alignment" src="https://os.alipayobjects.com/rmsportal/AsyyNKormNdEMLi.png">

Top alignment

- Advantages: high readability; high flexibility of the label length.
- Disadvantages: takes a lot of vertical space.
- When to use: you want users to finish filling the form quickly.

<br>

<img class="preview-img" align="right" alt="Left alignment" src="https://os.alipayobjects.com/rmsportal/eqUyDExbRlAQoas.png">

Left alignment

- Advantages: easy to read and saves vertical space.
- Disadvantages: slows down users and reduces flexibility for the input length.
- When to use: you want to slow down users so that they can take more considerations when filling a form.
