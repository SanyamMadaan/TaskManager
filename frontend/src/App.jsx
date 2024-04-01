import { useEffect, useState} from "react";
import {Todos} from "./components/Todos";
import {CreateTodo} from "./components/CreateTodo";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";

export default function App() {
const [todos, setTodos] = useState([]);
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Signin></Signin>}></Route>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/create" element={<CreateTodo/>}></Route>
    <Route path="/todos" element={<Todos/>} ></Route>
  </Routes>
</BrowserRouter>

  );
}
