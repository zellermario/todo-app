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
    addItem = (newItem) => { 
        let items = [...this.state.items];
        let nextID = this.state.nextID;
        if (newItem.id === undefined) {
            newItem.id = nextID;
            nextID += 1;
        }
        items.push(newItem);
        this.setState({ items, nextID, brief: '' }, () => {
            localStorage.setItem('todoItems', JSON.stringify(items))
            localStorage.setItem('todoNextID', JSON.stringify(nextID))
        });
    }

    // Deletes the item with the id = (event.target.id)
    deleteItem = (idToDelete) => {
        let items = [...this.state.items];
        const updated = items.filter((item) => item.id !== idToDelete);
        const deleted = items.filter((item) => item.id === idToDelete)[0];
        this.setState({ items : updated, lastDeleted: deleted, showUndo: true}, () =>
            localStorage.setItem('todoItems', JSON.stringify(updated))
        );
        setTimeout(() => {
            this.setState({showUndo: false, lastDeleted: {}});
        }, 5000);
    }

    // Puts the last deleted item back to the items array
    undoDelete = () => {
        this.addItem(this.state.lastDeleted);
        this.setState({showUndo : false});
    }

    moveItem = (direction, id) => {
        let items = [...this.state.items];
        let affectedIndex = 0;
        items.forEach((val, i) => {
            if (val.id === id)
                affectedIndex = i;
        });
        if (direction === 'up' && affectedIndex !== 0)
            [items[affectedIndex - 1], items[affectedIndex]] = [items[affectedIndex], items[affectedIndex - 1]];
        else if (direction === 'down' && affectedIndex !== items.length - 1)
            [items[affectedIndex], items[affectedIndex + 1]] = [items[affectedIndex + 1], items[affectedIndex]];
        this.setState({items});
    }

    render() {
        return(
            <div>
                <h1 className="title"><i className="far fa-check-square"></i> Todo List</h1>
                <div className="section has-background-white-ter">
                    <h2 className="subtitle">Add new task</h2>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.addItem({
                            brief: this.state.brief,
                            date: this.state.date,
                            done: false
                        });
                    }}>
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
                                <span className="trash icon"><i className="fas fa-info"></i></span>
                                <span className="description">Item deleted</span>
                                <span className="undo" onClick={this.undoDelete}>Undo</span>
                            </p>
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
                            deletefn={this.deleteItem}
                            movefn={this.moveItem} />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Todo;
