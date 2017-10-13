import React, { Component } from 'react';

export default class Caracteres extends Component{

    constructor(){
        this.letras = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'U', 'V', 'W',
        'Y', 'X', 'Z'];
    }

    render(){
        return(
            <div>
                { this.letras.map( c => {
                    (<div>{c}</div>)
                }) }
            </div>
        );
    }
}