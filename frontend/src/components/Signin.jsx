import { Heading } from "../smallcomponents/Heading";
import { SubTitle } from "../smallcomponents/SubTitle";
import { Inputs } from "../smallcomponents/Inputs";
import { Button } from "../smallcomponents/Button";
import { BottomWarning } from "../smallcomponents/BottomWarninng";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btn,setBtn]=useState('Sign in');
    const navigate = useNavigate();

    async function handleClick(event) {
        event.preventDefault();
        try {
            setBtn('Signing in...');
            const response = await axios.post('http://localhost:4000/signin', {
                email,
                password
            });
            if (response.status===200) {
                const token = response.data.token;
                console.log(token);
                localStorage.setItem("token", "Bearer " + token);
                alert('Welcome back');
                navigate('/create');
            }
            else {
                setBtn('Sign in');
                alert("No user Found...Redirecting you to signup page");
                navigate('/signup');
            }
        } catch (e) {
            setBtn('Sign in');
            console.log(e.response.data);
            alert(e.response.data);
        }
    }

    return (
        <>
            <div className="bg-black min-h-screen flex justify-center items-center">
                <div className="bg-white w-full max-w-md p-2 rounded-md md:w-1/3 px-4 mt-12">
                    <Heading title={"Sign In"} />
                    <SubTitle subtitle={"Enter your credentials to access your account"} />
                    <form onSubmit={handleClick}>
                        <Inputs onChange={(e) => setEmail(e.target.value)} placeholder={"Johndoe@example.com"} label={"Email"} type={"email"} />
                        <Inputs onChange={(e) => setPassword(e.target.value)} placeholder={"password"} label={"Password"} type={"password"} />
                        <Button redirect={btn} />
                    </form>
                    <BottomWarning label={"Don't have an account ?"} to={"/signup"} buttontext={"Sign Up"} />
                </div>
            </div>
        </>
    )
}
