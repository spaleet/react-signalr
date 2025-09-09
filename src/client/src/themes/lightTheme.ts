import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        chat: {
            sender: string;
            receiver: string;
        };
    }
    interface PaletteOptions {
        chat?: {
            sender?: string;
            receiver?: string;
        };
    }
}

const lightTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                h5: {
                    fontWeight: "500 !important"
                }
            },
        }
    },
    palette: {
        primary: {
            main: "#3759d5",
        },
        chat: {
            sender: "#1976d2", // your messages
            receiver: "#f0f0f0", // others' messages
        },
    },
});

export default lightTheme;
