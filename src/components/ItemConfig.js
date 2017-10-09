import React, { Component } from 'react';

export default class ItemConfig extends Component{
    constructor(){
        super();
        this.id = 0;
        this.valor = '';
        this.tipo = '';
        this.dia = 0;
        this.status = 0;
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
        return (
            <div className="itemconfig">
                <div className={this.tipo}>
                    <span>{this.tipo}</span>
                </div>
                <div>
                    {this.valor}
                </div>
                <footer>
                    {/* <button>remover</button>
                    <button>editar</button> */}
                </footer>
            </div>
        )
    }
}