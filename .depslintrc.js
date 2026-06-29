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
      pattern: /ConfigContext.*renderEmpty/s,
      module: '../empty',
    },
    {
      pattern: /ConfigConsumer.*renderEmpty/s,
      module: '../empty',
    },
    {
      pattern: /config-provider\/context.*renderEmpty/s,
      module: '../empty',
    },
  ],
};
