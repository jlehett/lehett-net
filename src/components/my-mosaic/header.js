import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
    colors,
    Typography,
} from '@material-ui/core';
import { MyMosaicColors } from '../../utils/colors';

export default function Header(props) {
    const { ...passThruProps } = props;
    return (
        <div className={css(styles.header)}>
            <Typography variant='h5' className={css(styles.headerText)}>
                MyMosaic
            </Typography>
        </div>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '70px',
        background: MyMosaicColors.PRIMARY_RED,
        display: 'flex',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.5)',
        '@media (max-width: 549px)': {
            height: '45px',
        },
    },
    headerText: {
        alignSelf: 'center',
        marginLeft: '55px',
        color: 'white',
        fontSize: '36px',
        '@media (max-width: 549px)': {
            fontSize: '20px',
            marginLeft: '15px',
        }
    }
});