'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './dragModule.js';
import Module from './Module.js';
import interact from 'interact.js';

var keyCode = 0;
const Values = [
    "Forward",
    "Backward",
    "Left",
    "Right",
    "For-Loop",
    "While-Loop"
];
var temp = [];
var browserDimensions;
var initalmodulePositions;
var moduleMoved;
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.addElement = this.addElement.bind(this);
        this.dragMoveListener = this.dragMoveListener.bind(this);
        this.state = {
            elements: [],
        }

    }
    componentDidMount() {
        // var rendered = Array.prototype.slice.call(document.querySelectorAll('.module'));
        // var initalmodulePositions = rendered.map((rendered) => {
        //     return rendered.getBoundingClientRect();
        // });
        var dragged;
        this.startDragListen();
        var startPosition;
        var wantedPosition;

        document.addEventListener("dragstart", function(e) {
            dragged = e.target;
            e.dataTransfer.setData('text', 'anything'); //Needed for Firefox and IE
        }, false);

        document.addEventListener("dragover", function(e) {
            wantedPosition = [Math.abs(e.clientX), Math.abs(e.clientY)];
            e.preventDefault();
        }, false);

        document.addEventListener("drop", (e) => {
            if (e.target.id == "workArea") {
                var clone = dragged.cloneNode(true);
                e.target.appendChild(clone);
                clone.className += " draggable inworkArea";
                clone.removeAttribute("draggable");
                clone.style.transform = `translate(${(wantedPosition[0]-30)}px, ${(wantedPosition[1]-20)}px)`;
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
            onmove: this.dragMoveListener,
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

    componentWillUpdate(a, b) {
        // console.log(b)
    }

    addElement(e) {
        if (e.target.className == "moduleData") {
            if (e.target.parentNode.getBoundingClientRect().right <= workAreaPosition[3]) {
                console.log(e.target.parentNode.className.substring(17))
                this.setState({
                    elements: this.state.elements.concat([e.target.firstChild.innerHTML])
                });
            }
        }
    }

    initialModules(Values) {
        return Values.map((Values, index) => {
            return (<Module ref="hello" dragorNah={true} key={index} value={Values} number={index}/>)
        });
    }

    render() {
        this.initialModules(Values)
        return (
            <div id="content">
                <div id="workArea">
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
