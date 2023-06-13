import { memo, useMemo } from 'react';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store';
import * as Yup from 'yup';

import type { Task, TaskForm } from '@@types/types';

import Button from '@components/Button';
import Modal from '@components/Modal';
import Select from '@components/Select';
import TextField from '@components/TextField';

import { useGetActiveBoard } from '@hooks/useGetActiveBoard';

import { addNewTask, editTask } from '@slices/boardSlice';

import {
  correctNewTaskFormData,
  generateID,
  taskNameEllipsis,
} from '@utils/index';

import AddNewSubTask from './AddNewSubTask';

type AddNewTaskProps =
  | {
      closeModal: () => void;
      istheModalOpen: boolean;
    } & (
      | {
          editMode?: true;
          taskValues: Task;
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
  const activeBoard = useGetActiveBoard();
  const dispatch = useAppDispatch();

  const options = useMemo(
    () =>
      activeBoard?.columns?.map((column) => ({
        text: column?.name,
        value: column?.name,
      })),
    [activeBoard]
  );

  const onSubmit = (values: TaskForm) => {
    if (editMode) {
      const updatedSubtasks = values.subtasks.map((subtask, index) => ({
        ...taskValues.subtasks[index],
        title: subtask,
        id: generateID(),
      }));

      dispatch(
        editTask({
          boardId: activeBoard?.id ?? '',
          taskId: taskValues?.id ?? '',
          values: {
            description: values.description,
            status: values.status,
            subtasks: updatedSubtasks,
            title: values.title,
            id: taskValues?.id ?? '',
          },
        })
      );
      closeModal();
      toast.success(`${taskNameEllipsis(values.title)} task edited.`);
    } else {
      dispatch(
        addNewTask({
          id: activeBoard?.id ?? '',
          task: correctNewTaskFormData(values),
        })
      );
      closeModal();
      toast.success(`${taskNameEllipsis(values.title)} task added.`);
    }
  };

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
          subtasks: taskValues?.subtasks?.map((subtask) => subtask.title) ?? [
            '',
            '',
          ],
          status: taskValues?.status ?? options?.[0]?.value ?? '',
        }}
        onSubmit={onSubmit}
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

export default memo(AddNewTask);
