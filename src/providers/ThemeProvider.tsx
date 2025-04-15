import { ReactNode, createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeMode } from '../theme/theme.types';
import { themeColors, getThemeComponents } from '../theme/theme.config';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const theme = createTheme({
    palette: {
      mode,
      primary: themeColors[mode].primary,
      secondary: themeColors[mode].secondary,
      background: themeColors[mode].background,
      text: themeColors[mode].text,
      border: themeColors[mode].border,
      custom: themeColors[mode].custom,
    },
    components: getThemeComponents(mode),
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useThemeContext as useTheme }; 