import React from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import LoginPage from '../login/LoginPage';

class SignUp extends React.Component {

constructor(props, context) {
    super(props, context)

    this.state = {

    }
}

componentDidMount() {

}

inputChanged(event) {
    var obj = {}
    obj[event.target.id] = event.target.value
    this.setState(obj)
}

handleSubmit(e) {
 e.preventDefault();
 var userData = this.state;
    axios.post('/api/users/signup', userData).then( (response) => {
        console.log(response)
        var data = response.data;
        if (data.error === false) {
        this.setState(data.user);
        this.context.router.push('/login');
          
        }
    })
}

  render() {
    
    return (
      <form onSubmit={this.handleSubmit.bind(this)} data-toggle="validator" role="form">
        <div className="form-group">
          <label htmlFor="username" className="control-label">Username</label>
          <input onChange={this.inputChanged.bind(this)} type="text" className="form-control" id="username" placeholder="Pick a Username"  required/>
        </div>

        <div className="form-group has-feedback">
          <label htmlFor="inputTwitter" className="control-label">Twitter</label>
          <div className="input-group">
            <span className="input-group-addon">@</span>
            <input onChange={this.inputChanged.bind(this)} type="text" pattern="^[_A-z0-9]{1,}$" maxLength={15} className="form-control" id="inputTwitter" placeholder="1000hz" required/>
          </div>
          <span className="glyphicon form-control-feedback" aria-hidden="true" />
          <div className="help-block with-errors">Hey look, this one has feedback icons!</div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="control-label">Email</label>
          <input onChange={this.inputChanged.bind(this)} type="email" className="form-control" id="email" placeholder="Email" data-error="Bruh, that email address is invalid" required/>
          <div className="help-block with-errors" />
        </div>
        
        <div className="form-group">
        <label htmlFor="password" className="control-label">Password</label>
            <input onChange={this.inputChanged.bind(this)} type="password" data-minlength={5} className="form-control" id="password" placeholder="Password" required />
            <div className="help-block">Minimum of 5 characters</div>

          <div className="form-group">
          <label htmlFor="passwordConfirm" className="control-label">Password Confirm</label>
            <input type="password" className="form-control" data-minlength={5} id="passwordConfirm" data-match="#password" data-match-error="Whoops, these don't match" placeholder="Confirm Password" required />
            <div className="help-block with-errors" />
          </div>
      </div>


        <div className="form-group">
          <button type="submit" className="well well-button btn btn-primary btn-block">Submit</button>
          <h2 className="text-center">Already have an account?</h2>
          <Link to="/login"><button type="submit" className="btn btn-primary btn-block">Login</button></Link>
        </div>
        
      </form>
      
    


    )

    }
}

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default SignUp;

   