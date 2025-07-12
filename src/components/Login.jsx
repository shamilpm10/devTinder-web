import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleSignUp=async()=>{
    
    try{
      const res=await axios.post(BASE_URL+"/signup",{firstName,lastName,email:emailId,password},{withCredentials:true})
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    }
    catch(err){
      setError(err?.response?.data);
    }
  }

  return (
    <div className="flex justify-center ">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl">{isLogin? "Login" :"SignUp"}</h2>
          <div>
            {!isLogin&&<>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder=""
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder=""
                />
              </fieldset>{" "}
            </>}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                placeholder=""
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder=""
              />
            </fieldset>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLogin? handleLogin : handleSignUp}>
              {isLogin?"Login": "SignUp"}
            </button>
          </div>
          <p onClick={()=>setIsLogin(!isLogin)} className="text-center cursor-pointer">{isLogin?"Didn't register yet? SignUp now":"Already a user? Login now"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
