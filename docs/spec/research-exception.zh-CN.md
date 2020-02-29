---
category: 设计模式 - 探索
type: 模板文档
order: 5
title: 异常页
---

用于展示页面异常状态。

## 设计目标

解释发生了什么异常，为用户提供相应建议或操作，避免用户感到迷失和困惑。

---

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*te8yTbLcqrgAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>友好</h4>
      <p>使用友好、清晰的语言来表达，不要使用难懂的术语，让用户产生困惑。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zHCcQqaRvmoAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>提供邀请</h4>
      <p>引导用户进入下一个交互层次的提醒和暗示，以表明在下一个界面可以做什么。</p>
    </div>
  </div>
</div>

---

## 类型

### 异常页

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*OIo9TYjVhAEAAAAAAAAAAABkARQnAQ">

当页面出现异常时展示，其包含以下要素：

1.配图：为沉重的异常增添一点乐趣，缓解用户烦躁心理；

2.异常代码/问题：当异常有具体的 HTTP 错误代码时，可予以展示；

3.异常描述：简明扼要地描述异常原因，方便用户作对问题作反馈；

4.建议操作：协助用户处理异常，或把用户引导回正确的路径上。

#### 模板 - 404

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*tVUkTr052wUAAAAAAAAAAABkARQnAQ">

**什么时候用**

当用户请求访问的页面、项目、资源等未找到时可使用。

#### 模板 - 403

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*j5LCQabCiz8AAAAAAAAAAABkARQnAQ">

**什么时候用**

无权限，可能包括无应用权限或无数据权限，根据实际情况向用户反馈。

#### 模板 - 500

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PRRMRY9cMPIAAAAAAAAAAABkARQnAQ">

**什么时候用**

当服务器出错，无法向用户提供服务时。

#### 模板 - 浏览器不兼容

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*bowLQ7DhaKsAAAAAAAAAAABkARQnAQ">

**什么时候用**

当浏览器不兼容导致用户无法打开网页的时候使用。

<br>

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PpLRQb0Rc5gAAAAAAAAAAABkARQnAQ">

**设计建议**

当浏览器不兼容，对操作影响程度不同，当并不严重影响使用时，可使用全局提示，允许用户继续使用。

### 空状态

当没有内容/数据显示给用户时，展示空状态。空状态也属于一种特定的异常页，具体内容请前往查看[空状态](/docs/spec/research-empty)文档。

### 加载失败

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NfSZSb3jGl8AAAAAAAAAAABkARQnAQ">

**什么时候用**

当页面因为网络等各种原因加载内容失败时展示，一般结合重试操作。

### 设计建议

页面的整体交互流程可能是由不同状态构成的，设计者在设计页面时不能只关注理想状态，应完整考虑各类突发场景，防止用户在使用时体验中断。

理想状态：所有页面模块正常展示的状态；

部分状态：部分模块不存在或部分内容为空状态，设计参考[空状态](/docs/spec/research-empty)；

加载状态：用 Spin 或 Skeleton 反馈加载中状态；

错误状态：系统错误、无权限等；

空状态：内容完全为空的状态，建议使用引导类的[空状态](/docs/spec/research-empty)提示，如果是新用户参考使用新人引导页。

---

## 扩展阅读

### 会用到哪些模板文档

- [空状态](/docs/spec/research-empty)

### 外部参考文章

- [Avoid Being Embarrassed by Your Error Messages](https://www.uxmatters.com/mt/archives/2010/08/avoid-being-embarrassed-by-your-error-messages.php)
- [How to fix a bad user interface](https://www.scotthurff.com/posts/why-your-user-interface-is-awkward-youre-ignoring-the-ui-stack/#partial)
