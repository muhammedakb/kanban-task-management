import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ThemeSelector from '../components/ThemeSelector';

export default {
  title: 'Board',
  component: ThemeSelector,
} as ComponentMeta<typeof ThemeSelector>;

const Template: ComponentStory<typeof ThemeSelector> = (args) => (
  <ThemeSelector {...args} />
);

export const DarkLightTheme = Template.bind({});
