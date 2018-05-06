import React from 'react';
import { Link } from "react-router-dom";
import { Auth } from './Login';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/toko">Toko Crypto</Link>
                <Link to="/mycrypto">My Crypto</Link>
                <a style={{float: 'right'}} onClick={Auth.signout}>Log Out</a>
            </div>
        )
    }
}

export default Navbar;