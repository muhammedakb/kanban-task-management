import classNames from 'classnames';
import './spinner.scss';

type SpinnerProps = {
  variant?: 'primary' | 'secondary';
};

const Spinner = ({ variant = 'primary' }: SpinnerProps) => (
  <div className={classNames('spinner', variant)} />
);
export default Spinner;
