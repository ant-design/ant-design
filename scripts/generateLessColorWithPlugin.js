const { presetPrimaryColors } = require('@ant-design/colors');

const colors = {
  ...presetPrimaryColors,
  pink: presetPrimaryColors.magenta,
};

const lessStr = Object.keys(colors)
  .sort()
  .map(color => {
    let baseColor = `@${color}-base: ${colors[color]};`;

    // Generate plugin color
    for (let i = 1; i <= 10; i += 1) {
      if (i !== 6) {
        baseColor += `\n@${color}-color-${i}: color-palette(@${color}-6, ${i});`;
      }
    }

    // Generate compatible color
    for (let i = 1; i <= 10; i += 1) {
      if (i === 6) {
        baseColor += `\n@${color}-${i}: @${color}-base;`;
      } else {
        baseColor += `\n@${color}-${i}: color(~'@{${color}-color-${i}}');`;
      }
    }

    return baseColor;
  })
  .join('\n\n');

console.log(lessStr);
