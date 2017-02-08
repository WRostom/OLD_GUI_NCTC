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
var workAreaPosition;
var workAreaWidth;
var modulePickerWidth;
var initalmodulePositions;
var moduleMoved;
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.addElement = this.addElement.bind(this);
        this.dragMoveListener = this.dragMoveListener.bind(this);
        this.putItem = this.putItem.bind(this);
        this.state = {
            elements: []
        }
        browserDimensions = [document.documentElement.clientHeight, document.documentElement.clientWidth];

    }
    componentDidMount() {
        workAreaWidth = document.getElementById('workArea').clientWidth;
        workAreaPosition = [document.getElementById('workArea').getBoundingClientRect().top, document.getElementById('workArea').getBoundingClientRect().bottom, document.getElementById('workArea').getBoundingClientRect().left, document.getElementById('workArea').getBoundingClientRect().right];
        modulePickerWidth = document.getElementById('modulePicker').clientWidth;
        var rendered = Array.prototype.slice.call(document.querySelectorAll('.module'));
        var initalmodulePositions = rendered.map((rendered) => {
            return rendered.getBoundingClientRect();
        });
        var dragged;
        var offset_data;
        var Dleft;
        var Dtop;
        this.startDragListen();
        document.addEventListener("dragstart", function(e) {
            // store a ref. on the dragged elem
            var style = window.getComputedStyle(e.target, null);
            offset_data = (parseInt(style.getPropertyValue("left"), 10) - e.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY);
            e.dataTransfer.setData("text/plain", offset_data);
            dragged = e.target;
        }, false);

        document.addEventListener("dragover", function(e) {
            var offset = offset_data.split(',');
            dragged.style.left = (e.clientX + parseInt(offset[0], 10)) + 'px';
            dragged.style.top = (e.clientY + parseInt(offset[1], 10)) + 'px';
            e.preventDefault();
        }, false);

        document.addEventListener("dragend", function(e) {
            // dragged.removeAttribute("draggable");
            // dragged.className += " draggable";
            // e.target.setAttribute('data-x', e.target.style.left);
            // e.target.setAttribute('data-y', e.target.style.top);
        }, false);

        document.addEventListener("drop", (e) => {
            if (e.target.id == "workArea") {
                var offset = offset_data.split(',');
                dragged.style.left = (e.clientX + parseInt(offset[0], 10)) + 'px';
                dragged.style.top = (e.clientY + parseInt(offset[1], 10)) + 'px';
                dragged.parentNode.removeChild(dragged);
                e.target.appendChild(dragged);
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
            onend: this.putItem
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

    putItem(e){
      if(e.target.getBoundingClientRect().right <= workAreaPosition[3]){
        e.target.parentNode.removeChild(e.target);
        document.getElementById('workArea').appendChild(e.target);
      }
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
            return (<Module ref="hello" dragorNah={true} key={index} value={Values} number={index} />)
        });
    }

    newModules(Values) {
        return Values.map((Values, index) => {
            return <Module ref="drag" dragorNah={true} key={index} value={Values} number={index}/>
        });
    }

    render() {
        return (
            <div id="content">
                <div id="workArea">
                    {this.newModules(this.state.elements)}
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
