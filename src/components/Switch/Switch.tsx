import './switch.scss';

type SwitchProps = {
  checked: boolean;
  id?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Switch = ({ checked, id, onChange }: SwitchProps) => (
  <label className='switch'>
    <input type='checkbox' id={id} checked={checked} onChange={onChange} />
    <span className='slider round'></span>
  </label>
);

export default Switch;
