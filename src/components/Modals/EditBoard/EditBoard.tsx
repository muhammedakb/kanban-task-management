import { FieldArray, Form, Formik } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';

import Button from '@components/Button/Button';
import CloseIcon from '@components/Icons/CloseIcon';
import Modal from '@components/Modal/Modal';
import TextField from '@components/TextField/TextField';

type EditBoardProps = {
  boardName: string;
  closeModal: () => void;
  columns?: Array<string>;
  istheModalOpen: boolean;
};

const validationSchema = Yup.object({
  boardName: Yup.string().required("board name can't be empty"),
});

const EditBoard: FC<EditBoardProps> = ({
  boardName,
  closeModal,
  columns,
  istheModalOpen,
}) => (
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
      onSubmit={(values) => console.log(values)}
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

export default EditBoard;
