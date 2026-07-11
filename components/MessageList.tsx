import styles from "@/css/page.module.css"
import Message from "./Message"

interface MessageListProps{
   messages:{
    id:number
    role:'user'|'assistant'
    content: string
   }[]
};

export default function MessageLists({messages}:MessageListProps){
    return(
        <div className={styles.Messages}>
              { messages.map((msg)=>(
                <Message key={msg.id} role={msg.role}    content={msg.content}
                />
              ))}
         
        </div>
    )
}