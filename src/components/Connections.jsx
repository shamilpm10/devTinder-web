import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {
  
    const connections=useSelector(store=>store.connections)
    const dispatch=useDispatch()

  const getAllConnections=async()=>{
    try{
        const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
        dispatch(addConnections(res.data))
    }
    catch(err){
      console.log(err);
      
    }
  }
  
  useEffect(()=>{
    getAllConnections()
  },[])  
  if(!connections) return;
  return (
    <div>
      <div className=''>
        <h1 className='font-bold text-2xl text-center' >Connections</h1>
      </div>
      <div className='w-1/2  mx-auto my-3'>
        {connections.map(connection=>{
        
        const{photoUrl,firstName,lastName,age,gender,about}=connection;
        return (
          <div className='flex bg-base-300 my-3 rounded-lg'>
            <div className='w-28 m-3'>
              <img className='rounded-full' src={photoUrl}/>
            </div>
            <div className='m-3'>
              <h1>{firstName+" "+lastName}</h1>
              {age&&gender&& <p>{age+", "+gender}</p>}
              <p>{about}</p>
            </div>
          </div> 
        )}
        )}
      </div>
    </div>
  )
}

export default Connections