import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 's',
  text: 'Primary Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 's',
  text: 'Secondary Button',
  variant: 'secondary',
};

export const Destructive = Template.bind({});
Destructive.args = {
  size: 's',
  text: 'Destructive Button',
  variant: 'destructive',
};

export const Small = Template.bind({});
Small.args = {
  size: 's',
  text: 'Small Button',
  variant: 'primary',
};

export const Large = Template.bind({});
Large.args = {
  size: 'l',
  text: 'Large Button',
  variant: 'primary',
};

export const Loading = Template.bind({});
Loading.args = {
  size: 'l',
  variant: 'primary',
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'l',
  text: 'Disabled Button',
  variant: 'primary',
  disabled: true,
};
