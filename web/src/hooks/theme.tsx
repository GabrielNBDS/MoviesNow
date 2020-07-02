import React, { createContext, useContext, useCallback } from 'react';
import { DefaultTheme } from 'styled-components';

import usePersistedState from '../utils/usePersistedState';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

interface ThemeData {
  theme: DefaultTheme;
  toggleTheme(): void;
}

const ThemeContext = createContext<ThemeData>({} as ThemeData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState('theme', light);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [theme.title, setTheme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
