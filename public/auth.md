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
