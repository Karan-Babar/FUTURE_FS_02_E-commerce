import React, { useEffect,useState } from "react";
import './CSS/Login.css'
import axios from "axios";

const Login = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

 const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password
      });

      alert("Account Created Successfully!");
      console.log(response.data);

    } catch (error) {
      console.error(error);
      alert("Signup Failed");
    }
  };


  return (
    <div className='login'>
      <div className="login-container">
        <h1>Sign Up</h1>
        <div className="login-fields">
          <input type='text' placeholder='Your Name'/>
          <input type='email' placeholder='Email Address'/>
          <input type='password' placeholder='Password'/>
        </div>
        <button>Continue</button>
        <p className='login-login'>Already have an account? <span>Login here</span></p>
        <div className="login-agree">
          <input type='checkbox' name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
