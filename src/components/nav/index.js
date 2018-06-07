import { Link } from "react-router-dom";
import React, {Component} from 'react';

import './style.css';

export class Nav extends Component {

    render() {
        return (
            <nav className="nav">
                <Link to="/" className="nav-link home-link">Головна сторінка</Link>
                <Link to="/lab-01" className="nav-link">Лаб1</Link>
                <Link to="/lab-02" className="nav-link">Лаб2</Link>
                <Link to="/lab-03" className="nav-link">Лаб3</Link>
            </nav>
        );
    }
}
