---
group: Design Patterns
type: Global Rules
order: 3
title: Data Entry
---

Data Entry is an important interactive way to retrieve information of objects since users will frequently add, change or delete information. Diverse ways for text input entry and selection entry help users finish interactions more clearly and efficiently. Designers should pay attention to things as follows:

- Straightforward text should be provided as "Label" for novice users and users that access occasionally, while terminology should be provided as "Label" for domain experts. When sensitive information should be provided by users, hints can be used to specify why the system need to do so. For example, when it's necessary to retrieve a user's identity (ID) or phone number.
- Allow users to get information via context to help completing their input. It avoids users to have wild guesses from the empty input through approaches like "good default values", "structured formats", "hints", "input tips" etc.

---

## Text Input Entry

Input is the basic and common way for data entry, which provides a text editable component for users.

### Input

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/tlOeUNcdGkvWedJpiTSz.png">
</ImagePreview>

It uses a single line for text input with limited length.

> Note: Specific styles can be applied to some text (e.g. numbers, URL). Please refer to [Input](/components/input/).

### Textarea

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/HwJLPhuelqEaeQvsYlFz.png">
</ImagePreview>

It's a multi-line text input for single long text.

### Tips and helps

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/cggdJfFgvDlOwaFRylSk.png" alt="Basic style">
</ImagePreview>

Hints is usually added in Input to help remind users, which can increase efficiency for the data entry.

> Note: Input usually works together with label which is to the left of input by default, while it can be on top as well when the text is too long or in English context. However, it should be consistent within the same system.

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/xcDCXmgTCeXWelIovxvh.png" description="You can use an 'information' icon or a tip tool when the text is long">
</ImagePreview>

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/AUTvHOWDsCTgSojYrQms.png" description="You can put the short input tip below the input (as shorter than a sentence).">
</ImagePreview>

### Search

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/xLIltABSbmNgukJTZShA.png">
</ImagePreview>

Search can help users reduce the range for target and retrieve the necessary information quickly from a huge information pool.

---

## Selection entry

Allow users to select from a specific range

#### Radio Button

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/mLZUWZmJZKiTmcGFzaOC.png">
</ImagePreview>

Radio button allows a user to select only one value from several options. Radio options should not be too many because all the options are default visible to a user so that the user can make the selection via comparison.

> Note: Radio Button must be more than two options, and normally less than five.

### Checkbox

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/DvQNtGZJgMZNAtfgweGo.png">
</ImagePreview>

Checkbox is used to select multiple values from several options.

> Note:
>
> 1. Checkbox often works together with submit action for state.
> 2. A single checkbox can represent the switch of two states.

### Switch

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/MsOFIDWorXeobBLkEwjS.png">
</ImagePreview>

It's used to switch the state of a single option. The inline label of "Switch" should be displayed clearly, e.g. Disable/Enable, Disallow/Allow etc.

<br />

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/zos/rmsportal/GJNIykRlFgmVRSKNGOCg.png" alt="Correct Sample">
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/zos/rmsportal/gLJCJDtOquBTRdBSoGYe.png" alt="Incorrect Sample" description="'Switch' doesn't need to work with buttons because the toggle will take effect immediately.">
</ImagePreview>

> Note: It will trigger the state change directly when a user toggle the "Switch".

### Dropdown

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/wbOaUEKPkjzVFNLabvtF.png">
</ImagePreview>

Dropdown provides more flexibility for the number of options, allowing a user to select one or multiple values from a list of options.

> Note:
>
> 1. Used when there are more than five options.
> 2. Options is listed with logical sorting and content should be fully displayed.

### Slider

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/kfDmEBuFbbDsrsqTyxIH.png">
</ImagePreview>

Slider allows to select a suitable value by moving the anchor in a continuous or discontinuous range. It's a better choice for reflecting options of intensities or grades, e.g. volume, brightness, color saturation etc.

<br />

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/jRUNDmdChSEsFAXVBzAx.png">
</ImagePreview>

> Note: Operations can be more flexible and convenient using "Slider" when precise value is not required. "NumberInput" can be worked together with Slider for precise values.

### Transfer

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/fxYgAmCVVkduXRfBYUCo.png">
</ImagePreview>

Transfer the elements between two columns in an intuitive and efficient way.

### DatePicker

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/IyntUBesFLpPNQTHtgVk.png">
</ImagePreview>

DatePicker provides a visual way to browse and select a date or date range for users.

---

## Upload

Upload is the process of publishing information (from local or cloud storage) to a remote server via a web page or a upload tool.

### Upload by simple clicks

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/nslSHZVgVxmBNgKhFcqT.png">
</ImagePreview>

Normally used to upload a single file which doesn't require preview. Click the button will prompt the file selection window.

### Upload by displaying thumbnails

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/HQvQFtYdIQKoUOjgSFQP.png">
</ImagePreview>

Normally used to upload images. Users can upload images and display thumbnails in the list. The upload button will disappear when the number of images is up to a threshold.

### Upload by drag-and-drop

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/zos/rmsportal/evyhWzbCtinnGURCPJSn.png">
</ImagePreview>

Drag files into a specific area to upload, while it supports upload by clicking as well.

> Note: Specific file size and format is required for file upload, e.g.: Please select text files (support PDF, ZIP, EXL) with size no more than 5M. Progress of uploading should be displayed.
