import React from 'react';
import TodoItem from './TodoItem'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            brief: '', 
            date: this.getDate(), 
            items: props.items, 
            nextID: props.nextID,
            lastDeleted: {},
            showUndo: false
        };
    }

    // Returns the current date in YYYY-MM-DD format
    getDate = () => {
        var date = new Date();
        return date.toISOString().substr(0,10);
    }

    // Updates the state when user changes the form
    formChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // Adds the item to 'items' array when the form is submitted
    addItem = (event) => { 
        event.preventDefault(); 
        let items = [...this.state.items];
        let newItem = {
            id: this.state.nextID,
            brief: this.state.brief,
            date: this.state.date,
            done: false
        }
        items.push(newItem);
        let incremented = this.state.nextID + 1;
        this.setState({ items, brief: '',  nextID: incremented });
    }

    // Deletes the item with the id = (event.target.id)
    deleteItem = (event) => {
        let items = [...this.state.items];
        let idToDelete = Number(event.target.id);
        const updated = items.filter((item) => item.id !== idToDelete);
        const deleted = items.filter((item) => item.id === idToDelete)[0];
        this.setState({ items : updated, lastDeleted: deleted});
    }

    undoDelete = (event) => {
        this.addItem()
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
                    <article className={this.state.showUndo ? "message is-warning" : "message is-warning is-hidden"}>
                        <div className="message-header">
                            <p>
                                <span className="trash icon"><i className="far fa-trash-alt"></i></span>
                                <span className="description">Item deleted</span>
                                <span className="undo" onClick={this.undoDelete}>Undo</span>
                            </p>
                            <button className="delete" aria-label="delete"></button>
                        </div>
                    </article>
                    {this.state.items.map((item) => {
                        return (
                            <TodoItem 
                            key={item.id}
                            id={item.id}
                            brief={item.brief}
                            date={item.date}
                            done={item.done} 
                            deletefn={this.deleteItem} />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Todo;