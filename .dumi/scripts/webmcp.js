(() => {
  if (!('modelContext' in navigator)) {
    return;
  }
  const mc = navigator.modelContext;

  const controller = new AbortController();

  mc.registerTool(
    {
      name: 'search-antd-docs',
      description: 'Search Ant Design component documentation and return relevant results.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query for Ant Design documentation.',
          },
        },
        required: ['query'],
      },
    },
    (input) => ({
      content: [
        {
          type: 'text',
          text: `Search Ant Design docs at: https://ant.design/components/overview. Query: ${input.query}`,
        },
      ],
    }),
    { signal: controller.signal },
  );
})();
