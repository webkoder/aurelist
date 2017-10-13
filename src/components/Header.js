import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    render() {
        return (
          <header>
            <Link to="/config" className="botao">
              config
            </Link>
          </header>
        );
    }
}