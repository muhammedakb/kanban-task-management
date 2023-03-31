import { useEffect, useRef } from 'react';
import classNames from 'classnames';

import './textField.scss';

type TextFieldProps = {
  autoFocus?: boolean;
  errorMessage?: string;
  label?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  placeholder?: string;
  textarea?: boolean;
  type?: 'text' | 'email' | 'password';
  value?: string;
};

const TextField = ({
  autoFocus = false,
  errorMessage,
  label,
  name,
  onChange,
  placeholder,
  textarea = false,
  type = 'text',
  value,
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) {
      if (textarea) textareaRef.current?.focus();
      else inputRef.current?.focus();
    }
  }, [autoFocus, textarea]);

  return (
    <div className="textfield horizontal-center fw-500-md">
      <label className="textfield__label">
        <span className="fw-700-xs">{label}</span>
        {textarea ? (
          <textarea
            ref={textareaRef}
            className={classNames('textfield__textarea', {
              error: errorMessage,
            })}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
          />
        ) : (
          <input
            ref={inputRef}
            className={classNames('textfield__input', {
              error: errorMessage,
            })}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
          />
        )}
        {Boolean(errorMessage) && (
          <div className="textfield__validation">{errorMessage}</div>
        )}
      </label>
    </div>
  );
};

export default TextField;
