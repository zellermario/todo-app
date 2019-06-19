import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { brief: props.brief, date: props.date, done: props.done }
        this.toggle = this.toggle.bind(this);
    }
    toggle(event) {
        console.log(event.target.checked);
        this.setState({ done: event.target.checked }, () =>
            console.log(this.props.done)
        );
    }
    render() {
        return (
            <div className="notification is-info">
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
                    <span className="icon"><i className="fas fa-chevron-up"></i></span>
                    <span className="icon"><i className="fas fa-chevron-down"></i></span>
                </div>
                <button className="delete is-medium"></button>
            </div>
        );
    }
}

export default TodoItem;