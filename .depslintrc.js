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
      pattern: /ConfigConsumer.*renderEmpty/sm,
      module: '../empty',
    },
  ],
};