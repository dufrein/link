import React from 'react';
import { Item } from './Item';
import { ContractRowStyled } from './ContractRowStyled';

export default class ContractsHeader extends React.Component {
    render() {
        let contracts = ['Тип оборудования', 'Договор', 'Список услуг', 'Статус', 'Дата начала', 'Дата окончания', 'Редактировать'];
        return (
            <ContractRowStyled>
				{contracts.map((item)=>	<Item key={item}>{item}</Item>)}
			</ContractRowStyled>
        )
    }
}