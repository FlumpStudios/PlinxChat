import React, { Component } from 'react'
import { useState, useEffect, Children } from 'react'
import Login from './Login';
import Chat from './Chat';
import client from '../feathers';

const MessageService = () => {
    const [loginState, setLogin] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [usersList, setUsers] = useState([]);

    useEffect(() => {
        console.log("START");
        const messages = client.service('messages');
        const users = client.service('users');

        // Try to authenticate with the JWT stored in localStorage
        client.authenticate().catch(() => setLogin(null));

        // On successfull login
        client.on('authenticated', login => {
            // Get all users and messages
            Promise.all([
                messages.find({
                    query: {
                        $sort: { createdAt: -1 },
                        $limit: 25
                    }
                }),
                users.find()
            ]).then(([messagePage, userPage]) => {
                // We want the latest messages but in the reversed order
                const messages = messagePage.data.reverse();
                const users = userPage.data;

                // Once both return, update the state
                setLogin(login)
                setMessageList(messages);
                setUsers(users)

            });
        });

        // On logout reset all all local state (which will then show the login screen)
        client.on('logout', () => {
            setLogin(null)
            setMessageList([]);
            setUsers([])
        });

        // Add new messages to the message list
        messages.on('created', (message: any) => {
            setMessageList(messageList.concat(message));
            console.log("ADDED");
        
        });

        users.on('created', (user: any) => setUsers(usersList.concat(user)));
    }, [messageList]);

    if (loginState === undefined) {
        return <main className="container text-center">
            <h1>Loading...</h1>
        </main>;
    } else if (loginState) {
        return <Chat messages={messageList} users={usersList} />
    }

    return <Login />;

}

export default MessageService;