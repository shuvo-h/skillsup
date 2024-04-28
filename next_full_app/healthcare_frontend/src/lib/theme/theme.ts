import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // add new color 
  palette: {
    primary: {
      main: "#1586FD",
    },
    secondary: {
      main: "#666f73",
    },

    
  },
  // setting default props so tht we don't need each tie to pass this default props
  components:{
    MuiButton:{
      defaultProps:{
        variant: "contained",
        
      },
      styleOverrides:{
        root:{
          padding:"8px 24px"
        }
      },
    },
    MuiContainer:{
      defaultProps:{
        maxWidth:"lg"
      }
    },
  },

  // replace default color
  typography:{
    body1:{
      color:"#0B1134CC"
    }
  },


});

// Mui has total 24 shadow, we replacing first shadow value
theme.shadows[1] = "0px 5px 22px lightgray";
