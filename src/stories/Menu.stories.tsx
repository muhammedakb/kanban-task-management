import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Menu from '../components/Menu';

export default {
  title: 'Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const EllipsisMenu = Template.bind({});
EllipsisMenu.args = {
  menuItems: [
    {
      text: 'Edit Task',
      variant: 'primary',
      onClick() {
        console.log('clicked');
      },
    },
    {
      text: 'Delete Task',
      variant: 'danger',
      onClick() {
        console.log('clicked');
      },
    },
  ],
};

export const ScrollableEllipsisMenu = Template.bind({});
ScrollableEllipsisMenu.args = {
  menuItems: [
    {
      text: 'Edit Task',
      variant: 'primary',
      onClick() {
        console.log('clicked');
      },
    },
    {
      text: 'Delete Task',
      variant: 'danger',
      onClick() {
        console.log('clicked');
      },
    },
    {
      text: 'Edit Task',
      variant: 'primary',
      onClick() {
        console.log('clicked');
      },
    },
    {
      text: 'Delete Task',
      variant: 'danger',
      onClick() {
        console.log('clicked');
      },
    },
    {
      text: 'Edit Task',
      variant: 'primary',
      onClick() {
        console.log('clicked');
      },
    },
    {
      text: 'Delete Task',
      variant: 'danger',
      onClick() {
        console.log('clicked');
      },
    },
  ],
};
