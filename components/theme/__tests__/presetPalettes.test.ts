import {
  generate,
  presetDarkPalettes,
  presetPalettes,
  presetPrimaryColors,
} from '@ant-design/colors';

describe('preset palettes', () => {
  it('match `generate` for each preset primary color', () => {
    Object.keys(presetDarkPalettes).forEach((colorKey) => {
      const color = presetPrimaryColors[colorKey];
      expect(generate(color)).toEqual([...presetPalettes[colorKey]]);
      expect(generate(color.toLowerCase())).toEqual([...presetPalettes[colorKey]]);
      expect(generate(color, { theme: 'dark' })).toEqual([...presetDarkPalettes[colorKey]]);
    });
  });

  it('load the dark algorithm after the default algorithm has run', async () => {
    jest.resetModules();
    const defaultAlgorithm = (await import('../themes/default')).default;
    const seedToken = (await import('../themes/seed')).default;
    defaultAlgorithm(seedToken);

    const darkAlgorithm = (await import('../themes/dark')).default;
    const darkToken = darkAlgorithm(seedToken, defaultAlgorithm(seedToken));
    expect(darkToken.blue6).toBe(presetDarkPalettes.blue[5]);
    expect(darkToken.magenta6).toBe(presetDarkPalettes.magenta[5]);
  });
});
