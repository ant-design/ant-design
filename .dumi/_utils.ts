import { simpleGit } from 'simple-git';
// @ts-ignore
import envInfo from 'envinfo';

const git = simpleGit({ baseDir: process.cwd() });
const getLatestCommit = () =>
  git
    .log()
    .then(({ latest }) => latest)
    .then((res) => res?.hash);
const getEnvInfo = async () => {
  const nodeVersion = await envInfo.helpers
    .getNodeInfo()
    .then((res: any) => (Array.isArray(res) ? res.slice(0, 2).join(' v') : res));

  const npmVersion = await envInfo.helpers
    .getnpmInfo()
    .then((res: any) => (Array.isArray(res) ? res.slice(0, 2).join(' v') : res));

  const dumiVersion = await envInfo.helpers.getnpmPackages('dumi').then((res: any) =>
    Array.isArray(res)
      ? Object.entries(res[1])
          .map(([key, value]: any) => `${key}@${value?.installed}`)
          .join(', ')
      : Promise.reject(res),
  );

  return Promise.allSettled([nodeVersion, npmVersion, dumiVersion]).then((values) =>
    values
      .reduce<any>((acc, cur) => {
        if (cur.status === 'fulfilled') {
          acc.push(cur.value);
        }
        return acc;
      }, [])
      .join(', '),
  );
};

// eslint-disable-next-line import/prefer-default-export
export async function getBuildInfo() {
  const info = await Promise.allSettled([
    getLatestCommit().then((res) => ({ 'build-hash': res })),
    getEnvInfo().then((res) => ({ 'build-env': res })),
  ]).then((values) =>
    values.reduce<any>(
      (acc, cur) => (cur.status === 'fulfilled' ? { ...acc, ...cur.value } : acc),
      {
        'build-time': new Date().toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai',
          hour12: false,
        }),
      },
    ),
  );

  return Object.entries(info).map(([key, value]) => ({ name: key, content: value }));
}
