import { Ref } from 'react';
import { fillRef } from './ref';

/**
 * This is a helper function for when a component needs to be able to forward a ref
 * to a child component, but still needs to have access to that component as part of
 * its implementation.
 *
 * Its main use case is in wrappers for react-native components.
 *
 * @example
 *
 *   class MyView extends React.Component {
 *     _nativeRef = null;
 *
 *     _setNativeRef = setAndForwardRef({
 *       getForwardedRef: () => this.props.forwardedRef,
 *       setLocalRef: ref => {
 *         this._nativeRef = ref;
 *       },
 *     });
 *
 *     render() {
 *       return <View ref={this._setNativeRef} />;
 *     }
 *   }
 *
 *   const MyViewWithRef = React.forwardRef((props, ref) => (
 *     <MyView {...props} forwardedRef={ref} />
 *   ));
 *
 *   module.exports = MyViewWithRef;
 */

function setAndForwardRef({
  getForwardedRef,
  setLocalRef,
}: {
  getForwardedRef: () => Ref<any>;
  setLocalRef: (ref: Ref<any>) => void;
}) {
  return function forwardRef(ref: any) {
    const forwardedRef = getForwardedRef();

    setLocalRef(ref);

    fillRef(forwardedRef, ref);
  };
}

export default setAndForwardRef;
