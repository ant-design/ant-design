---
title: 📢 End of maintenance for v5
date: 2026-11-22
author: li-jia-nan
---

Ant Design v5 entered a one-year maintenance period when v6 was released. Under that plan, **regular maintenance for v5 is scheduled to conclude by the end of 2026**. After that, we’ll focus on v6 for new features and routine fixes. We may still release a v5 patch if a particularly serious issue arises.

If your project still uses v5, we recommend planning your upgrade soon. Start by updating to the latest v5 release, addressing deprecation warnings in the console, and confirming that your project runs on React 18 or later. If your project depends directly on `@ant-design/icons`, upgrade it to `@ant-design/icons@6` alongside `antd@6`.

v6 enables CSS variables by default and gives you more control over component styling. If your custom styles rely on a component's internal DOM structure, check those styles after upgrading. Thank you to everyone who contributed to v5 and shared feedback!

- [Migration guide from v5 to v6](/docs/react/migration-v6)
- [Ant Design v6 release announcement](https://github.com/ant-design/ant-design/issues/55804)
- [Report migration issues on GitHub](https://github.com/ant-design/ant-design/issues)
