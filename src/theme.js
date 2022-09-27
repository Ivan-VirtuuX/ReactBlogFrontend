import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: "none",
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 300,
      sm: 565,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
});

