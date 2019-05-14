import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Switch , Route , Redirect } from 'react-router-dom';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducers'
import * as serviceWorker from './serviceWorker';
import './assets/scss/reset.scss';
import './assets/utils/flexible.debug';
import './assets/utils/flexible_css.debug';

import AuthRouter from './components/authrouter'
import router , { NestedRoute } from './router/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(
    applyMiddleware(thunk),
));

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <AuthRouter></AuthRouter>
                    <Switch>
                        {router.map((route,i) => (
                            <NestedRoute {...route} key={i} />
                        ))}
                        <Redirect from="/" to="/index" exact={true} />
                    </Switch>
                </Fragment>
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
