import React from 'react';
import ItemConfig from './ItemConfig';

export default class ListaConfig extends React.Component{

    constructor(){
        super();
        this.lista = JSON.parse( localStorage.getItem('items') );
    }
    
    render(){
        if( !this.lista ) return (<div></div>);
        return (
            <div className={this.props.className}>
                <div className='lista'>
                    { this.lista.map( (item, i) => {
                        return (<ItemConfig key={i} objeto={item} />);
                        })
                    }
                </div>
            </div>
        )
    }
}