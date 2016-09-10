import React from 'react';
import { observer } from 'mobx-react';

// class Todos extends React.Component {
//   render() {
    
//     return (

//       <div>
//         <h1>Todos</h1>
//       </div>

//     );
//   }
// }

// export default Todos;

@observer
class Todos extends React.Component {
    render() {
        return (
            <div>
            <h1>hai</h1>
            <h1>{this.props.Timer.start}</h1>
            </div>
        )
    }
}

export default Todos;