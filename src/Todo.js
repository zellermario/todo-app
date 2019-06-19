import React from 'react';
import TodoItem from './TodoItem'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { brief: '', date: this.getDate(), items: props.items };
    }

    //Returns the current date in YYYY-MM-DD format
    getDate = () => {
        var date = new Date();
        return date.toISOString().substr(0,10);
    }

    formChanged = (event) => {this.setState({ [event.target.name]: event.target.value })}
    addItem = (event) => { 
        event.preventDefault(); 
        let items = [...this.props.items];
        let newItem = {
            brief: this.state.brief.slice(),
            date: this.state.date.slice(),
            done: false
        }
        items.push(newItem);
        console.log(items);
        this.setState({ items: items, brief: '' }, () =>
            console.log(this.props.items)
        );
    }

    render() {
        return(
            <div>
                <h1 className="title"><i className="far fa-check-square"></i> Todo List</h1>
                <div className="section has-background-white-ter">
                    <h2 className="subtitle">Add new task</h2>
                    <form onSubmit={this.addItem}>
                        <input type="text" name="brief" onChange={this.formChanged} value={this.state.brief} 
                            className="name input" placeholder="Task brief" required />
                        <input type="date" name="date" onChange={this.formChanged} value={this.state.date} 
                            className="date input" />
                        <input type="submit" value="Add Item" className="button is-info" />
                    </form>
                </div>
                <div className="section has-background-white-ter">
                    <h2 className="subtitle">My tasks</h2>
                    {this.state.items.map((item, index) => {
                        return (
                            <TodoItem key={index}
                            brief={item.brief}
                            date={item.date}
                            done={item.done}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Todo;