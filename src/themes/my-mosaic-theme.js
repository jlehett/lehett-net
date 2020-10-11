import { colors } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { MyMosaicColors } from '../utils/colors';

export const MyMosaicTheme = createMuiTheme({
    palette: {
        primary: {
            light: MyMosaicColors.PRIMARY_RED,
            main: MyMosaicColors.PRIMARY_RED,
            dark: MyMosaicColors.PRIMARY_RED,
            contrastText: '#fff',
        },
        secondary: {
            light: MyMosaicColors.PRIMARY_BLUE,
            main: MyMosaicColors.PRIMARY_BLUE,
            dark: MyMosaicColors.PRIMARY_BLUE,
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
            root: {
                padding: '5px',
            },
        },
        MuiButton: {
            root: {
                color: 'white',
                borderRadius: '0',
                fontFamily: 'Raleway',
                textTransform: 'capitalize',
                padding: '0px 20px',
            },
            contained: {
                color: 'white',
                height: '60px',
                backgroundColor: MyMosaicColors.PRIMARY_BLUE,
                borderRadius: '100px',
                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 -4px 4px 0 rgba(255, 255, 255, 0.25)',
                transition: 'background 0.25s',
                '&:hover': {
                    backgroundColor: MyMosaicColors.PRIMARY_BLUE_HOVER + ' !important',
                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 -4px 4px 0 rgba(255, 255, 255, 0.25) !important',
                },
                '&:active': {
                    backgroundColor: MyMosaicColors.PRIMARY_BLUE_HOVER,
                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 -4px 4px 0 rgba(255, 255, 255, 0.25)',
                },
                '@media (max-width: 549px)': {
                    height: '40px',
                }
            },
        },
        MuiInput: {
            underline: {
                '&&&:before': {
                    borderBottom: 'none !important',
                },
                '&&:after': {
                    borderBottom: 'none !important',
                },
            }
        },
        MuiInputBase: {
            input: {
                padding: '0px 30px',
                height: '60px',
                fontSize: '36px',
                color: 'black',
                background: 'white',
                borderRadius: '100px',
                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 -4px 4px 0 rgba(255, 255, 255, 0.25)',
                '@media (max-width: 549px)': {
                    fontSize: '16px',
                    height: '40px',
                    padding: '0px 15px',
                }
            },
        },
        MuiSlider: {
            root: {
                color: MyMosaicColors.PRIMARY_BLUE,
            },
            track: {
                height: '5px',
            },
            rail: {
                height: '5px',
            },
            thumb: {
                color: MyMosaicColors.PRIMARY_BLUE,
                width: '15px',
                height: '15px',
                transition: 'transform 0.25s',
                '&:focus, &:hover, &$active': {
                    boxShadow: 'none',
                },
                '&:hover': {
                    transform: 'scale(1.5)',
                }
            },
        }
    }
});