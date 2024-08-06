import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactContainer from './contactContainer';
import EmptyChatCntainer from './emptyChatContainer';
import ChatContainer from './chatContainer';

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
    <div className="flex h-[100vh] text-white overflow-hidden " >
   <ContactContainer/>
   <EmptyChatCntainer/>
   <ChatContainer/>
    </div>
  )
}

export default Chat