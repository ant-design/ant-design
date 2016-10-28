// Extract Trigger handlers from props
export default function getTriggerHandlers(props) {
  return {
    onClick: props.onClick,
    onMouseDown: props.onMouseDown,
    onTouchStart: props.onTouchStart,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  };
}
