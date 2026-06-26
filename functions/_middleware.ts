const homepageMarkdown = `# Ant Design

Ant Design is a React UI library for building enterprise-class web applications.

## Agent resources

- API catalog: [/.well-known/api-catalog](/.well-known/api-catalog)
- OpenAPI description: [/.well-known/openapi.json](/.well-known/openapi.json)
- Documentation: [/docs/react/introduce](/docs/react/introduce)
- LLM documentation: [/llms-full.txt](/llms-full.txt)
- Agent skills index: [/.well-known/agent-skills/index.json](/.well-known/agent-skills/index.json)
- MCP server card: [/.well-known/mcp/server-card.json](/.well-known/mcp/server-card.json)
- Auth metadata: [/auth.md](/auth.md)
`;

const markdownTokenCount = String(homepageMarkdown.trim().split(/\s+/).length);

const acceptsMarkdown = (request: Request) =>
  request.headers
    .get('accept')
    ?.split(',')
    .some((value) => value.trim().toLowerCase().startsWith('text/markdown')) ?? false;

export const onRequest = ({
  request,
  next,
}: {
  request: Request;
  next: () => Promise<Response>;
}) => {
  const { pathname } = new URL(request.url);

  if (pathname === '/' && acceptsMarkdown(request)) {
    return new Response(homepageMarkdown, {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': markdownTokenCount,
      },
    });
  }

  return next();
};
