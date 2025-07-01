import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice" 
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  
  const [emailId,setEmailId]=useState("riyadmahrez@gmail.com")
  const [password,setPassword]=useState("mahrez@123")
  const [error,setError]=useState("")

  const dispatch=useDispatch()
  const navigate= useNavigate()
  const handleLogin=async()=>{
    try{
      const res = await axios.post(BASE_URL+"/login",{
      email:emailId,
      password
      },{withCredentials:true})
      
      dispatch(addUser(res.data.user))
      return navigate("/")
    }
    catch(err){
      setError(err?.response?.data)
    }
    
  }

  return (
    <div className="flex justify-center py-6">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" className="input" value={emailId} onChange={(e)=>{setEmailId(e.target.value)}} placeholder="" />
              
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="" />
              
            </fieldset>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center my-3">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
