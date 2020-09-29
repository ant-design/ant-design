import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';

export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
  MockDate.set(dateString);
}

export function resetMockDate() {
  MockDate.reset();
}

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => globalTimeout(resolve, timeout));
  });
};

/** Only use when you are calling render out of enzyme wrapper */
export const getDomFiberNodeProps = (element: HTMLElement, displayName?: string) => {
  const keys = Object.keys(element);
  let fiberNode;

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key.startsWith('__reactInternalInstance')) {
      fiberNode = (element as any)[key];
      break;
    }
  }

  while (fiberNode && displayName) {
    if (fiberNode?.elementType?.displayName === displayName) {
      break;
    }

    fiberNode = fiberNode.return;
  }

  if (!fiberNode) {
    console.log('Fiber Not Found:', element);
    throw new Error('Fiber Not Found!');
  }

  return fiberNode.memoizedProps;
};
