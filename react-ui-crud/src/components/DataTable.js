import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import RegistrationModal from './form/RegistrationModal';
import Paginator from "./Paginator";
import { pagination } from "../util/DataTable";

//import Pagination from "react-js-pagination";


import { VEHICULOS_API_URL } from '../constants';

class DataTable extends Component {

  constructor(props) {

    super(props);

    this.state = {
      todoList: {},
      todoListRecords: [],
      itemsCountPerPage: 10
    };
    this.onPaginate = this.onPaginate.bind(this);
    this.generateTB = this.generateTB.bind(this);
  }

  onPaginate(currentPage) {

    console.log('onPaginate() => itemsCountPerPage:' + this.state.itemsCountPerPage);

    let todoList = { ...this.state.todoList };

    let paginatedTodoList = pagination(
      currentPage,
      this.state.itemsCountPerPage,
      this.state.todoListRecords
    );

    todoList.pages = paginatedTodoList.pages;
    todoList.paginatedData = paginatedTodoList.paginatedData;
    todoList.paginatorData = paginatedTodoList.paginatorData;
    this.setState({ todoList });
  }

  generateTB() {

    return this.state.todoList.paginatedData.map((item, index) => (

      <tr key={item.id}>
        <th scope="row">
          {item.id}
        </th>
        <td>
          {item.pedido}
        </td>
        <td>
          {item.modelo}
        </td>
        <td>
          {item.bastidor}
        </td>
        <td>
          {item.matricula}
        </td>
        <td>
          {new Date(item.fechaEntrega).toLocaleString("es-ES")}
        </td>
        <td align="center">
          <div>
            <RegistrationModal
              isNew={false}
              order={item}
              updateOrderIntoState={this.props.updateState} />
            &nbsp;&nbsp;&nbsp;
              <Button className="btn btn-light btn-outline-danger" onClick={() => this.deleteItem(item.id)}>Eliminar</Button>
          </div>
        </td>
      </tr>
    ));
  }

  deleteItem = id => {
    let confirmDeletion = window.confirm('¿Eliminar?');
    if (confirmDeletion) {
      fetch(`${VEHICULOS_API_URL}/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.items !== nextProps.items) {
      let list = nextProps.items;
      let todoList = pagination(1, this.state.itemsCountPerPage, list);
      this.setState({
        todoList: todoList,
        todoListRecords: list,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate() => nextState.itemsCountPerPage: ' + nextState.itemsCountPerPage);
    if (this.state.itemsCountPerPage !== nextState.itemsCountPerPage) {      
      let list = nextProps.items;
      let todoList = pagination(1, nextState.itemsCountPerPage, list);
      this.setState({
        todoList: todoList,
        todoListRecords: list
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate() =>> this.state.itemsCountPerPage:' + this.state.itemsCountPerPage);

  }

  changeItemsCountPerPage = event => {
    console.log('changeItemsCountPerPage() => itemsCountPerPage:' + event.target.value);
    // if(event.target.value)
    this.setState({ itemsCountPerPage: event.target.value });

  }


  render() {

    return <React.Fragment>
      <Table striped  >
        <thead className="bg-info text-white" >
          <tr>
            <th>Id</th>
            <th>Pedido</th>
            <th>Modelo</th>
            <th>Bastidor</th>
            <th>Matrícula</th>
            <th>Fecha Entrega</th>
            <th style={{ textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.state.todoList).length !== 0 &&
            this.state.todoList.constructor === Object
            ? this.generateTB()
            :
            <tr>
              <td colSpan="6" align="center"><b>No hay pedidos</b></td>
            </tr>
          }
        </tbody>
      </Table>     
      <div className="container clearfix">
        <div className="row justify-content-between">
          <div className="col" >            
            <span>Mostrar </span>
            <select id="selItemsCountPerPage" value={this.state.itemsCountPerPage} onChange={this.changeItemsCountPerPage} >
              <option value="10" >10</option>
              <option value="50" >50</option>
              <option value={this.state.todoListRecords.length}>Todos</option>
            </select>
          </div>
        <div className="col" >     
        </div>
          <div className="pagination justify-content-end">
            {Object.keys(this.state.todoList).length !== 0 &&
              this.state.todoList.constructor === Object ? (
                <Paginator
                  onPaginate={this.onPaginate}
                  paginatorData={this.state.todoList.paginatorData}
                  pages={this.state.todoList.pages}
                />
              ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>;
  }
}

export default DataTable;
