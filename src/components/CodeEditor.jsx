import React, {useState, useContext} from 'react'
import Editor from '@monaco-editor/react';
import AppContext from './AppContext';

const CodeEditor = ({
    code = '',
    }) => {
    const [editorCode, setEditorCode] = useState(code);
    const { value } = useContext(AppContext);

    const onChange = (action, data) => {
        switch (action) {
          case "code": {
            setCode(data);
            break;
          }
          default: {
            console.log("case not handled!");
          }
        }
      };

    
    const handleEditorChange = (newValue) => {
        setEditorCode(newValue);
        onChange('code', newValue);
    };
    console.log(value);
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
