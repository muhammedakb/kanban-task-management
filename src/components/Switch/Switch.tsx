import './switch.scss';

type SwitchProps = {
  checked: boolean;
  id?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Switch = ({ checked, id, onChange }: SwitchProps) => (
  <label className="switch">
    <input checked={checked} id={id} onChange={onChange} type="checkbox" />
    <span className="slider round" />
  </label>
);

export default Switch;
