import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import './style.css';
import {Home} from "../home";
import {Lab01} from "../../labs/lab01";
import {Lab02} from "../../labs/lab02";
import {Lab03} from "../../labs/lab03";

export class Main extends Component {

    render() {
        return (
            <main className="main">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/lab-01" component={Lab01}/>
                    <Route path="/lab-02" component={Lab02}/>
                    <Route path="/lab-03" component={Lab03}/>
                </Switch>
            </main>);
    }
}
