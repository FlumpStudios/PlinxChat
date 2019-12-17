import React, { Component, useState } from 'react';
import client from '../feathers';
import { useEffect } from 'react';
import { UsersBar } from "../components/UsersBar";
import { MessageBox } from "../components/MessageBox";
import { Grid, Label } from "semantic-ui-react";
import { InputBox } from "../components/InputBox";
import { SketchBox } from "../components/SketchBox";
import { ISketchData }  from "../sharedInterfaces/sketchInterfaces";
import { UserDetails  as iUserDetails , User } from "../sharedInterfaces/userInterfaces";
import { sketchInfo } from "../sharedInterfaces/sketchInterfaces";
import { codeInterface } from "../sharedInterfaces/codeInterfaces";
import { Codebox } from "../components/CodeBox";

interface ChatProps {
  users: User[],
  messages: any[];
  userId: string;  
  codeList: codeInterface;
  sketchList : sketchInfo[];

  getSketchDataFromApi:Function;
}

type windowType = (
  "Chat" | "Sketch" | "Code"
);

const style = {
  windowLabels: {
    cursor:"pointer"
  }
}

const Chat = (props: ChatProps) => {
  const { 
    users, 
    messages, 
    userId, 
    sketchList, 
    codeList,
    getSketchDataFromApi } = props; 
  const [window, setWindow] = useState<windowType> ("Chat");
  const [cachedUserSketch, setCachedUserSketch] = useState<sketchInfo[]> ([]);  
  
  const sendMessage = (ev: any) => {
    setWindow("Chat");
    const input = ev.target.querySelector('[name="text"]');
    const text = input.value.trim();

    if (text) { 
      client.service('messages').create({ text }).then(() => {
        input.value = '';
      });
    }

    ev.preventDefault();
  }
  

  const scrollToBottom = () => {
    //TODO: Add some scroll to bottom stuff here 
  }

  const handleUpdateSketch = (data: ISketchData) =>
      client.service('sketches').create({ data });
   
  const handleSetToChat = () => 
    setWindow("Chat");

const handleSetToCode = () => 
  setWindow("Code");

  const handleSetToSketch = () => {
    getSketchDataFromApi().then(() => {
      setWindow("Sketch");
    });
    
  }

  useEffect(() => {
    client.service('messages').on('created', scrollToBottom);
    scrollToBottom();
  }, []);

  //Clean up on unmount
  useEffect(() => {
    return () => {
      client.service('messages').removeListener('created', scrollToBottom);
    };
  }, []);  

  const sketchBox = () =>
      <SketchBox 
        users={users} 
        activeUserId={userId}  
        sketchInfo={sketchList} 
        onUpdateSketchInfor={handleUpdateSketch}
        cahedUserSketch={cachedUserSketch}
        setCahedUserSketch={setCachedUserSketch}
        />
  
  const codeBox = () =>
       <Codebox uid={userId} apiData={codeList}/>

  const messageBox = () =>
    <MessageBox messages={messages}/>

   const windowSelector = () => {
      switch (window) {
        case "Chat":
          return messageBox();          
        case "Sketch":
          return sketchBox();
        case "Code":
          return codeBox();     
      }
    }

  return (
    <React.Fragment>      
      <br/>
      <div>
        <Grid >
          <Grid.Row>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={4}>
              <UsersBar onLogout={() => client.logout()} users={users} />
            </Grid.Column>
            <Grid.Column width={10}>
            <Label
              style={style.windowLabels}             
              color={window === "Chat" ? "teal" : "grey" }
              onClick={handleSetToChat}
             >
                Chat
              </Label>
              <Label 
                style={style.windowLabels}
                color={window === "Sketch" ? "teal" : "grey" }
                onClick={handleSetToSketch}
                >
                Sketch
              </Label>
              <Label 
                style={style.windowLabels}
                color={window === "Code" ? "teal" : "grey" }
                onClick={handleSetToCode}
                >
                Code
              </Label>
             {windowSelector()}      
              <InputBox sendMessage={sendMessage}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default Chat;