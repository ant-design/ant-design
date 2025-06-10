import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

const gray: { [key: number]: string } = {
  1: '#fff',
  2: '#fafafa',
  3: '#f5f5f5',
  4: '#f0f0f0',
  5: '#d9d9d9',
  6: '#bfbfbf',
  7: '#8c8c8c',
  8: '#595959',
  9: '#434343',
  10: '#262626',
  11: '#1f1f1f',
  12: '#141414',
  13: '#000',
};

const ColorStyle: React.FC = () => {
  const token = useTheme();

  const makePalette = (color: string, index = 1): string => {
    if (index <= 10) {
      return `
.palette-${color}-${index} {
  background: ${(token as any)[`${color}-${index}`]};
}
${makePalette(color, index + 1)}
    `;
    }
    return '';
  };

  const makeGrayPalette = (index = 1): string => {
    if (index <= 13) {
      return `
.palette-gray-${index} {
  background: ${gray[index]};
}
${makeGrayPalette(index + 1)}
    `;
    }
    return '';
  };

  return (
    <Global
      styles={css`
        .color-palettes {
          margin: 0 1%;

          &-dark {
            margin: 0;
            padding: 0 28px;
            background-color: #141414;

            .color-title {
              color: rgba(255, 255, 255, 0.85);
            }

            .color-description {
              color: rgba(255, 255, 255, 0.45);
            }

            .color-palette {
              margin: 45px 3.5% 45px 0;

              &:nth-of-type(3n) {
                margin-inline-end: 0;
              }

              .main-color-item {
                margin-inline-end: 0;

                &:hover {
                  margin-inline-end: -${token.paddingXS}px;
                }
              }
            }
          }
        }

        .color-palette {
          display: inline-block;
          width: 31%;
          margin: 45px 1%;

          &-pick {
            margin: 0 0 ${token.marginMD}px;
            font-size: ${token.fontSizeXL}px;
            text-align: center;
          }

          &-picker {
            margin: ${token.marginLG}px 0;

            &-value {
              position: relative;
              top: -3px;
              margin-inline-start: ${token.margin}px;
              font-size: ${token.fontSize}px;
              font-family: Consolas, sans-serif;
              .ant-row-rtl & {
                margin-inline-end: ${token.margin}px;
                margin-inline-start: 0;
              }
            }

            &-validation {
              position: relative;
              top: -3px;
              margin-inline-start: ${token.margin}px;
              color: ${token.colorError};
              font-size: ${token.fontSize}px;

              .ant-row-rtl & {
                margin-inline-end: ${token.margin}px;
                margin-inline-start: 0;
              }

              &-dark {
                margin-inline-start: 0;
              }
            }
          }
        }

        .main-color {
          ${makePalette('blue')}
          ${makePalette('purple')}
          ${makePalette('cyan')}
          ${makePalette('green')}
          ${makePalette('magenta')}
          ${makePalette('red')}
          ${makePalette('volcano')}
          ${makePalette('orange')}
          ${makePalette('gold')}
          ${makePalette('yellow')}
          ${makePalette('lime')}
          ${makePalette('geekblue')}
          ${makeGrayPalette()}

  text-align: left;

          &-item {
            position: relative;
            height: 44px;
            margin-inline-end: ${token.marginXXS}px;
            padding: 0 ${token.paddingSM}px;
            font-size: ${token.fontSize}px;
            font-family: Consolas, sans-serif;
            line-height: 44px;
            cursor: pointer;
            transition: all ${token.motionDurationMid};

            &:first-child {
              border-radius: ${token.borderRadiusSM}px ${token.borderRadiusSM}px 0 0;
            }

            &:last-child {
              border-radius: 0 0 ${token.borderRadiusSM}px ${token.borderRadiusSM}px;
            }

            &:hover {
              margin-inline-end: -${token.marginXS}px;
              border-radius: 0 ${token.borderRadiusSM}px ${token.borderRadiusSM}px 0;
            }
          }

          &-item &-text {
            float: left;
            transition: all ${token.motionDurationSlow};
          }

          &-item &-value {
            position: relative;
            inset-inline-start: ${token.marginXXS}px;
            float: right;
            transform: scale(0.85);
            transform-origin: 100% 50%;
            opacity: 0;
            transition: all ${token.motionDurationSlow};
          }
        }

        .color-title {
          margin: 0 0 ${token.marginLG}px;
          color: #5c6b77;
          font-weight: 500;
          font-size: 22px;
          text-align: center;
          text-transform: capitalize;
        }

        .color-description {
          display: block;
          color: #777;
          font-weight: lighter;
          font-size: ${token.fontSize}px;
        }

        .main-color:hover {
          .main-color-value {
            inset-inline-start: 0;
            opacity: 0.7;
          }
        }

        .color-palette-horizontal {
          box-sizing: border-box;
          width: 100%;

          &-dark {
            height: 303px;
            padding: ${token.paddingXL}px ${token.paddingXL - 4}px;
            background-color: #141414;

            .color-palette-picker {
              margin-bottom: 0;
            }

            .color-palette-pick {
              color: rgba(255, 255, 255, 0.65);
              text-align: left;

              &-hex {
                color: rgba(255, 255, 255, 0.65);
              }

              .ant-row-rtl & {
                direction: rtl;
                text-align: right;
              }
            }
          }

          .main-color {
            display: flex;

            &-item {
              position: relative;
              flex: 1;
              box-sizing: border-box;
              height: 86px;
              margin-inline-end: 0;
              padding: 37px 0 0;
              line-height: normal;
              text-align: center;
              border-radius: 0;

              .main-color-text {
                float: none;
              }

              &:hover {
                height: 96px;
                margin-top: -10px;
                border-radius: ${token.borderRadiusSM}px ${token.borderRadiusSM}px 0 0;
              }
            }

            &-value {
              position: absolute;
              bottom: 0;
              inset-inline-start: 0;
              width: 100%;
              text-align: center;
              transform-origin: unset;
            }

            &:hover {
              .main-color-item {
                padding-top: ${token.paddingXS}px;
              }

              .main-color-value {
                bottom: 8px;
                opacity: 0.7;
              }
            }
          }
        }
      `}
    />
  );
};

export default ColorStyle;
