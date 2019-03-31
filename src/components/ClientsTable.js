import React from 'react';
import ClientsRow from './ClientsRow';
import { Item } from './Item';
import { connect } from 'react-redux';
import { actions } from '../reducers/clientsReducer';

const editClientOpen = actions.editClientOpen;

class ClientsTable extends React.Component {
    handleClick = (id) => {
        let { editClientOpen } = this.props;
        editClientOpen(id);
    }
    render() {
        return (
            this.props.tableBase.data.map((item) => {
                return (
                    <ClientsRow  key={item.surname + item.name + item.patronymic + item.phone}  >
                       {Object.keys(item).map((field)=>{  
                        if (field!=='id' && field!=='listService') return (<Item key={field}>{item[field]}</Item>)
                        if (field==='listService') return (<Item key={field}>...</Item>)
                        return ''
                    })}
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

export default connect(mapStateToProps, { editClientOpen })(ClientsTable);