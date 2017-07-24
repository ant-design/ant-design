---
order: 2
title:
  zh-CN: 表单
  en-US: Form
---

A form is an important human machine interface to obtain user information. It's necessary to consider what questions should be asked according to the expected answers.

In the design of a form, it's recommended to:

1. Let a user knows exactly what information is required and why he needs to provide this information.

  Use sample language as `label` for ordinary user and use professional terms for experts. If sensitive information (for example ID card number, mobile phone number) is required, explain to a user why the system needs it.

2. Provide more information about the context, which can be helpful for a user to complete the form.

  Using "proper default value", "structured format", "tooltip" and "reminder" are practical for describing such context.

3. Be sensitive to errors and be tolerant to user input.

  Be sensitive to errors means giving feedbacks to a user quickly through a variety of validation rules of user input. If the validation starts only after a form is submitted, it would be too late. Be tolerant to user input means it should be allowed to use different kinds of formats as well as syntax for the user input. For example, if a user types in some spaces into a phone number input box, the system should delete those spaces automatically instead of telling the user to correct them.

4. Don't ask unnecessary questions.

---

## Content

<img class="preview-img" align="right" alt="Example of a form" src="https://os.alipayobjects.com/rmsportal/mLkQbODgVsdGUTe.png">

A form usually consists of 4 parts, which are

1. Label
2. Input box
3. Validation feedback
4. Action

> Note: `*` indicates that the input is required.


## Interactions

### Gap filling input

<img class="preview-img" align="right" alt="Example of gap filling input" src="https://os.alipayobjects.com/rmsportal/SdzCTaevNMvJFBR.png">

Gap filling input usually appears in a descriptive context, which can be helpful for a user to understand the current situation and to provide information correctly.

### Combined input

<img class="preview-img" align="right" alt="Example of combined input" src="https://os.alipayobjects.com/rmsportal/waStvhMnuoqqsCE.png">

When two input boxes have strong correlation, they can be combined together so as to save some space.

### Alignment

<img class="preview-img" align="right" alt="Example of alignment" src="https://os.alipayobjects.com/rmsportal/cjHTEtXFxUSdHnE.png">

In the design of a form, button groups should be aligned to the left of the input boxes.

### Disabled main button

When there are just a few (less than 3) input boxes in a form, "submit" button or other main buttons should be disabled if a user has not yet filled in all required input boxes. However, when there are too many input boxes (more than 5), do not disable those main buttons.


<br>

<img class="preview-img" align="right" alt="main button is disabled when there are not enough characters" src="https://os.alipayobjects.com/rmsportal/VabHKlbouFxSQXz.png">

<img class="preview-img" align="right" alt="main button is enabled when there are enough characters" src="https://os.alipayobjects.com/rmsportal/usdFxJmWDawqUuq.png">

When there are just a few input boxes, a user can see the feedbacks once he types in something and thus it will be easy to figure out when the main button will be disabled.

<br>

<img class="preview-img" align="right" alt="Don't use disabled main button" src="https://os.alipayobjects.com/rmsportal/GwZhvOuXmwqUIUW.png">

When there are a lot of input boxes (especially when the required input boxes are altogether with the optional ones), the logic of feedbacks can be very complicated. And thus using disabled main buttons may cause a lot of confusion.

### Structured format

<img class="preview-img" align="right" alt="Example of structured format" src="https://os.alipayobjects.com/rmsportal/SQgGfreRAqPZPsm.png">

The structured format can be used if a user is familiar with the input content and the system doesn't accept any deviation from the desired format.

### Tooltip & reminder

<img class="preview-img inline" align="right" alt="Example of tooltip" description="when an input box is focused, the tooltip will appear until the input box loses focus again" src="https://os.alipayobjects.com/rmsportal/cTlmdEprGSzMZfs.png">
<img class="preview-img inline" align="right" alt="Example of reminder" description="when an input box is focused, the reminder will appear until a user types in at least one character" src="https://os.alipayobjects.com/rmsportal/QPhvLWfMbLTvjRw.png">

Use tooltip if a brief input label may cause confusion while you still want to keep the label text to be short.

Use reminder if you want a user to pay attention to the format or purpose of an input box. A reminder will disappear once there is something typed in the input box, so it should be used only when a user is familiar with the content.

### Password input box

<img class="preview-img" align="right" alt="Example of password input box" src="https://os.alipayobjects.com/rmsportal/wKpOgeyyoOUeCrk.png">

Password input box provides real time feedbacks on password strength and validity. It's quite applicable to a registration page.

### Validation

<img class="preview-img inline" align="right" description="Validation in real time" src="https://os.alipayobjects.com/rmsportal/urCdIJFuNYCenqH.png">
<img class="preview-img inline" align="right" description="Validation after losing focus" src="https://os.alipayobjects.com/rmsportal/KkcSBkbTJirIxCw.png">

<img class="preview-img" align="right" description="When a "submit" button is clicked, a system will deal with inputs and  display feedbacks (the number of errors and the types of errors) on the page." src="https://zos.alipayobjects.com/rmsportal/xTtVSREbASRMstTggVGD.png">

Use different validation rules and a variety of feedbacks to help a user correct errors before he clicks on the "submit" button.

### Character counting box

<img class="preview-img" align="right" alt="Example of word counting" src="https://os.alipayobjects.com/rmsportal/JxzQIRfMCtMjuaH.png">

A character counting box is an input box that shows the current number of characters and checks if this number exceeds the limit.



## Format

### Margin

<img class="preview-img" align="right" alt="Example of margin between inputs" src="https://os.alipayobjects.com/rmsportal/dlTiHzZvCGRbMzL.png">

A typical example of using margin between inputs.

### Width

<img class="preview-img good" align="right" alt="Good" src="https://os.alipayobjects.com/rmsportal/vypllNQZsEHRszB.png">
<img class="preview-img bad" align="right" alt="Bad" src="https://os.alipayobjects.com/rmsportal/XSLwnrlLbKFjiNj.png">

If the maximum length of an input content is known, it's recommended to define the input width according to this maximum length.

<br>

### Alignment

There are both advantages and disadvantages for any kinds of alignment. Thus, you need to have a clear mind about your purposes (if you want to speed up or slow down a user) and the limits (screen width restrictions, problems of localization, etc.) before choosing one of those alignments.

<br>

<img class="preview-img" align="right" alt="Right alignment (recommended)" src="https://os.alipayobjects.com/rmsportal/UxGJfenYBKvkEEB.png">

Right alignment (recommended)

- Advantage: saves vertical space.
- Disadvantages: reduces readability; reduces flexibility of the input length
- When to use: you want to save more vertical space and speed up a user for filling a form.

<br>

https://www.expedia.co.uk/FlightCheckout?tripid=89e54540-dcf4-4c27-be3f-c9efaae6dac2&c=69c4491d-2d30-406a-9b2c-6ec50a932b48

<img class="preview-img" align="right" alt="Top alignment" src="https://os.alipayobjects.com/rmsportal/AsyyNKormNdEMLi.png">

Top alignment

- Advantages: High readability; High flexibility of the label length.
- Disadvantage: takes a lot of vertical space.
- When to use: you want a user to finish filling in the form quickly.

<br>

<img class="preview-img" align="right" alt="Left alignment" src="https://os.alipayobjects.com/rmsportal/eqUyDExbRlAQoas.png">

Left alignment

- Advantages: Easy to read and saves vertical space.
- Disadvantages: Slows down a user and reduces flexibility for the input length.
- When to use: you want to slow down a user so that he can take more considerations when filling a form.
