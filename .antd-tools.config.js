const fs = require('fs');
const path = require('path');

// When style name length <= 5, we just ignore it since it's smaller.
const KEY_LIST = [
  'WebkitBackfaceVisibility',
  'WebkitBoxOrient',
  'WebkitLineClamp',
  'WebkitTapHighlightColor',
  'WebkitTransformStyle',
  'alignItems',
  'alignSelf',
  'animationDelay',
  'animationDirection',
  'animationDuration',
  'animationFillMode',
  'animationIterationCount',
  'animationName',
  'animationPlayState',
  'animationTimingFunction',
  'appearance',
  'background',
  'backgroundClip',
  'backgroundColor',
  'backgroundImage',
  'backgroundPosition',
  'backgroundRepeat',
  'backgroundSize',
  'border',
  'borderBlockEnd',
  'borderBlockEndColor',
  'borderBlockEndWidth',
  'borderBlockStart',
  'borderBlockStartColor',
  'borderBlockStartWidth',
  'borderBottom',
  'borderBottomColor',
  'borderBottomWidth',
  'borderCollapse',
  'borderColor',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderInlineEnd',
  'borderInlineEndColor',
  'borderInlineEndWidth',
  'borderInlineStart',
  'borderInlineStartColor',
  'borderInlineStartWidth',
  'borderLeft',
  'borderLeftColor',
  'borderRadius',
  'borderRight',
  'borderRightColor',
  'borderSpacing',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderStyle',
  'borderTop',
  'borderTopColor',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxShadow',
  'boxSizing',
  'columnGap',
  'container',
  'content',
  'cursor',
  'direction',
  'display',
  'filter',
  'flexBasis',
  'flexDirection',
  'flexFlow',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'fontFamily',
  'fontSize',
  'fontStretch',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'height',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'justifyContent',
  'justifyItems',
  'letterSpacing',
  'lineHeight',
  'listStyle',
  'listStylePosition',
  'listStyleType',
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'objectFit',
  'opacity',
  'outline',
  'outlineColor',
  'overflow',
  'overflowWrap',
  'overflowX',
  'overflowY',
  'padding',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'pointerEvents',
  'position',
  'resize',
  'rowGap',
  'stroke',
  'tabSize',
  'tableLayout',
  'textAlign',
  'textDecoration',
  'textDecorationSkipInk',
  'textIndent',
  'textOverflow',
  'textRendering',
  'textShadow',
  'textTransform',
  'touchAction',
  'transform',
  'transformOrigin',
  'transition',
  'transitionDuration',
  'transitionTimingFunction',
  'userSelect',
  'verticalAlign',
  'visibility',
  'whiteSpace',
  'width',
  'willChange',
  'wordBreak',
  'wordWrap',
  'writingMode',
  'zIndex',
];

// =================================================================
// ==                            Style                            ==
// =================================================================
const restCssPath = path.join(process.cwd(), 'components', 'style', 'reset.css');
const tokenStatisticPath = path.join(process.cwd(), 'components', 'version', 'token.json');
const tokenMetaPath = path.join(process.cwd(), 'components', 'version', 'token-meta.json');

function finalizeCompile() {
  if (fs.existsSync(path.join(__dirname, './es'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'es', 'style', 'reset.css'));
    fs.copyFileSync(tokenStatisticPath, path.join(process.cwd(), 'es', 'version', 'token.json'));
    fs.copyFileSync(tokenMetaPath, path.join(process.cwd(), 'es', 'version', 'token-meta.json'));
  }

  if (fs.existsSync(path.join(__dirname, './lib'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'lib', 'style', 'reset.css'));
    fs.copyFileSync(tokenStatisticPath, path.join(process.cwd(), 'lib', 'version', 'token.json'));
    fs.copyFileSync(tokenMetaPath, path.join(process.cwd(), 'lib', 'version', 'token-meta.json'));
  }
}

function finalizeDist() {
  if (fs.existsSync(path.join(__dirname, './dist'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'dist', 'reset.css'));
  }
}

// =================================================================
// ==                         Mini Bundle                         ==
// =================================================================
const sheet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const styleMap = {};
KEY_LIST.forEach((key, index) => {
  const id =
    (index >= sheet.length ? sheet[Math.floor(index / sheet.length) - 1] : '') +
    sheet[index % sheet.length];

  styleMap[key] = id;
});

// Convert `style/xxx.ts` file to hashed map to min bundle size
function transformTSFile(file) {
  if (!/components\/[^/]+\/style/.test(file.path)) {
    return;
  }

  const cloneFile = file.clone();

  // Replacement
  let matched = false;
  const lines = file.contents.toString().split('\n');
  const parsedLines = lines.map((line) => {
    let newLine = line;
    KEY_LIST.forEach((key) => {
      const keyMatch = ` ${key}: `;
      if (newLine.includes(keyMatch)) {
        matched = true;
        newLine = newLine.replace(keyMatch, ` [r.${styleMap[key]}]: `);
      }
    });

    return newLine;
  });

  if (matched) {
    const content = [`import r from '../../style/sheet';`, ...parsedLines].join('\n');
    if (file.path.includes('/alert/')) {
      console.log(content);
    }
    cloneFile.contents = Buffer.from(content);
    return cloneFile;
  }
}

module.exports = {
  compile: {
    finalize: finalizeCompile,
    transformTSFile,
  },
  dist: {
    finalize: finalizeDist,
  },

  bail: true,
};
