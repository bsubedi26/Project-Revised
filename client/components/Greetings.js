import React from 'react';
import SignUp from './signup/SignUp';
import { connect } from 'react-redux';
import { addNewData } from '../actions/newDataActions';
import { Link } from 'react-router';
import { CardStack, Card } from 'react-cardstack';

class Greetings extends React.Component {
  
  componentWillUnmount() {
          localStorage.setItem('reloaded', false);      
  }
  render() {
    return (

        <div className="main fullscreen-bg">
            
        <link rel="stylesheet" href="/styles/css/main-page.css" />

          <header className="image-bg-fluid-height">
          
        </header>

        {/* Content Section */}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h1 className="section-heading">Section Heading</h1>
                <p className="lead section-lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p className="section-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, suscipit, rerum quos facilis repellat architecto commodi officia atque nemo facere eum non illo voluptatem quae delectus odit vel itaque amet.</p>
              

<CardStack
    height={500}
    width={400}
    background='#f8f8f8'
    hoverOffset={25}>

    <Card background='#2980B9'>
        <h1>Number 1</h1>
    </Card>

    <Card background='#27AE60'>
        <h1>Number 2</h1>
    </Card>

</CardStack>

              </div>

              <div className="col-lg-6">
                <SignUp />
              </div>

            </div>
          </div>
        </section>

        </div>

      
    );
  }
}

Greetings.propTypes = {
  addNewData: React.PropTypes.func.isRequired,
  newData: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    newData: state.newData
  };
}

export default connect(mapStateToProps, {addNewData })(Greetings);

// export default Greetings;

// <img src="images/banner.jpg" className="bg" />
                
//             <div className="jumbotron main-section">
//                 <Link to="/signup"><h2>Sign Up </h2></Link>

//             </div>
          