"use client"
import { useEffect,useState } from "react"
import styles from "@/css/siderbar.module.css"
interface Conversation{
    id:string;
    title:string;
    created_at:string;
    updated_at:string;
}

interface Props{
    onSelectConversation:(id:string)=>void;

}


export default function Sidebar({onSelectConversation}:Props){
    const [conversations,setConversations]=useState<Conversation[]>([]);
    
      const [loading, setLoading] = useState(true);
     useEffect(() => {
    fetch("/api/conversations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json(); // ③ 返回 Promise
      })
      .then((data) => {
         console.log(
        "历史记录:",
        data
    );

         setConversations(
        data.conversations ?? []
    );
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);


    return(
        <div className={styles.sidebar}>
         <h2>历史记录</h2>
            <button className={styles.newChat} onClick={()=>{
            const id=crypto.randomUUID();
             onSelectConversation(id);}}>
                +
                 新聊天
            </button>
            
        {
           conversations.map(item=>{
         return (
       <div key={item.id}className={styles.item}
       onClick={()=>{onSelectConversation(item.id)}}
       >
          {item.title}
       </div>
           )
       })
        }



        </div>

    )
}