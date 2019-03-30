import styled from 'styled-components';

export const ClientsRowStyled = styled.div `
background-color: #EEF6FF;
display: flex;
justify-content: space-between;
padding: 0px 10px;
color: #557888;
${props => props.tableHeader && `
	background-color: #DFEFFF;
	color:#344F6B;
	`};
`;