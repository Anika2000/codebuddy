"use client";

import React from 'react';
import Editor from '@monaco-editor/react';
import MainLayout from './MainLayout';

const Codepad = () => {
  return (
    <MainLayout 
      childOne={
        <Editor 
          height="100vh" 
          defaultLanguage="javascript" 
          defaultValue="// Start Coding!" 
          theme="vs-dark" 
        />
      } 
      childTwo={<div>Chatbot</div>} 
    />
  );
};

export default Codepad;
