import classNames from 'classnames';
import Spinner from '../Spinner';
import './button.scss';

type ButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  size?: 'small' | 'large';
  text: string;
  variant?: 'primary' | 'secondary' | 'destructive';
};

const Button = ({
  disabled = false,
  loading,
  onClick,
  size = 'small',
  text,
  variant = 'primary',
}: ButtonProps) => (
  <button
    className={classNames('btn center-flex', variant, size)}
    disabled={disabled}
    onClick={onClick}
  >
    {loading ? <Spinner /> : text}
  </button>
);

export default Button;
