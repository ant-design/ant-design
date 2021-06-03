import React, { useState, useRef, FunctionComponent, useEffect, DependencyList, FC } from 'react';

export type ToggleComponentReturnType<Props> = {
  showComponent: (props: Props) => void;
  hideComponent: () => void;
  isShow: boolean;
  Component: FC;
};
/**
 * 控制组件是否show，和常规的在组件里声明一个isShow状态相比，这个hooks可以将一个jsx(React.Element) 包装成一个组件，同时可以通过showComponent方法传递props进来。
 *
 * @param Component 渲染的组件，常用的可能就是modal
 * @param dependency 当组件内部引用到外部的状态时，要把外部状态填到依赖里，注意依赖更新时，会reMount组件，重新执行生命周期。基本上用不到这个参数
 */
function useToggleComponent<Props = any>(
  Component: FunctionComponent<Props>,
  dependency: DependencyList = [],
): ToggleComponentReturnType<Props> {
  const [show, setShow] = useState<boolean>(false);
  const [ClonedComponent, setClonedComponent] = useState<React.FunctionComponent>(() => () => null);
  const cachedPropsRef = useRef<Props>();
  const showComponent = (props: Props) => {
    setShow(true);
    cachedPropsRef.current = props;
    setClonedComponent(() => () => <Component {...props} />);
  };
  const hideComponent = () => {
    setShow(false);
    setClonedComponent(() => () => null);
  };
  useEffect(() => {
    if (show) {
      setClonedComponent(() => () => <Component {...cachedPropsRef.current!} />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);
  return {
    showComponent,
    hideComponent,
    isShow: show,
    Component: ClonedComponent,
  };
}
export default useToggleComponent;
