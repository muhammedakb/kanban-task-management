import { Form, Formik } from 'formik';
import type { FC } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store';
import * as Yup from 'yup';

import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import TextField from '@components/TextField/TextField';

import { useGetActiveTask } from '@hooks/useGetActiveTask';

import { addNewColumn } from '@slices/taskSlice';

type NewColumnProps = {
  closeModal: () => void;
  istheModalOpen: boolean;
};

const validationSchema = Yup.object({
  columnName: Yup.string().required("column name can't be empty"),
});

const AddNewColumn: FC<NewColumnProps> = ({ closeModal, istheModalOpen }) => {
  const activeTask = useGetActiveTask();
  const dispatch = useAppDispatch();

  const onSubmit = ({ columnName }: { columnName: string }) => {
    dispatch(
      addNewColumn({
        columnName,
        id: activeTask?.id ?? '',
      })
    );
    closeModal();
    toast.success(`${columnName} column added.`);
  };

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
        onSubmit={onSubmit}
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
            <Button fullWidth text="Create New Column" type="submit" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNewColumn;
