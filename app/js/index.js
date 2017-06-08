'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './dragModule.js';
import Module from './Module.js';
import interact from 'interact.js';

const Values = [
  "Forward",
  "Backward",
  "Left",
  "Right",
  "For-Loop",
  "While-Loop"
];
var temp = [];
var initalmodulePositions;
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.dragMoveListener = this.dragMoveListener.bind(this);
    this.state = {
      elements: []
    }

  }
  componentDidMount() {
    this.startDragListen();
    var dragged;
    var wantedPosition;
    var startPosition;
    var clone;
    document.addEventListener("dragstart", function(e) {
      dragged = e.target;
      clone = dragged.cloneNode(true);
      startPosition = [
        Math.abs(e.clientX),
        Math.abs(e.clientY)
      ];
      e.dataTransfer.setData('text', 'anything'); //Needed for Firefox and IE
    }, false);

    document.addEventListener("dragover", function(e) {
      wantedPosition = [
        Math.abs(e.clientX),
        Math.abs(e.clientY)
      ];
      e.preventDefault();
    }, false);

    document.addEventListener("drop", (e) => {
      if (e.target.id == "workArea") {
        e.target.appendChild(clone);
        clone.className += " draggable inworkArea";
        clone.removeAttribute("draggable");
        clone.style.transform = `translate(${ (wantedPosition[0] - 30)}px, ${ (wantedPosition[1] - 20)}px)`;
        clone.setAttribute("data-x", wantedPosition[0]);
        clone.setAttribute("data-y", wantedPosition[1]);
      }
      e.preventDefault();
    }, false);
  }

  startDragListen() {
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
      onmove: this.dragMoveListener
    });
  }
  dragMoveListener(event) {
    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  initialModules(Values) {
    return Values.map((Values, index) => {
      return (<Module ref="hello" dragorNah={true} key={index} value={Values} number={index}/>)
    });
  }

  render() {

    return (
      <div id="content">
        <div id="workArea">
          // {this.initialModules(this.state.elements)}
          <div id="runcodeButton"><img src="../img/playButton.svg"/></div>
        </div>
        <div id="modulePicker">
          <div id="moduleTitle">
            <h1>Modules</h1>
          </div>
          <div id="moduleLocation">
            {this.initialModules(Values)}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <MainPage/>, document.getElementById('precontent'));
