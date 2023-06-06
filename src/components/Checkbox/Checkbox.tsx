import { useCallback, useState } from 'react';
import classNames from 'classnames';
import type { FC } from 'react';

import { useTheme } from '@context/ThemeProvider';

import './checkbox.scss';

type CheckboxProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  text: string;
};

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, text }) => {
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(checked ?? false);

  const handleContainerClick = useCallback(() => {
    setIsChecked((prevValue) => !prevValue);
    onChange?.(!isChecked);
  }, [isChecked, onChange]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange?.(event.target.checked);
  };

  return (
    <div
      className={`checkbox horizontal-center ${theme}`}
      onClick={handleContainerClick}
    >
      <input
        checked={isChecked}
        onChange={handleCheckboxChange}
        type="checkbox"
      />
      <p
        className={classNames('checkbox__text fw-700-xs', {
          isChecked,
        })}
      >
        {text}
      </p>
    </div>
  );
};

export default Checkbox;
