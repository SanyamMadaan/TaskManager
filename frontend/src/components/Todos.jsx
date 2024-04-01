import React, { useState, useEffect } from "react";
import axios from "axios";

export function Todos() {
  const [tasks, setTasks] = useState([]);
  const [access, setAccess] = useState(true);

  async function fetchTasks() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setAccess(true);
        const response = await axios.get(`http://localhost:3000/todos`, {
          headers: {
            token
          }
        });
        setTasks(response.data);
      } else {
        setAccess(false);
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

  return (
    <div className="border-2 border-black rounded-md m-5">
      {access ? (
        tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className="p-2 m-3">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-medium text-xl underline">Task</h1>
                  <span className="font-md text-md">{task.title}</span>
                </div>
                <div className="flex justify-between">
                  <button className="bg-red-800 text-white cursor-pointer mr-1 p-3" onClick={() => deleteTask(task._id)}>Delete</button>
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
      ) : (
        <h1>Alert: You don't have access to this page</h1>
      )}
    </div>
  );
}

export default Todos;
