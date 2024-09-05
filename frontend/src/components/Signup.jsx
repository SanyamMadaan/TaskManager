import { Heading } from "../smallcomponents/Heading";
import { SubTitle } from "../smallcomponents/SubTitle";
import { Inputs } from "../smallcomponents/Inputs";
import { BottomWarning } from "../smallcomponents/BottomWarninng";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

export function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      localStorage.removeItem("token");
      const response = await axios.post(
        "http://localhost:4000/signup",
        {
          email,
          firstname,
          lastname,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", "Bearer " + token);
      
      alert("Congratulations..Your account has been created successfully");
      navigate("/create");
    } catch (e) {
      alert(e.response.data.msg);
    }
  }

  return (
    <>
      <div className="bg-black min-h-screen flex justify-center items-center">
        <div className="bg-white w-full max-w-md p-3.5 px-4 rounded-md md:w-1/3 mt-10">
          <Heading title={"Sign Up"} />
          <SubTitle subtitle={"Enter your information to create an account"} />
          <form onSubmit={handleSubmit}>
            <Inputs label={"First Name"} type={"text"} placeholder={"John"} onChange={(e) => setFirstname(e.target.value)} />
            <Inputs label={"Last Name"} type={"text"} placeholder={"Doe"} onChange={(e) => setLastname(e.target.value)} />
            <Inputs label={"Email"} type={"email"} placeholder={"johndoe@example.com"} onChange={(e) => setEmail(e.target.value)} />
            <Inputs label={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)} />
            <button>Sign Up</button>
          </form>
          <BottomWarning label={"Already have an account? "} to={"/"} buttontext={"Sign in"} />
        </div>
      </div>
    </>
  );
}
