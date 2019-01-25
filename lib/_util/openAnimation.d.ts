declare const animation: {
    enter(node: HTMLElement, done: () => void): any;
    leave(node: HTMLElement, done: () => void): any;
    appear(node: HTMLElement, done: () => void): any;
};
export default animation;
