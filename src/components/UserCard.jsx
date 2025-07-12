import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    
    const dispatch=useDispatch()
    const {firstName,lastName,age,gender,photoUrl,about,_id}=user
    
    const handleFeed=async (status,id)=>{
      try{
        const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+id,{},{withCredentials:true})
        dispatch(removeFeed(id))
      }
      catch(err){
        
      }
    }

    return (
    <div className="card bg-base-300 w-80 shadow-sm mx-4">
      <figure>
        <img
          src={photoUrl}
          alt="profile picture"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title justify-center">{firstName+" "+lastName}</h2>
        <div className="flex">
          {age&& <p className=" flex justify-center">{age}</p>} 
          {gender&& <p className="flex justify-center">{gender}</p>}
        
        </div>
        <p>{about&&about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary mx-4" onClick={()=>handleFeed("ignored",_id)}>Ignore</button>
          <button className="btn btn-primary"onClick={()=>handleFeed("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
