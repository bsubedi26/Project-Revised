import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  clicked() {
    // console.log('as')
    // window.location.href='/youtube'
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const username = localStorage.getItem('username');

    // Navigation links if the user is authenticated and logged in
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/midi-archives">Midi Archives</Link></li>
        <li onClick={this.clicked.bind(this)}><Link to="/youtube">Youtube Search</Link></li>
        <li><Link to="/">Hello, { this.props.user.username }</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );
    // Navigation links if the user is not logged in
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/midi-archives">Midi Archives</Link></li>
        <li onClick={this.clicked.bind(this)}><Link to="/youtube">Youtube Search</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Project</Link>
          </div>

          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
