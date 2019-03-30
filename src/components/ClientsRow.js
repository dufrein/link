import React from 'react';
import {ClientsRowStyled} from './ClientsRowStyled';


export default class ClientsRow extends React.Component {
    render() {
        return (
        <ClientsRowStyled>
			{this.props.children}
		</ClientsRowStyled>
        )
    }
}

