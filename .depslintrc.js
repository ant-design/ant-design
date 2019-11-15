module.exports = {
  ignore: [
    '**/~*/**',
    '**/_*/**',
    '**/icon/**',
    '**/__tests__/**',
    '**/style/**',
    '**/locale/**',
    '**/*-provider/**',
    '**/*.json',
  ],
  modulePattern: [
    {
      pattern: /ConfigConsumer.*renderEmpty/ms,
      module: '../empty',
    },
    {
      pattern: /config-provider\/context.*renderEmpty/ms,
      module: '../empty',
    },
  ],
};
