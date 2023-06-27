import type { ComponentMeta, ComponentStory } from '@storybook/react';

import BoardColumn from '../components/BoardColumn';

export default {
  title: 'Board',
  component: BoardColumn,
} as ComponentMeta<typeof BoardColumn>;

const dummy = {
  id: 'afe4f987-e267-80e1-467c-06b65d90a6bf',
  name: 'Todo',
  tasks: [
    {
      id: 'ad081e21-e9df-5ce3-22a7-72fc2c8b8cb6',
      title: 'Build UI for onboarding flow',
      description: '',
      status: 'Todo',
      subtasks: [
        {
          id: '254a39a9-1a5c-06fa-74d7-67c397e8b3b4',
          title: 'Sign up page',
          isCompleted: true,
        },
        {
          id: '4981c358-a4a7-0c4b-60b6-803ee726e201',
          title: 'Sign in page',
          isCompleted: false,
        },
        {
          id: 'dca450a4-646e-c735-f39f-8fd4324b7963',
          title: 'Welcome page',
          isCompleted: false,
        },
      ],
    },
    {
      id: '6b2a0433-4dcf-3bf4-f62e-c91809dc31bf',
      title: 'Build UI for search',
      description: '',
      status: 'Todo',
      subtasks: [
        {
          id: '84af466c-8a29-1a60-a7a3-88c19fc22c02',
          title: 'Search page',
          isCompleted: false,
        },
      ],
    },
    {
      id: 'eabecdeb-ddf3-9fd4-eb20-6087d67c003f',
      title: 'Build settings UI',
      description: '',
      status: 'Todo',
      subtasks: [
        {
          id: '30328469-e89f-de62-ba4f-cd1bf6214722',
          title: 'Account page',
          isCompleted: false,
        },
        {
          id: '0f6089de-1b81-9196-e1c8-86b0ae311b90',
          title: 'Billing page',
          isCompleted: false,
        },
      ],
    },
    {
      id: '3043a8d9-b53f-93f8-451e-0e6f15359236',
      title: 'QA and test all major user journeys',
      description:
        'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
      status: 'Todo',
      subtasks: [
        {
          id: '72f8671b-8d32-4f43-6d54-89f4eeeef638',
          title: 'Internal testing',
          isCompleted: false,
        },
        {
          id: '48a9610e-bf33-7e5f-d184-bda1c88c1b45',
          title: 'External testing',
          isCompleted: false,
        },
      ],
    },
  ],
};

const Template: ComponentStory<typeof BoardColumn> = () => (
  <BoardColumn
    categoryTitleColor=""
    columnData={dummy}
    id={dummy.id}
    onItemClick={(item) => console.log(item)}
  />
);

export const Column = Template.bind({});
