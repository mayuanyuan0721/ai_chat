"use client"
import Sidebar from "./Sidebar"
import ChatBox from "./ChatBox"
import { useEffect, useState } from "react"


export default function ChatLayout(){
    const [conversationId,setConversationId]=useState<string>("");
    const [refresh,setRefresh]=useState(0);
    useEffect(() => {
  if (!conversationId) {
    setConversationId(crypto.randomUUID());
  }
}, []);
    const handleRefresh=()=>{
        setRefresh(
        pre=>pre+1
    );

    } 
    return (
      <div style={{
       display:"flex"
      }}>
      <Sidebar 
      refresh={refresh}
      onDeleteConversation={
        async (id)=>{
          console.log("删除聊天id",id);
          const res=await fetch(
            `/api/conversations?id=${id}`,
            {method:"DELETE"}
          );
          if(res.ok){
              console.log("删除成功");
              setRefresh(pre=>pre+1)
          }
          if(id===conversationId){
             const newId=crypto.randomUUID();
             setConversationId(newId);
          }
        }
      }
     activeId={conversationId}
     onSelectConversation={
   (id)=>{
     console.log("选择会话:",id);
     setConversationId(id);
   }
 }/>

      
      <div style={{flex:1}}>
        <ChatBox conversationId={conversationId}
        onTitleUpdate={handleRefresh}
        />

      </div>
      </div>
    )
}