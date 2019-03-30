import React from 'react';
import ClientsRow from './ClientsRow';
import {Item} from './Item';
import {connect} from 'react-redux';
import {actions} from '../reducers/clientsReducer';


const editClientOpen = actions.editClientOpen;

class ClientsTable extends React.Component {
    handleClick = (id) => {
        let {editClientOpen} = this.props;
        console.dir(id);
        editClientOpen(id);
    }
    render() {
		console.dir( this.props.tableBase);
        return (
			
            this.props.tableBase.data.map((item) => {
                return (
                    <ClientsRow  key={item.surname + item.name + item.patronymic + item.phone}  >
					   {Object.keys(item).map((field)=>{   return (<Item key={field}>{ Array.isArray(item[field])?item[field].join():item[field]	}</Item>)})}
                        <Item  onClick = {this.handleClick.bind(null,item)}>ред.</Item>
					</ClientsRow>
                );
            })
        )
    }
}


const mapStateToProps = (store) => {
 return {
        tableBase: store.tableClientsReducer
    }
}

export default connect(mapStateToProps, {editClientOpen})(ClientsTable);