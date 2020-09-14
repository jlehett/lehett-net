import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Paper,
    TextField,
} from '@material-ui/core';
import {
    Menu, WebAsset, People, ChevronLeft, ChevronRight, DoubleArrow
} from '@material-ui/icons';
import { Robot } from '../../assets/svg-icons/robot';
import { GitHub } from '../../assets/svg-icons/github';
import { LinkedIn } from '../../assets/svg-icons/linkedin';
import { Instagram } from '../../assets/svg-icons/instagram';
import { TriangleDivEnding } from '../../assets/svg-icons/triangle-div-ending';
import { StyleSheet, css } from 'aphrodite';
import P5Wrapper from 'react-p5-wrapper';
import { HeaderMedia } from './HeaderP5';
import {
    getElementTop,
    getWindowTop,
    scrollToElement,
    windowAtOrPassedElement,
    scrollToTop,
} from '../../utils/domUtils';
import VisibilitySensor from 'react-visibility-sensor';
import { colors } from '../../utils/colors';
import ProjectItem from '../../components/home/project-item';
import ComputerGraphicsPNG from '../../assets/project-backgrounds/computer-graphics-project.png';
import ComputerVisionPNG from '../../assets/project-backgrounds/computer-vision.png';
import NeuralSmithingPNG from '../../assets/project-backgrounds/neural-smithing.png';
import NeuroStylePNG from '../../assets/project-backgrounds/neurostyle.png';
import PotentialFieldPNG from '../../assets/project-backgrounds/potentialfield.png';
import RayTracingPNG from '../../assets/project-backgrounds/ray-tracing-vis.png';
import Media from 'react-media';
import Div100vh from 'react-div-100vh';
import { contactMe } from '../../data/state/contact-me/contact-me.actions';
import ContactField from '../../components/home/contact-field';

class HomePage extends Component {
    state = {
        windowHeight: window.innerHeight,
        viewedSection: 'Home',
        selectedTechCategoryIndex: 0,
        errorSendingMessage: false,
        errorMessage: '',
        emptyField: false,
        messageSent: false,
    };

    webTechnologies = [
        'JavaScript / TypeScript',
        'Node.js',
        'MongoDB',
        'MySQL',
        'Express',
        'Apache',
        'PHP',
        'Angular',
        'React',
    ];
    aiTechnologies = [
        'Python',
        'NumPy',
        'Pandas',
        'TensorFlow',
        'Keras',
        'PyTorch',
    ];
    adminTechnologies = [
        'Agile Practices',
        'JIRA Project Management',
        'Gantt Charts',
        'Tech Design Documents',
        'Amazon Web Services',
        'Bash Shell Scripting',
        'Git',
    ];
    techCategories = [
        'Web',
        'AI',
        'Admin',
    ];
    techCategoryIcons = [
        <WebAsset className={css(styles.categoryIconMobile)}/>,
        <Robot className={css(styles.categoryIconMobile)}/>,
        <People className={css(styles.categoryIconMobile)}/>
    ];

    async sendEmail() {
        const fromName = document.getElementById('contactName').value;
        const fromEmail = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        if (fromName && fromEmail && message) {
            const response = await this.props.contactMe(
                fromName,
                fromEmail,
                message
            );
            this.setState({
                errorSendingMessage: response.error,
                errorMessage: response.message,
                messageSent: true,
            });
        } else {
            this.setState({
                errorSendingMessage: false,
                errorMessage: '',
                emptyField: true,
            });
        }
    }

    getSelectedTechCategory() {
        return this.techCategories[this.state.selectedTechCategoryIndex];
    }

    handleChangeTechCategory(direction) {
        this.setState((previousState) => {
            const previousIndex = previousState.selectedTechCategoryIndex;
            let moduloIndex = (previousIndex + direction) % this.techCategories.length;
            if (moduloIndex < 0) moduloIndex = this.techCategories.length + moduloIndex;
            return {
                selectedTechCategoryIndex: moduloIndex
            };
        });
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
        if (windowAtOrPassedElement('contactSection', 'toolbar')) {
            this.setSectionViewedState('Contact');
        } else if (windowAtOrPassedElement('projectSection', 'toolbar')) {
            this.setSectionViewedState('Projects');
        } else if (windowAtOrPassedElement('aboutSection', 'toolbar')) {
            this.setSectionViewedState('About');
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

    renderTechnologyItem(tech) {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: '4px', minWidth: '4px', height: '8px', minHeight: '8px', background: colors.RED_ACCENT, margin: '0 4px 0 8px' }}/>
                <Typography
                    variant='body1'
                    className={css(styles.techItem)}
                    style={{ overflowWrap: 'break-word', padding: '4px', fontSize: '18px' }}
                >
                    {tech}
                </Typography>
            </div>
        );
    }

    renderTechnologyItemMobile(tech) {
        return (
            <Typography
                variant='body1'
                className={css(styles.techItem)}
                style={{ overflowWrap: 'break-word', padding: '4px', fontSize: '18px' }}
            >
                {tech}
            </Typography>
        )
    }

    renderTechnologiesSectionDesktop() {
        return (
            <div className={css(styles.technologiesSection)}>
                <Paper className={css(styles.technologyCard)}>
                    <div className={css(styles.techSectionsWrapper)}>
                        <div className={css(styles.webSection, styles.techSection, styles.borderSection)}>
                            <div className={css(styles.techSectionHeader)}>
                                <div className={css(styles.categoryIconWrapper)}>
                                    <WebAsset className={css(styles.categoryIcon)}/>
                                </div>
                                <Typography className={css(styles.categoryHeaderText)} variant='h5'>
                                    Web
                                </Typography>
                            </div>
                            <div className={css(styles.techSectionBody)}>
                                { this.webTechnologies.map(tech => this.renderTechnologyItem(tech)) }
                            </div>
                        </div>
                        <div className={css(styles.aiSection, styles.techSection, styles.borderSection)}>
                            <div className={css(styles.techSectionHeader)}>
                                <div className={css(styles.categoryIconWrapper)}>
                                    <Robot className={css(styles.categoryIcon)}/>
                                </div>
                                <Typography className={css(styles.categoryHeaderText)} variant='h5'>
                                    AI
                                </Typography>
                            </div>
                            <div className={css(styles.techSectionBody)}>
                                { this.aiTechnologies.map(tech => this.renderTechnologyItem(tech)) }
                            </div>
                        </div>
                        <div className={css(styles.managementSection, styles.techSection)}>
                            <div className={css(styles.techSectionHeader)}>
                                <div className={css(styles.categoryIconWrapper)}>
                                    <People className={css(styles.categoryIcon)}/>
                                </div>
                                <Typography className={css(styles.categoryHeaderText)} variant='h5'>
                                    Admin
                                </Typography>
                            </div>
                            <div className={css(styles.techSectionBody)}>
                                { this.adminTechnologies.map(tech => this.renderTechnologyItem(tech)) }
                            </div>
                        </div>
                    </div>
                    <Typography
                        variant='h5'
                        className={css(styles.techNote)}
                    >
                        I'm always learning new technologies, so this list is constantly growing!
                    </Typography>
                    <Typography
                        variant='h6'
                        className={css(styles.techProofText)}
                        style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '300' }}
                    >
                        <i>
                            But anyone can say they have this knowledge. Where's the&nbsp;
                            <span
                                className={css(styles.emphasizedText, styles.linkedText)}
                                onClick={() => {
                                    scrollToElement('projectSection', 'toolbar');
                                }}
                            >
                                proof
                            </span>
                            ?
                        </i>
                    </Typography>
                </Paper>
            </div>
        );
    }

    renderTechnologiesSectionMobile() {
        const selectedTechCategory = this.getSelectedTechCategory();
        const selectedTechIcon = this.techCategoryIcons[this.state.selectedTechCategoryIndex];
        let technologiesList = [];
        if (selectedTechCategory === 'Web') {
            technologiesList = this.webTechnologies;
        } else if (selectedTechCategory === 'AI') {
            technologiesList = this.aiTechnologies;
        } else if (selectedTechCategory === 'Admin') {
            technologiesList = this.adminTechnologies;
        }

        return (
            <div className={css(styles.technologiesSectionMobile)}>
                <Paper className={css(styles.technologyCardMobile)}>
                    <div className={css(styles.techCardHeaderMobile)}>
                        <ChevronLeft
                            className={css(styles.changeCategoryIcon)}
                            style={{ margin: '0 25px 0 10px' }}
                            onClick={() => this.handleChangeTechCategory(-1)}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className={css(styles.categoryIconWrapperMobile)}>
                                {selectedTechIcon}
                            </div>
                            <Typography variant='h4' style={{ minWidth: '104px', textAlign: 'center' }}>
                                {selectedTechCategory}
                            </Typography>
                        </div>
                        <ChevronRight
                            className={css(styles.changeCategoryIcon)}
                            style={{ margin: '0 10px 0 25px' }}
                            onClick={() => this.handleChangeTechCategory(1)}
                        />
                    </div>
                    <div className={css(styles.techSectionBodyMobile)}>
                        { technologiesList.map(tech => this.renderTechnologyItemMobile(tech)) }
                    </div>
                </Paper>
            </div>
        );
    }

    renderTechnologiesSection() {
        return (
            <Media queries={{ small: "(max-width: 699px)" }}>
                    {matches => (
                        <>
                            {
                                matches.small
                                    ? this.renderTechnologiesSectionMobile()
                                    : this.renderTechnologiesSectionDesktop()
                            }
                        </>
                    )}
            </Media>
        )
    }

    contactFieldIsEmpty(fieldID) {
        return !(document.getElementById(fieldID).value);
    }

    render() {
        return (
            <div>
                <Div100vh
                    id='homeSection'
                    className={css(styles.mediaHeaderDiv)}
                >
                    <div>
                        <P5Wrapper sketch={HeaderMedia}/>
                    </div>
                    <div className={css(styles.iamDiv)}>
                        <div className={css(styles.iamWrapper)}>
                            <Typography
                                variant='h3'
                                className={css(styles.iamText)}
                            >
                                Hello, I'm <span className={css(styles.emphasizedText)}>Tanner Lehett.</span>
                                <br/>
                                I'm a full-stack web developer.
                            </Typography>
                        </div>
                    </div>
                </Div100vh>
                <Paper className={css(styles.navbar)}>
                    <Toolbar
                        position='static'
                        id='toolbar'
                        className={css(styles.toolbar)}
                    >
                        <Button onClick={() => scrollToElement('homeSection')}>
                            <Typography style={{ color: this.state.viewedSection === 'Home' ? '#E63462' : 'white'}}>
                                Home
                            </Typography>
                        </Button>
                        <Button onClick={() => scrollToElement('aboutSection', 'toolbar')}>
                            <Typography style={{ color: this.state.viewedSection === 'About' ? '#E63462' : 'white'}}>
                                About
                            </Typography>
                        </Button>
                        <Button onClick={() => scrollToElement('projectSection', 'toolbar')}>
                            <Typography style={{ color: this.state.viewedSection === 'Projects' ? '#E63462' : 'white'}}>
                                Projects
                            </Typography>
                        </Button>
                        <Button onClick={() => scrollToElement('contactSection', 'toolbar')}>
                            <Typography style={{ color: this.state.viewedSection === 'Contact' ? '#E63462' : 'white'}}>
                                Contact
                            </Typography>
                        </Button>
                    </Toolbar>
                </Paper>
                <div
                    id='aboutSection'
                    className={css(styles.aboutSection)}
                >
                    <VisibilitySensor>
                        {({isVisible}) =>
                            <div className={css(styles.sectionHeader)}>
                                <Typography variant='h3'>
                                    About
                                </Typography>
                                <div
                                    className={css(styles.headerUnderline)}
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
                                    className={css(styles.introText)}
                                    style={{
                                        opacity: isVisible ? '100%' : '0%',
                                        transition: 'opacity 1s',
                                        zIndex: '1',
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
                            className={css(styles.aboutText)}
                        >
                            I'm passionate about developing automation
                            technologies so that people have more time to
                            do the things that they love. I believe that when
                            people are given this freedom, creativity thrives!
                        </Typography>
                    </div>
                    <div className={css(styles.aboutBody)}>
                        <Typography
                            variant='h6'
                            className={css(styles.aboutText)}
                        >
                            So I want to know how
                            I can help&nbsp;
                            <span
                                className={css(styles.emphasizedText)}
                                href={'https://www.instagram.com/degenerativepixels/'}
                            >
                                YOU
                            </span>
                            &nbsp;develop the next product that enriches
                            people's lives through creativity and freedom.
                            Here's a little more about the technologies and skills
                            that I can utilize to help bring your idea
                            to life:
                        </Typography>
                    </div>
                    { this.renderTechnologiesSection() }
                </div>
                <div
                    className={css(styles.projectSection)}
                    id='projectSection'
                >
                    <div className={css(styles.sectionHeader)}>
                        <Typography variant='h3'>
                            Projects
                        </Typography>
                        <div
                            className={css(styles.headerUnderline)}
                            style={{ width: '200px'}}
                        />
                    </div>
                    <div>
                        <Typography
                            variant='h6'
                            className={css(styles.projectNote)}
                            style={{ marginTop: '20px' }}
                        >
                            Just click on a project to learn more!
                        </Typography>
                    </div>
                    <div
                        className={css(styles.projectList)}
                    >
                        <ProjectItem
                            backgroundImage={ComputerGraphicsPNG}
                            title='WebGL Filters Project'
                            href='https://github.com/jlehett/Computer-Graphics-Final-Project'
                            translateX='20px'
                            translateY='10px'
                            scaleSmall='0.5'
                            scaleBig='0.75'
                        />
                        <ProjectItem
                            backgroundImage={ComputerVisionPNG}
                            title='Finger Detection Project'
                            href='https://www.youtube.com/watch?v=d0OF191IsJI'
                            translateX='6px'
                            translateY='-7px'
                            scaleSmall='0.5'
                            scaleBig='0.75'
                        />
                        <ProjectItem
                            backgroundImage={NeuralSmithingPNG}
                            title='Neural Network Learning Resource'
                            href='https://github.com/jlehett/Neural-Smithing'
                            translateX='0px'
                            translateY='0px'
                            scaleSmall='0.25'
                            scaleBig='0.45'
                        />
                        <ProjectItem
                            backgroundImage={NeuroStylePNG}
                            title='NeuroStyle Style Transfer'
                            href='https://github.com/jlehett/NeuroStyle'
                            translateX='6px'
                            translateY='20px'
                            scaleSmall='0.3'
                            scaleBig='0.5'
                        />
                        <ProjectItem
                            backgroundImage={PotentialFieldPNG}
                            title='Potential Field Visualization App'
                            href='https://github.com/jlehett/Pytential-Fields'
                            translateX='6px'
                            translateY='-30px'
                            scaleSmall='0.3'
                            scaleBig='0.5'
                        />
                        <ProjectItem
                            backgroundImage={RayTracingPNG}
                            title='Ray Tracing Visualization App'
                            href='https://github.com/jlehett/RayTracingVisualization'
                            translateX='50px'
                            translateY='-20px'
                            scaleSmall='0.3'
                            scaleBig='0.5'
                        />
                    </div>
                </div>
                <div id='contactSection'/>
                <TriangleDivEnding
                    preserveAspectRatio='none'
                    viewBox='0 0 100 102'
                    className={css(styles.triangleDivEnding)}
                />
                <div className={css(styles.contactSection)}>
                    <div className={css(styles.sectionHeader)}>
                        <Typography
                            variant='h3'
                            style={{ color: 'white', fontWeight: '600', marginTop: '30px' }}
                        >
                            Contact
                        </Typography>
                        <div
                            className={css(styles.headerUnderlineWhite)}
                            style={{ width: '200px'}}
                        />
                        <Typography
                            variant='h6'
                            style={{ color: 'white' }}
                            className={css(styles.contactText)}
                        >
                            Get in touch with me! I'm eager to hear from you!
                        </Typography>
                    </div>
                    {
                        this.state.messageSent
                            ? (
                                <div className={css(styles.contactMade)}>
                                    <Typography variant='h6'>
                                        Your message has been sent.
                                        Thanks for reaching out!
                                    </Typography>
                                </div>
                            )
                            : (
                                <div className={css(styles.contactForm)}>
                                    <ContactField
                                        empty={
                                            this.state.emptyField
                                            && this.contactFieldIsEmpty('contactName')
                                        }
                                        onChange={() => {
                                            if (this.state.emptyField) {
                                                this.setState({
                                                    emptyField: false
                                                });
                                            }
                                        }}
                                        id='contactName'
                                        variant='outlined'
                                        label='Name'
                                        className={css(styles.contactFormField)}
                                    />
                                    <ContactField
                                        empty={
                                            this.state.emptyField
                                            && this.contactFieldIsEmpty('contactEmail')
                                        }
                                        onChange={() => {
                                            if (this.state.emptyField) {
                                                this.setState({
                                                    emptyField: false
                                                });
                                            }
                                        }}
                                        id='contactEmail'
                                        variant='outlined'
                                        label='Email'
                                        className={css(styles.contactFormField)}
                                    />
                                    <ContactField
                                        empty={
                                            this.state.emptyField
                                            && this.contactFieldIsEmpty('contactMessage')
                                        }
                                        onChange={() => {
                                            if (this.state.emptyField) {
                                                this.setState({
                                                    emptyField: false
                                                });
                                            }
                                        }}
                                        id='contactMessage'
                                        multiline
                                        rows={4}
                                        variant='outlined'
                                        label='Message'
                                        className={css(styles.contactFormField)}
                                    />
                                    <Button
                                        variant='outlined'
                                        className={css(styles.contactFormField)}
                                        style={{ width: '50%', alignSelf: 'flex-end' }}
                                        onClick={() => this.sendEmail()}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            )
                    }
                </div>
                <div className={css(styles.footer)}>
                    <div
                        className={css(styles.backToTopButton)}
                        onClick={() => scrollToTop()}
                    >
                        <DoubleArrow className={css(styles.backToTopIcon)}/>
                    </div>
                    <div className={css(styles.socialMediaDiv)}>
                        <a
                            className={css(styles.socialMediaLink)}
                            href='https://github.com/jlehett'
                        >
                            <div className={css(styles.socialMediaButtonWrapper)}>
                                <div className={css(styles.socialMediaButton)}>
                                    <GitHub className={css(styles.socialMediaIcon)}/>
                                </div>
                            </div>
                        </a>
                        <a
                            className={css(styles.socialMediaLink)}
                            href='https://www.linkedin.com/in/johnlehett/'
                        >
                            <div className={css(styles.socialMediaButtonWrapper)}>
                                <div className={css(styles.socialMediaButton)}>
                                    <LinkedIn className={css(styles.socialMediaIcon)}/>
                                </div>
                            </div>
                        </a>
                        <a
                            className={css(styles.socialMediaLink)}
                            href='https://www.instagram.com/degenerativepixels/'
                        >
                            <div className={css(styles.socialMediaButtonWrapper)}>
                                <div className={css(styles.socialMediaButton)}>
                                    <Instagram className={css(styles.socialMediaIcon)}/>
                                </div>
                            </div>
                        </a>
                    </div>
                    <Typography
                        variant='body2'
                        style={{
                            textTransform: 'uppercase',
                            color: '#6a8a95',
                            marginTop: '25px',
                            fontSize: '0.85rem',
                        }}
                    >
                        Tanner Lehett
                    </Typography>
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    contactMade: {
        color: colors.TEAL_ACCENT,
        textAlign: 'center',
        margin: '0 10px',
    },
    contactFormEmpty: {
        borderRadius: 0,
        background: 'rgba(0, 0, 0, 0.0)',
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
    },
    contactText: {
        textAlign: 'center',
        '@media (min-width: 600px)': {
            fontSize: '1.25rem',
            padding: '36px 20px',
        },
        '@media (max-width: 599px)': {
            fontSize: '1.0rem',
            padding: '24px 20px',
        },
    },
    socialMediaDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialMediaLink: {
        color: 'white',
        textDecoration: 'none',
    },
    socialMediaButtonWrapper: {
        width: '55px',
        height: '55px',
        margin: '10px 20px',
        '@media (max-width: 429px)': {
            margin: '10px',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialMediaButton: {
        width: '100%',
        height: '100%',
        display: 'flex',
        background: 'rgba(0, 0, 0, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        ":hover": {
            transform: 'scale(0.9)',
            background: colors.TEAL_ACCENT,
            boxShadow: '0 0 10px 0 ' + colors.TEAL_ACCENT,
        },
        transition: 'transform 0.25s, background 0.25s, box-shadow 0.25s',
    },
    socialMediaIcon: {
        fontSize: '25px',  
    },
    backToTopIcon: {
        transform: 'rotate(270deg)',
        color: 'white',
        fontSize: '30px',
    },
    backToTopButton: {
        cursor: 'pointer',
        width: '45px',
        height: '50px',
        background: colors.RED_ACCENT,
        transform: 'translate(0, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.25s',
        ":hover": {
            background: '#f91f7a',
        }
    },
    footer: {
        height: '225px',
        background: colors.GRAY_BACKGROUND,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    contactFormField: {
        margin: '10px 0',
    },
    contactForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        maxWidth: '700px',
        minWidth: '300px',
    },
    techCardHeaderMobile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: '20px 0',
        color: 'white',
        justifyContent: 'center',
        background: colors.GRAY_BACKGROUND,
        borderBottom: '4px solid ' + colors.RED_ACCENT,
    },
    changeCategoryIcon: {
        fontSize: '60px',
        cursor: 'pointer',
        borderRadius: '50%',
        transition: '0.25s',
        '@media (hover: hover)': {
            ":hover": {
                background: 'rgba(255, 255, 255, 0.15)',
            }
        }
    },
    projectNote: {
        '@media (max-width: 699px)': {
            display: 'none',
        },
    },
    categoryHeaderText:  {
        '@media (min-width: 1000px)': {
            fontSize: '1.5em',
        },
        '@media (max-width: 999px)': {
            fontSize: '1.25em',
        }
    },
    techItem: {
        '@media (min-width: 1000px)': {
            fontSize: '18px',
        },
        '@media (max-width: 999px)': {
            fontSize: '14px',
        },
        '@media (max-width: 699px)': {
            fontSize: '18px',
        }
    },
    aboutText: {
        '@media (min-width: 650px)': {
            fontSize: '1.25em',
        },
        '@media (max-width: 649px)': {
            fontSize: '1.0em',
        },
    },
    introText: {
        '@media (min-width: 650px)': {
            fontSize: '1.5em',
        },
        '@media (max-width: 649px)': {
            fontSize: '1.25em',
        },
    },
    triangleDivEnding: {
        color: 'white',
        background: colors.LIGHT_GRAY_BACKGROUND,
        transform: 'translate(0, 7px)',
        display: 'inherit',
    },
    projectList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px',
        width: '100%',
    },
    projectsHeader: {
        textAlign: 'center',
        paddingTop: '36px',
    },
    linkedText: {
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    techNote: {
        padding: '16px 8px 16px 8px',
        borderTop: '1px solid rgba(0, 0, 0, 0.15)',
        width: '95%',
        textAlign: 'center',
        '@media (min-width: 1000px)': {
            fontSize: '1.5em',
        },
        '@media (max-width: 999px)': {
            fontSize: '1.25em',
        },
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
    techProofText: {
        '@media (min-width: 1000px)': {
            fontSize: '1.25em',
        },
        '@media (max-width: 999px)': {
            fontSize: '1.0em',
        },
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
    techSectionBody: {
        width: '100%',
        padding: '10px',
    },
    techSectionBodyMobile: {
        width: '100%',
        padding: '10px 0',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    techSectionHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '8px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.15)'
    },
    borderSection: {
        borderRight: '1px solid rgba(0, 0, 0, 0.15)'
    },
    categoryIcon: {
        color: 'white',
        '@media (min-width: 1000px)': {
            fontSize: '60px',
        },
        '@media (max-width: 999px)': {
            fontSize: '30px',
        },
    },
    categoryIconMobile: {
        fontSize: '60px',
        color: colors.GRAY_BACKGROUND,
    },
    categoryIconWrapper: {
        background: colors.GRAY_BACKGROUND,
        '@media (min-width: 1000px)': {
            width: '70px',
            height: '70px',
        },
        '@media (max-width: 999px)': {
            width: '40px',
            height: '40px',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        border: '3px solid ' + colors.TEAL_ACCENT,
        marginBottom: '8px',
    },
    categoryIconWrapperMobile: {
        background: 'white',
        width: '70px',
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        border: '3px solid ' + colors.RED_ACCENT,
        marginBottom: '8px',
    },
    technologyCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        '@media (min-width: 1410px)': {
            margin: '0 300px',
        },
        '@media (max-width: 1409px)': {
            margin: '0 100px',
        },
        '@media (max-width: 999px)': {
            margin: '0 30px',
        },
        justifyContent: 'space-evenly',
        borderRadius: '20px',
    },
    technologyCardMobile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '30px',
        borderRAdius: '20px',
        transition: '0.25s',
    },
    techSectionsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    techSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '33%',
        padding: '0 8px',
        margin: '16px 0'
    },
    technologiesSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 0',
        background: colors.TEAL_ACCENT,
        marginTop: '50px',
    },
    technologiesSectionMobile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: colors.TEAL_ACCENT,
        marginTop: '50px',
    },
    aboutBody: {
        '@media (min-width: 1410px)': {
            padding: '0 300px',
            marginTop: '50px',
        },
        '@media (max-width: 1409px)': {
            padding: '0 100px',
            marginTop: '25px',
        },
        '@media (max-width: 649px)': {
            padding: '0 25px',
            marginTop: '20px',
        },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerUnderline: {
        background: 'black',
        height: '3px',
        marginTop: '5px',
        transition: 'width 1s ease',
    },
    headerUnderlineWhite: {
        background: 'white',
        height: '3px',
        marginTop: '5px',
        transition: 'width 1s ease',
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (min-width: 1410px)': {
            paddingTop: '50px',
        },
        '@media (max-width: 1409px)': {
            paddingTop: '25px',
        },
    },
    headerText: {
        fontWeight: '600',
        textAlign: 'center',
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
        '@media (min-width: 900px)': {
            fontSize: '3.2em',
        },
        '@media (max-width: 899px)': {
            fontSize: '2.0em',
        },
        '@media (max-width: 599px)': {
            fontSize: '1.5em',
        },
        margin: '30px',
        fontWeight: '400',
        color: 'white',
        background: 'rgba(0, 0, 0, 0.9)',
        border: '2px solid ' + colors.TEAL_ACCENT,
        padding: '30px',
        boxShadow: '0 0 20px 0 rgba(82, 255, 184, 0.45)',
    },
    emphasizedText: {
        fontWeight: '600',
        color: colors.RED_ACCENT,
    },
    navbar: {
        position: 'sticky',
        top: 0,
        backgroundColor: colors.GRAY_BACKGROUND,
        borderRadius: 0,
        borderBottom: '3px solid ' + colors.TEAL_ACCENT,
        zIndex: 2
    },
    toolbar: {
        minHeight: '50px',
        '@media (max-width: 699px)': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px 0 4px',
        },
    },
    aboutSection: {

    },
    projectSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (min-width: 1500px)': {
            margin: '0 300px 80px',
        },
        '@media (max-width: 1499px)': {
            margin: '0 160px 80px',
        },
        '@media (max-width: 1219px)': {
            margin: '0 40px 80px',
        },
        '@media (max-width: 699px)': {
            margin: '0 10px 80px',
        },
    },
    contactSection: {
        background: colors.LIGHT_GRAY_BACKGROUND,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (min-width: 600px)': {
            paddingBottom: '100px',
        },
        '@media (max-width: 599px)': {
            paddingBottom: '75px',
        },
        width: '100%',
    }
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = {
    contactMe
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);