import ReactIcon from '@ant-design/icons-react';

export function setTwoToneColor(primaryColor: string): void {
  return ReactIcon.setTwoToneColors({
    primaryColor,
  });
}

export function getTwoToneColor(): string {
  const colors = ReactIcon.getTwoToneColors();
  return colors.primaryColor;
}
