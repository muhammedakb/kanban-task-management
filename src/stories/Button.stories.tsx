import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'small',
  text: 'Primary Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 'small',
  text: 'Secondary Button',
  variant: 'secondary',
};

export const Destructive = Template.bind({});
Destructive.args = {
  size: 'small',
  text: 'Destructive Button',
  variant: 'destructive',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  text: 'Small Button',
  variant: 'primary',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  text: 'Large Button',
  variant: 'primary',
};

export const Loading = Template.bind({});
Loading.args = {
  size: 'large',
  variant: 'primary',
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'large',
  text: 'Disabled Button',
  variant: 'primary',
  disabled: true,
};
