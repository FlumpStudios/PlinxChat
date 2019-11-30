import React, { Component } from 'react'
import { useState, useEffect, Children } from 'react'
import Login from './Login';
import Chat from './Chat';
import client from '../feathers';
import { setServers } from 'dns';

interface iUserDetails {
    user?: iUser,
    authentication?: Object,
    accessToken?: string
}
interface iUser {
    email: string,
    avatar: string,
    _id: string
}

let isLoggedIn = false;
    
const MessageService = () => {
    const [loginState, setLogin] = useState<iUserDetails>();
    const [messageList, setMessageList] = useState([]);
    const [usersList, setUsers] = useState([]);
    const [sketchList,setSketchs] = useState([]);

    useEffect(() => {
        console.log("START");
        const messages = client.service('messages');
        const users = client.service('users');
        const sketches = client.service('sketches');
        // Try to authenticate with the JWT stored in localStorage
        client.authenticate().catch(() => setLogin({}));

        // On successfull login
        client.on('authenticated', login => {
            // Get all users and messages
            isLoggedIn = true;
            Promise.all([
                messages.find({
                    query: {
                        $sort: { createdAt: -1 },
                        $limit: 25
                    }
                }),
                users.find(),
                sketches.find({
                    query: {
                        $sort: { createdAt: -1 },
                        $limit: 5000
                      }
                })
            ]).then(([messagePage, userPage, sketchesPage]) => {
                // We want the latest messages but in the reversed order
                const messages = messagePage.data.reverse();
                const users = userPage.data;
                const s = sketchesPage.data;
                // Once both return, update the state
                setLogin(login)
                setMessageList(messages);
                setUsers(users);
                setSketchs(s);
                console.log(users)
                console.log(s)
                
            });
        });

        // On logout reset all all local state (which will then show the login screen)
        client.on('logout', () => {
            setLogin({})
            setMessageList([]);
            setUsers([])
            isLoggedIn = false;
        });

        // Add new messages to the message list
        messages.on('created', (message: any) => {
            setMessageList(messageList.concat(message));
            console.log("ADDED");

        });
        sketches.on('created', (sketch: any) => 
        {           
            setSketchs(sketchList.concat(sketch));
        });

        users.on('created', (user: any) => setUsers(usersList.concat(user)));        
    }, [messageList]);
    
    if (loginState === undefined) {
        return <main className="container text-center">
            <h1>Loading...</h1>
        </main>;
    } else if (isLoggedIn) {
        return (
        <React.Fragment>                     
                    <Chat messages={messageList} users={usersList} sketchList={sketchList}  userId={loginState.user ? loginState.user._id : ""} />
        </React.Fragment>);
    }

    return (
        <React.Fragment>        
            
            <Login />
        </React.Fragment>

    );

}

export default MessageService;