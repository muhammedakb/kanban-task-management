import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { FC } from 'react';

import { useTheme } from '@context/ThemeProvider';

import './select.scss';

type SelectProps = {
  label?: string;
  onSelect: (value: string) => void;
  options: Array<{ value: string; text: string }>;
  defaultValue?: string;
};

const Select: FC<SelectProps> = ({
  label,
  onSelect,
  options,
  defaultValue,
}) => {
  const { theme } = useTheme();

  const [selectedText, setSelectedText] = useState(defaultValue ?? '');
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      const existingOption = options.find(
        (option) => option.value === defaultValue
      );
      if (existingOption) setSelectedText(existingOption.text);
      else throw new Error('You must give a value found in options!');
    }
  }, [defaultValue, options]);

  const toggle = () => setIsOpened((prevState) => !prevState);

  const handleSelect = (item: SelectProps['options'][0]) => {
    setSelectedText(item.text);
    onSelect(item.value);
    setIsOpened(false);
  };

  return (
    <div className={`select ${theme}`}>
      {Boolean(label) && (
        <span className="select__label fw-700-xs">{label}</span>
      )}

      <div
        className={classNames('select__input space-between', {
          opened: isOpened,
        })}
        onClick={toggle}
      >
        <span className="select__input__text fw-500-md">{selectedText}</span>
        <span className="select__input__icon" />
      </div>

      {isOpened && (
        <div className="select__options">
          <ul className="select__options__list">
            {options.map((item, index) => (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={`${item.value}-${index}`}
                className="select__options__list__item"
              >
                <button
                  className="select__options__list__item__btn fw-500-md horizontal-center"
                  onClick={() => handleSelect(item)}
                >
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
