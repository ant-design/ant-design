# 表格

- category: 4
- order: 4

---

表格可被视为一种列表。它经常和其他界面元素一起协同，用于展示和操作结构化数据，并经常用于详情信息的入口。

## 内容

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/zFqqEqKKAylKkxv.png">

通常表格的组成元素以及相关元素会有，这几部分组成。

1. 按钮组
2. 搜索条件
3. 筛选
4. 排序
5. 状态点
6. 单行操作
7. 分页器／无限加载（可选）

### 筛选

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/YRcnmAFUvcfMlpN.png">

当该列选项有限，用户又希望只查看一个或者多个值时，可考虑使用。

### 状态点

<img class="preview-img" align="right" alt="状态示例" src="https://os.alipayobjects.com/rmsportal/EYmtSshUxKydwns.png">

一般用四种颜色来表明系统的不同状态。

<br>

<img class="preview-img" align="right" alt="多列状态示例" src="https://os.alipayobjects.com/rmsportal/OeChYAOTenMzJmG.png">

当一个表格中出现两项需要强化的状态时，可以弱化其中一项，通过文字颜色的变化来进行强化。

### 更多操作

<img class="preview-img" align="right" alt="依次分别为：完整内容、暂时不可用、没有该权限。" src="https://os.alipayobjects.com/rmsportal/ZlcZDOZNZpYQcMM.png">

该项暂时不可用时，直接灰化该操作；用户没有该权限时，直接隐藏该操作。

### 跳转至详情

<img class="preview-img" align="right" alt="名称跳转示例" src="https://os.alipayobjects.com/rmsportal/tfJiUmrUJRzBlzt.png">

把ID、名称等唯一性的表格项处理成文字链，点击后跳转至详情。

- 优点：节省空间；
- 缺点：可发现性较低；点击区域受到内容限制，可能出现不易点击的情况

<br>

<img class="preview-img" align="right" alt="查看跳转示例" src="https://os.alipayobjects.com/rmsportal/zjDqNVTzSrzXaWg.png">

在操作中增加一列『查看』，点击后进行跳转至详情。

- 优点：可发现性高；点击范围固定，不受影响；
- 缺点：比较占空间。

<br>

结论：可根据业务系统中表格的实际情况，统一使用一种类型。

## 交互

### 显示长表格

参考『列表页面』中的 [显示长列表](/docs/pattern/list#%E6%98%BE%E7%A4%BA%E9%95%BF%E5%88%97%E8%A1%A8)。

### 全选数据

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/QqafGErOPnuDKyy.png">

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/POvEJGjMYAexGut.png">

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/qwRSMFNilVCNoym.png">

当使用了分页器，又想实现全选数据的功能，可以结合『Alert』来实现。

### 跨页选数据

<img class="preview-img" align="right" alt="状态一：选中一行数据" src="https://os.alipayobjects.com/rmsportal/OcIWSystreURrPV.png">

<img class="preview-img" align="right" alt="状态二：切换分页后，记录所选的项目" src="https://os.alipayobjects.com/rmsportal/HuzwUWDzXszOkEI.png">

<img class="preview-img" align="right" alt="状态三：在其他页中再选择一项，多记录一项选择" src="https://os.alipayobjects.com/rmsportal/yCjrxTSElzNUsFn.png">

<img class="preview-img" align="right" alt="状态四：用户可以在记录条直接取消选择" src="https://os.alipayobjects.com/rmsportal/jtepHsDPApPnQlD.png">

<img class="preview-img" align="right" alt="状态五：表格选择框同步取消选择" src="https://os.alipayobjects.com/rmsportal/OAVQZqxPyuAWvTh.png">

当需要对表格／列表的数据进行跨分页器选择时，结合『Alert』来实现。

### 固定按钮组

<img class="preview-img" align="right" alt="顶部固定按钮" src="https://os.alipayobjects.com/rmsportal/AhgnVIhTIvtHpok.png">

<img class="preview-img" align="right" alt="底部固定按钮" src="https://os.alipayobjects.com/rmsportal/hUHidNAJczLRVCg.png">

用在表格行数很多时（一般多于20行），又想对表格数据进行频繁的操作时，尤其适用在无限加载的表格中。

### 某一项内容过长

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/vgNHOYAiuQbXCOi.png">

某一项内容过长／不确定长度，既不希望用户在列表和详情之间来回跳转，又不希望不确定的数据撑爆表格时。

### 模块编辑

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/mUhSLOTjzGYTQaE.png">

适用在易读性高于易编辑性时；适用在有一定数量的项需要编辑时。

### 直接编辑

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/VgvZjqTZBuAfGuO.png">

适用在易编辑性高于易读性时。

### 悬浮层编辑

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/QhIyXeNxAZEaLjT.png">

悬浮层会遮挡部分页面，适用在上下文对编辑任务不那么重要时。


## 规格（敬请期待）

### 行高

<img class="preview-img" align="right" alt="标准" src="https://os.alipayobjects.com/rmsportal/OeChYAOTenMzJmG.png">

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/OeChYAOTenMzJmG.png">

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/OeChYAOTenMzJmG.png">

提供了多种规格的行高，适用在页面、弹出框等场景中。

### 列宽

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/OeChYAOTenMzJmG.png">

一般是根据栅格来排版，通过设定每一列的宽度比列，来保证一定尺寸之上（eg：1366px）有好的浏览效果。需要注意：

1. 表头不换行；
2. 固定字节长度的列尽量不换行（eg：创建时间、操作等）。

### 对齐方式

<img class="preview-img" align="right" src="https://os.alipayobjects.com/rmsportal/OeChYAOTenMzJmG.png">

数值右对齐，其余左对齐。


## 案例（敬请期待）
