import { FieldArray } from 'formik';
import type { ChangeEvent } from 'react';

import Button from 'components/Button';
import CloseIcon from 'components/Icons/CloseIcon';
import TextField from 'components/TextField';

type Props = {
  handleChange: (e: ChangeEvent<any>) => void;
  subtasks: string[];
};

const AddNewSubTask = ({ handleChange, subtasks }: Props) => {
  const handlePlaceholders = (index: number): string => {
    if (index === 0) return 'e.g. Make coffee';
    if (index === 1) return 'e.g. Drink coffee & smile';
    return '';
  };
  return (
    <FieldArray name="subtasks">
      {({ remove, push }) => (
        <div className="addnew-arr flex-column">
          <p className="addnew-arr__label fw-700-xs">Subtasks</p>
          {subtasks.length > 0 &&
            subtasks.map((_, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`subtask.${index}`}
                className="addnew-arr__inputs horizontal-center"
              >
                <div className="addnew-arr__inputs__input">
                  <TextField
                    name={`subtasks.${index}`}
                    onChange={handleChange}
                    placeholder={handlePlaceholders(index)}
                    value={subtasks.at(index)}
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
            text="+ Add New Subtask"
            variant="secondary"
          />
        </div>
      )}
    </FieldArray>
  );
};

export default AddNewSubTask;
