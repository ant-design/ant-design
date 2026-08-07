import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const publicPath = (...segments: string[]) => path.join(process.cwd(), 'public', ...segments);

const readPublicJson = <T = any>(...segments: string[]): T =>
  JSON.parse(fs.readFileSync(publicPath(...segments), 'utf8'));

const previewOrigin = 'https://preview.example';

const validateProtectedResourceFunction = async () => {
  const { onRequestGet } = await import('../functions/.well-known/oauth-protected-resource');
  const protectedResourceResponse = await onRequestGet({
    request: new Request(`${previewOrigin}/.well-known/oauth-protected-resource`),
  });

  assert.equal(protectedResourceResponse.headers.get('content-type'), 'application/json');

  const protectedResource = await protectedResourceResponse.json();
  assert.deepEqual(protectedResource.authorization_servers, [previewOrigin]);
  assert.deepEqual(protectedResource.scopes_supported, ['public:read']);
  assert.deepEqual(protectedResource.bearer_methods_supported, ['header']);
  assert.equal(protectedResource.resource, `${previewOrigin}/`);
  assert.equal(protectedResource.resource_name, 'Ant Design Documentation');
  assert.equal(protectedResource.resource_documentation, `${previewOrigin}/docs/react/introduce`);
};

const validateAuthorizationServerFunction = async () => {
  const { onRequestGet } = await import('../functions/.well-known/oauth-authorization-server');
  const authServerResponse = await onRequestGet({
    request: new Request(`${previewOrigin}/.well-known/oauth-authorization-server`),
  });

  assert.equal(authServerResponse.headers.get('content-type'), 'application/json');

  const metadata = await authServerResponse.json();
  assert.equal(metadata.issuer, previewOrigin);
  assert.equal(metadata.authorization_endpoint, `${previewOrigin}/auth.md`);
  assert.equal(metadata.token_endpoint, `${previewOrigin}/auth.md`);
  assert.equal(metadata.jwks_uri, `${previewOrigin}/.well-known/jwks.json`);
  assert.deepEqual(metadata.grant_types_supported, [
    'urn:ietf:params:oauth:grant-type:token-exchange',
  ]);
  assert.deepEqual(metadata.response_types_supported, ['none']);
  assert.deepEqual(metadata.scopes_supported, ['public:read']);
  assert.equal(metadata.agent_auth.skill, `${previewOrigin}/auth.md`);
  assert.equal(metadata.agent_auth.register_uri, `${previewOrigin}/auth.md`);
  assert.equal(metadata.agent_auth.claim_uri, `${previewOrigin}/auth.md`);
  assert.deepEqual(metadata.agent_auth.identity_types_supported, ['anonymous']);
  assert.deepEqual(metadata.agent_auth.anonymous.credential_types_supported, ['none']);
  assert.equal(metadata.agent_auth.anonymous.claim_uri, `${previewOrigin}/auth.md`);
};

const validateMarkdownMiddleware = async () => {
  const { onRequest } = await import('../functions/_middleware');
  const markdownResponse = await onRequest({
    request: new Request(`${previewOrigin}/`, {
      headers: {
        accept: 'text/markdown',
      },
    }),
    next: async () =>
      new Response('<!doctype html>', {
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      }),
  });

  assert.equal(markdownResponse.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.ok(markdownResponse.headers.get('x-markdown-tokens'));
  assert.match(await markdownResponse.text(), /^# Ant Design/m);

  const htmlResponse = await onRequest({
    request: new Request(`${previewOrigin}/`),
    next: async () =>
      new Response('<!doctype html>', {
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      }),
  });

  assert.equal(htmlResponse.headers.get('content-type'), 'text/html; charset=utf-8');
};

const headers = fs.readFileSync(publicPath('_headers'), 'utf8');
const originAgnosticFiles = [
  ['.well-known', 'agent-skills', 'index.json'],
  ['.well-known', 'api-catalog'],
  ['.well-known', 'api-catalog.json'],
  ['.well-known', 'jwks.json'],
  ['.well-known', 'mcp', 'server-card.json'],
  ['.well-known', 'openapi.json'],
  ['auth.md'],
];

for (const filePath of originAgnosticFiles) {
  assert.doesNotMatch(fs.readFileSync(publicPath(...filePath), 'utf8'), /https:\/\/ant\.design/);
}

assert.match(
  headers,
  /Link: <\/\.well-known\/api-catalog>; rel="api-catalog"; type="application\/linkset\+json"/,
);
assert.match(headers, /Link: <\/llms\.txt>; rel="service-doc"; type="text\/plain"/);
assert.match(headers, /Link: <\/llms-full\.txt>; rel="service-desc"; type="text\/plain"/);
assert.match(
  headers,
  /Link: <\/\.well-known\/agent-card\.json>; rel="describedby"; type="application\/json"/,
);

assert.equal(fs.existsSync(publicPath('.well-known', 'api-catalog')), true);

const catalog = readPublicJson('.well-known', 'api-catalog');
assert.ok(Array.isArray(catalog.linkset));

const rootEntry = catalog.linkset.find((entry: any) => entry.anchor === '/');
assert.ok(rootEntry);
assert.ok(
  rootEntry['service-desc']?.some(
    (link: any) =>
      link.href === '/.well-known/openapi.json' && link.type === 'application/openapi+json',
  ),
);
assert.ok(
  rootEntry['service-doc']?.some(
    (link: any) => link.href === '/docs/react/introduce' && link.type === 'text/html',
  ),
);
assert.ok(rootEntry.status?.some((link: any) => link.href === '/' && link.type === 'text/html'));

const authMd = fs.readFileSync(publicPath('auth.md'), 'utf8');
assert.match(authMd, /^# ant\.design auth\.md/m);
assert.match(authMd, /No OAuth-protected API is currently exposed by ant\.design\./);
assert.match(authMd, /Identity type: anonymous/);
assert.match(authMd, /Scope: `public:read`/);
assert.match(authMd, /Credential use: no bearer token is required/);

const serverCard = readPublicJson('.well-known', 'mcp', 'server-card.json');
assert.equal(serverCard.serverInfo.name, 'Ant Design Documentation');
assert.equal(serverCard.transport.type, 'webmcp');
assert.equal(serverCard.transport.endpoint, '/');
assert.equal(serverCard.capabilities.tools, true);

const main = async () => {
  await validateProtectedResourceFunction();
  await validateAuthorizationServerFunction();
  await validateMarkdownMiddleware();
};

main().catch((error) => {
  throw error;
});
