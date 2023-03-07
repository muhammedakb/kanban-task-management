import { ComponentMeta, ComponentStory } from '@storybook/react';
import BoardItem from '../components/BoardItem';

export default {
  title: 'BoardItem',
  component: BoardItem,
} as ComponentMeta<typeof BoardItem>;

const Template: ComponentStory<typeof BoardItem> = (args) => (
  <BoardItem {...args} />
);

export const Item = Template.bind({});
Item.args = {
  completedSubTasks: 0,
  subTasks: 3,
  taskTitle: 'Build UI for onboarding flow',
};
