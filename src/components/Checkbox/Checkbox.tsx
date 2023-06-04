import classNames from 'classnames';

import { useTheme } from '@context/ThemeProvider';

import './checkbox.scss';

type CheckboxProps = {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  text: string;
};

const Checkbox = ({ checked, onChange, text }: CheckboxProps) => {
  const { theme } = useTheme();
  return (
    // TODO: if click any area not including checkbox => setChecked
    <div className={`checkbox horizontal-center ${theme}`}>
      <input checked={checked} onChange={onChange} type="checkbox" />
      <p
        className={classNames('checkbox__text fw-700-xs', {
          checked,
        })}
      >
        {text}
      </p>
    </div>
  );
};

export default Checkbox;
