import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers'
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(mySaga);
const routing = (
    <Router>
        <div>
            <Route exact path="/" render={() => (<App/>)}
            />
            <Redirect from="*" to="/"/>
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
