// height 40-48
import classNames from 'classnames';
import Spinner from '../Spinner';
import './button.scss';

type ButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  size?: 's' | 'l';
  text: string;
  variant?: 'primary' | 'secondary' | 'destructive';
};

const Button = ({
  disabled = false,
  loading,
  onClick,
  size = 's',
  text,
  variant = 'primary',
}: ButtonProps) => (
  <button
    className={classNames('btn', variant, size)}
    disabled={disabled}
    onClick={onClick}
  >
    {loading ? <Spinner /> : text}
  </button>
);

export default Button;
