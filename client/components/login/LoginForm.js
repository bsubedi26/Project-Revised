import React from 'react';
import axios from 'axios';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var self = this;

    var userData = this.state;

    this.props.login(this.state).then(
      
      (res) => {
        var token = localStorage.getItem('jwtToken');
        console.log(token)
        if (token === null) {
          $("#errorDiv").empty()
          $("#errorDiv").append("<div class='alert alert-danger'>Invalid Credentials</div>")
        }
        else {
          this.context.router.push('/dashboard')
        }
      },
      (err) => {
        console.log('error');
      })

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <div>


      
              <form className="well login-form" onSubmit={this.onSubmit}>
                <h2 id="login-title" className="text-center">Login</h2>
                 <div id="errorDiv"></div>

                  <TextFieldGroup
                    field="identifier"
                    label="Username"
                    value={identifier}
                    error={errors.identifier}
                    onChange={this.onChange}
                  />

                  <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                  />

                  <div className="form-group"><button className="well-button btn btn-primary btn-block btn-lg" disabled={isLoading}>Login</button></div>

              </form>

      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);