import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Todos() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`http://localhost:3000/todos`, {
          headers: {
            token
          }
        });
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function deleteTask(taskId) {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/delete?id=${taskId}`);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        alert('Task deleted successfully');
      } catch (error) {
        console.error('Error while deleting task:', error);
        alert('Error while deleting task');
      }
    }
  }

  async function editTask(taskId) {
    // Find the task with the given taskId
    const taskToEdit = tasks.find(task => task._id === taskId);
    
    // Prompt the user with the existing task and description as default values
    let title = prompt("Enter the modified task", taskToEdit.title);
    let description = prompt("Enter the modified description", taskToEdit.description);
    
    try {
      const response = await axios.post(`http://localhost:3000/update?id=${taskId}`, {
        title,
        description
      });
      console.log(response);
      if(response.status==200){
        alert('Task updated successfully');
        const updatedTasks = tasks.map(task => {
          if (task._id === taskId) {
              return {
                  ...task,
                  title,
                  description
              };
          }
          return task;
      });
      setTasks(updatedTasks);
      }
      else{
        alert("Error while updating task");
      }
      
    } catch (e) {
      alert('Error while updating task');
      console.error('Error while updating task:', e);
    }
  }
  
  return (
    <div className=" m-5">
    
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className="p-2 m-3 border-2 border-black rounded-md">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-medium text-xl underline">Task</h1>
                  <span className="font-md text-md">{task.title}</span>
                </div>
                <div className="flex justify-between">
                  <button className="bg-red-800 text-white cursor-pointer mr-1 p-3" onClick={() => deleteTask(task._id)}>Delete</button>
                  <button className="bg-green-500 text-white cursor-pointer mr-2 p-3" onClick={()=>editTask(task._id)}>EDIT</button>
                </div>
              </div>
              <h2 className="font-medium text-xl underline">Description</h2>
              <span>{task.description}</span>
              <hr className="bg-black" />
            </div>
          ))
        ) : (
          <h1>No tasks added yet</h1>
        )
        }
    </div>
  );
}

export default Todos;
