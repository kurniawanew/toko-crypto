import React from "react";
import {
    Link,
    Redirect
} from "react-router-dom";

export const Auth = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    authenticate(cb) {
        var emailLogin = document.getElementById('login-email').value;
        var passwordLogin = document.getElementById('login-password').value;
        fetch("https://reqres.in/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailLogin,
                password: passwordLogin
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (!result.error) {
                        localStorage.setItem('token', result.token);
                        localStorage.setItem('user', JSON.stringify(result));
                        window.location = "/toko";
                    } else {
                        alert(result.error);
                    }
                },
                (error) => {
                    alert(error);
                }
            );
    },
    signout(cb) {
        console.log('ini');
        localStorage.removeItem('token');
        window.location = "/login";
    }
};

class Login extends React.Component {
    state = {
        redirectToReferrer: Auth.isAuthenticated
    };

    login = () => {
        Auth.authenticate(() => {
            if (this.isAuthenticated) {
                this.setState({ redirectToReferrer: true });
            }
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/toko" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div id="login">
                <div id="loginForm">
                    <div className="form">
                        <input type="email" placeholder="Email" id="login-email" />
                    </div>
                    <div className="form">
                        <input type="password" placeholder="Password" id="login-password" />
                    </div>
                    <div className="form">
                        <button type="button" className="button btn-login" onClick={this.login}>LOGIN</button>
                    </div>

                    <div className="form register-link">
                        <Link to="/register">Not a member? Sign up now.</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;