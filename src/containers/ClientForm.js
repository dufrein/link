import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { store } from './App';
import {actions,saveOnBackend} from '../reducers/clientsReducer';
import ContractsList from '../containers/ContractsList';

let editClientSave = actions.editClientSave;

let LabelWrapper = styled.label`
 width:10%;
`;

class ClientForm extends React.Component {
	constructor (props) {
		super(props);
		this.form = React.createRef();
		this.state = store.getState().tableClientsReducer.formData;
	}

	saveChange = (e) => {
		e.preventDefault();
		let {editClientSave} = this.props;
		if ([...this.form.current].some((item,index)=>{return !item.value && index<6})){
            return false;
        }
        editClientSave(this.state);
		saveOnBackend(store.getState().tableClientsReducer.data);
	}

	handleChange = (e) => {
		this.setState({[e.target.name]:e.target.value});
	}

	render () {
		return (
			<form onSubmit={this.saveChange} ref={this.form}>
			<div className = 'rowForm'>
			<LabelWrapper>Фамилия</LabelWrapper><input type = 'text' name= "surname" value={this.state.surname} onChange={this.handleChange}/>
			<LabelWrapper>Имя</LabelWrapper><input type = 'text' name= "name" value={this.state.name} onChange={this.handleChange}/>
			<LabelWrapper>Отчество</LabelWrapper><input type = 'text' name= "patronymic" value={this.state.patronymic} onChange={this.handleChange}/> 
			</div> 
			<div className = 'rowForm'>  
			<LabelWrapper>Телефон</LabelWrapper><input type = 'phone' name= "phone" value={this.state.phone} onChange={this.handleChange}/>
			<LabelWrapper>Email</LabelWrapper><input type = 'email' name= "email" value={this.state.email} onChange={this.handleChange}/>
			<LabelWrapper>Город</LabelWrapper><input type = 'text' name= "city" value={this.state.city} onChange={this.handleChange}/>
			</div>
			<label>Список объектов на обслуживании:</label>
			<ContractsList id = {this.state.id}/>
			<br/>
			<label>Дополнительная информация:</label>
			<br/>
			<textarea value={this.state.additional} name= "additional" onChange={this.handleChange}/>
			<br/>
			<input type='submit' value='Сохранить' onClick={this.saveChange}/>
			</form>
		);
	}
}

const mapStateToProps = (store) => {
return {
	clientReducer: store.clientReducer
}	
}

export default connect(mapStateToProps,{editClientSave })(ClientForm)
