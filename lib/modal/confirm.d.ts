import { ModalFuncProps } from './Modal';
export default function confirm(config: ModalFuncProps): {
    destroy: (...args: any[]) => void;
    update: (newConfig: ModalFuncProps) => void;
};
