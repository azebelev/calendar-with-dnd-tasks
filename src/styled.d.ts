import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      common: {
        black: string;
        contrastText: string;
        white: string;
      };
      grey: {
        main: string;
        dark: string;
        light1: string;
        light2: string;
      };
      blue: {
        main: string;
        light: string;
      };
      green: string;
      teal: string;
      yellow: string;
      orange: string;
      violate: string;
    };
  }
}
