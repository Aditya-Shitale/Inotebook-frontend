import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

  const [credentials,setCredentials]=useState({name:"",email:"", password:"",cpassword:""})
  let navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyNGMxY2Y0NDc4MWRhOGU5ZWEwYzlmIn0sImlhdCI6MTY2MzQyODQ2Nn0.W6FxekqLphyd4G73V6LyYCY8uEFh2YKA71rF8Df4fws",
      },
      body: JSON.stringify({name,email,password }),
    });
    const json = await response.json();
    console.log(json);
   if(json.success){

     // save the authtoken and redirect
     localStorage.setItem('token',json.authToken);
     navigate("/",{replace:true})
     props.showAlert("Successfully created your account","success")
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
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email </label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onChange} id="password" minLength={5} required />
  </div>
 
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required />
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp
