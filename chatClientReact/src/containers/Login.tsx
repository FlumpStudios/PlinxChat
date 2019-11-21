import appSettings from "../appSettings";
import React from 'react'
import { useState, useEffect, Children } from 'react'
import { Button, Form, Grid, Header, Icon, Message, Segment, Image } from 'semantic-ui-react'
import chatImage from "../assets/chatimageDark.jpg"
import client from '../feathers';
import { AuthenticationResult } from "@feathersjs/authentication/lib";

const imageStyle = {
    position: "fixed"
};


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
        <Image style={imageStyle} fluid src={chatImage} />
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>

            <Grid.Column style={{ maxWidth: 450 }}>
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
                        <Button color='teal' fluid size='large'> Login</Button>
                    </Segment>
                </Form>
                <Segment>
                   <a href="http://localhost:3030/oauth/github" target="_blank"> <Icon className="github" /> <small>Login with github</small></a>
                </Segment>
                <Segment>
                <a href="http://localhost:3030/oauth/google" target="_blank"> <Icon className="google" /> <small>Login with google</small></a>
                </Segment>
                <br />
                <Message>
                    New to us? <a onClick={signup} href='#'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    </React.Fragment>
    )
}

export default Login