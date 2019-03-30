import React from 'react';
import { store } from '../containers/App';
import {ContractRowStyled} from '../components/ContractRowStyled';
import { Item } from './Item';

export default class ListOfServices extends React.Component {
	render () {
		console.dir(this.props.data);
		let services = store.getState().servicesReducer.dataServices.filter((item)=>item.contract==this.props.data);
		console.dir(services);
		return (

		<Item>
			{'услуга: '+ services[0].nameService + '  ' +services[0].dataStart +'  '+ (services[0].enabled?'действует':'не действует')}
		</Item>
 
		)
	}
}