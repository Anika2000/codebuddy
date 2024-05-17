import React, { useState } from 'react';
import '../styles/chatstyles.css';
import { IoArrowUpCircleOutline } from "react-icons/io5";



const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Here you could also add the logic to get a response from your bot
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'This is a bot response!', sender: 'bot' }
        ]);
      }, 1000); // Simulate a delay for bot response
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
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
