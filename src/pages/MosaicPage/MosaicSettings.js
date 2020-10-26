import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Helmet } from 'react-helmet';
import { MyMosaicColors } from '../../utils/colors';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { MyMosaicTheme } from '../../themes/my-mosaic-theme';
import { DefaultTheme } from '../../themes/default-theme';
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    Slider,
    Input,
} from '@material-ui/core';
import { Settings, Error, GetApp } from '@material-ui/icons';
import { generateImage } from '../../data/state/mosaic/mosaic.actions';
import Header from '../../components/my-mosaic/header';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { MosaicConstants } from './constants';
import {
    setNumImages,
    setTilingImageScale,
    setOutputImageScale,
    setSendEmail,
    setEmailTo,
} from '../../data/state/mosaic/mosaic.actions';
import {
    mosaicNumImagesSelector,
    mosaicTilingImageScaleSelector,
    mosaicOutputImageScaleSelector,
    mosaicSendEmailSelector,
    mosaicEmailToSelector,
} from '../../data/state/mosaic/mosaic.selectors';

class MosaicSettings extends Component {
    state = {
        numImages: 0,
        tilingImageScale: 0,
        outputImageScale: 0,
        sendEmail: false,
        emailTo: '',

        numImagesValidationMessage: ' ',
        numImagesValid: true,
        tilingImageScaleValidationMessage: ' ',
        tilingImageScaleValid: true,
        outputImageScaleValidationMessage: ' ',
        outputImageScaleValid: true,
        emailToValidationMessage: ' ',
        emailToValid: true,
    };
    
    componentDidMount() {
        this.setState({
            numImages: this.props.mosaicNumImages,
            tilingImageScale: this.props.mosaicTilingImageScale,
            outputImageScale: this.props.mosaicOutputImageScale,
            sendEmail: this.props.mosaicSendEmail,
            emailTo: this.props.mosaicEmailTo,
        });
    }

    async saveAndNavigateBack() {
        await this.props.setNumImages(this.state.numImages);
        await this.props.setTilingImageScale(this.state.tilingImageScale);
        await this.props.setOutputImageScale(this.state.outputImageScale);
        await this.props.setSendEmail(this.state.sendEmail);
        if (this.state.sendEmail) {
            await this.props.setEmailTo(this.state.emailTo);
        } else {
            await this.props.setEmailTo('');
        }
        this.props.history.push('/mosaic');
    }

    navigateBack() {
        this.props.history.push('/mosaic');
    }

    allSettingsValid() {
        return (
            this.state.numImagesValid
            && this.state.tilingImageScaleValid
            && this.state.outputImageScaleValid
            && this.state.emailToValid
        );
    }

    checkIfSettingValid(setting, value) {
        const numberValue = Number(value); 
        if (setting === MosaicConstants.NUM_IMAGES_SETTING) {
            if (
                numberValue < MosaicConstants.MIN_NUM_IMAGES
                || numberValue > MosaicConstants.MAX_NUM_IMAGES
                || isNaN(numberValue)
            ) {
                this.setState({
                    numImagesValid: false,
                    numImagesValidationMessage: 'Please enter a number between '
                        + MosaicConstants.MIN_NUM_IMAGES + '-' + MosaicConstants.MAX_NUM_IMAGES
                })
            } else {
                this.setState({
                    numImagesValid: true,
                    numImagesValidationMessage: ' ',
                })
            }
        }
        if (setting === MosaicConstants.TILING_IMAGE_SCALE_SETTING) {
            if (
                numberValue < MosaicConstants.MIN_TILING_IMAGE_SCALE
                || numberValue > MosaicConstants.MAX_TILING_IMAGE_SCALE
                || isNaN(numberValue)
            ) {
                this.setState({
                    tilingImageScaleValid: false,
                    tilingImageScaleValidationMessage: 'Please enter a number between '
                        + MosaicConstants.MIN_TILING_IMAGE_SCALE + '-' + MosaicConstants.MAX_TILING_IMAGE_SCALE
                })
            } else {
                this.setState({
                    tilingImageScaleValid: true,
                    tilingImageScaleValidationMessage: ' ',
                })
            }
        }
        if (setting === MosaicConstants.OUTPUT_IMAGE_SCALE_SETTING) {
            if (
                numberValue < MosaicConstants.MIN_OUTPUT_IMAGE_SCALE
                || numberValue > MosaicConstants.MAX_OUTPUT_IMAGE_SCALE
                || isNaN(numberValue)
            ) {
                this.setState({
                    outputImageScaleValid: false,
                    outputImageScaleValidationMessage: 'Please enter a number between '
                        + MosaicConstants.MIN_OUTPUT_IMAGE_SCALE + '-' + MosaicConstants.MAX_OUTPUT_IMAGE_SCALE
                })
            } else {
                this.setState({
                    outputImageScaleValid: true,
                    outputImageScaleValidationMessage: ' ',
                })
            }
        }
        if (setting === MosaicConstants.SEND_EMAIL_SETTING) {
            if (
                !value
                || MosaicConstants.EMAIL_REGEX.test(this.state.emailTo)
            ) {
                this.setState({
                    emailToValid: true,
                    emailToValidationMessage: ' ',
                });
            } else {
                this.setState({
                    emailToValid: false,
                    emailToValidationMessage: 'Please enter a valid email address'
                });
            }
        }
        if (setting === MosaicConstants.EMAIL_TO_SETTING) {
            if (
                !this.state.sendEmail
                || MosaicConstants.EMAIL_REGEX.test(value)
            ) {
                this.setState({
                    emailToValid: true,
                    emailToValidationMessage: ' ',
                });
            } else {
                this.setState({
                    emailToValid: false,
                    emailToValidationMessage: 'Please enter a valid email address'
                })
            }
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
                    <div className={css(styles.settingContainer)}>
                        <Typography
                            variant='h6'
                            className={css(styles.optionLabel)}
                        >
                            Number of Images to Download
                        </Typography>
                        <div className={css(styles.sliderContainer)}>
                            <Slider
                                value={this.state.numImages}
                                className={css(styles.slider)}
                                onChange={(event, newValue) => {
                                    this.checkIfSettingValid(MosaicConstants.NUM_IMAGES_SETTING, newValue);
                                    this.setState({ numImages: newValue });
                                }}
                                min={MosaicConstants.MIN_NUM_IMAGES}
                                max={MosaicConstants.MAX_NUM_IMAGES}
                            />
                            <ThemeProvider theme={DefaultTheme}>
                                <TextField
                                    style={{ height: 'fit-content', width: '20%' }}
                                    value={this.state.numImages}
                                    onChange={(event) => {
                                        this.checkIfSettingValid(MosaicConstants.NUM_IMAGES_SETTING, event.target.value);
                                        this.setState({ numImages: event.target.value });
                                    }}
                                    error={!this.state.numImagesValid}
                                />
                            </ThemeProvider>
                        </div>
                        <Typography
                            variant='body2'
                            className={css(styles.validationMessage)}
                        >
                            {this.state.numImagesValidationMessage}&nbsp;
                        </Typography>
                    </div>
                    <div className={css(styles.settingContainer)}>
                        <Typography
                            variant='h6'
                            className={css(styles.optionLabel)}
                        >
                            Tiling Image Scale (px)
                        </Typography>
                        <div className={css(styles.sliderContainer)}>
                            <Slider
                                value={this.state.tilingImageScale}
                                className={css(styles.slider)}
                                onChange={(event, newValue) => {
                                    this.checkIfSettingValid(MosaicConstants.TILING_IMAGE_SCALE_SETTING, newValue);
                                    this.setState({ tilingImageScale: newValue });
                                }}
                                min={MosaicConstants.MIN_TILING_IMAGE_SCALE}
                                max={MosaicConstants.MAX_TILING_IMAGE_SCALE}
                            />
                            <ThemeProvider theme={DefaultTheme}>
                                <TextField
                                    style={{ height: 'fit-content', width: '20%' }}
                                    value={this.state.tilingImageScale}
                                    onChange={(event) => {
                                        this.checkIfSettingValid(MosaicConstants.TILING_IMAGE_SCALE_SETTING, event.target.value);
                                        this.setState({ tilingImageScale: event.target.value });
                                    }}
                                    error={!this.state.tilingImageScaleValid}
                                />
                            </ThemeProvider>
                        </div>
                        <Typography
                            variant='body2'
                            className={css(styles.validationMessage)}
                        >
                            {this.state.tilingImageScaleValidationMessage}&nbsp;
                        </Typography>
                    </div>
                    <div className={css(styles.settingContainer)}>
                        <Typography
                            variant='h6'
                            className={css(styles.optionLabel)}
                        >
                            Output Image Scale (Factor)
                        </Typography>
                        <div className={css(styles.sliderContainer)}>
                            <Slider
                                value={this.state.outputImageScale}
                                className={css(styles.slider)}
                                onChange={(event, newValue) => {
                                    this.checkIfSettingValid(MosaicConstants.OUTPUT_IMAGE_SCALE_SETTING, newValue);
                                    this.setState({ outputImageScale: newValue });
                                }}
                                step={MosaicConstants.STEP_OUTPUT_IMAGE_SCALE}
                                min={MosaicConstants.MIN_OUTPUT_IMAGE_SCALE}
                                max={MosaicConstants.MAX_OUTPUT_IMAGE_SCALE}
                            />
                            <ThemeProvider theme={DefaultTheme}>
                                <TextField
                                    style={{ height: 'fit-content', width: '20%' }}
                                    value={this.state.outputImageScale}
                                    onChange={(event) => {
                                        this.checkIfSettingValid(MosaicConstants.OUTPUT_IMAGE_SCALE_SETTING, event.target.value);
                                        this.setState({ outputImageScale: event.target.value });
                                    }}
                                    error={!this.state.outputImageScaleValid}
                                />
                            </ThemeProvider>
                        </div>
                        <Typography
                            variant='body2'
                            className={css(styles.validationMessage)}
                        >
                            {this.state.outputImageScaleValidationMessage}&nbsp;
                        </Typography>
                    </div>
                    <div className={css(styles.settingContainer)}>
                        <Typography
                            variant='h6'
                            className={css(styles.optionLabel)}
                        >
                            Email Results
                        </Typography>
                        <div className={css(styles.emailContainer)}>
                            <Checkbox
                                checked={this.state.sendEmail}
                                onChange={(event) => {
                                    this.checkIfSettingValid(MosaicConstants.SEND_EMAIL_SETTING, event.target.checked);
                                    this.setState({ sendEmail: event.target.checked });
                                }}
                            />
                            <ThemeProvider theme={DefaultTheme}>
                                <TextField
                                    variant='outlined'
                                    className={css(styles.emailTextField)}
                                    placeholder={'Enter the email to send the results to...'}
                                    value={this.state.emailTo}
                                    disabled={!this.state.sendEmail}
                                    onChange={(event) => {
                                        this.checkIfSettingValid(MosaicConstants.EMAIL_TO_SETTING, event.target.value);
                                        this.setState({ emailTo: event.target.value });
                                    }}
                                    InputProps={{
                                        className: css(styles.emailTextFieldInput),
                                        style: { background: this.state.sendEmail ? 'white' : null }
                                    }}
                                />
                            </ThemeProvider>
                        </div>
                        <Typography
                            variant='body2'
                            className={css(styles.validationMessage)}
                        >
                            {this.state.emailToValidationMessage}&nbsp;
                        </Typography>
                    </div>
                    <div className={css(styles.buttonDiv)}>
                        <Button
                            variant='contained'
                            className={css(styles.button, styles.cancelButton)}
                            onClick={() => this.navigateBack()}
                        >
                            <Typography variant='h4'>
                                Cancel
                            </Typography>
                        </Button>
                        <Button
                            variant='contained'
                            className={css(styles.button)}
                            onClick={() => this.saveAndNavigateBack()}
                            disabled={!this.allSettingsValid()}
                        >
                            <Typography variant='h4'>
                                OK
                            </Typography>
                        </Button>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        margin: '40px 20px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justifySelf: 'center',
        '@media (max-width: 549px)': {
            margin: '30px 5px',
        },
    },
    buttonDiv: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px',
    },
    optionLabel: {
        '@media (max-width: 549px)': {
            fontSize: '14px',
        },
    },
    button: {
        width: '400px',
        margin: '0 20px',
        '@media (max-width: 549px)': {
            margin: '0 10px',
            width: '150px',
        },
    },
    cancelButton: {
        backgroundColor: MyMosaicColors.PRIMARY_RED,
        ':hover': {
            backgroundColor: MyMosaicColors.PRIMARY_RED_HOVER,
        }
    },
    slider: {
        width: '100%',
        margin: '5px 20px 5px 0',
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    emailContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: '10px',
    },
    emailTextField: {
        width: '100%',
    },
    emailTextFieldInput: {
        height: '40px',
    },
    settingContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        marginBottom: '20px',
        '@media (max-width: 549px)': {
            marginBottom: '5px',
        },
    },
    validationMessage: {
        color: 'red',
    },
});

const mapStateToProps = (state) => {
    return {
        mosaicNumImages: mosaicNumImagesSelector(state),
        mosaicTilingImageScale: mosaicTilingImageScaleSelector(state),
        mosaicOutputImageScale: mosaicOutputImageScaleSelector(state),
        mosaicSendEmail: mosaicSendEmailSelector(state),
        mosaicEmailTo: mosaicEmailToSelector(state),
    };
};

const mapDispatchToProps = {
    setNumImages,
    setTilingImageScale,
    setOutputImageScale,
    setSendEmail,
    setEmailTo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MosaicSettings);