import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { VEHICULOS_API_URL } from '../../constants';

class RegistrationForm extends React.Component {

    state = {
        id: 0,
        pedido: '',
        bastidor: '',
        matricula: '',
        modelo: '',
        fechaEntrega: ''
    }

    componentDidMount() {   

        if (this.props.order) {
            const { id, pedido, bastidor, matricula, modelo, fechaEntrega } = this.props.order
            this.setState({ id, pedido, bastidor, matricula, modelo, fechaEntrega });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = e => {
        e.preventDefault();
        fetch(`${VEHICULOS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pedido: this.state.pedido,
                bastidor: this.state.bastidor,
                matricula: this.state.matricula,
                modelo: this.state.modelo,
                fechaEntrega: this.state.fechaEntrega
            })
        })
            .then(res => res.json())
            .then(order => {
                this.props.addOrderToState(order);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {        
        e.preventDefault();
        fetch(`${VEHICULOS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                pedido: this.state.pedido,
                bastidor: this.state.bastidor,
                matricula: this.state.matricula,
                modelo: this.state.modelo,
                fechaEntrega: this.state.fechaEntrega
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateOrderIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }

    render() {
       
        return <Form onSubmit={this.props.order ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="pedido">Pedido:</Label>
                <Input type="text" name="pedido" onChange={this.onChange} value={this.state.pedido === '' ? '' : this.state.pedido} />
            </FormGroup>
            <FormGroup>
                <Label for="bastidor">Bastidor:</Label>
                <Input type="text" name="bastidor" onChange={this.onChange} value={this.state.bastidor === null ? '' : this.state.bastidor} />
            </FormGroup>
            <FormGroup>
                <Label for="matricula">Matrícula:</Label>
                <Input type="text" name="matricula" onChange={this.onChange} value={this.state.matricula === null ? '' : this.state.matricula} />
            </FormGroup>
            <FormGroup>
                <Label for="modelo">Modelo:</Label>
                <Input type="text" name="modelo" onChange={this.onChange} value={this.state.modelo === null ? '' : this.state.modelo} />
            </FormGroup>
            <FormGroup>
                <Label for="fechaEntrega">Fecha Entrega:</Label>
                <Input type="text" name="fechaEntrega" onChange={this.onChange} value={this.state.fechaEntrega === null ? '' : this.state.fechaEntrega}
                    placeholder="dd/MM/yyyy" />
            </FormGroup>
            <Button>Guardar</Button>
        </Form>;
    }
}

export default RegistrationForm;