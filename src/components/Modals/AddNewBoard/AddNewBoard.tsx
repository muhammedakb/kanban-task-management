import { FieldArray, Form, Formik } from 'formik';
import type { FC } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store';
import * as Yup from 'yup';

import Button from '@components/Button';
import CloseIcon from '@components/Icons/CloseIcon';
import Modal from '@components/Modal';
import TextField from '@components/TextField';

import { addNewBoard } from '@slices/boardSlice';

import { generateID, taskNameEllipsis } from '@utils/index';

type AddNewBoardProps = {
  closeModal: () => void;
  istheModalOpen: boolean;
};

const validationSchema = Yup.object({
  name: Yup.string().required("name can't be empty"),
});

const AddNewBoard: FC<AddNewBoardProps> = ({ closeModal, istheModalOpen }) => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: { name: string; columns: string[] }) => {
    const emptyColumns = values.columns.every((column) => column === '');

    const correctedColumns = emptyColumns
      ? []
      : values.columns.map((value) => ({
          name: value,
          tasks: [],
        }));

    dispatch(
      addNewBoard({
        columns: correctedColumns,
        id: generateID(),
        name: values.name,
      })
    );
    closeModal();
    toast.success(`${taskNameEllipsis(values.name)} added.`);
  };

  return (
    <Modal
      title={{ text: 'Add New Board' }}
      toggle={closeModal}
      visible={istheModalOpen}
    >
      <Formik
        initialValues={{
          name: '',
          columns: ['', ''],
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors }) => (
          <Form className="addnew-form flex-column">
            <TextField
              autoFocus
              errorMessage={errors.name}
              label="Name"
              name="name"
              onChange={handleChange}
              placeholder="e.g. Web Design"
              value={values.name}
            />
            <FieldArray name="columns">
              {({ remove, push }) => (
                <div className="addnew-arr flex-column">
                  <p className="addnew-arr__label fw-700-xs">Columns</p>
                  {values.columns.length > 0 &&
                    values.columns.map((_, index) => (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={`subtask.${index}`}
                        className="addnew-arr__inputs horizontal-center"
                      >
                        <div className="addnew-arr__inputs__input">
                          <TextField
                            name={`columns.${index}`}
                            onChange={handleChange}
                            placeholder={
                              // eslint-disable-next-line no-nested-ternary
                              index === 0 ? 'Todo' : index === 1 ? 'Doing' : ''
                            }
                            value={values.columns.at(index)}
                          />
                        </div>
                        <button onClick={() => remove(index)} type="button">
                          <CloseIcon />
                        </button>
                      </div>
                    ))}
                  <Button
                    fullWidth
                    onClick={() => push('')}
                    text="+ Add New Column"
                    variant="secondary"
                  />
                </div>
              )}
            </FieldArray>
            <Button fullWidth text="Create New Board" type="submit" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNewBoard;
