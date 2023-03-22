import type { FC } from 'react';

import { useTheme } from '../../context/ThemeProvider';
import Switch from '../Switch';

import './themeSelector.scss';
// TODO: add color and animation for icons
const ThemeSelector: FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-selector space-between">
      <span className="theme-selector__light-icon" />
      <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      <span className="theme-selector__dark-icon" />
    </div>
  );
};

export default ThemeSelector;
