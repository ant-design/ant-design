const defaultTheme = require('../dist/default-theme');
const darkTheme = require('../dist/dark-theme');
const compactTheme = require('../dist/compact-theme');
const { getThemeVariables } = require('../dist/theme');

const expectThemeWithoutDark = theme => {
  expect(theme['blue-3']).toBe("color(~`colorPalette('@{blue-6}', 3) `)");
  expect(theme['body-background']).toBe('#fff');
};

const expectDarkTheme = theme => {
  expect(theme['blue-3']).toBe('mix(@blue-base, @component-background, 30%)');
  expect(theme['body-background']).toBe('@black');
};

const expectThemeWithoutCompact = theme => {
  expect(theme['padding-lg']).toBe('24px');
  expect(theme['padding-md']).toBe('16px');
};

const expectCompactTheme = theme => {
  expect(theme['padding-lg']).toBe('16px');
  expect(theme['padding-md']).toBe('8px');
};

describe('theme variables', () => {
  it('should be get default theme', () => {
    expectThemeWithoutDark(defaultTheme);
    expectThemeWithoutCompact(defaultTheme);
  });

  it('should be get dark theme', () => {
    expectDarkTheme(darkTheme);
    expectThemeWithoutCompact(darkTheme);
  });

  it('should be get compact theme', () => {
    expectCompactTheme(compactTheme);
    expectThemeWithoutDark(compactTheme);
  });

  it('shoule get default variables by getThemeVariables()', () => {
    const theme = getThemeVariables();
    expectThemeWithoutCompact(theme);
    expectThemeWithoutDark(theme);
  });

  it('shoule get dark variables by getThemeVariables({ dark: true })', () => {
    const theme = getThemeVariables({ dark: true });
    expectDarkTheme(theme);
    expectThemeWithoutCompact(theme);
  });

  it('shoule get compact variables by getThemeVariables({ compact: true })', () => {
    const theme = getThemeVariables({ compact: true });
    expectThemeWithoutDark(theme);
    expectCompactTheme(theme);
  });

  it('shoule get compact&dark variables by getThemeVariables({ compact: true, dark: true })', () => {
    const theme = getThemeVariables({ compact: true, dark: true });
    expectDarkTheme(theme);
    expectCompactTheme(theme);
  });
});
