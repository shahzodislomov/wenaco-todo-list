import React, { FormEvent, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'


interface TodoProps {
  taskObj: {
    id: string;
    task: string;
    isEdit: boolean;
  };
  handleDelete: (id: string) => void;
  handleChange: (id: string) => void;
  saveEdit:  (e: FormEvent, id: string, newText: string ) => void;
}


const Todo: React.FC<TodoProps> = ({ taskObj, handleDelete, handleChange, saveEdit }) => {
  const [newText, setNewText] = useState<string>(taskObj.task)
  return (
    <li className='bg-white px-6 w-full py-3 rounded-lg shadow-md text-gray-700 border-l-4 border-blue-500 flex justify-between'>
      {taskObj.isEdit ? (
        <form onSubmit={(e) => saveEdit(e, taskObj.id, newText)}>
          <input className='outline-none' type="text" placeholder='edit task' value={newText} onChange={(e) => setNewText(e.target.value)} />
        </form>
      ) : (
        <p>{taskObj.task}</p>
      )}
      <div className='flex space-x-5'>
        <button>
          <FaEdit className='text-black' onClick={() => handleChange(taskObj.id)} />
        </button>
        <button onClick={() => handleDelete(taskObj.id)}>
          <FaTrash className='text-black' />
        </button>
      </div>
    </li>
  );
};

export default Todo