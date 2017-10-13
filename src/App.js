import React, { Component } from 'react';
import './css/starwars-glyphicons.css';
import ListaConfig from './components/ListaConfig';
import Header from './components/Header';
import Main from './components/Main';
import Caracteres from './components/Caracteres';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(){
    super();

    this.items = localStorage.getItem('items') === null ?
      this.items = [] :
      JSON.parse( localStorage.getItem('items') );

    let dia = new Date().getDate();
    let udia = JSON.parse(localStorage.getItem('dia'));
    if( udia !== null ){
        if( udia !== dia ){ // se o dia for diferente de hoje, precisa limpar a lista
            for (var a = 0; a < this.items.length; a++) {
                var item = this.items[a];
                item.status = 0;                
            }
            localStorage.setItem('items', JSON.stringify(this.items) );
            localStorage.setItem('dia', dia );
            localStorage.removeItem('qod');
        }
    }else{
        localStorage.setItem('dia', dia );        
    }

    this.addTexto = null;

    this.state = { formClass: 'adicionarForm', configClass: 'listaconfig', items: this.items };
  }

  render() {
    return (
        <BrowserRouter >
        <div className="App">
            <Header />
            <Switch> 
                <Route  path="/" exact component={ Main }/>
                <Route  path="/config" component={ ListaConfig }/>  
                <Route  path="/caracteres" component={ Caracteres }/>  
           </Switch> 
        </div>
        </BrowserRouter >
    );
  }
}

export default App;
