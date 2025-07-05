import React from "react";

const UserCard = ({user}) => {
    console.log(user);
    const {firstName,lastName,age,gender,photoUrl,about}=user
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
          <button className="btn btn-primary mx-4">Ignore</button>
          <button className="btn btn-primary">Interest</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
