import { Segment, Message, Image, Label, TextArea } from "semantic-ui-react";
import Editor from 'react-simple-code-editor';
import React, { Component, useState } from 'react';
import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

const style = {
    codebox : {
        color: "white",
        backgroundColor:"transparent",
        resize:"none"
    }
}

interface CodeBoxProps{

}

export const Codebox = () => {
  
const [code, setCode] = useState("");
  
  const onChange = (c:string) => 
  {
    
    setCode(c);
    console.log(c);
  }

  
  
  return <AceEditor
    mode="javascript"
    theme="monokai"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    value={code}
    editorProps={{ $blockScrolling: true }}
  /> 

}
