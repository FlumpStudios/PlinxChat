import React, { Component } from 'react';
import client from '../feathers';
import { useEffect } from 'react'
import { UsersBar } from "../components/UsersBar";
import { MessageBox } from "../components/MessageBox";
import { Grid, Image } from "semantic-ui-react";
import { InputBox } from "../components/InputBox"
import backgroundImg from "../assets/world.jpg";

interface ChatProps {
  users: any[],
  messages: any[];
}

const Chat = (props: ChatProps) => {

  const style = {
    backgroundImg: {
      position: "fixed",
      height:"100%",
      width:"100%",
    }
  }

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
    <React.Fragment>
      <Image style={style.backgroundImg} src={backgroundImg} />
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
              <MessageBox messages={messages} />
              <InputBox sendMessage={sendMessage} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default Chat;