import React from 'react';
import ReactDOM from 'react-dom';
import './dragModule.js';
import Module from './Module.js';
import interact from 'interact.js';

var keyCode = 0;
const Values = ["Forward", "Backward", "Left", "Right", "For-Loop", "While-Loop"];
var tempElements = [];
var refsforRend = [];
class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.addElement = this.addElement.bind(this);
    this.state = {
      elements: null
    }
  }
  componentDidMount(){
    interact('.draggable').draggable({
        inertia: true,
        restrict: {
            restriction: document.getElementById('workArea'),
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        autoScroll: false,
        onmove: dragMoveListener,
    });

    function dragMoveListener(event) {
        var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    window.dragMoveListener = dragMoveListener;
  }

  componentDidUpdate(a,b){
    // var element = document.getElementById('workArea').children;
    // element[element.length - 1].style.transform = "translate("20"px, "20"px)";
    console.log(a);
  }



  addElement(e){
    if(e.target.className == "moduleData"){
      var m = e.target.firstChild.innerHTML;
      tempElements.push(m);
      var allModules = tempElements.map((tempElements, index) => {
         return <Module dragorNah={true} key={index} value={tempElements} number={index} action1={this.props.action}/>
      });
      this.setState({
        elements: allModules
      })
    }
    }

    initialModules(Values){
      var allModules = Values.map((Values, index) => {
         return <Module dragorNah={false} key={index} value={Values} action={this.addElement}/>
      });
      return allModules
    }

  render() {
    return(
      <div id="content">
          <div id="workArea">
            {this.state.elements}
          </div>
          <div id="modulePicker">
              <div id="moduleTitle">
                  <h1>Modules</h1>
              </div>
                <div id="moduleLocation">{this.initialModules(Values)}</div>
          </div>
      </div>
    )
  }
}

ReactDOM.render(<MainPage/>, document.getElementById('precontent'));
