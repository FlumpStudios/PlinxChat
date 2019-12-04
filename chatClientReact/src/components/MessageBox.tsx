import moment from 'moment';
import * as React from 'react';
import { Segment, Message, Image, Label } from "semantic-ui-react";

interface MessageBoxProps {
    messages: any[];
}

export const MessageBox = (props: MessageBoxProps) => {
    let chat: any = null;

    const { messages } = props;
    return (
        <Segment style={{ height: "80vh", overflow: "auto",  backgroundColor: "rgba(0,0,0,0.5)" }} >
            <main ref={main => { chat = main; }}>
                {messages && messages.map(message => <div key={message._id}>
                    <Message color="black" style={{ backgroundColor: "rgba(50,50,50,0.9)"}} image>
                        <Message.Content>
                            <Message.Header> <Image avatar src={message.user.avatar} />
                                {message.user.email} - <small>{moment(message.createdAt).format('MMM Do, hh:mm:ss')}</small></Message.Header>
                            <Label basic pointing> {message.text}</Label>
                        </Message.Content>
                    </Message>
                </div>)}
            </main>
        </Segment>)
}