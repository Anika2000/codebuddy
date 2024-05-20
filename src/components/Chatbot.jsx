import React, { useState } from 'react';
import '../styles/chatstyles.css';
import { IoArrowUpCircleOutline } from "react-icons/io5";



const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      // response from bot
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: input }] })
  
        });
        const data = await response.json();
        if (response.ok) {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: data.response.content, sender: 'bot' }
          ]);
        }else {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'An error occurred', sender: 'bot' }
          ]);
        }

      }catch (error) {
        console.error('Error:', error);
      }
    }
  };
 
  return (
    <div className="chat-container" style={{
      position: 'sticky',
      top: 0,
      bottom: 0,
      right: 0,
      height: '100vh',
      maxHeight: '100vh',
      overflowY: 'auto'
    }}>
      <div className="chat-messages" style={{ overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <IoArrowUpCircleOutline className='h-10 w-10 cursor-pointer send-icon text-black' onClick={sendMessage}/>

      </div>
    </div>
  );
};

export default Chatbot;
