// import {useEffect, useState } from "react";
// import { CreateTodo } from "./components/CreateTodo";
// export default function App() {
  
// const [todos,setTodos]=useState([]);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/todos');
//       const data = await response.json();
//       console.log(data);
//       setTodos(data);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };

//   fetchData();
// }, []);

//   return (
//       <div>
//         <h1>Welcome to Full Stack Todo App</h1>
//         <CreateTodo></CreateTodo>
//         {todos.map((task)=><Todos title={task.title} description={task.description}></Todos>)}
//     </div>
//   )
// }

// function Todos({title,description}) {
//   return (
//     <div>
//           <h1>{title}</h1>
//           <h3>{description}</h3>
//       </div>
//       )
// }
// App.jsx
import { useEffect, useState } from "react";
import Todos from "./components/Todos"; // Change the import to Todos
import {CreateTodo} from "./components/CreateTodo";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Welcome to Full Stack Todo App</h1>
      <CreateTodo addTodo={addTodo} />
      {todos.map((task) => (
        <Todos key={task.id} title={task.title} description={task.description} />
      ))}
    </div>
  );
}
