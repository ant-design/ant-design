import Radio from './radio';
import Group from './group';
import Button from './radioButton';

export * from './interface';

Radio.Button = Button;
Radio.Group = Group;
export { Button, Group };
export default Radio;
