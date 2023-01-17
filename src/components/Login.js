import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const [credentials,setCredentials]=useState({email:"", password:""})
  let navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyNGMxY2Y0NDc4MWRhOGU5ZWEwYzlmIn0sImlhdCI6MTY2MzQyODQ2Nn0.W6FxekqLphyd4G73V6LyYCY8uEFh2YKA71rF8Df4fws",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if(json.success){
      // save the authtoken and redirect
      localStorage.setItem('token',json.authToken);
      navigate("/",{replace:true})
      props.showAlert("logged in successfully","success")
    }
    else{

      props.showAlert("Invalid Credentials","danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {" "}
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            {" "}
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
