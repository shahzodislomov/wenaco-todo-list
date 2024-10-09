'use client';

import Todo from "@/components/todo";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: string; task: string; isEdit: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: uuidv4(),
        task: newTask,
        isEdit: false,
      };
      setTasks((prev) => [...prev, newTaskObject]);
      setNewTask('');
    } else {
      alert('Please enter a task.');
    }
  };

  const handleDelete = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleChange = (id: string) => {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, isEdit: !task.isEdit } : task
    );
    setTasks(updatedTasks);
  };

  const saveEdit = (e: FormEvent<HTMLFormElement>, id: string, updatedTask: string) => {
      e.preventDefault()
      const editedTasks = tasks.map((task) => 
        task.id === id ? { ...task, task: updatedTask,  isEdit: !task.isEdit } : task
      );
      setTasks(editedTasks);
  };

  return (
    <div className='flex flex-col h-screen justify-center items-center bg-gray-100 p-4'>
      <h1 className='text-4xl font-bold text-blue-500 mb-8'>To-Do List</h1>
      
      <form className='flex items-center space-x-4 mb-8' onSubmit={addTask}>
        <input
          className='px-4 py-2 w-64 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-black'
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button 
          className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out'
          type='submit'>
          Add Task
        </button>
      </form>

      <ul className='flex flex-col space-y-2 w-72'>
        {tasks.map((taskObj) => (
          <Todo 
            key={taskObj.id} 
            taskObj={taskObj} 
            handleDelete={handleDelete} 
            handleChange={handleChange} 
            saveEdit={saveEdit} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
