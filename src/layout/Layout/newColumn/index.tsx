import { Form, Formik } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';

import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import TextField from '@components/TextField/TextField';

import { useNavbarVisibility } from '@context/NavbarVisibilityProvider';

type NewColumnProps = {
  closeModal: () => void;
  istheModalOpen: boolean;
};

const validationSchema = Yup.object({
  columnName: Yup.string().required("column name can't be empty"),
});

const NewColumn: FC<NewColumnProps> = ({ closeModal, istheModalOpen }) => {
  const { isOpened } = useNavbarVisibility();
  console.log('selam', isOpened);
  return (
    <Modal
      title={{ text: 'Add New Column' }}
      toggle={closeModal}
      visible={istheModalOpen}
    >
      <Formik
        initialValues={{
          columnName: '',
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors }) => (
          <Form className="addnew-form flex-column">
            <TextField
              autoFocus
              errorMessage={errors.columnName}
              label="Column Name"
              name="columnName"
              onChange={handleChange}
              placeholder="e.g. Todo"
              value={values.columnName}
            />
            <Button fullWidth text="Create New Board" type="submit" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default NewColumn;
