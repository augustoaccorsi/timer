import { Button } from './components/Button';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStype } from './styles/global';
import React from 'react';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Button variant="primary" />
            <Button variant="secondary" />
            <Button variant="danger" />
            <Button variant="success" />
            <Button />

            <GlobalStype />
        </ThemeProvider>
    );
}

export default App;
