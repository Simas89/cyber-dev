import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const themeColors = {
  ORANGE: "#FD5630",
  CULTURED: "#F6F6F9",
  RED: "#E40045",
  PRUSSIAN_BLUE: "#022033",
  CADE_BLUE: "#9EA5B7",
  ALICE_BLUE: "#D5E7F2",
  GRADIENT: "linear-gradient(100deg, #E62E78 0.01%, #FD5630 98.53%);",
};

const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.ORANGE,
    },
    secondary: { main: themeColors.PRUSSIAN_BLUE },
  },
  components: {
    MuiButton: { defaultProps: { disableRipple: true } },
    MuiCssBaseline: {
      styleOverrides: {
        body: {},
      },
    },
  },

  typography: {
    fontFamily: "Roboto",
  },
});

export default responsiveFontSizes(theme);
