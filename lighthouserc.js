module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      startServerCommand: 'npm run site',
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.1 }],
        'categories:accessibility': ['error', { minScore: 0.6 }],
        'categories:best-practices': ['error', { minScore: 0.6 }],
        'categories:seo': ['error', { minScore: 0.6 }],
      },
    },
  },
};
