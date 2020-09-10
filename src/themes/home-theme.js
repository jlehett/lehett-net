import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../utils/colors';

export const HomeTheme = createMuiTheme({
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
        MuiTypography: {
            body2: {
                fontFamily: 'Raleway',
            },
            body1: {
                fontFamily: 'Raleway',
            },
            caption: {
                fontFamily: 'Raleway',
            },
            h1: {
                fontFamily: 'Raleway',
            },
            h2: {
                fontFamily: 'Raleway',
            },
            h3: {
                fontFamily: 'Raleway',
            },
            h4: {
                fontFamily: 'Raleway',
            },
            h5: {
                fontFamily: 'Raleway',
            },
            h6: {
                fontFamily: 'Raleway',
            },
            subtitle1: {
                fontFamily: 'Raleway',
            },
            subtitle2: {
                fontFamily: 'Raleway',
            },
        },
        MuiButton: {
            root: {
                color: 'white',
                borderRadius: '0',
                fontFamily: 'Raleway',
            },
            outlined: {
                background: 'rgba(0, 0, 0, 0.5)',
                borderColor: colors.TEAL_ACCENT,
                '&:hover': {
                    background: 'rgb(52, 235, 180, 0.25)',
                }
            },
        },
        MuiIconButton: {
            root: {
                color: 'white',
            },
        },
        MuiInputBase: {
            input: {
                color: 'white',
            }
        },
        MuiFormLabel: {
            root: {
                color: 'white',
                '&$focused': {
                    color: colors.TEAL_ACCENT,
                }
            },
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                '& $notchedOutline': {
                    borderColor: colors.TEAL_ACCENT,
                },
                '&:hover $notchedOutline': {
                    borderColor: colors.TEAL_ACCENT,
                },
                '&$focused $notchedOutline': {
                    borderColor: colors.TEAL_ACCENT,
                    background: 'rgb(52, 235, 180, 0.25)',
                }
            }
        }
    }
});