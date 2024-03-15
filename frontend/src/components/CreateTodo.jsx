// import { useEffect, useState } from "react";

// export function CreateTodo(){

//     const [title,setTitle]=useState();
//     const [description,setDescription]=useState();
    
//     async function AddTask(){
//         console.log('task is been adding..pls wait');
//         const response=await fetch('http://localhost:3000/todo',{
//           method:"POST",
//           body:JSON.stringify({
//           title:title,
//           description:description
//         })
//         },{
//         headers:{
//             "Content-Type":"application/json"
//         }}
//         );
//         const data=await response.json();
//         alert('task added');
//     }

//     return(
//     <div>
//      <input id="task" type="text" placeholder="Enter the task" onChange={(e)=>{setTitle(e.target.value);}}/> <br/><br/>
//      <input id="desc" type="text" placeholder="description" onChange={(e)=>{setDescription(e.target.value);}}/><br/><br/>
//      <button onClick={AddTask}>Add</button>
//     </div>
//      )
// }
// CreateTodo.jsx
import { useState } from "react";

export function CreateTodo({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      addTodo(data); // Add the new todo to the list
      setTitle(''); // Clear the input fields after adding todo
      setDescription('');
      alert('Task added');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add task');
    }
  };

  return (
    <div>
      <input
        id="task"
        type="text"
        placeholder="Enter the task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br/><br/>
      <input
        id="desc"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br/><br/>
      <button onClick={addTask}>Add</button>
    </div>
  );
}
