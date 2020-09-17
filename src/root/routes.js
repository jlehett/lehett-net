import React from 'react';
import{ Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import HomePage from '../pages/HomePage/HomePage';
import { HomeTheme } from '../themes/home-theme';
import MosaicPage from '../pages/MosaicPage/MosaicPage';

export default (
    <Switch>
        <Route
            exact
            path='/'
            component={HomePage}
        />
        <Route
            exact
            path='/mosaic'
            component={MosaicPage}
        />
    </Switch>
);