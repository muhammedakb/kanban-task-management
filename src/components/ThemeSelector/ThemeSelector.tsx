import { useState } from 'react';
import type { FC } from 'react';

import Switch from '../Switch';

import './themeSelector.scss';
// TODO: add color and animation for icons
const ThemeSelector: FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  return (
    <div className="theme-selector space-between">
      <span className="theme-selector__light-icon" />
      <Switch
        checked={theme === 'dark'}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
      <span className="theme-selector__dark-icon" />
    </div>
  );
};

export default ThemeSelector;
