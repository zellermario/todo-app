import React from 'react';
import Todo from './Todo';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="main container">
        <h1 className="title"><i className="far fa-check-square"></i> Todo List</h1>
        <Todo />
      </div>
    );
  }
}

export default App;
