import React from 'react';
import { connect } from 'react-redux';
import { TableHeader } from '../components/TableHeader';
import ClientsTable from '../components/ClientsTable';
import ClientForm from '../containers/ClientForm';
import { clientsLoad, actions} from '../reducers/clientsReducer';
import {contractsLoad} from '../reducers/contractsReducer'; 
import {servicesLoad} from '../reducers/servicesReducer'; 
import { store } from './App';
import { ResizeSpinLoader } from 'react-css-loaders';
import {ButtonStyled} from '../components/ButtonStyled';
import ReactModal from 'react-modal';


const editClientOpen = actions.editClientOpen;

class ClientsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: !!store.getState().tableClientsReducer.id,
        }
    }

    componentDidMount() {
        this.props.clientsLoad();
		this.props.contractsLoad();
        this.props.servicesLoad();
    }

    handleCloseModal = () => {
        let {editClientOpen} =  this.props;
        editClientOpen('');
    }

    render() {
        const { tableClientsReducer } = this.props;
		
        if (!tableClientsReducer.data) {
            return (<ResizeSpinLoader />)
        }

        if (tableClientsReducer.message === 'ok') {
            return (
                <div>
				<TableHeader />
				<ClientsTable dataClients = {tableClientsReducer.data} />
				<ReactModal isOpen={!!this.props.tableClientsReducer.id} contentLabel="Minimal Modal Example">
				<ButtonStyled><button onClick={this.handleCloseModal}>Close Modal</button></ButtonStyled>
                <br/>
                <br/>
				<ClientForm/>			 
				</ReactModal>
				</div>
            )
        }
    return ('');
    }
}

const mapStateToProps = (store) => {
    return {
        tableClientsReducer: store.tableClientsReducer,
		contractsReducer: store.contractsReducer
    }
}

export default connect(mapStateToProps, { clientsLoad, editClientOpen, contractsLoad, servicesLoad })(ClientsList);