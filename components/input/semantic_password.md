## Input.Password

### Semantic Parts

- root（`semantic-mark-root`）: root element
- input（`semantic-mark-input`）: input element
- prefix（`semantic-mark-prefix`）: prefix element
- suffix（`semantic-mark-suffix`）: suffix element
- count（`semantic-mark-count`）: count element

### Usage Example

```tsx
<Input.Password
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-outlined ant-input-password css-var-test-id ant-input-css-var semantic-mark-root">
        <span class="ant-input-prefix semantic-mark-prefix">
          <span aria-label="user" class="anticon anticon-user" role="img">
            <svg aria-hidden="true" data-icon="user" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
            </svg>
          </span>
        </span>
        <input class="ant-input semantic-mark-input" type="password" value="Hello, Ant Design">
        <span class="ant-input-suffix semantic-mark-suffix">
          <span class="ant-input-show-count-suffix ant-input-show-count-has-suffix semantic-mark-count">
            17
          </span>
          <span aria-label="eye-invisible" class="anticon anticon-eye-invisible ant-input-password-icon" role="img" tabindex="-1">
            <svg aria-hidden="true" data-icon="eye-invisible" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
              <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
            </svg>
          </span>
          <span aria-label="edit" class="anticon anticon-edit" role="img">
            <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
            </svg>
          </span>
        </span>
      </span>
```
