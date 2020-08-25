---
category: Design Patterns
type: Template Document
order: 3
title: Detail Page
---

Detail Pages display the complete data to users. Users can edit the information or do other operations.

## Design Goals

To increase the information viewing and searching efficiency. To raise the convenience of operation.

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3CfhSZLxsIEAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Direct</h4>
      <p>Try to display the information as flat as possible. Do not hide or fold up the content if not necessary.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lN6IRbhv8fIAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Clear hierarchy</h4>
      <p>In order to decrease the information complexity on each page, put information in levels and groups, following the principle of proximity.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jXDwQ6NF7dIAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Concise</h4>
      <p>Reduce the use of complex structures, try to use similar layouts and modules to reduce the interference of structural differences to users, and let them focus on information itself.</p>
    </div>
  </div>
</div>

## Typical Templates

### Basic Layouts

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/pCRKNg9k17/1bd63a4b-d1f4-4e07-b22a-d473846ffa4c.png">

Basic Detail Pages directly show all the information at the same level of hierarchy. We suggest such method of displaying data.

#### [Basic Detail Templates](https://preview.pro.ant.design/profile/basic)

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/mbOatwyvyE/0fb8dd2b-b0d6-4833-8eef-4b9bb403eece.png">

Basic layout templates display the main information on one whole card, using non-column split lines to separate the content into groups.

**When to use**

To display information with less content and low complexity.

#### Document Detail Templates

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/scYc%24%24mD8l/17738081-f446-417b-9b32-a8c30de2f221.png">

Document Detail Templates display the detailed information of approval documents. They use cards to separate the modules with complex content.

**When to use**

To display approval process and detailed approval information, as well as some approval operations.

**Related operations**

Pass, reject, transfer, sign, suspend and withdraw.

### Complex Layouts

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/B76lyJVA80/3c938d7e-06a8-464c-b70c-5b2bebfcd638.png">

Deal with complex details in the following way: Divide information with high complexity and weak correlation into multiple parts. And put the parts into groups according to their relativities, with tabs, steps, cards, etc.

#### [Advanced Detail Templates](https://preview.pro.ant.design/profile/advanced)

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/%241vXHbjQ2A/ad454bfb-55d8-43b1-b1fb-adfbc889045c.png">

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/O0dPbOqGT0/07b6e341-2186-4a20-bc2c-513d91d3faa8.png">

**When to use**

When the detail page has large and complex content, it has to be split into multiple tabs to guide users to browse information.

#### Publish Process Templates

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/zMjpjg%24oaY/a9b7e996-ca9a-45d8-afbb-3c1727208629.png">

Divide the content into steps, letting users to browse and operate step by step.

**When to use**

Such templates are suitable for developing and collaborating processes.

## Design Suggestions

#### How to choose template

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/1uy%243Y6SRp/1a6ff7f8-4cd0-483b-b8a5-c8d49c63fa92.png">

Based on information complexity and correlation model, choose related modes to present the information, and select suitable layouts to display the contents of detail pages.

#### Separation Methods

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/gadw%26gZBCW/f8c03ba9-73ae-40f6-b687-c322ecf963cb.png">

Conclude the closeness of each information module according to the relevance among them. Usually, the more relevant the contents are, the closer they are to each other.

- Non-column split lines: to separate relevant contents;
- Full-column split lines: to divide the content into multiple parts;
- Cards: to display information on one topic;
- Tabs: to put the information into groups according to some feature, such as version, intention, phase, etc.

#### Content Components

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/antfincdn/J7ccrSNpjz/89878d45-ca15-4a6a-853e-3281fe02f114.png">

Select presentation modes of the information according to its types and complexity. Abased on the complexity from low to high, the followings are available components:

## Read more

#### Related Global Rules

- [Data Format](/docs/spec/data-format)
- [Button](/docs/spec/buttons)

#### Related Modules or Components

- [Description](/components/descriptions/)
- [Collapse](/components/collapse/)
- [Table](/components/table/)

#### Reference

- [Fiori – How to Design an Object Page](https://blogs.sap.com/2017/08/06/fiori-elements-how-to-design-an-object-page/)
- [SAP Fiori 2.0: The Object Page —— Part 1: It's History](https://experience.sap.com/skillup/sap-fiori-2-0-the-object-page-part-1-its-history/)
- [Object Page Floorplan](https://experience.sap.com/fiori-design-web/object-page/)
- [Principle of Product Display in Supermarkets](https://experience.sap.com/fiori-design-web/object-page/)
