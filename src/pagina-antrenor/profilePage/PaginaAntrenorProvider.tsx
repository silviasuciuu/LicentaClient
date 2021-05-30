import React, {useCallback, useContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

import {log} from "util";
import {PaginaAntrenorProps} from "./PaginaAntrenorProps";
import {getAntrenorById, getAntrenori} from "./PaginaAntrenorApi";
import {AuthContext} from "../../auth";
import {updateAntrenor} from "../editPage/EditAntrenorApi";

type SaveAntrenorFn = (antrenor: PaginaAntrenorProps) => Promise<any>;

export interface AntrenorState {
    antrenor?: PaginaAntrenorProps[],
    fetching: boolean,
    fetchingError?: Error | null,
    saving: boolean,
    savingError?: Error | null,
    saveAntrenor?: SaveAntrenorFn,


}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialStateAntrenor: AntrenorState = {
    fetching: false,
    saving: false,


};

const FETCH_ANTRENOR_STARTED = 'FETCH_ANTRENOR_STARTED';
const FETCH_ANTRENOR_SUCCEEDED = 'FETCH_ANTRENOR_SUCCEEDED';
const FETCH_ANTRENOR_FAILED = 'FETCH_ANTRENOR_FAILED';
const SAVE_ANTRENOR_STARTED = 'SAVE_ANTRENOR_STARTED';
const SAVE_ANTRENOR_SUCCEEDED = 'SAVE_ANTRENOR_SUCCEEDED';
const SAVE_ANTRENOR_FAILED = 'SAVE_ANTRENOR_FAILED';

const antrenorreducer: (state: AntrenorState, action: ActionProps) => AntrenorState =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_ANTRENOR_STARTED:
                return {...state, fetching: true, fetchingError: null};
            case FETCH_ANTRENOR_SUCCEEDED:
                return {...state, antrenor: payload.antrenor, fetching: false};
            case FETCH_ANTRENOR_FAILED:
                return {...state, fetchingError: payload.error, fetching: false};
            case SAVE_ANTRENOR_STARTED:
                return {...state, savingError: null, saving: true};
            case SAVE_ANTRENOR_SUCCEEDED:
                const antrenori = [...(state.antrenor || [])];
                const antrenor = payload.antrenor;
                const index = antrenori.findIndex(it => it.id === antrenor.id);
                if (index === -1) {
                    antrenori.splice(0, 0, antrenor);
                } else {
                    antrenori[index] = antrenor;
                }
                return {...state, antrenori, saving: false};
            case SAVE_ANTRENOR_FAILED:
                return {...state, savingError: payload.error, saving: false};
            default:
                return state;
        }
    };

export const AntrenorContext = React.createContext<AntrenorState>(initialStateAntrenor);

interface AntrenorProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const AntrenorProvider: React.FC<AntrenorProviderProps> = ({children}) => {
    const {id} = useContext(AuthContext);
    console.log(id,'iddddddddddddddddddd')
    const [state, dispatch] = useReducer(antrenorreducer, initialStateAntrenor);
    const {
        antrenor, fetching, fetchingError, saving, savingError
    } = state;

    useEffect(getAntrenorEffect, []);
    const saveAntrenor = useCallback<SaveAntrenorFn>(saveAntrenorCallback, [id]);


    const value = {antrenor, fetching, saving, fetchingError};

    return (
        <AntrenorContext.Provider value={value}>
            {children}
        </AntrenorContext.Provider>
    );

    function getAntrenorEffect() {
        let canceled = false;
        let antrenor = fetchAntrenor();
        return () => {
            canceled = true;
        }

        async function fetchAntrenor() {
            try {
                console.log('fetchANTRENOR started');
                dispatch({type: FETCH_ANTRENOR_STARTED});
                const antrenor = await getAntrenori()
                console.log('fetchANTRENOR succeeded');
                if (!canceled) {
                    dispatch({type: FETCH_ANTRENOR_SUCCEEDED, payload: {antrenor}});
                }
            } catch (error) {
                console.log('fetchANTRENOR failed');
                dispatch({type: FETCH_ANTRENOR_FAILED, payload: {error}});
            }
        }
    }

    async function saveAntrenorCallback(antrenor: PaginaAntrenorProps) {
        log('saveAntrenor started');
        dispatch({type: SAVE_ANTRENOR_STARTED});
        console.log(id)
        const savedAntrenor = await (updateAntrenor(id, antrenor));
        log('saveAntrenor succeeded');
        dispatch({type: SAVE_ANTRENOR_SUCCEEDED, payload: {antrenor: savedAntrenor}});
    }


};
