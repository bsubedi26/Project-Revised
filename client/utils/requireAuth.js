import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {

      // If isAuthenticated is false, then redirect user to the login page
      if (!this.props.isAuthenticated) {
        if (this.props.flash.length <= 0) {
          this.props.addFlashMessage({
            type: 'error',
            text: 'You need to login to access this page'
          });
        }
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    flash: React.PropTypes.array    
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      flash: state.flashMessages
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
