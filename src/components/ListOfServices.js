import React from 'react';
import { store } from '../containers/App';
import { Item } from './Item';

export default class ListOfServices extends React.Component {
    render() {
        let services = store.getState().servicesReducer.dataServices.filter((item) => item.idC === this.props.data);
        return (
            <Item>
				{'услуга: '+ services[0].nameService + '  ' +services[0].dataStart.toLocaleString().replace(/\//g,'-').slice(0,10) +'  '+ (services[0].enabled?'действует':'не действует')}
			</Item>
        )
    }
}