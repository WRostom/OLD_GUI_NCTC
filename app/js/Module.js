import React from 'react';


export default class Module extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      draggable: false
    }
  }

  nonDraggable(action, value){
      return(
        <div className='module' onMouseDown={action}>
            <div className="connectionPoint"></div>
            <div className="moduleData">
                <p>{value}</p>
            </div>
            <div className="connectionPoint"></div>
        </div>
      )
  }

  Draggable(action1, action2, value, number){
      return(
        <div className={'module draggable dynamicElement' + number}>
            <div className="connectionPoint" onClick={action2}></div>
            <div className="moduleData" onMouseDown={action1}>
                <p>{value}</p>
            </div>
            <div className="connectionPoint"></div>
        </div>
      )
  }

  render(){
    const dragorNah = this.props.dragorNah;
    if(dragorNah){
      return this.Draggable(this.props.action1, this.props.action2, this.props.value, this.props.number);
    } else {
      return this.nonDraggable(this.props.action, this.props.value);
    }
  }
}
