import React from 'react';
import ItemConfig from './ItemConfig';
import Adicionar from './Adicionar';
import { Link } from 'react-router-dom';

export default class ListaConfig extends React.Component{

    constructor(){
        super();
        this.lista = JSON.parse( localStorage.getItem('items') );
    }

    render(){
        if( !this.lista ) return (<div></div>);
        return (
            <div className="config">
                <div>
                    <Link to="/" className="botao right">Voltar</Link>
                </div>
                <div>                
                    <Adicionar />
                </div>
            </div>
        )
    }
}