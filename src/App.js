import React, { Component } from 'react';
import './css/starwars-glyphicons.css';
import Item from './components/Item';

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

    this.state = { formClass: 'adicionarForm', items: this.items, tipo: '' };
    
  }

  mostrarForm(){
    this.setState({formClass: 'adicionarForm mostrarForm'});
  }

  fecharForm(){
    this.setState({formClass: 'adicionarForm'});
  }

  adicionar(){
        let tipo = this.state.tipo;
        if(tipo.length === 0) return;

        let dia = 0;

        if(tipo === 'semanal'){
            dia = this.diasemana.value;
            if(dia < 1 && dia > 7){
                console.log('dia da semana invalido');
                return;
            }
        }else if(tipo === 'mensal'){
            dia = this.diames.value;
            if( dia < 1 && dia > 31){
                console.log('dia do mes invalido');
                return;
            }
        }

        let valor = this.addTexto.value;
        if ( valor.length === 0 ){
            console.log('digite um item');
            return;
        }
        let novo = new Item();
        novo.id = this.items.length;
        novo.valor = valor;
        novo.tipo = tipo;
        novo.dia = dia;
        delete novo['updater'];
        delete novo['refs'];
        delete novo['tipobgs'];
       
        this.items.push(novo);
        let novoItem = JSON.stringify(this.items);
        localStorage.setItem('items', novoItem);
        if(tipo === 'semanal'){
            this.diasemana.value = 0;
        }else if(tipo === 'mensal'){
            this.diames.value = 0;
        }

        this.setState({items: this.items, tipo: ''});
        this.addTexto.value = '';


        this.fecharForm();
  }

  setTipo(e){
    let valor = e.target.value;
    this.setState({tipo: valor});
  }

  render() {
    return (
      <div className="App">
        <header>
          <button onClick={() => this.mostrarForm()}> + Adicionar</button>
        </header>
        <div className={this.state.formClass}>
          <section>
            <h2>novo item</h2>
            <input ref={ o=> this.addTexto = o} type='text' placeholder='digite um novo item' />
            <h2>Tipo</h2>            
          </section>
          <div className='tipo'>
            <label>
              <input type='radio' name='tipo' value='diario' checked={this.state.tipo === 'diario'} onChange={e => this.setTipo(e)} /> Diario
            </label>
            <label>
              <input type='radio' name='tipo' value='semanal' checked={this.state.tipo === 'semanal'} onChange={e => this.setTipo(e)} /> Semanal
            </label>
            <label>
              <input type='radio' name='tipo' value='mensal' checked={this.state.tipo === 'mensal'} onChange={e => this.setTipo(e)} /> Mensal
            </label>
          </div>
          { this.state.tipo === 'semanal' &&
            <section>
                <h3>Dia da semana</h3>
                <select ref={o => this.diasemana = o}>
                <option value='1'>Domingo</option>
                <option value='2'>Segunda-feira</option>
                <option value='3'>Terça-feira</option>
                <option value='4'>Quarta-feira</option>
                <option value='5'>Quinta-feira</option>
                <option value='6'>Sexta-feira</option>
                <option value='7'>Sábado</option>
                </select>
            </section>
         }
         { this.state.tipo === 'mensal' &&
            <section>
            <h3>Dia do mes</h3>
            <input ref={o => this.diames = o} type='number' max='31' min='1' />
            </section>
         }
          <footer>
            <button className="btn-danger" onClick={() => this.fecharForm()}>fechar</button>
            <button className="btn-success" onClick={() => this.adicionar()}>adicionar</button>
          </footer>
        </div>
        <div className="lista">
          {  this.state.items.map( (item, i) => { 
            return (<Item key={i} objeto={item} />)
           }) }
        </div>
      </div>
    );
  }
}

export default App;
