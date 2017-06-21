import assign from 'object-assign';

export interface Store {
  setState: (partial: Object) => void;
  getState: () => any;
  subscribe: (listener: () => void) => () => void;
}

export default function createStore(initialState): Store {
  let state = initialState;
  const listeners: any[] = [];

  function setState(partial) {
    state = assign({}, state, partial);
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return {
    setState,
    getState,
    subscribe,
  };
}
