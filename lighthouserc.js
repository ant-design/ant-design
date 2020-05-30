module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: ['http://localhost/', 'http://localhost/components/button/'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};
