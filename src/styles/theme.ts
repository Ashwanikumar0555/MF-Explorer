import { createTheme } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: orange[500],
    },
    background: {
      default: "#f9fafb",
    },
    text: {
      primary: "#1f2937",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});
