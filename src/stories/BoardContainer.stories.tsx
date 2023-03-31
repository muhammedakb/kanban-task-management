import type { ComponentMeta, ComponentStory } from '@storybook/react';

import dummyData from '../../data/data.json';
import BoardColumn from '../components/BoardColumn';
import BoardContainer from '../components/BoardContainer';

export default {
  title: 'Board',
  component: BoardContainer,
} as ComponentMeta<typeof BoardContainer>;

const Template: ComponentStory<typeof BoardContainer> = () => (
  <BoardContainer>
    {dummyData.boards
      .filter((board) => board.name === 'Platform Launch')[0]
      .columns.map((column) => (
        <BoardColumn
          key={column.name}
          categoryTitleColor=""
          columnData={column}
          onItemClick={(item) => console.log('ITEM', item)}
        />
      ))}
  </BoardContainer>
);
export const Container = Template.bind({});
