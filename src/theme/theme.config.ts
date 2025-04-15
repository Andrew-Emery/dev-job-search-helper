import { Components, Theme } from '@mui/material';
import { ThemeColors, ThemeMode } from './theme.types';

export const themeColors: ThemeColors = {
  light: {
    primary: {
      main: 'rgb(76, 124, 255)',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    },
    text: {
      primary: '#000000',
      secondary: '#666666'
    },
    border: {
      main: '#e0e0e0',
      hover: '#bdbdbd'
    },
    custom: {
      cardHoverShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      buttonHoverBackground: 'rgba(0, 0, 0, 0.04)'
    }
  },
  dark: {
    primary: {
      main: 'rgb(42, 91, 226)',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: '#000000'
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: '#000000'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3'
    },
    border: {
      main: '#424242',
      hover: '#616161'
    },
    custom: {
      cardHoverShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
      buttonHoverBackground: 'rgba(255, 255, 255, 0.08)'
    }
  }
};

export const getThemeComponents = (mode: ThemeMode): Components<Theme> => ({
  MuiCard: {
    styleOverrides: {
      root: {
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: themeColors[mode].custom.cardHoverShadow
        }
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: themeColors[mode].custom.buttonHoverBackground
        }
      }
    }
  }
});
