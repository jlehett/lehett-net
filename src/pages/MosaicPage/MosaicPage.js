import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Helmet } from 'react-helmet';
import { MyMosaicColors } from '../../utils/colors';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { MyMosaicTheme } from '../../themes/my-mosaic-theme';
import {
    Typography,
    TextField,
    Button,
    IconButton,
} from '@material-ui/core';
import { Settings, Error } from '@material-ui/icons';
import Header from '../../components/my-mosaic/header';

class MosaicPage extends Component {
    state = {
        filetypeError: false,
    };

    acceptedFiletypes = ['image/png', 'image/jpg', 'image/jpeg'];

    openFileSelectDialog() {
        document.getElementById('file-input').click();
    }

    onFileSelected = (event) => {
        this.setState({
            filetypeError: false
        });
        const file = event.target.files[0];
        if (!this.acceptedFiletypes.includes(file.type)) {
            this.setState({
                filetypeError: true
            });
        }
    }

    render() {
        return (
            <ThemeProvider theme={MyMosaicTheme}>
                <Helmet>
                    <style>{'body { background-color: ' + MyMosaicColors.GRAY_BACKGROUND + '; }'}</style>
                </Helmet>
                <Header/>
                <div className={css(styles.body)}>
                    <div className={css(styles.pictureDiv)}>
                        <div
                            id='filetype-error'
                            className={css(styles.error)}
                            style={{ display: this.state.filetypeError ? 'flex' : 'none' }}
                        >
                            <Error className={css(styles.errorIcon)}/>
                            <Typography variant='h6' className={css(styles.errorText)}>
                                Accepted Filetypes: .png, .jpg, .jpeg
                            </Typography>
                        </div>
                    </div>
                    <TextField
                        placeholder='Enter Bing Search'
                        className={css(styles.pageFormItem)}
                    />
                    <Button
                        variant='contained'
                        className={css(styles.pageFormItem)}
                        onClick={() => this.openFileSelectDialog()}
                    >
                        <Typography variant='h4'>
                            Upload Image
                        </Typography>
                        <input
                            id='file-input'
                            type='file'
                            style={{ display: 'none' }}
                            onChange={this.onFileSelected}
                        />
                    </Button>
                    <div
                        className={css(
                            styles.generateDiv,
                            styles.pageFormItem,
                        )}
                    >
                        <Button
                            variant='contained'
                            className={css(styles.generateButton)}
                        >
                            <Typography variant='h4'>
                                Generate Image
                            </Typography>
                        </Button>
                        <IconButton className={css(styles.settingsButton)}>
                            <Settings className={css(styles.settingsIcon)}/>
                        </IconButton>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureDiv: {
        background: 'white',
        marginTop: '25px',
        marginBottom: '25px',
        '@media (min-width: 550px)': {
            width: '500px',
            height: '500px',
        },
        '@media (max-width: 549px)': {
            width: '100%',
            height: '250px',
            marginTop: '0px',
        },
    },
    error: {
        flexDirection: 'row',
        alignItems: 'center',
        background: MyMosaicColors.PRIMARY_RED,
        padding: '10px 0',
        '@media (max-width: 549px)': {
            position: 'relative',
            top: '100%',
            transform: 'translate(0, -100%)',
        }
    },
    errorIcon: {
        color: 'white',
        padding: '0px 10px',
    },
    errorText: {
        color: 'white',
        paddingRight: '10px',
        '@media (max-width: 549px)': {
            fontSize: '16px',
            lineHeight: '15px',
        }
    },
    pageFormItem: {
        margin: '15px 0px',
        '@media (min-width: 1260px)': {
            width: '40%',
        },
        '@media (max-width: 1259px)': {
            width: '60%',
        },
        '@media (max-width: 839px)': {
            width: '80%',
        },
        '@media (max-width: 549px)': {
            width: '95%',
            margin: '10px 0',
        },
    },
    generateDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    generateButton: {
        width: '80%',
    },
    settingsButton: {
        
    },
    settingsIcon: {
        fontSize: '50px',
        '@media (max-width: 549px)': {
            fontSize: '30px',
        },
    }
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MosaicPage);