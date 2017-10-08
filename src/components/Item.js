import React, { Component } from 'react';

export default class Item extends Component{
    constructor(){
        super();
        // this.id = this.props.id;
        // this.valor = this.props.valor;
        this.id = 0;
        this.valor = '';
        this.tipo = '';
        this.dia = 0;
        this.status = 0;
        this.tipobgs = {
            diario: '#FDA9A9',
            semanal: '#a7fdd3',
            mensal: '#c0a7fd'
        }

        this.state = { status: 0 };
    }
    
    componentWillMount(){
        this.id = this.props.objeto.id;
        this.valor = this.props.objeto.valor;
        this.tipo = this.props.objeto.tipo;
        this.dia = this.props.objeto.dia;
        this.status = this.props.objeto.status;
        this.setState({status: this.status});
    }

    exibir(){
        if(this.tipo === 'mensal'){
            let hoje = new Date();
            if (hoje.getDate() !== this.dia){
                return false;
            }
        }else if(this.tipo === 'semanal'){
            let hoje = new Date();
            let dsemana = hoje.getDay() + 1;
            if( dsemana !==  this.dia){
                return false;
            }
        }

        return true;
    }

    feito(){
        let items = JSON.parse( localStorage.getItem('items') );
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if( item.id === this.id ){
                items[i].status = 1;
                this.setState({status: 1});
                break;
            }
        }

        localStorage.setItem('items', JSON.stringify(items) );
    }

    render(){
        if( !this.exibir() ) return (<div />);
        return (
            <div className="item">
                <div style={{background: this.tipobgs[this.tipo]}}>
                    <span>{this.tipo}</span>
                    { this.state.status === 0 &&
                        <button onClick={() => this.feito()}>Feito</button>
                    }
                    { this.state.status === 1 &&
                        <button>ok</button>
                    }
                </div>
                <p>
                {this.valor}
                </p>
            </div>
        )
    }
}