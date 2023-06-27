import type { ComponentMeta, ComponentStory } from '@storybook/react';

import BoardBar from '../components/BoardBar';

export default {
  title: 'Board',
  component: BoardBar,
} as ComponentMeta<typeof BoardBar>;

const Template: ComponentStory<typeof BoardBar> = () => (
  <BoardBar
    boardItems={[
      { id: 'Platform-Launch', text: 'Platform Launch', onClick: () => {} },
      { id: 'Marketing-Plan', text: 'Marketing Plan', onClick: () => {} },
      { id: 'Roadmap', text: 'Roadmap', onClick: () => {} },
    ]}
    onCreateClick={() => {}}
  />
);

export const Bar = Template.bind({});
