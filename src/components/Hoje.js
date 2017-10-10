import React, { Component } from 'react';

export default class Hoje extends Component{

    constructor(){
        super();
        const meses = ['Janeiro', 'Fevereiro', 'Marco',
            'Abril', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        const dsemana = [ 'Domingo', 'Segunda-feira', 'Terca-feira',
            'Quarta-feira', 'Quinta-feira', 'Sexta-Feira', 'Sabado'];

        let hoje = new Date();
        
        let frase = `Hoje dia ${hoje.getDate()} de ${meses[hoje.getMonth() - 1]} de ${hoje.getFullYear()}, ${dsemana[hoje.getDay()]}`;
        this.state = {frase};
    }
    
    render(){
        return (
            <div className="frase">
                {this.state.frase};
            </div>
        )
    }
}