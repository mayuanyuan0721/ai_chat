'use client';
import React, { useState } from "react";
import styles from "@/css/page.module.css"

interface InputBoxProps {
  onSend: (text: string) => void;
   disabled?: boolean;
}

export default function InputBox({ onSend,disabled = false  }: InputBoxProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
     if (inputValue.trim() === '' || disabled) {
      return;
    }
    onSend(inputValue.trim());
    setInputValue('')
  };

  // 4. 处理键盘事件（按回车键自动发送）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className={styles.footer}>
      <div className={styles.inputRow}>
        <input type="text"
          placeholder="请输入你要搜索的问题"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}   // 监听键盘按键
        />
        <button className={styles.sentButton} onClick={handleSend}>  {disabled ? '发送中...' : '发送'} </button>
      </div>
    </div>
  )
}
