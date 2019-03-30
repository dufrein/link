import React from 'react';
import {store} from '../containers/App';
import {Item} from './Item';
import {ContractRowStyled} from './ContractRowStyled';

export default class ContractsHeader extends React.Component {
	render () {
		let contracts = ['Тип оборудования', 'Договор', 'Список услуг','Статус','Дата начала','Дата окончания','Редактировать'];
		console.dir('_');
		console.dir(contracts);
		return (
		<ContractRowStyled>
		{contracts.map((item)=>{if (item!='listOfServices') return	(<Item key={item}>{item}</Item>)})}
		</ContractRowStyled>
		)
	}
}



