import { createMuiTheme } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
// import white from "@material-ui/core/colors/white";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#004346",
    },
    secondary: {
      light: "#3ac9a1",
      main: "#09BC8A",
      dark: "#068360",
    },
    third: {
      main: "#ffffff",
    },
  },
  textSecondary: {
    main: "white",
  },
});

export default theme;
