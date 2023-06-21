import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#feAFA2', 
      // main: '#F6F9FC', 
    },
    secondary: {
      main: "rgb(25, 118, 210)"
    }
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

export default theme;
