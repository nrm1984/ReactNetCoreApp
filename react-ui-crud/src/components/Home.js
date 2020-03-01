import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTable from './DataTable';
//import DataTableSinPaginar from './DataTableSinPaginar'
import RegistrationModal from './form/RegistrationModal';

import { VEHICULOS_API_URL } from '../constants';

class Home extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.getItens();
  }

  getItens = () => {
    fetch(VEHICULOS_API_URL)
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }

  addOrderToState = pedido => {
    this.setState(previous => ({
      items: [...previous.items, pedido]
    }));
  }

  updateState = (id) => {
    this.getItens();
  }

  deleteItemFromState = id => {
    const updated = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updated })
  }

  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3 className="shadow-lg p-3 mb-5 bg-white rounded text-info text-center">Vehículos Pedidos</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            items={this.state.items}
            updateState={this.updateState}
            deleteItemFromState={this.deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="clearfix" style={{ height: "200px" }}  >
            <RegistrationModal isNew={true} addOrderToState={this.addOrderToState} />
          </div>
        </Col>
      </Row>
    </Container>;
  }
}

export default Home;
