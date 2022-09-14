import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#3759d5"
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                h5: {
                    fontWeight: "500 !important"
                }
            },
        }
    }
});

export default lightTheme