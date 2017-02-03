import React from 'react';
import ReactDOM from 'react-dom';

export default class Module extends React.Component {
    render() {
        return (
            <div className={'module ' + this.props.drag} onMouseDown={this.props.action}>
                <div className="connectionPoint"></div>
                <div className="moduleData">
                    <p>{this.props.value}</p>
                </div>
                <div className="connectionPoint"></div>
            </div>
        );
    }
}
