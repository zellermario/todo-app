import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            id: props.id,
            brief: props.brief, 
            date: props.date, 
            done: props.done ? true : false,
            deletefn: props.deletefn,
            movefn: props.movefn
        }
    }

    // Updates the 'done' property when the checkbox is clicked
    toggle = (event) => this.setState({ done: event.target.checked });

    render() {
        return (
            <div className="task-item notification is-info">
                <label className="checkbox is-inline">
                    <input className="is-medium" type="checkbox" 
                        checked={this.state.done}
                        onChange={this.toggle} />
                    <span className={this.state.done ? "item-name done" : "item-name"}>
                        <strong>{this.state.brief}</strong>
                    </span>
                    <span><em className="item-date">{this.state.date}</em></span>
                </label>
                <div className="arrows">
                    <span className="icon" 
                        onClick={() => this.state.movefn('up', this.state.id)}><i className="fas fa-chevron-up"></i>
                    </span>
                    <span className="icon" 
                        onClick={() => this.state.movefn('down', this.state.id)}><i className="fas fa-chevron-down"></i>
                    </span>
                </div>
                <button className="delete is-medium" onClick={() => this.state.deletefn(this.state.id)}></button>
            </div>
        );
    }
}

export default TodoItem;