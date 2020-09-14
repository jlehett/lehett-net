import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { colors } from '../../utils/colors';

const styles = theme => ({
    inputLabelRootNonempty: {
        color: 'white',
        '&$focused': {
            color: colors.TEAL_ACCENT,
        }
    },
    inputLabelRootEmpty: {
        color: 'white',
        '&$focused': {
            color: colors.RED_ACCENT,
        }
    },
    inputRootNonempty: {
        borderRadius: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        '& $notchedOutline': {
            borderColor: colors.TEAL_ACCENT,
            transition: 'border-color 0.25s',
        },
        '&:hover $notchedOutline': {
            borderColor: colors.TEAL_ACCENT,
            transition: 'border-color 0.25s',
        },
        '&$focused $notchedOutline': {
            borderColor: colors.TEAL_ACCENT,
            background: 'rgb(52, 235, 180, 0.25)',
            transition: 'border-color 0.25s',
        }
    },
    inputRootEmpty: {
        borderRadius: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        '& $notchedOutline': {
            borderColor: colors.RED_ACCENT,
            transition: 'border-color 0.25s',
        },
        '&:hover $notchedOutline': {
            borderColor: colors.RED_ACCENT,
            transition: 'border-color 0.25s',
        },
        '&$focused $notchedOutline': {
            borderColor: colors.RED_ACCENT,
            background: 'rgb(245, 66, 66, 0.25)',
            transition: 'border-color 0.25s',
        }
    },
    disabled: {},
    focused: {},
    error: {},
    notchedOutline: {},
});

function ContactField(props) {
    const { classes, empty, ...passThruProps } = props;
    return (
        <TextField
            InputLabelProps={{
                classes: {
                    root: empty ? classes.inputLabelRootEmpty : classes.inputLabelRootNonempty,
                    disabled: classes.disabled,
                    focused: classes.focused,
                    error: classes.error,
                }
            }}
            InputProps={{
                classes: {
                    root: empty ? classes.inputRootEmpty : classes.inputRootNonempty,
                    disabled: classes.disabled,
                    focused: classes.focused,
                    error: classes.error,
                    notchedOutline: classes.notchedOutline,
                }
            }}
            {...passThruProps}
        />
    )
}

export default withStyles(styles)(ContactField);