import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export function TriangleDivEnding(props) {
    return (
        <SvgIcon {...props} style={{ width: '100%', height: '75px' }}>
            <path d="M0 0 L50 100 L100 0 Z"/>
        </SvgIcon>
    )
}