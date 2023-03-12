import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Switch from '../components/Switch';

export default {
  title: 'Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const SwitchButton = Template.bind({});
