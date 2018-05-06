import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import AuthApp from './router';

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

render(
    <Provider store={store}>
        <AuthApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
