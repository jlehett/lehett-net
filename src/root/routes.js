import React from 'react';
import{ Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import HomePage from '../pages/HomePage/HomePage';
import { HomeTheme } from '../themes/home-theme';

export default (
    <Switch>
        <ThemeProvider theme={HomeTheme}>
            <Route
                exact
                path='/'
                component={HomePage}
            />
        </ThemeProvider>
    </Switch>
);