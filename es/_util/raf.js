import raf from 'raf';
var id = 0;
var ids = {}; // Support call raf with delay specified frame

export default function wrapperRaf(callback) {
  var delayFrames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var myId = id++;
  var restFrames = delayFrames;

  function internalCallback() {
    restFrames -= 1;

    if (restFrames <= 0) {
      callback();
      delete ids[id];
    } else {
      ids[id] = raf(internalCallback);
    }
  }

  ids[id] = raf(internalCallback);
  return myId;
}

wrapperRaf.cancel = function (pid) {
  raf.cancel(ids[pid]);
  delete ids[pid];
};