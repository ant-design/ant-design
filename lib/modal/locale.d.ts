export interface ModalLocale {
    okText: string;
    cancelText: string;
    justOkText: string;
}
export declare function changeConfirmLocale(newLocale?: ModalLocale): void;
export declare function getConfirmLocale(): ModalLocale;
