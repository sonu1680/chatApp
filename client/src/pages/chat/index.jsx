import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {
  const {userInfo}=useAppStore();
  const navigate=useNavigate();

  useEffect(() => {
    console.log(userInfo);
    if (!userInfo.profileSetup) {
      toast("Please set user profile to continue..");
      navigate('/profile')
    }
  }, [userInfo, navigate]);
  
  return (
    <div>{userInfo.firstName}</div>
  )
}

export default Chat