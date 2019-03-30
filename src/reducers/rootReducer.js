import {combineReducers} from 'redux';
import {tableClientsReducer} from './clientsReducer';
import {contractsReducer} from './contractsReducer';
import {servicesReducer} from './servicesReducer';

export const rootReducer = combineReducers({contractsReducer, tableClientsReducer,servicesReducer});