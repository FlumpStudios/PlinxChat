import React, { Component } from 'react';
import client from '../feathers';
import { useEffect } from 'react'
import { UsersBar } from "../components/UsersBar";
import { MessageBox } from "../components/MessageBox";
import { Grid } from "semantic-ui-react";
import { InputBox } from "../components/InputBox"
interface ChatProps {
  users: any[],
  messages: any[];
}

const Chat = (props: ChatProps) => {

  const sendMessage = (ev: any) => {
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


  const { users, messages } = props;

  return (
    <Grid >
      <Grid.Row>
      <Grid.Column width={1}>
      </Grid.Column>
        
        
        <Grid.Column width={4}>
          <UsersBar onLogout={() => client.logout()} users={users} />
        </Grid.Column>
        <Grid.Column width={10}>
          <MessageBox messages={messages} />
          <InputBox sendMessage={sendMessage} />
        </Grid.Column>
      </Grid.Row>
    </Grid>)
}

export default Chat;