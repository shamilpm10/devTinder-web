import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from "../utils/feedSlice"
import UserCard from './UserCard'

const Feed = () => {
  const feedData=useSelector(store=>store.feed)
  const dispatch=useDispatch()

  const getFeed=async ()=>{
    if(feedData) return;
    try{
      const res= await axios.get(BASE_URL+"/user/feed",{withCredentials:true})
      dispatch(addFeed(res.data))
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getFeed()
  },[])

  return feedData&& (
    <div className='flex justify-center'>
      <div>
        <UserCard user={feedData[0]}/>
      </div>
    </div>
  )
}

export default Feed