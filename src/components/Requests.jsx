import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestsSlice'

const Requests = () => {
    
    const dispatch=useDispatch()
    const requests=useSelector(store=>store.requests)

    const reviewRequest=async(status,id)=>{
        try{
            const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})
            dispatch(removeRequest(id))
        }
        catch(err){

        }
    }

    const getAllRequests=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
            dispatch(addRequests(res.data.data))
        }
        catch(err){

        }
    }

    useEffect(()=>{
        getAllRequests()
    },[])

    if(!requests) return
    if(requests.length===0) return <h1 className='flex justify-center my-10'>No requests found</h1>

    return (
    <div>
      <div className=''>
        <h1 className='font-bold text-2xl text-center' >Requests</h1>
      </div>
      <div className='w-1/2  mx-auto my-3'>
        {requests.map(request=>{
        
        const{photoUrl,firstName,lastName,age,gender,about}=request.fromUserId;
        return (
          <div className='flex justify-between bg-base-300 my-3 rounded-lg'>
            <div className='flex'>
                <div className='w-28 m-3'>
                    <img className='rounded-full' src={photoUrl}/>
                </div>
                <div className='m-3'>
                    <h1 className='font-bold'>{firstName+" "+lastName}</h1>
                    {age&&gender&& <p>{age+", "+gender}</p>}
                    <p>{about}</p>
                </div>
            </div>    
            <div className='flex items-center '> 
                <button className="btn btn-primary" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                <button className="btn btn-secondary mx-6" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
            </div>
          </div> 
        )}
        )}
      </div>
    </div>
  )
}

export default Requests