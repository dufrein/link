import React from 'react';
import {ContractRowStyled} from '../components/ContractRowStyled';
import {Item} from '../components/Item';
import ContractsHeader from '../components/ContractsHeader';
import {store} from '../containers/App';
import ListOfServices from '../components/ListOfServices';
import {connect} from 'react-redux';	
import {actions} from '../reducers/contractsReducer';
import ReactModal from 'react-modal';
import {ButtonStyled} from '../components/ButtonStyled';

const editContractOpen = actions.editContractOpen;

class ContractsList extends React.Component {
	handleClick = (id) => {
		let {editContractOpen} = this.props;
		console.dir(id);
		editContractOpen(id);
	}
	handleCloseModal = () => {
		let {editContractOpen} =  this.props;
		editContractOpen('');
        // this.setState({ showModal: false });
    }
    render () {
    	let contracts = store.getState().contractsReducer.dataContracts.filter((item)=>{if (this.props.contracts.indexOf(item.contract*1)>-1) {return item}});

    	console.dir(store.getState().contractsReducer.dataContracts);
    	console.dir(this.props.contracts);
    	console.dir(contracts);

    	if (contracts.length===0) {
    		return (<p>отсутствуют объекты на обслуживании</p>)
    	}

    	return (
    	<>
    	<ContractsHeader/>
    	{contracts.map((item, i)=> {
    		return (
    		<ContractRowStyled key={item.contract}>
	    		{Object.keys(item).map((field)=>{
	    			if (field!='listOfServices') return (<Item key={field}>{item[field]}</Item>)
	    				return (<ListOfServices data={item['contract']}/>)
	    		})}
	    		<Item  onClick = {this.handleClick.bind(null,item)}>ред.</Item>
    		</ContractRowStyled>
    		)})}
    		<ReactModal isOpen={!!this.props.contractsReducer.id} contentLabel="Minimal Modal Example">
    		<ButtonStyled><button onClick={this.handleCloseModal}>Close Modal</button></ButtonStyled>
    		<br/>
    		<br/>

    		</ReactModal>
    		</>)}}

    		const mapStateToProps = (store) => {
    			return {
    				contractsReducer: store.contractsReducer
    			}
    		}

    		export default connect(mapStateToProps, {editContractOpen})(ContractsList);