module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: ['http://localhost:8001/', 'http://localhost:8001/components/button/'],
      startServerCommand: 'npm run start',
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
