import React from 'react';
import{ Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import MosaicPage from '../pages/MosaicPage/MosaicPage';
import MosaicSettings from '../pages/MosaicPage/MosaicSettings'

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
        <Route
            exact
            path='/mosaic/settings'
            component={MosaicSettings}
        />
    </Switch>
);