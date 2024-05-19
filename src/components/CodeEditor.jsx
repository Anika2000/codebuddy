import React, {useState, useContext, useEffect} from 'react'
import Editor from '@monaco-editor/react';
import AppContext from './AppContext';

const CodeEditor = ({
    code = '',
    }) => {

    const [editorCode, setEditorCode] = useState(code);
    const { value } = useContext(AppContext);
    const [socket, setSocket] = useState(null);

    const onChange = (action, data) => {
        switch (action) {
          case "code": {
            setEditorCode(data);
            break;
          }
          default: {
            console.log("case not handled!");
          }
        }
      };

    
    const handleEditorChange = (newValue) => {
      console.log("here 2")
      setEditorCode(newValue);
      onChange('code', newValue);
  
      // Send the new code to the server via WebSocket
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("do i come here?")
        socket.send(JSON.stringify({ type: 'code_change', code: newValue }));
        console.log('Sent message:', newValue);
      }
    };

  useEffect(() => {
    console.log("here")
    const socketInstance = new WebSocket('ws://localhost:8000/ws/socket-server/');

    socketInstance.onopen = () => {
      console.log('WebSocket connection established');
    };

    socketInstance.onmessage = (event) => {
      console.log("hi")
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      if (message.type === 'code_change') {
        setEditorCode(message.code);
      }
    };

    socketInstance.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, []);



    return (
        <Editor
            height="100vh"
            language={value}
            value={editorCode}
            theme= "vs-dark"
            onChange={handleEditorChange}
        />
    );
}

export default CodeEditor
