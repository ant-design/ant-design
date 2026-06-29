import type { IApi, IRoute } from 'dumi';

const resolve = (p: string): string => require.resolve(p);

export default function routesPlugin(api: IApi) {
  api.modifyRoutes((routes) => {
    // TODO: append extra routes, such as home, changelog, form-v3

    /**
     * **important!** Make sure that the `id` and `path` are consistent.
     * see: https://github.com/ant-design/ant-design/issues/55960
     */
    const extraRoutesList: IRoute[] = [
      {
        id: 'changelog',
        path: 'changelog',
        absPath: '/changelog',
        parentId: 'DocLayout',
        file: resolve('../../../CHANGELOG.en-US.md'),
      },
      {
        id: 'changelog-cn',
        path: 'changelog-cn',
        absPath: '/changelog-cn',
        parentId: 'DocLayout',
        file: resolve('../../../CHANGELOG.zh-CN.md'),
      },
      {
        id: 'components/changelog',
        path: 'components/changelog',
        absPath: '/components/changelog',
        parentId: 'DocLayout',
        file: resolve('../../../CHANGELOG.en-US.md'),
      },
      {
        id: 'components/changelog-cn',
        path: 'components/changelog-cn',
        absPath: '/components/changelog-cn',
        parentId: 'DocLayout',
        file: resolve('../../../CHANGELOG.zh-CN.md'),
      },
    ];

    extraRoutesList.forEach((itemRoute) => {
      routes[itemRoute.path] = itemRoute;
    });

    return routes;
  });
}
