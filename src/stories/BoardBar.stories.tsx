import type { ComponentMeta, ComponentStory } from '@storybook/react';

import BoardBar from '../components/BoardBar';

export default {
  title: 'Board',
  component: BoardBar,
} as ComponentMeta<typeof BoardBar>;

const Template: ComponentStory<typeof BoardBar> = () => (
  <BoardBar
    boardItems={[
      { text: 'Platform Launch', onClick: () => {} },
      { text: 'Marketing Plan', onClick: () => {} },
      { text: 'Roadmap', onClick: () => {} },
    ]}
    onCreate={() => {}}
  />
);

export const Bar = Template.bind({});
