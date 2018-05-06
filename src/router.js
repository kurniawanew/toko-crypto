import React from "react";
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import TokoCrypto from './components/App';
import Login, { Auth } from './components/Login';
import Register from './components/Register';
import Transaction from './components/Transaction';

const AuthApp = () => (
    <Router>
        <div>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={Login} />
            </Switch>
            <Route path="/register" component={Register} />
            <PrivateRoute path="/toko" component={TokoCrypto} />
            <PrivateRoute path="/transaksi" component={Transaction} />
        </div>
    </Router>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default connect()(AuthApp);