import { createTheme } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      light: "#333333",
      main: "#000000",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#33a6a6",
      main: "#009090",
      dark: "#006464",
      contrastText: deepOrange[500],
    },
  },
});
