import { Route, Switch } from "react-router";
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