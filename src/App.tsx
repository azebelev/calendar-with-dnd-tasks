import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { defaultTheme } from './theme';
import { Calendar } from './views/Calendar';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
     <Calendar/>
    </ThemeProvider>
  );
}

export default App;
