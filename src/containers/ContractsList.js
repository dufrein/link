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
import ContractForm from './ContractForm';

const editContractOpen = actions.editContractOpen;

class ContractsList extends React.Component {
	handleClick = (id) => {
		let {editContractOpen} = this.props;
		editContractOpen(id);
	}
	handleCloseModal = () => {
		let {editContractOpen} =  this.props;
		editContractOpen('');
    }
    render () {
    	let contracts = store.getState().contractsReducer.dataContracts.filter((item)=>item.id===this.props.id);
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
    		      	if (field==='dataStart' || field==='dataEnd') return (<Item key={field}>{item[field].toLocaleString().replace(/\//g,'-').slice(0,10)}</Item>)
    				if (field==='listOfServices'){ return (<ListOfServices key={field} data={item['idC']}/>)}
    				if (  field!=='id' &&  field!=='idC' ) {return (<Item key={field}>{item[field]}</Item>)}
                    return ''
    			})}
    			<Item  onClick = {this.handleClick.bind(null,item)}>ред.</Item>
    		</ContractRowStyled>
    		)})}
    		<ReactModal isOpen={!!this.props.contractsReducer.id} contentLabel="Minimal Modal Example">
    			<ButtonStyled><button onClick={this.handleCloseModal}>Close Modal</button></ButtonStyled>
    			<br/>
    			<ContractForm/>
    		</ReactModal>
    	</>
)}}

const mapStateToProps = (store) => {
    return {
    	contractsReducer: store.contractsReducer
    }
}

export default connect(mapStateToProps, {editContractOpen})(ContractsList);