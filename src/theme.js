import { createTheme } from "@mui/material/styles"
export const theme = createTheme({
    palette: {
      customButton: {
        backgroundColor: '#F2A900',
        '&:hover': {
          backgroundColor: '#F2A900',
          boxShadow: 'none',
        }
      },
      linkButton :{
        background: '#009B77',
        '&:hover': {
          backgroundColor: '#009B77',
          boxShadow: 'none',
        }
      },
      customSvgIcon: '#222222'
    }
})