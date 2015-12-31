# Contributing to Ant Design

The following is a set of guidelines for contributing to Ant Design. Please spend several minutes in reading these guidelines before you create an issue or pull request.

Anyway, these are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.


## Do your homework before asking a question

It's a great idea to read Eric Steven Raymond's [How To Ask Questions The Smart Way](http://www.catb.org/esr/faqs/smart-questions.html) twice before asking a question. But if you are busy now, I recommend to read [Don't post homework questions](http://www.catb.org/esr/faqs/smart-questions.html#homework) first.

The following guidelines are about *How to avoid Homework Questions*.

### 1. Read the documentation.

It sad but true that someone just glance(not read) [Ant Design's documentation](http://ant.design/). Please read the documentation closely. What's more, you can modify and run our demo with [JSFiddle](http://jsfiddle.net/9zrstuto/70/). It's helpful to understand our documentation.

Tips: choose the corresponding documentation with versions selector which in the bottom-right corner.

### 2. Make sure that your question is about Ant Design, not React

Someone may think all of the questions that he/she meets in developing are about Ant Design, but it's not true. So, please read [React's documentaion](http://facebook.github.io/react/docs/getting-started.html) or just Google(not Baidu, seriously) your questions with keywork *React* first. If you are sure that your question is about Ant Design, go ahead.

### 3. Read the FAQ and search the issues list of Ant Design

Your questions may be asked and solved by others. So please spend several minutes on searching. Remember [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), both code and questions.

P.S.
1. [FAQ](https://github.com/ant-design/ant-design/wiki/FAQ)
1. [Issues list](https://github.com/ant-design/ant-design/issues)


## Providing a demo while reporting a bug

It would be helpful to provide a demo which can re-produce the bug 100%. Please fork this [Fiddle](http://jsfiddle.net/9zrstuto/70/) and re-produce the bug you met. Then, create an issue like this [example](https://github.com/ant-design/ant-design/issues/new?title=%E8%AF%B7%E5%A1%AB%E5%86%99%E7%AE%80%E6%B4%81%E6%9C%89%E6%95%88%E7%9A%84%E6%A0%87%E9%A2%98&body=**%E9%97%AE%E9%A2%98%E6%8F%8F%E8%BF%B0**%0A%0A%EF%BC%88%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E9%97%AE%E9%A2%98%EF%BC%89%0A%0A**%E5%8F%91%E7%94%9F%E7%8E%AF%E5%A2%83**%0A%0A-%20antd%20%E7%89%88%E6%9C%AC%EF%BC%9A%0A-%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%8F%8A%E7%89%88%E6%9C%AC%EF%BC%9A%0A-%20%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8F%8A%E7%89%88%E6%9C%AC%EF%BC%9A%0A-%20%E5%9C%A8%E7%BA%BF%E6%BC%94%E7%A4%BA%E5%9C%B0%E5%9D%80%EF%BC%9A%0A%0A**%E9%87%8D%E7%8E%B0%E6%AD%A5%E9%AA%A4**%0A%0A1.%20...%0A2.%20...%0A). The most important thing is: double check before claiming that you have found a bug.


## Tips about Feature Request

If you believe that Ant Design should provide some features, but it does not. You could create an issue to discuss. However, Ant Design is not Swiss Army Knife, there are some features which Ant Design will not support:

1. Request or operate data


## Tips about Pull Request

It's welcomed to pull request. And there are some tips about that:

1. It is a good habit to create a feature request issue to disscuss whether the feature is necessary before you implement it.
1. Run `npm run lint` and fix those errors before committing in order to keep consistent code style.
1. Rebase before creating a PR to keep commit history clear.
1. Add some descriptions and refer relative issues for you PR.
