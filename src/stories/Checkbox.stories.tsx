import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from '../components/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  text: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
};

export const UnChecked = Template.bind({});
UnChecked.args = {
  checked: false,
  text: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
};
