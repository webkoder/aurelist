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
        this.state = {frase, qod: ''};
    }

    componentWillMount(){
        let qod = localStorage.getItem('qod');
        if( qod ){
            console.log('qod recuperado');
            this.setState({qod});
            return;
        }
        let headers = new Headers({
            "Content-Type": "application/json"
        });
        fetch('http://quotes.rest/qod', headers)
            .then(response => response.json())
            .then(qodres => this.setFraseDoDia(qodres))
            .catch(error=>console.log(error));
    }

    setFraseDoDia(o){
        let qod = o.contents.quotes[0].quote + ' - ' + o.contents.quotes[0].author;
        this.setState({qod});
        localStorage.setItem('qod', qod);
    }
    
    render(){
        return (
            <div className="frase">
                {this.state.frase}
                <br />
                Frase do Dia:<br />
                {this.state.qod}
            </div>
        )
    }
}