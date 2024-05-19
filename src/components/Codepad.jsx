"use client";

import React from 'react';
import Editor from '@monaco-editor/react';
import MainLayout from './MainLayout';
import Chatbot from './Chatbot';
import CodeEditor from './CodeEditor';

const Codepad = () => {
  return (
    <MainLayout 
      childOne={
        // <Editor 
        //   height="100vh" 
        //   defaultLanguage="javascript" 
        //   defaultValue="// Start Coding!" 
        //   theme="vs-dark" 
        // />
        <CodeEditor code="// Start Coding!"/>
      } 
      // childTwo={<div>Chatbot</div>} 
      childTwo={<Chatbot />}
    />
  );
};

export default Codepad;
