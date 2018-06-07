import React, {Component} from 'react';

import './style.css';
import {Header} from "../header";
import {Main} from "../main";
import {Nav} from "../nav";

export class Layout extends Component {

    render() {
        return (
            <div className="container">
                <Main className="main"/>
                <Header className="header"/>
                <Nav className="nav"/>
            </div>
        );
    }
}
