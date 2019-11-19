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
        <Segment style={{ height: "80vh", overflow: "auto" }} >
            <main ref={main => { chat = main; }}>
                {messages && messages.map(message => <div key={message._id}>
                    <Message style={{marginTop:"5px"}} image>
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