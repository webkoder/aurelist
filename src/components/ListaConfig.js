import React from 'react';
import ItemConfig from './ItemConfig';
import Adicionar from './Adicionar';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

export default class ListaConfig extends React.Component{

    constructor(){
        super();
        this.lista = JSON.parse( localStorage.getItem('items') );
        this.state = { items: this.lista };
    }

    componentWillMount(){
        PubSub.subscribe('lista-atualizada', (topico, items) => this.setState({items}) )
    }

    render(){
        if( !this.lista ) return (<div></div>);
        return (
            <div className="listaconfig">
                <div>
                    <Link to="/" className="botao right">Voltar</Link>
                </div>
                <div>
                    <Link to="/caracteres" className="botao right">Lista de caracteres</Link>
                </div>
                <div>                
                    <Adicionar />
                </div>
                <div>
                    <div className='listaconfigitem'>
                        { this.state.items.map( (item, i) => {
                            return (<ItemConfig key={i} objeto={item} />);
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}