import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { store } from './App';
import { actions, saveOnBackend } from '../reducers/contractsReducer';

let editContractSave = actions.editContractSave;

let LabelWrapper = styled.label `
 width:15%;
`;

class ContractForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = store.getState().contractsReducer.formData;
    }
    saveChange = (e) => {
        e.preventDefault();
        let { editContractSave } = this.props;
        if ([...this.form.current].some((item, index) => { return !item.value })) {
            return false;
        }
        editContractSave(this.state);
        saveOnBackend(store.getState().contractsReducer.dataContracts);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value });
    }

    render() {
        console.dir(this.state.dataStart.toLocaleString().replace(/\//g, '-').slice(0, 10));
        return (
            <form onSubmit={this.saveChange} ref={this.form}>
			<div className = 'rowForm'>
			<LabelWrapper>Тип оборудования</LabelWrapper><input type = 'text' name= "type" value={this.state.type} onChange={this.handleChange}/>
			<LabelWrapper>Договор</LabelWrapper><input type = 'text' name= "contract" value={this.state.contract} onChange={this.handleChange}/>
			</div> 
			<div className = 'rowForm'>  
			<LabelWrapper>Статус</LabelWrapper><input type = 'text' name= "status" value={this.state.status} onChange={this.handleChange}/>
			<LabelWrapper>Дата начала</LabelWrapper><input type = 'date' name= "dataStart" value={this.state.dataStart.toLocaleString().replace(/\//g,'-').slice(0,10)} onChange={this.handleChange}/>
			<LabelWrapper>Дата окончания</LabelWrapper><input type = 'date' name= "dataEnd" value={this.state.dataEnd.toLocaleString().replace(/\//g,'-').slice(0,10)} onChange={this.handleChange}/>
			</div>
			<label>Список услуг:</label>
			<br/>
			<input type='submit' value='Сохранить' onClick={this.saveChange}/>
			</form>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        contractsReducer: store.contractsReducer
    }
}

export default connect(mapStateToProps, { editContractSave })(ContractForm);