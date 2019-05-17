---
category: Principles
order: 10
title: React Immediately
---

Invitations are powerful because they directly address discoverability and provide feedback before an interaction happens. Transitions are useful because they provide visual feedback during an interaction. But another class of feedback exists. It is the feedback that happens immediately after each interaction with the system, an immediate reaction paired with the user's action.

While we can't literally extend Newton's law to the world of user interfaces, we certainly can apply this principle to the way we should interact with users. When users click on a button, they expect the button to depress. When they type in a field, they expect to see characters show up in the text box. When they make a mistake, they want the application to tell them where they goofed.

While there is a possibility of too much feedback (or, more accurately, too much of the wrong feedback—a concept we will discuss in the upcoming chapters), a system with little or no feedback feels sluggish and thickheaded.

> ** Newton's Third Law of Motion **: For every action, there is an equal and opposite reaction, from Wikipedia.

---

## Lookup Patterns

<img class="preview-img" align="right" alt="example of Certain Category" description="The keyword of the user query is only displayed in three categories, Topics, Questions and Articles." src="https://gw.alipayobjects.com/zos/rmsportal/XlqFYhYiZtWFNImtRElR.png">

<img class="preview-img" align="right" alt="example of Uncertain Category" description="The number of categories the keyword of the user query belongs to is uncertain." src="https://gw.alipayobjects.com/zos/rmsportal/czfJRLltwXcsTLlTpytV.png">

Auto Complete: As the user types input into a field, a drop-down menu of matching values is displayed. Depending on the categories of search results, it can be divided into two types, Certain Category and Uncertain Category.

<br>

<img class="preview-img" align="right" alt="example of Live Search" description="When the user type a search value, the system instantly displays the search results." src="https://gw.alipayobjects.com/zos/rmsportal/clFLKIWTYfHwIiOCUNbw.png">

Live Suggest: Live Suggest provides real-time search term suggestions for creating a search.

<br>

---

## Live Suggest

<img class="preview-img" align="right" alt="example of Live Preview" description="Depending on the type of the input from the user, the system provides instant feedback on password strength and validation." src="https://gw.alipayobjects.com/zos/rmsportal/koYsOzKwTcHvjpZULpov.png">

Live Preview: A Live Preview gives the users a glimpse beforehand of how the application will interpret their input once submitted.

> Note: An ounce of prevention is worth a pound of cure. Use Live Previews to prevent errors.

<br>

Progressive Disclosure: When users are faced with a series of steps, it is often best to provide hints only when they are needed, instead of cluttering the interface by displaying all the hints at once. Learn more cases on [Stay on the Page/Progressive Disclosure](/docs/spec/stay#Process-Flows)。

<br>

<img class="preview-img" align="right" alt="example of Loading Button" src="https://gw.alipayobjects.com/zos/rmsportal/cnAnCxfzSwUJeeXIUOIC.png">

<img class="preview-img" align="right" alt="example of Loading Table" src="https://gw.alipayobjects.com/zos/rmsportal/agFZSlgdSOyCznCGXGcE.png">

<img class="preview-img" align="right" alt="example of Loading List" src="https://gw.alipayobjects.com/zos/rmsportal/tVzqUunjctTxvSMmhSVv.png">

<img class="preview-img" align="right" alt="example of Loading Page" src="https://gw.alipayobjects.com/zos/rmsportal/igxFnUdRHWaBXtTePuFf.png">

Progress Indicator: Progress Indicators keep a conversation going with the user when the rest of the interface is currently unavailable. Common Progress Indicators, such as Loading Button, Loading Table, Loading List and Loading Page, can be displayed respectively according to the frequency and importance of operation.

<br>

<img class="preview-img" align="right" alt="example of Click Refresh" src="https://gw.alipayobjects.com/zos/rmsportal/HTDCbBvlFKwsDwmcgzcw.png">

Click Refresh: Click Refresh notifies the user of fresh content and provides button or tool to refresh.

<br>

<img class="preview-img" align="right" alt="example of Periodic Refresh"  description="The added list item turns to be highlighted and get back to normal in a few seconds." src="https://gw.alipayobjects.com/zos/rmsportal/kpUhmRudNWDxNzgUddEp.png">

Periodic Refresh: Periodic Refresh brings in fresh content on a periodic basis without direct user interaction.
