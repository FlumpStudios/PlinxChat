import React, { Component, useState, useEffect } from 'react';
import AceEditor from "react-ace";
import {codeInterface} from '../sharedInterfaces/codeInterfaces';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import client from '../feathers';

interface CodeBoxProps{
  apiData: codeInterface;
  uid: string;
}
export const Codebox = (props: CodeBoxProps) => {  
const { apiData: apiData, uid } = props;

const [code, setCode] = useState<string>("");

useEffect(() => {
  setCode(props.apiData.c || "");
},[])

  const onChange = async (c:string = "") =>  {    
    const x = {
      uid: uid,
      c:c,
     }
    client.service('code').update(apiData._id, x);
    setCode(c);
  }

  const data = () => {        
    if(apiData.uid != uid) return apiData.c;
    else return code;
  }
  
  return <AceEditor
    style={{width:"100%"}}
    mode="javascript"
    theme="monokai"
    onChange={onChange}
    name="code-editor"
    value={data()}
    highlightActiveLine={true}
    editorProps={{ $blockScrolling: true }}
  /> 
}
