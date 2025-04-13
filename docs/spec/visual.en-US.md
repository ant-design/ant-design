---
order: 3
title: Visualization
---

The visual language is based on a set of design guidelines with data visualization features derived from the intermediate design language Ant Design, which makes the data expression more in line with the user's psychology, helping the “designer” to incubate visual solutions with more business characteristics to meet the individualization. Design requirements, shielding unnecessary design differences and implementation costs, thus liberating the "designer" and front-end R&D resources, and achieving comprehensive improvement of data chart development efficiency.

At the same time, this is a dynamically updated design document, your reading and feedback is the driving force for us to continue to advance, here is our [GitHub feedback url](https://github.com/antvis/site/issues).

## Design Resources

We provide comprehensive design principles & guidelines and design resource files (Sketch), as well as a complete graphical usage note to help users quickly understand charts and design high quality visualization charts.

- [Design Principles](https://antv.vision/zh/docs/specification/principles/basic)
- [Design Resources](https://antv.vision/zh/docs/specification/resources)
- [Charts Usage](https://antv-2018.alipay.com/zh-cn/vis/chart/index.html)

## Front end implementation

We encapsulate a set of AntV component libraries based on native JavaScript, which includes a high-interaction base chart library G2Plot, a chart library G6 focusing on process and relationship analysis, a chart library F2 for mobile applications, and other frameworks in the community.

- [G2: Grammar of Graphics](https://g2.antv.vision/en)
- [G2Plot: a charting library](https://g2plot.antv.vision/en) 🔥
- [G6: Graph Visualization Framework](https://g6.antv.vision/en)
- [F2: Mobile Charts](https://f2.antv.vision/en)
- [L7: Geospatial Visualization Analysis](https://l7.antv.vision/en)
- [React AntV](https://charts.ant.design/en)

## How to Design

### Understanding the users

Who are the users? What information do they want to get from the visualisations? In an enterprise product, users may be company executives, BI analysts, operations, data developers, and other different roles. Different roles may use visualisations for different purposes and in different ways. It is recommended to fully profile the users before starting the design in order to tell your data story completely and present your data insights accurately.

### Design Principles

- Accuracy: The conversion of data into visual representations that do not distort, mislead or omit, and that faithfully reflect the information contained in the data;
- Effective: Information is conveyed in a focused manner, with restraint and without redundancy, avoiding information overload, and using the most appropriate amount of Data-ink Ratio (Data-ink Ratio) to express the most useful information to the user;
- Clarity: The presentation is clear, easy to read and organised, which helps users to reach their goals quickly and get more information in the least amount of time;
- Aesthetics: perfect expression of the data, reasonable use of visual elements for artistic creation, without excessive modification, to give users an elegant experience.

## Chart usage

### Choosing the right chart type

We provide a complete description of chart usage to help you choose chart types more wisely.

#### Time series

<ImagePreview>
<img class="preview-img no-padding" description="Representative types: line graphs, area graphs, etc." src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*z0ZSRabgdpQAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Typically used to show trends and changes in data in the time dimension.

#### Comparison

<ImagePreview>
<img class="preview-img no-padding" description="Representative types: bar charts, bubble charts, etc." src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*mvE4T6jti5QAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Uses the length, width, position, area, angle and colour of a graph to compare the magnitude of values and is often used to show comparisons of values between different classifications.

#### Distribution

<ImagePreview>
<img class="preview-img no-padding" description="Representative types: Scatterplot, box plot, etc." src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_ft8Soe5p6EAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Typically used to show the distribution of values on continuous data.

#### Process

<ImagePreview>
<img class="preview-img no-padding" description="Types represented: funnel charts, etc." src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kJj6Qo3-UFIAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Typically used to represent process flow, flow relationships.

#### Proportion

<ImagePreview>
<img class="preview-img no-padding" description="Types represented: ring charts, pie charts, percentage stacked type charts, etc." src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*52XJRK9B0KUAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Shows the percentage relationship on the same dimension.

For more chart usage content, go to [AntV Chart usage](https://antv-2018.alipay.com/zh-cn/vis/chart/index.html)

### Colour Swatches

<ImagePreview>
<img class="preview-img no-padding" description="AntV Example of official default colour swatches" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Skn6TZsQ7ksAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

AntV provides a default set of chart colours, including colour usage.For more colour swatches, go to [AntV - Design language - Vision](https://antv.vision/specification/language/palette)

### Component Usage Recommendations

#### Title and Notes

The title is a paragraph that elaborates on the subject of the chart; the notes indicate the source of the data and make the chart appear to be from a clear and reliable source.

#### Axle

<ImagePreview>
<img class="preview-img no-padding" description="Elements of the axis" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*i4tXQZkMGrMAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

<ImagePreview>
<img class="preview-img no-padding" description="Classification of shafts" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*-ycMQZ48GykAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Used to define the mapping relationship between data in a coordinate system in terms of direction and value.

#### Legend

<ImagePreview>
<img class="preview-img no-padding" description="Elements of the legend" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8oYwRJbGmhMAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

<ImagePreview>
<img class="preview-img no-padding" description="Classification of legends" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*sSGjRJGyrqQAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Used to explain the meaning of all visual elements contained in the chart area.

#### Labels

<ImagePreview>
<img class="preview-img no-padding" description="Classification of labels" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*j2gNQ4E-wAoAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Content annotation for the current set of data.

#### Alerts Message

<ImagePreview>
<img class="preview-img no-padding" description="Elements of the alert message" src="https://gw.alipayobjects.com/zos/basement_prod/f9683e72-81a4-47cc-a208-6570187cce11.svg" />
</ImagePreview>

This means that when the mouse hovers over the chart or the finger clicks on a data point of the mobile device, the data of the point is displayed in the form of interactive prompts, such as the value of the point, the unit of the data, etc.

#### Graphics

<ImagePreview>
<img class="preview-img no-padding" description="Classification of graphics" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*itDLQb2fXpkAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

The graph is the visual presentation of the visual channels of the statistical chart mapped on the shape and is the main part of the chart, the other chart components are intended to help the reader to better understand the relationship of the data mapped on the graph.

For suggestions on how to use the components, go to [AntV - Design language - Component Design Guidelines](https://antv.vision/zh/docs/specification/components/titlenotes)

### Chart layout adaptation

<ImagePreview>
<img class="preview-img no-padding" description="Chart Responsive Schematic" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*0vfXTIlbSXwAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Data visualisation is always facing the conflict between massive data volume and limited screen space, how to solve the problem of adapting the content to different ends and different screen sizes, and help users understand the information and analyse the insights faster in the limited space is the problem we have been committed to research.

<ImagePreview>
<img class="preview-img no-padding" description="Design Ideas" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*WsO3T5klNMIAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

In Ant Design's visualisation system, we have developed a set of layout adaptation rules for full-volume charts, sorting out a layout adaptation system that applies to all charts, from the overall chart, to the atomic components within the chart. Take the moving image on the right as an example, where the axis labels of the horizontal axis are rotated to follow the specific dimensions. More content will be released soon, stay tuned.

### Interaction

<ImagePreview>
  <img alt="dynamic interaction" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QXtKSIMgaOUAAAAAAAAAAABkARQnAQ" />
</ImagePreview>

Different from the relatively static presentation of traditional data reports, interactive charts do not stop at the level of information display. Users continuously interact with the charts to get deeper analysis and information from the data.。

In data visualisation, we break down the interaction actions into three layers, namely "data acquisition", "information processing" and "knowledge flow", according to the user's level of consciousness and the goals corresponding to each level. It matches the motto of "overview first, focus on filtering, and then view the details as needed" in visual information retrieval. It is also in line with the basic logic of human seeking information: first general, then local, and then focus on the point of interest to explore, which is a process from the surface to the inside.

For more interactive charts go to [AntV - Design language - Interaction](https://antv.vision/zh/docs/specification/language/interact)
