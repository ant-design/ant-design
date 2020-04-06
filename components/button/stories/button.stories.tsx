import React from 'react';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';
import Button from '../button';
import './button.stories.css';
import '../style';

storiesOf('button', module).add('Native button', () => {
  const buttonText = text('buttonText', 'Button');

  const buttonSize = select(
    'buttonSize',
    {
      small: 'small',
      large: 'large',
      unset: undefined,
    },
    undefined,
  );

  const buttonType = select(
    'buttonType',
    {
      primary: 'primary',
      default: 'default',
      dashed: 'dashed',
      link: 'link',
    },
    'default',
  );

  const buttonShape = select(
    'buttonShape',
    {
      circle: 'circle',
      round: 'round',
      unset: undefined,
    },
    undefined,
  );

  const isDisabled = boolean('isDisabled', false);

  const isLoading = boolean('isLoading', false);

  const isGhost = boolean('isGhost', false);

  const isDanger = boolean('isDanger', false);

  const isBlock = boolean('isBlock', false);

  const showBackground = boolean('_storybook_.showBackground', false);

  return (
    <div
      className={classnames('container', {
        stripe: showBackground,
      })}
    >
      <Button
        size={buttonSize}
        shape={buttonShape}
        onClick={action('button clicked')}
        type={buttonType}
        disabled={isDisabled}
        loading={isLoading}
        ghost={isGhost}
        danger={isDanger}
        block={isBlock}
      >
        {buttonText}
      </Button>
    </div>
  );
});
