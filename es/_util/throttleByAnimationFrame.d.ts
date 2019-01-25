export default function throttleByAnimationFrame(fn: (...args: any[]) => void): (...args: any[]) => void;
export declare function throttleByAnimationFrameDecorator(): (target: any, key: string, descriptor: any) => {
    configurable: boolean;
    get(): any;
};
