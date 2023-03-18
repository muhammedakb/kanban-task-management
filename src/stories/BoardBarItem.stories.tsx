import type { ComponentMeta, ComponentStory } from '@storybook/react';

import BoardBarItem from '../components/BoardBarItem';

export default {
  title: 'Board',
  component: BoardBarItem,
} as ComponentMeta<typeof BoardBarItem>;

const Template: ComponentStory<typeof BoardBarItem> = () => (
  <BoardBarItem onClick={() => console.log('clicked')} text="Platform Launch" />
);

export const BarItem = Template.bind({});
