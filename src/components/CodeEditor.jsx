import React, {useState} from 'react'
import Editor from '@monaco-editor/react';

const CodeEditor = ({
    onChange,
    language = 'javascript',
    code = '',
    }) => {
    const [value, setValue] = useState(code);
    
    const handleEditorChange = (value) => {
        setValue(value);
        onChange('code', value);
    };
    
    return (
        <Editor
            height="100vh"
            language={language}
            value={value}
            theme= "vs-dark"
            onChange={handleEditorChange}
        />
    );
}

export default CodeEditor
