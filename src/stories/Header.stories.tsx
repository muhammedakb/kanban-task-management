import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from '../components/Header';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
  <Header
    menuItems={[
      {
        text: 'Edit Board',
        variant: 'primary',
        onClick: () => {
          console.log('clicked');
        },
      },
      {
        text: 'Delete Board',
        variant: 'danger',
        onClick: () => {
          console.log('clicked');
        },
      },
    ]}
    onAddNewTaskClick={() => console.log('askldfjkasdlf')}
    title="Platform Launch"
  />
);

export const BoardHeader = Template.bind({});
