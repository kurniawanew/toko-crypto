import React from "react";
import { Link } from "react-router-dom";

const User = {
    new(cb) {
        var fullnameRegister = document.getElementById('register-fullname').value;
        var emailregister = document.getElementById('register-email').value;
        var passwordRegister = document.getElementById('register-password').value;
        fetch("https://reqres.in/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: fullnameRegister,
                email: emailregister,
                password: passwordRegister
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (!result.error) {
                        window.location = "/login";
                    } else {
                        alert(result.error);
                    }
                }
            );
    }
};

class Register extends React.Component {
    register = () => {
        User.new(() => {

        });
    };

    render() {
        return (
            <div id="register">
                <div id="registerForm">
                    <div className="form">
                        <input type="text" placeholder="Fullname" id="register-fullname" />
                    </div>
                    <div className="form">
                        <input type="email" placeholder="Email" id="register-email" />
                    </div>
                    <div className="form">
                        <input type="password" placeholder="Password" id="register-password" />
                    </div>
                    <div className="form">
                        <button type="button" className="button btn-register" onClick={this.register}>REGISTER</button>
                    </div>

                    <div className="form login-link">
                        <Link to="/login">Already registered! Login Me.</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;