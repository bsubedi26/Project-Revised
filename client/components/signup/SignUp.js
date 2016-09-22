import React from 'react';
import axios from 'axios'

var store = '../../store/Store';

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
        var data = response.data;
        this.setState(data);
        this.context.router.push('/login');
    })
}

  render() {
    
    return (
      <form onSubmit={this.handleSubmit.bind(this)} data-toggle="validator" role="form">
        <div className="form-group">
          <label htmlFor="username" className="control-label">Name</label>
          <input onChange={this.inputChanged.bind(this)} type="text" className="form-control" id="username" placeholder="Pick a Username" required />
        </div>

        <div className="form-group has-feedback">
          <label onChange={this.inputChanged.bind(this)} htmlFor="inputTwitter" className="control-label">Twitter</label>
          <div className="input-group">
            <span className="input-group-addon">@</span>
            <input onChange={this.inputChanged.bind(this)} type="text" pattern="^[_A-z0-9]{1,}$" maxLength={15} className="form-control" id="inputTwitter" placeholder="1000hz" />
          </div>
          <span className="glyphicon form-control-feedback" aria-hidden="true" />
          <div className="help-block with-errors">Hey look, this one has feedback icons!</div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="control-label">Email</label>
          <input onChange={this.inputChanged.bind(this)} type="email" className="form-control" id="email" placeholder="Email" data-error="Bruh, that email address is invalid"  />
          <div className="help-block with-errors" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="control-label">Password</label>
          <div className="form-inline row">
            <div className="form-group col-sm-6">
              <input onChange={this.inputChanged.bind(this)} type="password" data-minlength={1} className="form-control" id="password" placeholder="Password"  />
              <div className="help-block">Minimum of 6 characters</div>
            </div>
            <div className="form-group col-sm-6">
              <input type="password" className="form-control" id="inputPasswordConfirm" data-match="#inputPassword" data-match-error="Whoops, these don't match" placeholder="Confirm"  />
              <div className="help-block with-errors" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="well well-button btn btn-primary btn-block">Submit</button>
        </div>
      </form>
      
    


    )

    }
}

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default SignUp;

   