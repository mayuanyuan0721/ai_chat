import styles from "@/css/page.module.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function MessageList({
  messages,
}: {
  messages: Message[];
}) {
  return (
    <div className={styles.messages}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={
            msg.role === "user"
              ? styles.userMessage
              : styles.aiMessage
          }
        >
          <div className={styles.avatar}>
            {msg.role === "user" ? "U" : "AI"}
          </div>

          <div className={styles.content}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}