import React from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from '../reducers/rootReducer';
import './App.css';
import ClientsList from './ClientsList.js';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
    render() {
        return (
            <Provider store = {store}>
				<ClientsList/>
			</Provider>
        );
    }
}

export default App;