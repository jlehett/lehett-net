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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { Settings, Error, GetApp } from '@material-ui/icons';
import {
    generateImage,
    setGeneratedImage,
    setUploadedImage,
    setSearchQuery,
} from '../../data/state/mosaic/mosaic.actions';
import {
    mosaicUploadedImageFileSelector,
    mosaicUploadedImageContentSelector,
    mosaicGeneratedImageSelector,
    mosaicSearchQuerySelector,
    mosaicEmailToSelector,
    mosaicSendEmailSelector,
} from '../../data/state/mosaic/mosaic.selectors';
import Header from '../../components/my-mosaic/header';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

class MosaicPage extends Component {
    state = {
        filetypeError: false,
        generatingImage: false,
        hoveringImageArea: false,
        errorGeneratingImage: false,
        displaySendingEmail: false,
    };

    acceptedFiletypes = ['image/png', 'image/jpg', 'image/jpeg'];

    openFileSelectDialog() {
        document.getElementById('file-input').click();
    }

    onFileSelected = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({
                filetypeError: false,
                errorGeneratingImage: false,
            });
            this.props.setGeneratedImage('');
            this.props.setUploadedImage('', '');
            if (!this.acceptedFiletypes.includes(file.type)) {
                this.setState({
                    filetypeError: true
                });
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = readerEvent => {
                    const content = readerEvent.target.result;
                    this.props.setUploadedImage(file, content);
                }
            }
        }
    }

    onFileGenerate = async () => {
        const imgFile = this.props.uploadedImageFile;
        const bingSearch = this.props.searchQuery;
        if (!imgFile || !bingSearch) {

        } else if (this.props.sendEmail) {
            const response = await this.props.generateImage(
                imgFile,
                bingSearch,
            );

            this.setState({
                displaySendingEmail: true,
            });
        } else {
            // We should generate the desired image
            this.setState({
                generatingImage: true,
                errorGeneratingImage: false,
            });
            this.props.setGeneratedImage('');

            const response = await this.props.generateImage(
                imgFile,
                bingSearch,
            );

            this.setState({
                generatingImage: false,
                errorGeneratingImage: response.data.error,
            });
            this.props.setGeneratedImage(response.data.data);
        }
    }

    saveGeneratedImage = () => {
        // Grab the generated image from state
        const generatedImage = this.props.generatedImage;
        // If the generated image does not exist, exit
        if (!generatedImage) return;
        // Else, save the generated image to the user's computer by
        // simulating clicking on a link
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('href', generatedImage);
        link.setAttribute('download', 'generated_mosaic.png')
        link.click();
    }

    renderSendingEmailDialog = () => {
        return (
            <Dialog
                open={this.state.displaySendingEmail}
                onClose={() => this.setState({ displaySendingEmail: false })}
            >
                <DialogTitle disableTypography>
                    <Typography
                        variant='h1'
                        className={css(styles.dialogTitle)}
                    >
                        Generating Image
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={css(styles.dialogText)}>
                        We are generating your photographic mosaic, and we will send an email
                        to <b>{this.props.emailTo}</b> when it is ready. In the meantime, feel
                        free to set up more images to generate!
                        <br/><br/>
                        Generating the image can take a while. If you're not seeing the email in your inbox,
                        be sure to check your spam folder.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => this.setState({ displaySendingEmail: false })}
                        style={{
                            color: MyMosaicColors.PRIMARY_BLUE_HOVER,
                            fontWeight: '600',
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderDialog = () => {
        return (
            <Dialog
                open={this.state.errorGeneratingImage}
                onClose={() => this.setState({ errorGeneratingImage: false })}
            >
                <DialogTitle disableTypography>
                    <Typography
                        variant='h1'
                        className={css(styles.dialogTitle)}
                    >
                        Error Generating Image
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={css(styles.dialogText)}>
                        We had a problem while attempting to generate your
                        mosaic.<br/><br/>If you have scaled the image up in the
                        settings, try scaling it back down a little bit.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => this.setState({ errorGeneratingImage: false })}
                        style={{
                            color: MyMosaicColors.PRIMARY_BLUE_HOVER,
                            fontWeight: '600',
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return (
            <ThemeProvider theme={MyMosaicTheme}>
                <Helmet>
                    <style>{'body { background-color: ' + MyMosaicColors.GRAY_BACKGROUND + '; }'}</style>
                </Helmet>
                <Header/>
                <div className={css(styles.body)}>
                    <div
                        className={css(styles.pictureDiv)}
                        style={{
                            border: this.props.uploadedImageContent || this.props.generatedImage
                                ? null
                                : '2px solid black',
                            background: this.props.uploadedImageContent || this.props.generatedImage
                                ? null
                                : 'white',
                            backgroundImage: this.props.generatedImage
                                ? 'url(' + this.props.generatedImage +')'
                                : this.props.uploadedImageContent
                                ? 'url(' + this.props.uploadedImageContent + ')'
                                : null,
                        }}
                        onClick={() => this.saveGeneratedImage()}
                        onMouseEnter={() => {
                            if (!this.state.hoveringImageArea) {
                                this.setState({ hoveringImageArea: true });
                            }
                        }}
                        onMouseLeave={() => {
                            if (this.state.hoveringImageArea) {
                                this.setState({ hoveringImageArea: false });
                            }
                        }}
                    >
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
                        <div
                            className={css(styles.hoveredImageArea)}
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                opacity: this.state.hoveringImageArea && this.props.generatedImage
                                    ? '1.0'
                                    : '0.0'
                            }}
                        >
                            {
                                this.state.hoveringImageArea && this.props.generatedImage
                                    ? (
                                        <>
                                            <Typography
                                                variant='h6'
                                                className={css(styles.downloadText)}
                                            >
                                                Download Image
                                            </Typography>
                                            <GetApp className={css(styles.downloadIcon)}/>
                                        </>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                    <TextField
                        placeholder='Enter Bing Search'
                        className={css(styles.pageFormItem)}
                        value={this.props.searchQuery}
                        onChange={(event) => this.props.setSearchQuery(event.target.value)}
                    />
                    <Button
                        variant='contained'
                        className={css(styles.pageFormItem)}
                        onClick={() => this.openFileSelectDialog()}
                        disabled={this.state.generatingImage}
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
                            onClick={() => this.onFileGenerate()}
                            disabled={this.state.generatingImage}
                        >
                            <Typography
                                variant='h4'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                {
                                    this.state.generatingImage
                                        ? (
                                            <>
                                                <MediaQuery query={'(min-width: 550px)'}>
                                                    <Loader
                                                        type="TailSpin"
                                                        color='rgba(0, 0, 0, 0.26)'
                                                        height={30}
                                                        width={30}
                                                        style={{
                                                            marginRight: '20px',
                                                            transform: 'translate(0, 3px)',
                                                        }}
                                                    />
                                                    Generating...
                                                </MediaQuery>
                                                <MediaQuery query={'(max-width: 549px)'}>
                                                    <Loader
                                                        type="TailSpin"
                                                        color='rgba(0, 0, 0, 0.26)'
                                                        height={15}
                                                        width={15}
                                                        style={{
                                                            marginRight: '20px',
                                                            transform: 'translate(0, 3px)',
                                                        }}
                                                    />
                                                    Generating...
                                                </MediaQuery>
                                            </>
                                        )
                                        : 'Generate Image'
                                }
                            </Typography>
                        </Button>
                        <Link to='/mosaic/settings'>
                            <IconButton className={css(styles.settingsButton)}>
                                <Settings className={css(styles.settingsIcon)}/>
                            </IconButton>
                        </Link>
                    </div>
                </div>
                { this.renderDialog() }
                { this.renderSendingEmailDialog() }
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
    downloadText: {
        color: 'white',
    },
    downloadIcon: {
        color: 'white',
        fontSize: '36px',
        marginTop: '10px',
    },
    dialogText: {
        fontSize: '16px',
        '@media (max-width: 549px)': {
            fontSize: '14px',
        },
    },
    dialogTitle: {
        fontSize: '20px',
        fontWeight: '600',
        '@media (max-width: 549px)': {
            fontSize: '16px',
        },
    },
    hoveredImageArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        transition: '0.4s',
    },
    pictureDiv: {
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',    
        marginTop: '25px',
        marginBottom: '25px',
        '@media (min-width: 550px)': {
            width: '500px',
            height: '500px',
        },
        '@media (max-width: 549px)': {
            width: '90%',
            height: '250px',
            marginTop: '10px',
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
        uploadedImageFile: mosaicUploadedImageFileSelector(state),
        uploadedImageContent: mosaicUploadedImageContentSelector(state),
        generatedImage: mosaicGeneratedImageSelector(state),
        searchQuery: mosaicSearchQuerySelector(state),
        emailTo: mosaicEmailToSelector(state),
        sendEmail: mosaicSendEmailSelector(state),
    };
};

const mapDispatchToProps = {
    generateImage,
    setGeneratedImage,
    setUploadedImage,
    setSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(MosaicPage);