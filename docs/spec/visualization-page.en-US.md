---
category: Design Patterns
type: Template Document
order: 2
title: Visualization Page
---

Data visualization templates depict information and assist users to understand the data, by displaying a serious of multiple charts. In the way of viewing and operating the charts, users can analyze the data and finally make the data-driven strategies.

## Design Goals

To help users quickly and clearly understand the meanings of data, analyze trends, and make decisions.

---

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*v6FAS7wJ4TUAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Organized</h4>
      <p>Define the layout logically, prioritize the content in order. In most cases, in order to emphasize the common-used analysis thoughts, you should organize the information from top to bottom and from left to right, or use processive interactions. To sum up, put the summary first, then focus on filters, and finally provide details whenever the user needs.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P1YtSIk6Xq0AAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Focused</h4>
      <p>Put the most important charts and the key scorecards on the top or upper part the page.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MBJwRr8vL3oAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Accurate</h4>
      <p>Keep data accuracy, clarity and completeness.<br />1. Use the correct types of chart.<br />2. Explain data definition when necessary.</p>
    </div>
  </div>
</div>

### Do & Don’t

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*D4AHQ434LjgAAAAAAAAAAABkARQnAQ" alt="Do">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*qUCwTKf_bV8AAAAAAAAAAABkARQnAQ" alt="Don't">

When the data is highly summarized, a chart with the detail number(s) is more straight-forward than a chart alone.

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*YhWnS73vVvIAAAAAAAAAAABkARQnAQ" alt="Do">

Try to highlight the primary data on first one screen, and limit the sum of modules into 5-9, avoiding information overload.

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Ym8CSoOMN1EAAAAAAAAAAABkARQnAQ" alt="Do">

Make good use of filtering capability, let users observe the overview, and check the detailed data at the same time. Therefore, users can explore quickly whenever they have questions.

## Typical Templates

### Presentation Dashboards

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/dOPuiUwtR8/3ef4fa56-0272-4663-8353-e72055a404cc.png">

In order to help users to make decisions, tile the most critical data from the overall perspective on the whole page. When all of the indicators share similar importance, choose the layout on the left; to emphasize one of them, select the one on the right.

#### Indicator Dashboards

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/JyiQirylIm/72eccc07-a5c9-47d2-8d17-a32c46507eb4.png">

**When to use**

For decision-makers to monitor overviews of data, and attach charts for further insights.

**Related capabilities**

Key indicator, scorecard, filter, chart.

#### [Monitor Dashboards](https://preview.pro.ant.design/dashboard/monitor)

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/Ls0j%26N%24i4A/4fcb4e43-5b33-4f3e-83ee-07b308c192ff.png">

**When to use**

This type of dashboard provides an overview of the data for decision making. Usually there is a central topic, around which presents multi-dimension indicators, helping the users find out abnormal immediately.

**Related capabilities**

Key indicator, scorecard, chart, map.

### Analytics Dashboards

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/HDGn37TfSL/0833d3e1-8126-4f89-a388-47a7f7c75cfe.png">

Analytics dashboards separate the data-analysis interface into several parts. Usually their layouts are "summary and description" structure, showing overviews of the whole information with different aspects. These dashboards can assist the users to discover the current problems.

#### Multi-dimension Analytics Dashboards

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/crg34dVGk%26/fc54e283-8748-45a0-b65f-e41336fdbd0d.png">

**When to use**

To analyze multiple dimension of data, surround the same topic.

**Related capabilities**

Key indicator, scorecard, filter, chart.

### Detail Templates

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/cwc7oz1J2J/5f5f9885-b7f1-4183-b696-f666c939175a.png">

Detail templates display the overview and detailed information of a report or a unique indicator. Users can set texts, lists and charts according to their business needs.

#### Data Details

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/kQnhbqQWPE/a3abf5e3-beeb-4b60-a51f-13effcc239e8.png">

**When to use**

To show the details of the reports.

**Related capabilities**

Filter, chart, table.

### Design Suggestions

#### Connect Analysis Steps

- Figure out users’ roles and aims, and choose the categories of template accordingly. Different business roles pay attention to different key data. There are two common-used types of indicators: high-level dashboard data, and detailed information.
  - Decision-makers can select templates which describe the results;
  - Operators can choose templates which provide more analysis capabilities and detailed information.
- Confirm the priority of the key indicators, and then define the page layouts accordingly. Put the most important data on the most outstanding positions.
- Please remember, you can connect the user interfaces through interactive modes, telling your own stories.

<div>
  <img src="https://gw.alipayobjects.com/zos/antfincdn/ZTGN3NUScF/50aee324-e334-480e-88c4-07e80d264ec2.png">
</div>

#### Combination Methods of Cards

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/tul9MHfx6P/84e01ba5-c57e-49cd-805a-ae83f8ef49e2.png">

1. One card, one topic.

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*k-omRZK0t4IAAAAAAAAAAABkARQnAQ">

2. Place closely-related datasets on one card, and use split lines to break it into different areas.

#### Use Suitable Charts

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/L9YbwdqTcq/d4879a5e-c4bb-480a-8817-9058e89b8042.png">

After designing the draft layout, select related visualization charts based on how summarized or detailed the data is. Usually scorecards and ranking lists are used for information summaries, tables and texts express details, and charts are between the two categories.

#### Color Palette

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/8YsRuMRbel/446a7023-f13d-4754-8fea-6dd14343f335.png">

## Read more

### Relative Rules

- [AntV Visualizatio Design Principles](https://www.yuque.com/mo-college/vis-design/pwh679)
- [AntV Visualization Color Palette](https://www.yuque.com/mo-college/vis-design/ugbofr)
- [AntV Visualization Interaction Design Guidelines](https://www.yuque.com/mo-college/vis-design/yygtlg)

### Relative Modules or Components

- [AntV Chart Samples](https://g2plot.antv.vision/en/examples/gallery)
