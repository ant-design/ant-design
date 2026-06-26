const createProtectedResourceMetadata = (origin: string) => ({
  resource: `${origin}/`,
  resource_name: 'Ant Design Documentation',
  resource_documentation: `${origin}/docs/react/introduce`,
  authorization_servers: [origin],
  scopes_supported: ['public:read'],
  bearer_methods_supported: ['header'],
});

export const onRequestGet = ({ request }: { request: Request }) => {
  const { origin } = new URL(request.url);

  return Response.json(createProtectedResourceMetadata(origin));
};
