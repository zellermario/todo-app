import React from 'react';
import Todo from './Todo';
import './App.css';

class App extends React.Component {

  items = [
    { id: 1, brief: "Find the bug with oly being able to add one", done: true },
    { id: 2, brief: "Add delete functionality", done: true },
    { id: 3, brief: "Make the arrows work"},
    { id: 4, brief: "Create a local storage"}
  ];
  nextID = 5;

  render() {
    return (
      <div className="main container">
        <Todo items={this.items} nextID={this.nextID} />
      </div>
    );
  }
}

export default App;
