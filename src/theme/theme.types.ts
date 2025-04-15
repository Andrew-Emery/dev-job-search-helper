declare module '@mui/material/styles' {
  interface CustomPaletteColorOptions {
    main: string;
    dark: string;
    light: string;
    contrastText: string;
  }

  interface CustomBorderColors {
    main: string;
    hover: string;
    light: string;
    dark: string;
  }

  interface CustomColors {
    shadow: string;
    footerBg: string;
    cardHoverShadow: string;
    buttonHoverBg: string;
    overlayBg: string;
  }

  interface Palette {
    border: CustomBorderColors;
    custom: CustomColors;
  }

  interface PaletteOptions {
    border?: CustomBorderColors;
    custom?: CustomColors;
  }

  export interface Theme {
    palette: Palette;
  }

  export interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

export type ThemeMode = 'light' | 'dark';

interface CustomColors {
  cardHoverShadow: string;
  buttonHoverBackground: string;
}

interface ThemeColorSet {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  border: {
    main: string;
    hover: string;
  };
  custom: CustomColors;
}

export interface ThemeColors {
  light: ThemeColorSet;
  dark: ThemeColorSet;
} 