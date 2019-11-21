import { Route, Switch } from "react-router";
import Chat from "./containers/Chat";
import Login from "./containers/Login";
import MessageService from "./containers/MessageService";

import * as React from 'react';

const RouteModule = () => {
    const content = (
        <React.Fragment>
            <Route exact path="/" component={MessageService} />            
        </React.Fragment>
    )

    return (
        <Switch>
            {content}
        </Switch>)
}

export default RouteModule