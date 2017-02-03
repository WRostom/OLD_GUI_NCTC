import React from 'react';
import ReactDOM from 'react-dom';
import Module from './initalModule.js';

var moduleInstances = [];
var keyCode = 0;
class Allmodules extends React.Component {

  constructor(props, keyCount){
    super(props);
    this.createModule = this.createModule.bind(this);
  }

  createModule(e){
    var length = moduleInstances.push(<Module key={keyCode} value={e.target.firstChild.innerHTML} drag="draggable" />);
    ReactDOM.render(<div className="workAreaBuffer" style={{display: 'flex', flexDirection: 'row'}}>{moduleInstances}</div>, document.getElementById('workArea'));
    keyCode++;
  }

  render() {
    const Values = ["Forward", "Backward", "Left", "Right", "For-Loop", "While-Loop"];
    var allModules = Values.map((Values, index) => {
      return <Module key={index} value={Values} drag="" action={this.createModule}/>
    });
    return(
      <div className="moduleWrapper" style={{width: 100 + '%', display: 'flex', flexWrap: 'wrap'}} >{allModules}</div>
    )
  }
}

ReactDOM.render(<Allmodules/>, document.getElementById('moduleLocation'));
