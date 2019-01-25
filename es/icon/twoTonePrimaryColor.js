import ReactIcon from '@ant-design/icons-react';
export function setTwoToneColor(primaryColor) {
  return ReactIcon.setTwoToneColors({
    primaryColor: primaryColor
  });
}
export function getTwoToneColor() {
  var colors = ReactIcon.getTwoToneColors();
  return colors.primaryColor;
}