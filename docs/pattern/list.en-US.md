---
order: 3
title: List
---

Lists are very common UI elements which can be applied to various scenarios:

- Get an overview
- Browse item by item
- Find specific list item
- Sort and filter
- Rearrange, add, delete or re-categorize list items

---

## Interaction

### Display Details

<img class="preview-img" align="right" alt="Popover Example" description="When triggered by click, symmetry between activated and disabled states should be maintained, in other words, popover should be closed where it was opened. When triggered by hover, activate the popover 0.5 second after a mouse-enter event, and close the popover immediately after a mouse-leave event." src="https://os.alipayobjects.com/rmsportal/GmpRYixxnePBPPW.png">

Popover: When a user clicks or hovers a link or piece of content, display a small amount of detailed information for the corresponding list item in a floating layer.

<br />

<img class="preview-img" align="right" alt="Embedding Example 1" src="https://os.alipayobjects.com/rmsportal/WIoplWDRZspuuhD.png">

<img class="preview-img" align="right" alt="Embedding Example 2" src="https://os.alipayobjects.com/rmsportal/tNAnTEaZtswRknD.png">

<img class="preview-img" align="right" alt="Embedding Example 3" src="https://os.alipayobjects.com/rmsportal/MXXjEoLdnBxqcne.png">

Embedding: A user can directly view detailed information in the context via a click, without opening a new page or modal.

<br />

<img class="preview-img" align="right" alt="Modal Example" src="https://os.alipayobjects.com/rmsportal/HeqNyjscGEHyHmt.png">

Modal: A user can view detailed information in a modal dialog via a click. But it loses the contextual/visual tie to the clicked list item, because, unlike popover and embedding, modal is usually presented in a fixed position regardless of the position of clicked list item.

<br />

<img class="preview-img" align="right" alt="Dual-Panel Selector Example" src="https://os.alipayobjects.com/rmsportal/JXWVQXvlPSDlvyk.png">

Dual-Panel Selector: A user can view a large amount of detailed information in a (usually right) panel beside the list.

<br />

<img class="preview-img" align="right" alt="Full-Window Example (No New Window)" src="https://os.alipayobjects.com/rmsportal/YTdIMZLeobNrjmU.png">

<img class="preview-img" align="right" alt="Full-Window Example (New Window)" description="Detailed information of clicked list item would replace the list area, user can go back to the list via breadcrumb, button or browser Back button." src="https://os.alipayobjects.com/rmsportal/uAeEOeoCAeTHgsQ.png">


Full-Window: A user can view a large amount of detailed information in current page. This mode loses contextual/visual tie to the clicked list item, however it is suitable for scenarios where detailed information is completely irrelevant, or screen size is small (i.e. mobile), or list and details are huge.

### Display More Text

<img class="preview-img" align="right" alt="Text Wrap Example" src="https://os.alipayobjects.com/rmsportal/wWcixIvqaFXfTHd.png">

Text Wrap: Expand certain list item into multi-line text.

<br />

<img class="preview-img no-padding" align="right" alt="Grid Example" src="https://os.alipayobjects.com/rmsportal/VDhwGyyblTSJpeV.png">

Grid: Arrange list items in a grid or matrix where each item shares a similar visual weight.

### Display Images

<img class="preview-img no-padding" align="right" alt="Carousel Example" src="https://os.alipayobjects.com/rmsportal/hKtAKuDfyfDpPrL.png">

Carousel: Display images in one dimension, scrolling of images can be triggered either manually by user or automatically by system.

<br />

<img class="preview-img no-padding" align="right" alt="Thumbnail Grid Example" src="https://os.alipayobjects.com/rmsportal/LAnBHEYiqWSfQAS.png">

Thumbnail Grid: Display images/icons in two dimensions, this approach has strong visual effects which attracts user attention.

### Display Long List

<img class="preview-img" align="right" description="Pagination is a good choice if performance is a main concern." src="https://os.alipayobjects.com/rmsportal/aZwrmpnaIEoxiXJ.png">

Pagination: Load list in a sectioned way, user determines whether to load other list items.

<br />

<img class="preview-img" align="right" description="Pagination can make things clunky when there is intensive operation on listed data, especially when there is selection across pages. So infinite scrolling would be a better choice. Infinite scrolling is also suitable for presenting all data for a user (i.e. user's orders) or non-temporary data." src="https://os.alipayobjects.com/rmsportal/afDpGUyoyQZFgks.png">

Infinite Scrolling: When user reaches the bottom of the first section, load next section via listening to scroll event or a button click.

### Display Categorized/Layered List

<img class="preview-img" align="right" alt="Two-Layer Collapse" src="https://os.alipayobjects.com/rmsportal/efRpmejABrXjiwF.png">

<img class="preview-img" align="right" alt="Multi-Layer Collapse" src="https://os.alipayobjects.com/rmsportal/bXwBcaLQPAWTIQV.png">

<img class="preview-img" align="right" alt="Two-Layer Collapsible Table" src="https://os.alipayobjects.com/rmsportal/XaJeuLfHeSSXCJq.png">

<br />
