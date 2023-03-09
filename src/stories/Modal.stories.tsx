import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button text='Open Modal' onClick={() => setOpen(true)} />
      <Modal
        visible={open}
        toggle={() => setOpen(false)}
        title={{ text: 'Modal title' }}
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          ipsam temporibus dolorum similique cum, iste ipsa culpa est
          perferendis adipisci.
        </p>
      </Modal>
    </>
  );
};

export const ModalDialog = Template.bind({});
