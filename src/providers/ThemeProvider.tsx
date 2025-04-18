import React, { createContext, useContext, useMemo, useState } from 'react';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { themeColors } from '../theme/theme.config';
import { ThemeMode } from '../theme/theme.types';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as ThemeMode) || 'light';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => {
    const currentTheme = themeColors[mode];
    return createTheme({
      palette: {
        mode,
        primary: currentTheme.primary,
        secondary: currentTheme.secondary,
        background: currentTheme.background,
        text: currentTheme.text,
        border: {
          main: currentTheme.border.main,
          hover: currentTheme.border.hover,
          light: currentTheme.border.main,
          dark: currentTheme.border.hover
        },
        custom: {
          shadow: currentTheme.custom.cardHoverShadow,
          footerBg: mode === 'light' ? '#f5f5f5' : '#1a1a1a',
          cardHoverShadow: currentTheme.custom.cardHoverShadow,
          buttonHoverBg: currentTheme.custom.buttonHoverBackground,
          overlayBg: mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.7)'
        }
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: currentTheme.background.default,
              color: currentTheme.text.primary,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 