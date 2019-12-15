import React, { Component } from 'react'
import { useState, useEffect, Children } from 'react'
import Login from './Login';
import Chat from './Chat';
import client from '../feathers';
import { colourPool } from '../tools/colourPool';
import { UserDetails  as iUserDetails , User } from "../sharedInterfaces/userInterfaces";
import {sketchInfo, ISketchData } from "../sharedInterfaces/sketchInterfaces";
import {codeInterface} from "../sharedInterfaces/codeInterfaces";

let isLoggedIn = false;
    
const MessageService = () => {
    const [loginState, setLogin] = useState<iUserDetails>();
    const [messageList, setMessageList] = useState([]);
    const [usersList, setUsers] = useState<User[]>([]);
    const [sketchList,setSketchs] =  useState<sketchInfo[]>([]);
    const [codeList, setCode ] = useState<string>("");
    const [codeId, setCodeId] = useState<string>();

    const messages = client.service('messages');
    const users = client.service('users');
    const sketches = client.service('sketches');
    const code = client.service('code');
    
    useEffect(() => {
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
                code.find({
                    query: {                       
                        $limit: 1
                    }
                })   
            ]).then(([messagePage, userPage, codePage]) => {
                // We want the latest messages but in the reversed order
                const messages = messagePage.data.reverse();
                const users = userPage.data;
                const code = codePage.data;
                
                setLogin(login);
                setMessageList(messages);
                setUsers(users);
                setCode(code[0].c);
                setCodeId(code[0]._id)
                getSketches();                                
            });
        });

        // On logout reset all all local state (which will then show the login screen)
        client.on('logout', () => {
     
            setLogin({})
            setMessageList([]);
            setUsers([]);
            setSketchs([]);
            setCode("");
            isLoggedIn = false;          
        });

        // Add new messages to the message list
        messages.on('created', (message: any) => {
            setMessageList(messageList.concat(message));
        });

        code.on('updated', (code: any) => 
            setCode(code.c)  
        );

        sketches.on('created', (sketch: any) =>                  
            setSketchs(sketchList.concat(sketch))
        );

        users.on('created', (user: any) => setUsers(usersList.concat(user)));        
    }, [messageList]);   
 


    //Helper methods
    const getSketches = async (): Promise<any> => {        
        await sketches.find({
            query: {
                $sort: { createdAt: -1 },
                $limit: 5000
              }
        }).then((sketchesPage:any) => {
            const s = sketchesPage.data;
                
                //Set colour for their sketch bush from the colour pool based on the array position.
                for (let i = 0; i < usersList.length; i++) {
                    if (i > colourPool.length)
                        usersList[i].sketchColour = "#ffffff";
                    else
                        usersList[i].sketchColour = colourPool[i];
                }
                 
                let sketchWithColours = [];
                for (let i = 0; i < s.length; i++) {
                    sketchWithColours.push(s[i].data);
                }
                setSketchs(sketchWithColours);
        })
    }
    
    if (loginState === undefined) {
        return <main className="container text-center">
            <h1>Loading...</h1>
        </main>;
    } else if (isLoggedIn) {
        return (
        <React.Fragment>                     
                    <Chat 
                        getSketchDataFromApi={getSketches} 
                        messages={messageList} 
                        users={usersList} 
                        sketchList={sketchList}
                        codeList={codeList}  
                        codeId={codeId as string}
                        userId={loginState.user ? loginState.user._id : ""} />
        </React.Fragment>);
    }

    return (
        <React.Fragment>   
            <Login />
        </React.Fragment>
    );
}

export default MessageService;