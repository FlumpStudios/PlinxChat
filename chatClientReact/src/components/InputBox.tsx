import * as React from 'react';
import { Form, Button, Input } from "semantic-ui-react";

interface InputBoxProps {
    sendMessage: any;
}

export const InputBox = (props: InputBoxProps) => {
    const { sendMessage } = props;
    return (
        <Form onSubmit={sendMessage} id="send-message">
            <Input
                action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'send',
                    content: 'Send',
                }}
                Icon
                fluid
                type="text"
                name="text"
            />
        </Form>
    )
}