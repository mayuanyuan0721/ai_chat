"use client"
import Sidebar from "./Sidebar"
import ChatBox from "./ChatBox"
import { useEffect, useState } from "react"


export default function ChatLayout(){
    const [conversationId,setConversationId]=useState<string>("");

    return (
      <div style={{
       display:"flex"
      }}>
      <Sidebar onSelectConversation={
   (id)=>{
     console.log("选择会话:",id);
     setConversationId(id);
   }
 }/>

      
      <div style={{flex:1}}>
        <ChatBox conversationId={conversationId}/>

      </div>
      </div>
    )
}