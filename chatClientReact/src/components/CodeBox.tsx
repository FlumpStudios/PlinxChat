import React, { Component, useState, useEffect } from 'react';
import AceEditor from "react-ace";
import {codeInterface} from '../sharedInterfaces/codeInterfaces';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import client from '../feathers';


interface CodeBoxProps{
  apiDate: string;
  codeId:string;
}


export const Codebox = (props: CodeBoxProps) => {
  
const [code, setCode] = useState("");

  const onChange = async (c:string = "") =>  
    await client.service('code').update(props.codeId, {c})
    
  return <AceEditor
    mode="javascript"
    theme="monokai"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    value={props.apiDate}
    editorProps={{ $blockScrolling: true }}
  /> 
}
