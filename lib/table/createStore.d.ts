export interface Store {
    setState: (partial: Object) => void;
    getState: () => any;
    subscribe: (listener: () => void) => () => void;
}
export default function createStore(initialState: object): Store;
