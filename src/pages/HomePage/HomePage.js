import React, { Component, useRef } from 'react';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Paper,
} from '@material-ui/core';
import {
    Menu
} from '@material-ui/icons';
import { StyleSheet, css } from 'aphrodite';
import P5Wrapper from 'react-p5-wrapper';
import { HeaderMedia } from './HeaderP5';
import {
    getElementTop,
    getWindowTop,
    scrollToElement,
    windowAtOrPassedElement,
} from '../../utils/domUtils';
import VisibilitySensor from 'react-visibility-sensor';

export default class HomePage extends Component {
    state = {
        windowHeight: window.innerHeight,
        viewedSection: 'Home',
    }

    handleResize = e => {
        this.setState({
            windowHeight: window.innerHeight,
        });
    }

    setSectionViewedState = (section) => {
        if (this.state.viewedSection !== section) {
            this.setState({viewedSection: section});
        }
    }

    setSectionViewed = () => {
        if (windowAtOrPassedElement('aboutSection')) {
            this.setSectionViewedState('About')
        } else if (windowAtOrPassedElement('homeSection')) {
            this.setSectionViewedState('Home');
        }
    }

    handleScroll = e => {
        const windowTop = getWindowTop();
        this.setSectionViewed();
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    render() {
        return (
            <div>
                <div
                    id='homeSection'
                    className={css(styles.mediaHeaderDiv)}
                    style={{ height: this.state.windowHeight }}
                >
                    <div>
                        <P5Wrapper sketch={HeaderMedia}/>
                    </div>
                    <div className={css(styles.iamDiv)}>
                        <div className={css(styles.iamWrapper)}>
                            <Typography
                                variant='h3'
                                className={css(
                                    styles.iamText,
                                    styles.ralewayFont
                                )}
                            >
                                Hello, I'm <span className={css(styles.emphasizedText, styles.ralewayFont)}>Tanner Lehett.</span>
                                <br/>
                                I'm a full-stack web developer.
                            </Typography>
                        </div>
                    </div>
                </div>
                <div
                    id='aboutSection'
                    className={css(styles.aboutSection)}
                >
                    <Paper className={css(styles.navbar)}>
                        <Toolbar
                            position='static'
                            className={css(styles.toolbar)}
                        >
                            <Button onClick={() => scrollToElement('homeSection')}>
                                <Typography
                                    className={css(styles.ralewayFont)}
                                    style={{ color: this.state.viewedSection === 'Home' ? '#E63462' : 'white'}}
                                >
                                    Home
                                </Typography>
                            </Button>
                            <Button onClick={() => scrollToElement('aboutSection')}>
                                <Typography
                                    className={css(styles.ralewayFont)}
                                    style={{ color: this.state.viewedSection === 'About' ? '#E63462' : 'white'}}
                                >
                                    About
                                </Typography>
                            </Button>
                        </Toolbar>
                    </Paper>
                    <VisibilitySensor>
                        {({isVisible}) =>
                            <div className={css(styles.aboutHeader)}>
                                <Typography
                                    variant='h3'
                                    className={css(styles.ralewayFont)}
                                >
                                    About
                                </Typography>
                                <div
                                    className={css(styles.aboutUnderline)}
                                    style={{ width: isVisible ? '150px' : '0px' }}
                                />
                            </div>
                        }
                    </VisibilitySensor>
                    <div className={css(styles.aboutBody)}>
                        <VisibilitySensor>
                            {({isVisible}) =>
                                <Typography
                                    variant='h5'
                                    className={css(styles.ralewayFont)}
                                    style={{
                                        opacity: isVisible ? '100%' : '0%',
                                        transition: 'opacity 1s'
                                    }}
                                >
                                    I'm an aspiring AI and Web Developer,
                                    <div style={{ height: '10px' }}/>
                                    And I love creating&nbsp;
                                    <a
                                        className={css(styles.emphasizedText)}
                                        href={'https://www.instagram.com/degenerativepixels/'}
                                    >
                                        art
                                    </a>
                                    &nbsp;with code!
                                </Typography>
                            }
                        </VisibilitySensor>
                        <div
                            style={{
                                height: '30px',
                                width: '60%',
                                marginTop: '35px',
                                borderTop: '1px dashed rgba(0,0,0,0.25)',
                            }}
                        />
                        <Typography
                            variant='h6'
                            className={css(styles.ralewayFont)}
                        >
                            I'm passionate about developing automation
                            technologies to give time back to people for
                            the things that they love. I believe that when
                            people are given time to dedicate to the things
                            they are passionate about, creativity thrives!
                        </Typography>
                    </div>
                    <div className={css(styles.aboutBody)}>
                        <Typography
                            variant='h6'
                            className={css(styles.ralewayFont)}
                        >
                            I want to know how
                            I can help&nbsp;
                            <span
                                className={css(styles.emphasizedText)}
                                href={'https://www.instagram.com/degenerativepixels/'}
                            >
                                YOU
                            </span>
                            &nbsp;develop the next product that enriches
                            people's lives through creativity and freedom.
                            Here's a little more about the technologies
                            that I can utilize to help bring your idea
                            to life:
                        </Typography>
                    </div>
                </div>
                <Paper>

                </Paper>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    aboutBody: {
        padding: '0 25%',
        marginTop: '50px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    aboutUnderline: {
        background: 'black',
        height: '3px',
        marginTop: '5px',
        transition: 'width 1s ease',
    },
    aboutHeader: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Raleway',
        fontWeight: '600',
        textAlign: 'center',
    },
    ralewayFont: {
        fontFamily: 'Raleway',
    },
    mediaHeaderDiv: {
        display: 'flex',
        width: '100%',
    },
    iamDiv: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        textAlign: 'center',
    },
    iamWrapper: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iamText: {
        fontWeight: '400',
        color: 'white',
        background: 'rgba(0, 0, 0, 0.9)',
        border: '2px solid #52ffb8',
        padding: '30px',
        boxShadow: '0 0 20px 0 rgba(82, 255, 184, 0.45)',
    },
    emphasizedText: {
        fontWeight: '600',
        color: '#E63462',
    },
    navbar: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#24262b',
        borderRadius: 0,
        borderBottom: '3px solid #52FFB8',
    },
    toolbar: {
        minHeight: '50px',
    },
    aboutSection: {
        
    }
});