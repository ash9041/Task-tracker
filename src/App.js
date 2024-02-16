import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';

function App() {
  const [allTodos, setAllTodos] = useState ([]);
  const [newTodoTitle, setNewTodoTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  
  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };
    
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push (newToDoObj);
    
    setAllTodos (updatedTodoArr);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
    setNewDescription ('');
    setNewTodoTitle ('');
  };
  useEffect (() => {
    let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
   if (savedTodos) {
      setAllTodos (savedTodos);
    }
   }, []);
  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice (index,1);
    localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
    setAllTodos (reducedTodos);
  };
  return (
    <div className="App">
     <h1>Task Tracker</h1>
     <div className="todo-wrapper">
      <div className="todo-input">
      <div className="todo-input-item">
      <label>Task:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle (e.target.value)}
              placeholder="Assign Task"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="Task description"
            />
            
            </div>
            <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
            </button>
            </div>
            
          </div>
          <div>
          <h3>List</h3>
        </div>
       <div className="todo-list">
        {allTodos.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete (index)}
                  />
                </div>
              </div>
        ))}
     </div>
    </div>
    </div>
  );
}
export default App;
