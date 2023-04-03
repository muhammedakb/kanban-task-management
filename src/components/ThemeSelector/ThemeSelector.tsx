import classNames from 'classnames';
import type { FC } from 'react';

import { useTheme } from '@context/ThemeProvider';

import Switch from '../Switch';

import './themeSelector.scss';

const ThemeSelector: FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-selector space-between">
      <span
        className={classNames('theme-selector__light-icon', {
          active: theme === 'light',
        })}
      />
      <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      <span
        className={classNames('theme-selector__dark-icon', {
          active: theme === 'dark',
        })}
      />
    </div>
  );
};

export default ThemeSelector;
