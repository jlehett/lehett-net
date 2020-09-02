import { createMuiTheme } from '@material-ui/core/styles';

export const homeTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#433b3c',
            main: '#1b1516',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e6968b',
            main: '#b2675e',
            dark: '#803b34',
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                color: 'white',
            }
        },
        MuiIconButton: {
            root: {
                color: 'white',
            }
        }
    }
});