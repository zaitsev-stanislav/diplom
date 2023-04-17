import React from 'react';
import App from './App';
import './index.scss';
import {compose, createStore} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root')!;
const root = createRoot(container);

const store = createStore(rootReducer, compose(
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

