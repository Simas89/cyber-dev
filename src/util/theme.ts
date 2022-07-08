import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export enum ThemeColors {
  ERROR = "#d32f2f",
  CULTURED = "#F6F6F9",
  ORANGE = "#FD5630",
  RED = "#E40045",
  PRUSSIAN_BLUE = "#022033",
  CADE_BLUE = "#9EA5B7",
  ALICE_BLUE = "#D5E7F2",
  GRADIENT = "linear-gradient(106.11deg, #E62E78 0.01%, #FD5630 98.53%);",
}

const theme = createTheme({
  palette: {
    primary: {
      main: ThemeColors.ORANGE,
    },
    secondary: { main: ThemeColors.PRUSSIAN_BLUE },
  },
  components: {
    MuiButton: { defaultProps: { disableRipple: true } },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // background: ThemeColors.GRADIENT,
        },
      },
    },
  },

  typography: {
    fontFamily: "Nunito",
  },
});

export default responsiveFontSizes(theme);
