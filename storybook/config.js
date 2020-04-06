const { withKnobs } = require('@storybook/addon-knobs');
const { addDecorator } = require('@storybook/react');

addDecorator(withKnobs);
