module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: [
        'http://localhost/',
        'http://localhost/index-cn',
        'http://localhost/docs/react/intruduce',
        'http://localhost/docs/react/intruduce-cn',
        'http://localhost/components/button/',
        'http://localhost/components/button-cn/',
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};
