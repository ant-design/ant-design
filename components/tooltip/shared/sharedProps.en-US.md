<Antd component="Alert" message="The following APIs are shared by Tooltip, Popconfirm, Popover." type="info" banner="true"></Antd>

<!-- prettier-ignore -->
| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | This value will be merged into placement's config, please refer to the settings [dom-align](https://github.com/yiminghe/dom-align) | object | - |  |
| arrow | Change arrow's visible state and change whether the arrow is pointed at the center of target. | boolean \| { pointAtCenter: boolean } | true | 5.2.0 |
| autoAdjustOverflow | Whether to adjust popup placement automatically when popup is off screen | boolean | true |  |
| color | The background color | string | - | 4.3.0 |
| defaultOpen | Whether the floating tooltip card is open by default | boolean | false | 4.23.0 |
| destroyTooltipOnHide | Whether destroy tooltip when hidden | boolean | false |  |
| fresh | Tooltip will cache content when it is closed by default. Setting this property will always keep updating | boolean | false | 5.10.0 |
| getPopupContainer | The DOM container of the tip, the default behavior is to create a `div` element in `body` | (triggerNode: HTMLElement) => HTMLElement | () => document.body |  |
| mouseEnterDelay | Delay in seconds, before tooltip is shown on mouse enter | number | 0.1 |  |
| mouseLeaveDelay | Delay in seconds, before tooltip is hidden on mouse leave | number | 0.1 |  |
| ~~overlayClassName~~ | Class name of the tooltip card, please use `classNames={{ root: '' }}` instead | string | - |  |
| ~~overlayStyle~~ | Style of the tooltip card, please use `styles={{ root: {} }}` | React.CSSProperties | - |  |
| ~~overlayInnerStyle~~ | Style of the tooltip inner content, please use `styles={{ body: {} }}` | React.CSSProperties | - |  |
| placement | The position of the tooltip relative to the target, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` |  |
| trigger | Tooltip trigger mode. Could be multiple by passing an array | `hover` \| `focus` \| `click` \| `contextMenu` \| Array&lt;string> | `hover` |  |
| open | Whether the floating tooltip card is open or not. Use `visible` under 4.23.0 ([why?](/docs/react/faq#why-open)) | boolean | false | 4.23.0 |
| zIndex | Config `z-index` of Tooltip | number | - |  |
| onOpenChange | Callback executed when visibility of the tooltip card is changed | (open: boolean) => void | - | 4.23.0 |
