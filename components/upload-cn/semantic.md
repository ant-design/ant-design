## Upload

### Semantic Parts

- root（`semantic-mark-root`）: 根元素容器，包含布局样式、禁用状态文字颜色、用户选择控制、鼠标样式等基础样式
- list（`semantic-mark-list`）: 文件列表容器，包含布局排列、过渡动画、间距控制等样式
- item（`semantic-mark-item`）: 文件项元素，包含内边距、背景色、边框样式、悬停效果、状态颜色、过渡动画等样式
- trigger（`semantic-mark-trigger`）: 上传按钮容器，包含按钮样式、禁用状态、隐藏控制等样式

### 使用案例

```tsx
<Upload
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    list: "semantic-mark-list",
    item: "semantic-mark-item",
    trigger: "semantic-mark-trigger"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-upload-wrapper css-var-test-id semantic-mark-root">
        <div class="ant-upload ant-upload-select semantic-mark-trigger">
          <span class="ant-upload">
            <input accept="" name="file" style="display: none;" type="file">
            <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
              <span class="ant-btn-icon">
                <span aria-label="upload" class="anticon anticon-upload" role="img">
                  <svg aria-hidden="true" data-icon="upload" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                  </svg>
                </span>
              </span>
              <span>
                Upload
              </span>
            </button>
          </span>
        </div>
        <div class="ant-upload-list ant-upload-list-text semantic-mark-list">
          <div class="ant-upload-list-item-container">
            <div class="ant-upload-list-item ant-upload-list-item-uploading semantic-mark-item">
              <div class="ant-upload-icon">
                <span aria-label="loading" class="anticon anticon-loading anticon-spin" role="img">
                  <svg aria-hidden="true" data-icon="loading" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                  </svg>
                </span>
              </div>
              <a class="ant-upload-list-item-name" href="http://www.baidu.com/xxx.png" rel="noopener noreferrer" target="_blank" title="xxx.png">
                xxx.png
              </a>
              <span class="ant-upload-list-item-actions">
                <button class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action" title="Remove file" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="delete" class="anticon anticon-delete" role="img" tabindex="-1">
                      <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
          <div class="ant-upload-list-item-container">
            <div class="ant-upload-list-item ant-upload-list-item-done semantic-mark-item">
              <div class="ant-upload-icon">
                <span aria-label="paper-clip" class="anticon anticon-paper-clip" role="img">
                  <svg aria-hidden="true" data-icon="paper-clip" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path>
                  </svg>
                </span>
              </div>
              <a class="ant-upload-list-item-name" href="http://www.baidu.com/yyy.png" rel="noopener noreferrer" target="_blank" title="yyy.png">
                yyy.png
              </a>
              <span class="ant-upload-list-item-actions">
                <button class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action" title="Remove file" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="delete" class="anticon anticon-delete" role="img" tabindex="-1">
                      <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
          <div class="ant-upload-list-item-container">
            <div class="ant-upload-list-item ant-upload-list-item-error semantic-mark-item">
              <div class="ant-upload-icon">
                <span aria-label="paper-clip" class="anticon anticon-paper-clip" role="img">
                  <svg aria-hidden="true" data-icon="paper-clip" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path>
                  </svg>
                </span>
              </div>
              <a class="ant-upload-list-item-name" href="http://www.baidu.com/zzz.png" rel="noopener noreferrer" target="_blank" title="zzz.png">
                zzz.png
              </a>
              <span class="ant-upload-list-item-actions">
                <button class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action" title="Remove file" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="delete" class="anticon anticon-delete" role="img" tabindex="-1">
                      <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </span>
```
