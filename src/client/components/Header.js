import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
    console.log('auth status is', auth);
    //we use anchor tags here to make `get` requests to api server which is proxied by the render server
    const authButton = auth ? (
        <a href="/api/logout">Logout</a>
    ) : (
            <a href="/api/auth/google">Login</a>
        );

    return (
        <nav>
            <div className="nav-wrapper purple darken-3">
                <Link to="/" className="brand-logo">React SSR</Link>
                <ul className="right">
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to="/admins">Admins</Link></li>
                    <li>{authButton}</li>
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);
