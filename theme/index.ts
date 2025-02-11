"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
