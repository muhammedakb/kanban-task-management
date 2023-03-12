import classNames from 'classnames';

import './checkbox.scss';

type CheckboxProps = {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  text: string;
};

const Checkbox = ({ checked, onChange, text }: CheckboxProps) => (
  <div className="checkbox horizontal-center">
    <div className="checkbox__input">
      <input checked={checked} onChange={onChange} type="checkbox" />
    </div>
    <p
      className={classNames('checkbox__text fw-700-xs', {
        checked,
      })}
    >
      {text}
    </p>
  </div>
);

export default Checkbox;
