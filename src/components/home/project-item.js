import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Computer } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { colors } from '../../utils/colors';
import Media from 'react-media';

export default class ProjectItem extends Component {
    state = {
        isHovering: false,
    }

    setHovering(isHovering) {
        if (this.state.isHovering !== isHovering) {
            this.setState({
                isHovering
            });
        }
    }

    render() {
        const scaleSmallAdjusted = (Number(this.props.scaleSmall) * 0.65).toString();
        const scaleBigAdjusted = (Number(this.props.scaleBig) * 0.65).toString();

        return (
            <div
                className={css(styles.projectContainer)}
                onMouseEnter={() => this.setHovering(true)}
                onMouseLeave={() => this.setHovering(false)}
                onTouchStart={() => this.setHovering(true)}
                onTouchEnd={() => this.setHovering(false)}
                onClick={() => {
                    window.location = this.props.href
                }}
            >
                <Media queries={{ small: "(max-width: 699px)", verySmall: "(max-width: 499px)" }}>
                    {matches => (
                        <>
                            {
                                matches.verySmall
                                    ? (
                                        <img
                                            src={this.props.backgroundImage}
                                            className={css(styles.backgroundImage)}
                                            style={{
                                                transform: 'translate(' + this.props.translateX + ',' + this.props.translateY + ') scale(' + scaleSmallAdjusted + ')'
                                            }}
                                        />
                                    )
                                    : matches.small
                                    ? (
                                        <img
                                            src={this.props.backgroundImage}
                                            className={css(styles.backgroundImage)}
                                            style={{
                                                transform: this.state.isHovering
                                                    ? 'translate(' + this.props.translateX + ',' + this.props.translateY + ') scale(' + scaleSmallAdjusted + ')'
                                                    : 'translate(' + this.props.translateX + ',' + this.props.translateY + ') scale(' + scaleBigAdjusted + ')'
                                            }}
                                        />
                                    )
                                    : (
                                        <img
                                            src={this.props.backgroundImage}
                                            className={css(styles.backgroundImage)}
                                            style={{
                                                transform: this.state.isHovering
                                                    ? 'translate(' + this.props.translateX + ',' + this.props.translateY + ') scale(' + this.props.scaleSmall + ')'
                                                    : 'translate(' + this.props.translateX + ',' + this.props.translateY + ') scale(' + this.props.scaleBig + ')'
                                            }}
                                        />
                                    )
                            }
                            {
                                !matches.verySmall
                                    ? (
                                        <>
                                            <div
                                                className={css(
                                                    styles.transparentBlackOverlay,
                                                    this.state.isHovering
                                                        ? styles.transparentBlackOverlayHovered
                                                        : styles.transparentBlackOverlayUnhovered
                                                )}
                                            />
                                            <div
                                                className={css(
                                                    styles.projectNameDiv,
                                                    this.state.isHovering
                                                        ? styles.projectNameDivHovered
                                                        : styles.projectNameDivUnhovered
                                                )}
                                            >
                                                <Typography variant='body1' className={css(styles.ralewayFont, styles.projectName)}>
                                                    {this.props.title}
                                                </Typography>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <>
                                            <div
                                                className={css(styles.projectNameDiv, styles.projectNameDivHovered)}
                                            >
                                                <Typography variant='body1' className={css(styles.ralewayFont, styles.projectName)}>
                                                    {this.props.title}
                                                </Typography>
                                            </div>
                                        </>
                                    )
                            }
                        </>
                    )}
                </Media>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    ralewayFont: {
        fontFamily: 'Raleway',
    },
    projectName: {
        margin: '10px',
        fontWeight: '600',
        '@media (min-width: 700px)': {
            fontSize: '1rem'
        },
        '@media (max-width: 699px)': {
            fontSize: '0.75rem',
        },
    },
    projectNameDivHovered: {
        transform: 'translate(0, -100%)',
    },
    projectNameDivUnhovered: {
        transform: 'translate(0, 0)',
    },
    projectNameDiv: {
        position: 'absolute',
        width: '100%',
        top: '100%',
        color: 'white',
        borderTop: '4px solid ' + colors.TEAL_ACCENT,
        background: 'rgba(0, 0, 0, 0.90)',
        transition: '0.25s',
        textAlign: 'center',
    },
    transparentBlackOverlayHovered: {
        background: 'rgba(255, 255, 255, 0.25)',
    },
    transparentBlackOverlayUnhovered: {
        background: 'rgba(0, 0, 0, 0)',
    },
    transparentBlackOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        transition: '0.25s',
    },
    projectContainer: {
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '20px',
        border: '2px solid black',
        boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (min-width: 700px)': {
            width: '250px',
            height: '250px',
            margin: '20px',
        },
        '@media (max-width: 699px)': {
            width: '150px',
            height: '150px',
            margin: '10px',
        },
    },
    backgroundImage: {
        width: 'fit-content',
        height: 'fit-content',
        transition: '0.25s',
    }
});