import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import RegistrationForm from './RegistrationForm';

class RegistrationModal extends Component {

    state = {
        modal: false
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }

    render() {
        const isNew = this.props.isNew;

        let title = 'Editar Pedido';
        let button = '';
       
        if (isNew) {
            title = 'Añadir Pedido';

            button = <Button
                className="btn btn-light btn-outline-info"
                onClick={this.toggle}
                style={{ minWidth: "200px" }}>Añadir</Button>;
        } else {
            button = <Button
                className="btn btn-light btn-outline-info"
                onClick={this.toggle}>Editar</Button>;
        }

        return <Fragment>
   
            {button}
      
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                <ModalBody>
                    <RegistrationForm
                        addOrderToState={this.props.addOrderToState}
                        updateOrderIntoState={this.props.updateOrderIntoState}
                        toggle={this.toggle}
                        order={this.props.order} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}

export default RegistrationModal;