import { useState } from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Select from '../components/Select';

export default {
  title: 'Select Input',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = () => {
  const [selectedValue, setSelectedValue] = useState('todo');
  return (
    <>
      <Select
        defaultValue={selectedValue}
        label="Dropdown (Idle)"
        onSelect={(value) => setSelectedValue(value)}
        options={[
          {
            text: '',
            value: '',
          },
          {
            text: 'Todo',
            value: 'todo',
          },
          {
            text: 'Doing',
            value: 'doing',
          },
          {
            text: 'Done',
            value: 'done',
          },
        ]}
      />
      <p style={{ marginTop: '10px' }}>Selected value: {selectedValue}</p>
    </>
  );
};

export const SelectOption = Template.bind({});
