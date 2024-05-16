"use client"

import React from 'react'
import Editor from '@monaco-editor/react';

const Codepad = () => {
  return (
    <>
    <Editor height="100vh" defaultLanguage="javascript" defaultValue="// some comment" />
    </>
    
  )
}

export default Codepad
