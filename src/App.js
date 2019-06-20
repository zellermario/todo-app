import React from 'react';
import Todo from './Todo';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('todoItems') === null)
      localStorage.setItem('todoItems', JSON.stringify([]));
    if (localStorage.getItem('todoNextID') === null)
      localStorage.setItem('todoNextID', JSON.stringify(1));
    this.items = JSON.parse(localStorage.getItem('todoItems'));
    this.nextID = JSON.parse(localStorage.getItem('todoNextID'));
  }
  render() {
    return (
      <div className="main container">
        <Todo 
          items={this.items} 
          nextID={this.nextID} />
      </div>
    );
  }
}

export default App;
