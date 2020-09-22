import React from 'react';
import { render } from 'react-dom';
import App from './App.js'

let el = document.createElement('div');
render(<App />, el);
document.body.appendChild(el);
