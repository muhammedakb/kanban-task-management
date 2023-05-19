import { useMemo } from 'react';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';
import * as Yup from 'yup';

import Button from '@components/Button';
import Modal from '@components/Modal';
import Select from '@components/Select';
import TextField from '@components/TextField';

import { getBoards } from '@slices/selector';

import AddNewSubTask from './AddNewSubTask';

type AddNewTaskProps =
  | {
      closeModal: () => void;
      istheModalOpen: boolean;
    } & (
      | {
          editMode?: true;
          taskValues: {
            title: string;
            description?: string;
            subtasks?: Array<string>;
            status: string;
          };
        }
      | {
          editMode?: false;
          taskValues?: never;
        }
    );

const validationSchema = Yup.object({
  title: Yup.string().required("title can't be empty"),
  description: Yup.string().min(10, 'Must be more than 10'),
});

const AddNewTask: FC<AddNewTaskProps> = ({
  closeModal,
  istheModalOpen,
  editMode,
  taskValues,
}) => {
  const boards = useAppSelector(getBoards);
  const { pathname } = useLocation();
  const boardId = pathname.split('/').at(-1);

  const options = useMemo(
    () =>
      boards
        ?.find((board) => board?.id === boardId)
        ?.columns?.map((column) => ({
          text: column?.name,
          value: column?.name?.toLocaleLowerCase?.('tr-TR'),
        })),
    [boards, boardId]
  );

  return (
    <Modal
      title={{ text: editMode ? 'Edit Task' : 'Add New Task' }}
      toggle={closeModal}
      visible={istheModalOpen}
    >
      <Formik
        initialValues={{
          title: taskValues?.title ?? '',
          description: taskValues?.description ?? '',
          subtasks: taskValues?.subtasks ?? ['', ''],
          status:
            taskValues?.status?.toLowerCase() ?? options?.[0]?.value ?? '',
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors, setFieldValue }) => (
          <Form className="addnew-form flex-column">
            <TextField
              autoFocus
              errorMessage={errors.title}
              label="Title"
              name="title"
              onChange={handleChange}
              placeholder="e.g. Take coffee break"
              value={values.title}
            />
            <TextField
              textarea
              errorMessage={errors.description}
              label="Description"
              name="description"
              onChange={handleChange}
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              value={values.description}
            />
            <AddNewSubTask
              handleChange={handleChange}
              subtasks={values.subtasks}
            />
            <Select
              defaultValue={values.status}
              label="Status"
              onSelect={(value) => setFieldValue('status', value)}
              options={options ?? []}
            />
            <Button
              fullWidth
              text={editMode ? 'Save Changes' : 'Create Task'}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNewTask;
