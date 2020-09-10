import React, { Component } from 'react';
import 'fontsource-roboto';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import HomePage from './pages/HomePage/HomePage';
import { HomeTheme } from './themes/home-theme';

class Root extends Component {
    render() {
        return (
            <ThemeProvider theme={HomeTheme}>
                <Router>
                    <Route path="/" exact component={HomePage}/>
                </Router>
            </ThemeProvider>
        );
    }
}

export default Root;
