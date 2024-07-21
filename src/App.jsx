import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStype } from './styles/global';
import Router from './components/Router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
            <GlobalStype />
        </ThemeProvider>
    );
}

export default App;
