/* eslint-disable no-extend-native */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './css/default.css';
import './css/index.css';
import { stringUtil } from './util/stringUtil';

import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

Number.prototype.signed = function () {
    return stringUtil.signed(this);
};

String.prototype.includesIgnoreCase = function (str) {
    return stringUtil.includesIgnoreCase(this, str);
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
