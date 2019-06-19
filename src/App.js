import React from 'react';
import Todo from './Todo';
import './App.css';

class App extends React.Component {

  items = [
    {brief: "Find the bug with oly being able to add one"},
    {brief: "Add delete functionality"},
    {brief: "Make the arrows work"},
    {brief: "Create a local storage"}
  ];

  render() {
    return (
      <div className="main container">
        <Todo items={this.items} />
      </div>
    );
  }
}

export default App;
