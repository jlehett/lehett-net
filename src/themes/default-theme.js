import { createMuiTheme } from '@material-ui/core/styles';

export const DefaultTheme = createMuiTheme({
    palette: {
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
                fontSize: '36px',
                fontFamily: 'Raleway',
                '@media (max-width: 549px)': {
                    fontSize: '16px',
                }
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
        MuiIconButton: {
        },
        MuiButton: {
        },
        MuiInput: {
        },
        MuiInputBase: {
        },
        MuiSlider: {
        }
    }
});