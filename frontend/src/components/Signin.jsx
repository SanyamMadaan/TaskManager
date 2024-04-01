import { Heading } from "../smallcomponents/Heading"
import { SubTitle } from "../smallcomponents/SubTitle";
import { Inputs } from "../smallcomponents/Inputs";
import { Button } from "../smallcomponents/Button";
import { BottomWarning } from "../smallcomponents/BottomWarninng";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Signin(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();

    async function handleClick(event){
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signin', {
                email,
                password
            });
            if(response){
                const token=response.data.token;
                localStorage.setItem("token","Bearer "+token);
                alert('welcome back');
                navigate('/create');
            }
            if(!response){
                alert("No user Found...Redirecting you to signup page");
                navigate('/signup');
            }
        } catch (e) {
            alert("No user Found...Redirecting you to signup page");
            navigate('/signup');
            }
            }

return(
    <>
    <div className="flex justify-between  p-2 border-2 rounded h-1/5 bg-black">
    <div>
  </div>
  <div>
  <h1 className="text-center font-bold p-2 text-2xl underline text-white">WELCOME TO TASK MANAGER</h1>
  </div>
  <div>
  </div>
  </div>
    <div className="bg-slate-300 h-screen flex justify-center ">
    <div className="bg-white h-max w-2/4 p-2 rounded md:w-1/4 px-4 mt-12">
        <Heading title={"Sign In"} />
        <SubTitle subtitle={"Enter your crudentials to access your account"}/>
        <form onSubmit={handleClick}>
        <Inputs onChange={(e)=>{
                setEmail(e.target.value);
            }}placeholder={"Johndoe@example.com"} label={"Email"} type={"email"}/>
        <Inputs onChange={(e)=>{
                setPassword(e.target.value);
            }} placeholder={"password"} label={"Password"} type={"password"}/>
        <Button redirect={"Sign in"}></Button>
        </form>
        <BottomWarning label={"Don't have an account ?"} to={"/signup"} buttontext={"Sign Up"}></BottomWarning>
    </div>
    </div>
    </>
)
}