import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {RecoilRoot} from "recoil";
import {ThemeProvider} from "styled-components";
import { darkTheme } from './theme';

ReactDOM.render(
    <RecoilRoot>
      <ThemeProvider theme = {darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>,
  document.getElementById('root')
);