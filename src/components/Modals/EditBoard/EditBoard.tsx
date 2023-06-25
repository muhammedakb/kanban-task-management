import { FieldArray, Form, Formik } from 'formik';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import * as Yup from 'yup';

import Button from '@components/Button/Button';
import CloseIcon from '@components/Icons/CloseIcon';
import Modal from '@components/Modal/Modal';
import TextField from '@components/TextField/TextField';

import { useGetActiveBoard } from '@hooks/useGetActiveBoard';

import { editBoard } from '@slices/boardSlice';

import { arrayEquals, slugify } from '@utils/index';

type EditBoardProps = {
  boardName: string;
  closeModal: () => void;
  columns?: Array<string>;
  istheModalOpen: boolean;
};

type Values = {
  boardName: string;
  columns: string[];
};

const validationSchema = Yup.object({
  boardName: Yup.string().required("board name can't be empty"),
});

const EditBoard: FC<EditBoardProps> = ({
  boardName,
  closeModal,
  columns,
  istheModalOpen,
}) => {
  const navigate = useNavigate();
  const activeBoard = useGetActiveBoard();
  const dispatch = useAppDispatch();

  const checkSameValues = (name: string, boardColumns: string[]) => {
    const nameControl = boardName === name;
    const columnsControl = arrayEquals(columns ?? [], boardColumns);
    return nameControl && columnsControl;
  };

  const onSubmit = (values: Values) => {
    const isSameValues = checkSameValues(values.boardName, values.columns);
    if (isSameValues) {
      toast('You did not make any changes!', { icon: '⚠️' });
    } else {
      // FIXME: if removed any column or added new column => change it
      const columnValues = values.columns?.map((column, index) => ({
        newValue: column,
        oldValue: columns?.[index] ?? '',
      }));
      dispatch(
        editBoard({
          columns: columnValues,
          id: activeBoard?.id ?? '',
          name: values.boardName,
        })
      );
      closeModal();
      toast.success('Edit successful.');
      if (boardName !== values.boardName) {
        navigate(`/${slugify(values.boardName)}/${activeBoard?.id}`);
      }
    }
  };

  return (
    <Modal
      title={{ text: 'Edit Board' }}
      toggle={closeModal}
      visible={istheModalOpen}
    >
      <Formik
        initialValues={{
          boardName,
          columns: columns ?? [''],
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors }) => (
          <Form className="addnew-form flex-column">
            <TextField
              autoFocus
              errorMessage={errors.boardName}
              label="Board Name"
              name="boardName"
              onChange={handleChange}
              value={values.boardName}
            />
            <FieldArray name="columns">
              {({ remove, push }) => (
                <div className="addnew-arr flex-column">
                  <p className="addnew-arr__label fw-700-xs">Board Columns</p>
                  {values.columns.length > 0 &&
                    values.columns.map((_, index) => (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={`column.${index}`}
                        className="addnew-arr__inputs horizontal-center"
                      >
                        <div className="addnew-arr__inputs__input">
                          <TextField
                            name={`columns.${index}`}
                            onChange={handleChange}
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
                    text="+ Add New Columns"
                    variant="secondary"
                  />
                </div>
              )}
            </FieldArray>

            <Button fullWidth text="Save Changes" type="submit" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditBoard;
