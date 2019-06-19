import React from 'react';
import TodoItem from './TodoItem'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { brief: '', date: this.getDate(), tasks: this.loadTasks() };
        this.formChanged = this.formChanged.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    //Gets the current date in YYYY-MM-DD format
    getDate = () => {
        var date = new Date();
        return date.toISOString().substr(0,10);
    }

    loadTasks = () => []

    formChanged = (event) => { this.setState({ [event.target.name]: event.target.value }) }
    addTask = (event) => { event.preventDefault() }

    render() {
        return(
            <div>
                <div className="section has-background-white-ter">
                    <h2 className="subtitle">Add new task</h2>
                    <form onSubmit={this.addTask}>
                        <input type="text" name="brief" onChange={this.formChanged} value={this.state.brief} 
                            className="name input" placeholder="Task brief" required />
                        <input type="date" name="date" onChange={this.formChanged} value={this.state.date} 
                            className="date input" />
                        <input type="submit" value="Add Item" className="button is-info" />
                    </form>
                </div>
                <div className="section has-background-white-ter">
                    <h2 className="subtitle">My tasks</h2>
                    <TodoItem brief="Have a quick nap" />
                    <TodoItem brief="Avoid a quick nap" />
                </div>
            </div>
        );
    }
}

export default Todo;