import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const publicPath = (...segments: string[]) => path.join(process.cwd(), 'public', ...segments);

const readPublicJson = <T = any>(...segments: string[]): T =>
  JSON.parse(fs.readFileSync(publicPath(...segments), 'utf8'));

const headers = fs.readFileSync(publicPath('_headers'), 'utf8');
const originAgnosticFiles = [
  ['.well-known', 'agent-skills', 'index.json'],
  ['.well-known', 'api-catalog'],
  ['.well-known', 'api-catalog.json'],
  ['.well-known', 'mcp', 'server-card.json'],
  ['.well-known', 'oauth-protected-resource'],
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

const protectedResource = readPublicJson('.well-known', 'oauth-protected-resource');
assert.deepEqual(protectedResource.authorization_servers, []);
assert.deepEqual(protectedResource.scopes_supported, []);
assert.deepEqual(protectedResource.bearer_methods_supported, []);
assert.equal(protectedResource.resource, '/');
assert.equal(protectedResource.resource_name, 'Ant Design Documentation');

const authMd = fs.readFileSync(publicPath('auth.md'), 'utf8');
assert.match(authMd, /^# ant\.design auth\.md/m);
assert.match(authMd, /No OAuth-protected API is currently exposed by ant\.design\./);

const serverCard = readPublicJson('.well-known', 'mcp', 'server-card.json');
assert.equal(serverCard.serverInfo.name, 'Ant Design Documentation');
assert.equal(serverCard.transport.type, 'webmcp');
assert.equal(serverCard.transport.endpoint, '/');
assert.equal(serverCard.capabilities.tools, true);
