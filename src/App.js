import React, { Component } from 'react';
import './css/starwars-glyphicons.css';
import ListaConfig from './components/ListaConfig';
import Header from './components/Header';
import Main from './components/Main';
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
        }
    }else{
        localStorage.setItem('dia', dia );        
    }

    this.addTexto = null;

    this.state = { formClass: 'adicionarForm', configClass: 'listaconfig', items: this.items };
    
  }

  mostrarForm(){
    this.setState({formClass: 'adicionarForm mostrarForm'});
  }

  fecharForm(){
    this.limparAddForm();
    this.setState({formClass: 'adicionarForm'});
  }

  
  mostrarConfigLista(){
    if( this.state.configClass === 'listaconfig mostrarlistaconfig' )
      this.setState({configClass: 'listaconfig'});
    else
      this.setState({configClass: 'listaconfig mostrarlistaconfig'});
  }

  render() {
    return (
        <BrowserRouter >
        <div className="App">
            <Header />
            <Switch> 
                <Route  path="/" exact component={ Main }/>
                <Route  path="/config" component={ ListaConfig }/>  
           </Switch> 
        </div>
        </BrowserRouter >
    );
  }
}

export default App;
