import React from 'react';
import { Item } from './Item';
import { ClientsRowStyled } from './ClientsRowStyled';

const headers = ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта', 'Город', 'Доп. инфо.', 'Список объектов на обслуживании','Редактировать'];

export const TableHeader = () => { return (<ClientsRowStyled tableHeader> { headers.map((item)=>{
	return (<Item key={item}>{item}</Item>)
}) }
</ClientsRowStyled>) };