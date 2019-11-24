import React, { Component, useState } from 'react';
import client from '../feathers';
import { useEffect } from 'react'
import { UsersBar } from "../components/UsersBar";
import { MessageBox } from "../components/MessageBox";
import { Grid, Label } from "semantic-ui-react";
import { InputBox } from "../components/InputBox"
import { SketchBox } from "../components/SketchBox"
import { type } from 'os';

interface ChatProps {
  users: any[],
  messages: any[];
}
type windowType = (
  "Chat" | "Sketch"
);

const style = {
  windowLabels: {
    cursor:"pointer"
  }
}

const Chat = (props: ChatProps) => {

  const { users, messages } = props;
  const [window, setWindow] = useState<windowType> ("Chat");

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
              color={window === "Sketch" ? "grey" : "teal" }
              onClick={() => setWindow("Chat")}
             >
                Chat
              </Label>
              <Label 
                style={style.windowLabels}
                color={window === "Chat" ? "grey" : "teal" }
                onClick={() => setWindow("Sketch")}
                >
                Sketch
              </Label>
              {window === "Chat" ? <MessageBox messages={messages}/>  : <SketchBox/>}              
              <InputBox sendMessage={sendMessage}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default Chat;