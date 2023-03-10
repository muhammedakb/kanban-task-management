import { ComponentMeta, ComponentStory } from '@storybook/react';
import BoardCategoryTitle from '../components/BoardCategoryTitle';

export default {
  title: 'Board Category Title',
  component: BoardCategoryTitle,
} as ComponentMeta<typeof BoardCategoryTitle>;

const Template: ComponentStory<typeof BoardCategoryTitle> = (args) => (
  <BoardCategoryTitle {...args} />
);

export const CategoryTitle = Template.bind({});
CategoryTitle.args = {
  color: '#49C4E5',
  piece: 4,
  text: 'TODO',
};
