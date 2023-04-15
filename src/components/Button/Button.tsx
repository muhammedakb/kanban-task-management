import classNames from 'classnames';

import { useTheme } from '@context/ThemeProvider';

import Spinner from '../Spinner';

import './button.scss';

type ButtonProps = {
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  text: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'destructive';
};

const Button = ({
  disabled = false,
  fullWidth = false,
  loading,
  onClick,
  size = 'small',
  text,
  type = 'button',
  variant = 'primary',
}: ButtonProps) => {
  const { theme } = useTheme();
  return (
    <button
      className={classNames('btn center-flex', variant, size, {
        fullwidth: fullWidth,
        dark: theme === 'dark',
      })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? <Spinner /> : <span>{text}</span>}
    </button>
  );
};

export default Button;
