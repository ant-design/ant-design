import * as React from 'react';
export interface InputElementProps {
    children: React.ReactElement<any>;
}
export default class InputElement extends React.Component<InputElementProps, any> {
    private ele;
    focus: () => void;
    blur: () => void;
    saveRef: (ele: HTMLInputElement) => void;
    render(): React.ReactElement<any>;
}
