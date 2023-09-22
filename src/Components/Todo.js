import React, { useState } from 'react';
import './Todo.css'

const TodoList = () => {
  const [task, setTask] = useState('');
  const [toDoList, setToDoList] = useState([
    {
      id: 1,
      name: 'task1',
    },
    {
      id: 2,
      name: 'task2',
    },
  ]);
  const [editMode, setEditMode] = useState(null); // Track the item being edited
  const [editTask, setEditTask] = useState('');

  const addHandler = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      const newTask = {
        id: Math.random(),
        name: task,
      };
      setToDoList([...toDoList, newTask]);
      setTask('');
    }
  };

  const deleteHandler = (taskId) => {
    const updatedToDoList = toDoList.filter((item) => item.id !== taskId);
    setToDoList(updatedToDoList);
  };

  const editHandler = (taskId) => {
    const taskToEdit = toDoList.find((item) => item.id === taskId);
    if (taskToEdit) {
      setEditMode(taskId); // Set the item to edit
      setEditTask(taskToEdit.name);
    }
  };

  const saveEditHandler = (taskId) => {
    const updatedToDoList = toDoList.map((item) => {
      if (item.id === taskId) {
        return { ...item, name: editTask };
      }
      return item;
    });
    setToDoList(updatedToDoList);
    setEditMode(null); // Clear edit mode
    setEditTask('');
  };

  return (
    <div id="todo">
      <p>This is the value: {task}</p>
      <form onSubmit={addHandler}>
        <input
          className='add-task'
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDoList.map((item) => (
          <li key={item.id}>
            {editMode === item.id ? (
              <div>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={() => saveEditHandler(item.id)}>Save</button>
              </div>
            ) : (
              <p>{item.name}</p>
            )}
            <button onClick={() => editHandler(item.id)}>Edit</button>
            <button onClick={() => deleteHandler(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
