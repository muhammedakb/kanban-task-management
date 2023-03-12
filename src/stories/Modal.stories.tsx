import { useState } from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../components/Button';
import Modal from '../components/Modal';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} text="Open Modal" />
      <Modal
        title={{ text: 'Modal title' }}
        toggle={() => setOpen(false)}
        visible={open}
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
