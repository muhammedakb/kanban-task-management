import classNames from 'classnames';
import type { FC } from 'react';

import { Themes } from '@@types/enums';

import { useTheme } from '@context/ThemeProvider';

import Switch from '../Switch';

import './themeSelector.scss';

const ThemeSelector: FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`theme-selector space-between ${theme}`}>
      <span
        className={classNames('theme-selector__light-icon', {
          active: theme === Themes.Light,
        })}
      />
      <Switch checked={theme === Themes.Dark} onChange={toggleTheme} />
      <span
        className={classNames('theme-selector__dark-icon', {
          active: theme === Themes.Dark,
        })}
      />
    </div>
  );
};

export default ThemeSelector;
