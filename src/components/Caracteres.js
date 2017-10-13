import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Caracteres extends Component{

    constructor(){
        super();
        this.letras = [ 'A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
        'V', 'W', 'Y', 'X', 'Z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    }

    render(){
        return(
            <div>
                <div style={{height: '30px', padding: '10px'}}>
                    <Link to='/' className="botao right">Voltar</Link>
                </div>
                <div className="caracteres">
                { this.letras.map( (c, i) => {
                    return (
                        <div key={i}>
                            <span>{c}</span>
                            <span>{c}</span>
                        </div>
                    )
                }) }
                </div>
            </div>
        );
    }
}