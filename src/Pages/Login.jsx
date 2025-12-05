import React, { useState, useEffect } from "react";
import "./CSS/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", {
        name,
        email,
        password
      });

      alert("Account Created Successfully!");
      console.log(response.data);

    } catch (error) {
      console.error(error);
      // alert("Signup Failed");
    }
    navigate("/");
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Sign Up</h1>
        <div className="login-fields">
          <input type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button onClick={handleSignup}>Continue</button>

        <p className='login-login'>
          Already have an account? <span>Login here</span>
        </p>

        <div className="login-agree">
          <input type='checkbox' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
