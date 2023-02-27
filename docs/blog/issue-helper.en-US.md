---
title: 'Repost: How to submit a riddle'
date: 2023-02-22
author: afc163
---

There are some common mistake when submitting an issue to the community for the first time, making it difficult for maintainers to help solve problems. Repost an old article, hoping helps for submit issue after laughing :)

> Original link: [How to submit a issue which never can be answered to open source projects](https://zhuanlan.zhihu.com/p/25795393)

---

As a developer, I use and participate in many open source projects. In the open source community, questions and answers are the most interesting part. Some issue with fully communication and some others are not. There are many fascinating and useful commonalities in the way people ask questions. I've distilled them in the hope that they will help those like me who are curious and willing to go out of their way to annoy the maintainers of open source projects.

Here are thirteen tips on how to ask questions which never can be answered:

## 1. Cherish your words

Compress the number of bytes in the question, so that the other party does not think you are long-winded. Use the simplest words to describe your problem, refine keywords, and simplify the lengthy process and tedious details.

#### 😈 'Good Way'

```
Style compilation error
```

#### 👼 'Bad Way'

```
Import xxx.css into my project, and an error occurred during compilation. The error message is as follows:

Module build failed: SyntaxError: Unexpected token

I import it like this:

import 'xxx.css';

balalalala.....
```

## 2. Slow down

If the maintainer answers you, usually they will ask for further information. Remember not to reply in a hurry, that will make you look like a workaholic (bubble by the computer all the time, waiting pitifully for a reply). You still have other lives, drink a cup of coffee and reply after ten days and a half months. Believe me, they will quickly lose patience and close the question, or get depressed because they can't close it for a while.

#### 😈 'Good Way'

```
You: When using Button, I find that the console reports an error, and the prompt is as follows.
Maintainer (within 2 days): I can't reproduce your example, can you provide a reproducible example?
Maintainer (3 days later): @you
Maintainer (one week later): ping~
You (two weeks later): Whoops sorry for the late reply, here is my code.
```

#### 👼 'Bad Way'

```
You: When using Button, I find that the console reports an error, and the prompt is as follows.
Maintainer (within 2 days): I can't reproduce your example, can you provide a reproducible example?
You (in 2 days): Maybe my situation is a bit different, here is the reproduce code.
```

## 3. A big package

Introducing open source modules in a medium or large project is prone to strange problems. There are dozens of files and hundreds of business modules, and the project schedule is tight. It is too hard to check one by one. It is better to hire someone else, and quickly pack a package and send it to the other party.

#### 😈 'Good Way'

```
I have a problem with the front-end component of my database project, here is my code, can anyone help me?
Attachment: db-service-app.rar (434MB)
```

#### 👼 'Bad Way'

```
There is a front-end component problem in my project, I simplified the code,
It is found that the xxx component and the yyy component are used at the same time. Here is a simple reproduction example.
Attachment: component-xxx-yyy-bug.zip (10KB)
```

## 4. To be continued

Always hold back, don't finish the sentence at once, make your question full of mystery, and fully mobilize the reader's curiosity.

#### 😈 'Good Way'

```
You: My code is wrong and I don't know what to do?
You: I have a problem here, can someone help me?
are u there?
```

#### 👼 'Bad Way'

```
You: I used the latest version of xxx just released, and the following error occurred in the console...
I call it like this...
My code repository is here...
```

## 5. Mess with formatting

Never, never format code. You are not an artist, and beautifying the format is not your specialty. Your energy should be used in project development, and you don't have time to learn formatting syntax. As for whether the other party can understand, you don't need to care.

#### 😈 'Good Way'

```tsx
renderBatchButton() {

return(



<Dropdown overlay={this. renderExportMenu("2")}>





export warehouse order

);

}


renderExportMenu(category) {

let exportFile=({key})=>{

console. log(key)

}

let items=[];

if(this.props.global.template_list){

items=this.props.global.template_list.map((item)=>{

if(category===item.category){

return <Menu.Item key={item.id}>{item.name}</Menu.Item>;

}

});

}
```

#### 👼 'Bad Way'

```tsx
import { Menu } from 'antd';
import React from 'react';

const Demo: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => setCollapsed(!collapsed);

  return <Menu>...</Menu>;
};

export default Demo;
```

## 6. Missing key information

The project code always runs well at the beginning, but when you do a certain operation, or change some code, or in a special environment, a problem occurs. This difference is often the key point of the problem, just keep it in your mind and don't say it easily.

#### 😈 'Good Way'

```
You: My code is wrong.
Maintainer: I have tried various methods but have not reproduced it, please provide the reproduction?
You (much later): Oh! I have this problem in chrome 35.
```

#### 👼 'Bad Way'

```
You: My code is wrong in chrome 35.
Maintainer: Ok, I reproduced it too, I'll see how to fix it.
```

## 7. Providing wrong information

Sometimes you need to do some misleading, intentionally or unintentionally, in short, making difficulties is your strong point

#### 😈 'Good Way'

```
You: My code is wrong.
Maintainer: What version are you using?
You: 0.8.4 (actually 0.8.3 locally)
Maintainer: Are you sure, 0.8.4 should have fixed this issue. I'll take another look...
```

#### 👼 'Bad Way'

```
You: My code is broken in version 0.8.3.
Maintainer: 0.8.4 should have fixed this problem, and upgrading to the new version will solve it.
```

## 8. Feel free to vent your emotions

Open source projects cause bugs in your project, cause you to work overtime on Saturday night, make your missing the party and someone must be responsible. Your work and life are ruined by them, and don't make it easier for them.

#### 😈 'Good Way'

```
This project sucks, it is full of pitfalls to use, and the documentation is too simple. It is really open source to do so.
```

#### 👼 'Bad Way'

```
This project has many details and the documentation is not perfect. Is there any improvement plan?
I have collected the following specific questions and hope to continue to improve them.
```

## 9. Think big

Try asking a question with an ambitious goal, and only those grandmotherly maintainers will try to answer you (which is unlikely to happen). And because you showed unpreparedness and extreme ignorance in all technical details, the other party's answer can't satisfy you.

#### 😈 'Good Way'

```
How to package and release?
```

#### 👼 'Bad Way'

```
I want to develop a front-end single-page project, the back-end is php, and the architecture is completely separated from the front-end.
I have a problem when I try to use xxx to build a package... (50 words omitted) What should I do at this point?
```

## 10. Freedom of expression

The maintainers of many open source projects are arrogant, pedantic, freaks who like to set all kinds of rules. For example, they often provide weird question templates and ask you to fill in the blanks in a long and smelly form. Once you don't do what they say, they will see you as a troublemaker and judge you. How can you stand these constraints, write whatever you want, let them and their templates go to hell!

#### 😈 'Good Way'

```
Call `xxx.close` not trigger popup close, please solve it
```

#### 👼 'Bad Way'

```
The popup of the xxx component is not closed

- Version used: 1.0.0
- Browser: Chrome 56.0987
- OS: Windows 10

## what have you done?

I introduced the component xxx, the code is as follows, I clicked on the component to open the popup, and did the following operations.

## What are you expecting?

Overlays should be turned off.

## What is the actual situation?

The popup closes briefly and then pops up again.

[GIF screenshot]

## Reproducible online demo

https://codesandbox.io/xxx
```

## 11. DDOS the maintainer

Repeat the questions you asked in different places to deepen the other party's impression and subvert the other party's imagination!

#### 😈 'Good Way'

```
Question 1: An error is reported when sending a request: `405 Method not allowed`.
Question 2: Hello, I have the problem of `405 Method not allowed` here.
Question 3: Request 405 error, what should I do?
Question n:...
```

#### 👼 'Bad Way'

```
Problem 1: An error is reported when sending a request: `405 Method not allowed`
You: +1 I had this problem too.
```

## 12. Surprise

Even if you know that there is an official channel, it is recommended to ask the maintainer in other ways: Twitter, Facebook, private Email, personal blog, their friends and so on. go to all the places you can find him to ask questions.

#### 😈 'Good Way'

```
Private message of unfollowed people: Hello, our project uses your framework, I would like to ask, can the xxx component get the focus? for keyboard switching
```

#### 👼 'Bad Way'

```
Official channel: Hello, our project uses your framework. I would like to ask, can the xxx component get the focus? for keyboard switching
```

## 13. High level strike

Raise your question to a higher level, take the moral high ground and make accusations, making they unable to argue.

#### 😈 'Good Way'

```
It turns out that the teams of big companies are like this, don’t they test well? It’s a shame to take this thing out, it’s just a KPI product, and I don’t care about it after the promotion.
```

#### 👼 'Bad Way'

```
Although this project is a product of a large company, it has disadvantages compared with competing products in the following aspects, and I personally do not recommend using it.
```

## Summarize

All in all, maintainers of open source projects always want to see problems happen when they try to answer and solve problems, **don't let them succeed**. Also, most of them have OCD about unclosed questions, try to create as many of them as possible.
