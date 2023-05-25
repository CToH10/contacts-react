import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      light: "#333333",
      main: "#000000",
      dark: "#000000",
      contrastText: grey[50],
    },
    secondary: {
      light: "#33a6a6",
      main: "#009090",
      dark: "#006464",
      contrastText: grey[50],
    },
  },
});
