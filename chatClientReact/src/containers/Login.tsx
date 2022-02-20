import appSettings from "../appSettings";
import React from 'react'
import { useState, useEffect, Children } from 'react'
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import client from '../feathers';

import { AuthenticationResult } from "@feathersjs/authentication/lib";


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const updateField = (name: string, ev: any): void => {
        if (name === 'email') setEmail(ev.target.value);
        else if (name === 'password') setPassword(ev.target.value);
    }

    const login = (): AuthenticationResult => {
        return client.authenticate({
            strategy: 'local',
            email, password
        }).then((r) => console.log(r)).catch(e => console.error("Something went wrong " + e));
    }
   
    const signup = (): void =>
        client.service('users')
            .create({ email, password })
            .then(() => login());


    return (<React.Fragment>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450, opacity:"0.92" }}>
                <Header as='h2' style={{ color: "white" }} textAlign='center'>
                    Log-in to {appSettings.projectName}
                </Header>
                <Form onSubmit={login}  size='large'>   
                    <Segment stacked>
                        <Form.Input
                            required
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange={ev => updateField('email', ev)} />
                        <Form.Input
                            required
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={ev => updateField('password', ev)}
                        />
                        <Button className="login-element" color='teal' fluid size='large'> Login</Button>
                        <br/>                     
                    </Segment>
                </Form>
                <Button className="login-element" color='teal' fluid size='large'> <small>Continue as guest</small></Button>
                <Segment className="login-element">
                   <a href="http://52.56.74.255:8085/oauth/github" target="_blank"> <Icon className="github" /> <small>Login with github</small></a>
                </Segment>
                <Segment className="login-element">
                <a href="http://52.56.74.255:8085/oauth/google" target="_blank"> <Icon className="google" /> <small>Login with google</small></a>
                </Segment>
                <br />
                <Message className="login-element">
                    New to us? <a onClick={signup} href='#'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    </React.Fragment>
    )
}

export default Login