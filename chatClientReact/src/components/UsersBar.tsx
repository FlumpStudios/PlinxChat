import * as React from 'react';
import { Segment, Header, List, Image, Label } from "semantic-ui-react";

interface userBarProps {
    users: any[]
    onLogout: any
}

export const UsersBar = (props: userBarProps) => {
    const { users, onLogout } = props;
    return (
        <Segment style={{ backgroundColor: "rgba(0,0,0,0.5)"}}>
            <Label as='a' color="teal" ribbon>
                {users && users.length} active users
            </Label>
            <List>
                {users && users.map(user =>
                    <List.Item>
                        <Image avatar src={user.avatar} alt={user.email} />
                        <List.Content>
                            <List.Header style={{color:"white"}} >{user.email ? user.email : "Guest"}</List.Header>
                        </List.Content>
                    </List.Item>
                )}
            </List>
            <footer>
                <a href="#" onClick={onLogout}>
                    Sign Out
            </a>
            </footer>
        </Segment>
    );
}