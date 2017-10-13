import React, { Component } from 'react';
import Item from './Item';
import PubSub from 'pubsub-js';

export default class Adicionar extends Component {

    constructor(){
        super();
        this.state = {tipo: ''};
    }

        
    setTipo(e){
        let valor = e.target.value;
        this.setState({tipo: valor});
    }

    limparAddForm(){
        if(this.state.tipo === 'semanal'){
          this.diasemana.value = 0;
        }else if(this.state.tipo === 'mensal'){
            this.diames.value = 0;
        }
    
        this.setState({tipo: ''});
        this.addTexto.value = '';
    
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

        let items = JSON.parse(localStorage.getItem('items'));

        let novo = new Item();
        novo.id = items.length;
        novo.valor = valor;
        novo.tipo = tipo;
        novo.dia = dia;
        delete novo['updater'];
        delete novo['refs'];
       
        items.push(novo);
        let novoItem = JSON.stringify(items);
        localStorage.setItem('items', novoItem);

        this.limparAddForm();
        PubSub.publish('lista-atualizada', items);
    }
    

    render() {
        return (
            <div className="adicionarForm">
            <section>
              <h2>novo item</h2>
              <input ref={ o=> this.addTexto = o} type='text' placeholder='digite um novo item' />
              <h2>Tipo</h2>            
            </section>
            <div className='tipo'>
              <label className='diario'>
                <input type='radio' name='tipo' value='diario' checked={this.state.tipo === 'diario'} onChange={e => this.setTipo(e)} /> Diario
              </label>
              <label className='semanal'>
                <input type='radio' name='tipo' value='semanal' checked={this.state.tipo === 'semanal'} onChange={e => this.setTipo(e)} /> Semanal
              </label>
              <label className='mensal'>
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
        );
    }
}