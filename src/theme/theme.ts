import { createTheme, getContrastRatio } from '@mui/material/styles'


// if you want to use a google font
import { Open_Sans } from "next/font/google"

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});


// overwrite theme elements from MUI
export const theme = createTheme({
    // palette is a built-in MUI term, so we are overriding the object
    palette: {
        primary: {
            main: '#05A8AA',
            light: '#B8D5B8',
            contrastText: getContrastRatio('#05A8AA', '#fff') > 4.5 ? '#fff' : '#111',
        },
        secondary: {
            main: '#BC412B',
            light: '#DC602E',
            contrastText: getContrastRatio('#BC412B', '#fff') > 4.5 ? '#fff' : '#111',

        },
        error: {
            main: '#DC602E',
        },
        warning: {
            main: '#ffd166',
        },
        info: {
            main: '#F6F5F0',
        },
        success: {
            main: '#118ab2',
        },
        background: {
            default: '#B8D5B8',
        },
        
    },

    // set the font with the typography key
    typography: {
        fontFamily: openSans.style.fontFamily,
        button: {
            fontWeight: 700,
        },
    },


    // we can also do component specific styling
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    paddingLeft: 20,
                    paddingRight: 20,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: 16,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    
                },
            },
        },
        
    },
})