import React from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/eventActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Events from './events';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false,
      events: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // send this.state to server
    this.props.createEvent(this.state);

    // var newArray = this.state.events.slice();
    var newArray = [...this.state.events];    
    newArray.push(this.state.title);   
    this.setState({
      events: newArray,
      title: ''
    });

  }

  render() {
    const { title, errors, isLoading } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>Create New Event</h1>

          <TextFieldGroup
            field="title"
            label="Event Title"
            name="title"
            value={title}
            onChange={this.onChange}
            error={errors.title}
          />

          <button type="submit" className="btn btn-primary">Create</button>
        </form>
        <hr />
        <div id="events">
          {
            this.state.events.map(function(event,index) {
              return <Events key={index} event={event} />
            }.bind(this))
          }
        </div>

      </div>
    );
  }
}

EventForm.propTypes = {
  createEvent: React.PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);
