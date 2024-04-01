import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export function CreateTodo() {
  const navigate=useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const token=localStorage.getItem("token");
      const response=await axios.post('http://localhost:3000/todo',{
        title,
        description
      },{
        headers:{
          token
        }
      })
      alert('Congratulations task added successfully');
      setTitle("");
      setDescription("");
      navigate('/todos');
    } catch (error) {
      console.error('Error while adding task:', error);
      alert(error.response.data.msg);
    }
  };

  return (
    <>
    <div className="flex justify-between  p-2 border-2 rounded h-1/5 bg-black">
      <div>
    </div>
    <div>
    <h1 className="text-center font-bold p-2 text-2xl underline text-white">WELCOME TO TASK MANAGER</h1>
    </div>
    <div>
    <button className="border-2 p-2 bg-red-800 cursor-pointer rounded mr-1 text-white" onClick={()=>{navigate('/todos')}}>All Tasks</button>
    </div>
    </div>

    <div className="flex justify-center bg-slate-300 w-screen h-screen">
    <div className="flex flex-col justify-center border-2 border-black rounded-md w-1/4 h-max mt-12  bg-white">
      <h2 className="text-center   font-bold text-xl underline">ADD TASK</h2>

      <form className="m-5 ml-5 flex flex-col justify-center" onSubmit={addTask}>
      <label className="font-medium ">Task</label>
      <input
        className="border-2 border-black w-9/11 p-3 mb-1 mt-1 text-black"
        autoComplete="off"
        type="text"
        placeholder="Enter the task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label className="font-medium">Description</label>
      <input
        className="border-2 border-black w-9/11 p-3 mb-2 mt-2 text-black"
        autoComplete="off"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className="bg-green-500 text-center w-9/11  p-3 mt-3 text-white font-bold cursor-pointer">ADD TASK</button>
      </form>
    </div>
    </div>
    </>
  );
}
