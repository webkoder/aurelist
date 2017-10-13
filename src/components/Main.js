import React, { Component } from 'react';
import Hoje from './Hoje';
import Item from './Item';

export default class Main extends Component {

    constructor(){
        super();
        this.items = localStorage.getItem('items') === null ?
        this.items = [] :
        JSON.parse( localStorage.getItem('items') );

        this.state = ({items:this.items});
    }

    render() {
        
        return (
            <div className="Main">
                <Hoje />
            
                <div className="lista">
                    {  this.state.items.map( (item, i) => { 
                        return (<Item key={i} objeto={item} />)
                    }) }
                </div>
            </div>
        );
    }
}