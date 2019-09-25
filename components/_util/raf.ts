import raf from 'raf';

interface RafMap {
  [id: number]: number;
}

let id: number = 0;
const ids: RafMap = {};

// Support call raf with delay specified frame
export default function wrapperRaf(callback: () => void, delayFrames: number = 1): number {
  const myId: number = id++;
  let restFrames: number = delayFrames;

  function internalCallback() {
    restFrames -= 1;

    if (restFrames <= 0) {
      callback();
      delete ids[myId];
    } else {
      ids[myId] = raf(internalCallback);
    }
  }

  ids[myId] = raf(internalCallback);

  return myId;
}

wrapperRaf.cancel = function cancel(pid?: number) {
  if (pid === undefined) return;

  raf.cancel(ids[pid]);
  delete ids[pid];
};

wrapperRaf.ids = ids; // export this for test usage
