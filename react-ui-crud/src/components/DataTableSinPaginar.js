import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import RegistrationModal from './form/RegistrationModal';

import { VEHICULOS_API_URL } from '../constants';

class DataTableSinPaginar extends Component {


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

  render() {

    const items = this.props.items;
    console.log('render(): ' + items);

    return <React.Fragment>
      <Table striped >
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
          {!items || items.length <= 0 ?
            <tr>
              <td colSpan="6" align="center"><b>No hay pedidos</b></td>
            </tr>
            : items.map(item => (
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
                  {item.fechaEntrega}
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
            ))}           
        </tbody>
      </Table>     
    </React.Fragment>;
  }
}

export default DataTableSinPaginar;
