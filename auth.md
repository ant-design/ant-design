# ant.design auth.md

Ant Design publishes public documentation, design resources, and agent discovery metadata from the current site origin.

No OAuth-protected API is currently exposed by ant.design. Agents can access the public documentation, API catalog, MCP server card, and Agent Skills index without registration or bearer credentials.

## Discovery

- API catalog: `/.well-known/api-catalog`
- OAuth protected resource metadata: `/.well-known/oauth-protected-resource`
- Agent skills index: `/.well-known/agent-skills/index.json`
- MCP server card: `/.well-known/mcp/server-card.json`

## Registration

No agent registration endpoint is required for the current public documentation surface.

- Audience: AI agents and crawlers that read Ant Design public documentation.
- Method: anonymous public access.
- Identity type: anonymous.
- Scope: `public:read` for public documentation and discovery metadata.
- Registration URI: `/auth.md`.
- Claim URI: `/auth.md`.
- Credential type: none.
- Credential use: no bearer token is required for public documentation and discovery metadata.
- Provisioning endpoint: none. Agents can access public documentation directly.
