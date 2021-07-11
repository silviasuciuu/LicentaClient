import React, {useCallback, useContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

import {log} from "util";
import {PaginaClientProps} from "./PaginaClientProps";
import {getClienti} from "./PaginaClientApi";

type SaveClientFn = (client: PaginaClientProps) => Promise<any>;


export interface ClientState {
    client?: PaginaClientProps[],
    fetching: boolean,
    fetchingError?: Error | null,
    saving: boolean,
    savingError?: Error | null,
    saveClient?: SaveClientFn,


}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialStateClient: ClientState = {
    fetching: false,
    saving: false,


};

const FETCH_CLIENT_STARTED = 'FETCH_CLIENT_STARTED';
const FETCH_CLIENT_SUCCEEDED = 'FETCH_CLIENT_SUCCEEDED';
const FETCH_CLIENT_FAILED = 'FETCH_CLIENT_FAILED';
const SAVE_CLIENT_STARTED = 'SAVE_CLIENT_STARTED';
const SAVE_CLIENT_SUCCEEDED = 'SAVE_CLIENT_SUCCEEDED';
const SAVE_CLIENT_FAILED = 'SAVE_CLIENT_FAILED';

const ClientReducer: (state: ClientState, action: ActionProps) => ClientState =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_CLIENT_STARTED:
                return {...state, fetching: true, fetchingError: null};
            case FETCH_CLIENT_SUCCEEDED:
                return {...state, client: payload.client, fetching: false};
            case FETCH_CLIENT_FAILED:
                return {...state, fetchingError: payload.error, fetching: false};
            case SAVE_CLIENT_STARTED:
                return {...state, savingError: null, saving: true};
            case SAVE_CLIENT_SUCCEEDED:
                const clienti = [...(state.client || [])];
                const client = payload.client;
                const index = clienti.findIndex(it => it.id === client.id);
                if (index === -1) {
                    clienti.splice(0, 0, client);
                } else {
                    clienti[index] = client;
                }
                return {...state, clienti, saving: false};
            case SAVE_CLIENT_FAILED:
                return {...state, savingError: payload.error, saving: false};
            default:
                return state;
        }
    };

export const ClientContext = React.createContext<ClientState>(initialStateClient);

interface ClientProviderProps {
    children: PropTypes.ReactNodeLike,
}




export const ClientProvider: React.FC<ClientProviderProps> = ({children}) => {

    const [state, dispatch] = useReducer(ClientReducer, initialStateClient);
    const {
        client, fetching, fetchingError, saving, savingError
    } = state;

    useEffect(getClientEffect, []);
    const saveClient = useCallback<SaveClientFn>(saveClientCallback, []);


    const value = {client, fetching, saving, fetchingError,saveClient};

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    );

    function getClientEffect() {
        let canceled = false;
        let client = fetchClient();
        return () => {
            canceled = true;
        }

        async function fetchClient() {
            try {
                console.log('fetchCLIENT started');
                dispatch({type: FETCH_CLIENT_STARTED});
                const client = await getClienti()
                console.log('fetchCLIENT succeeded');
                if (!canceled) {
                    dispatch({type: FETCH_CLIENT_SUCCEEDED, payload: {client}});
                }
            } catch (error) {
                console.log('fetchCLIENT failed');
                dispatch({type: FETCH_CLIENT_FAILED, payload: {error}});
            }
        }
    }

    async function saveClientCallback(client: PaginaClientProps) {
        log('saveCLIENT started');
        dispatch({type: SAVE_CLIENT_STARTED});
       /* const savedClient = await updateClient( client);
        log('saveClient succeeded');
        dispatch({type: SAVE_CLIENT_SUCCEEDED, payload: {client: savedClient}});*/
    }


};