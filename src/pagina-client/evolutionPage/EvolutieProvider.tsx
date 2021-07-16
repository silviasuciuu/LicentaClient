import React, {useCallback, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {SportProps} from "../../signup/signup_antrenor_second_page/SportApi";
import {getGreutatiById, salveazaGreutate} from "./EvolutieApi";

export interface GreutateProps {
    id?: number;
    greutate: number
    data: string
}

export interface EvolutieState {
    greutati?: GreutateProps[],
    fetching: boolean,
    fetchingError?: Error | null,

}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialStateEvolutie: EvolutieState = {
    fetching: false,

};
type SaveGreutateFn = (item: GreutateProps) => Promise<any>;


const FETCH_GREUTATI_STARTED = 'FETCH_GREUTATI_STARTED';
const FETCH_GREUTATI_SUCCEEDED = 'FETCH_GREUTATI_SUCCEEDED';
const FETCH_GREUTATI_FAILED = 'FETCH_GREUTATI_FAILED';
const SAVE_GREUTATE_STARTED = 'SAVE_GREUTATE_STARTED';
const SAVE_GREUTATE_SUCCEEDED = 'SAVE_GREUTATE_SUCCEEDED';
const SAVE_GREUTATE_FAILED = 'SAVE_GREUTATE_FAILED';

const EvolutieReducer: (state: EvolutieState, action: ActionProps) => EvolutieState =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_GREUTATI_STARTED:
                return {...state, fetching: true, fetchingError: null};
            case FETCH_GREUTATI_SUCCEEDED:
                return {...state, greutati: payload.greutati, fetching: false};
            case FETCH_GREUTATI_FAILED:
                return {...state, fetchingError: payload.error, fetching: false};
            case SAVE_GREUTATE_STARTED:
                return {...state, savingError: null, saving: true};
            case SAVE_GREUTATE_SUCCEEDED:
                const greutati = [...(state.greutati || [])];
                const item = payload.greutate;
                const index = greutati.findIndex(it => it.id === item.id);
                if (index === -1) {
                    greutati.splice(0, 0, item);
                } else {
                    greutati[index] = item;
                }
                return {...state, greutati, saving: false};
            case SAVE_GREUTATE_FAILED:
                return {...state, savingError: payload.error, saving: false};
            default:
                return state;
        }
    };

export const EvolutieContext = React.createContext<EvolutieState>(initialStateEvolutie);

interface EvolutieProviderProps {
    children: PropTypes.ReactNodeLike,
}

var id: number

export function setId(idR: number) {
    console.log(idR)
    id = idR
}

export const EvolutieProvider: React.FC<EvolutieProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(EvolutieReducer, initialStateEvolutie);
    const {greutati, fetching, fetchingError} = state;
    useEffect(getEvolutieEffect, []);


    const value = {greutati, fetching, fetchingError};

    return (
        <EvolutieContext.Provider value={value}>
            {children}
        </EvolutieContext.Provider>
    );


    async function saveGreutateCallback(id_client: number, greutate: number, data: string) {
        try {
            dispatch({type: SAVE_GREUTATE_STARTED});
            const savedItem = await salveazaGreutate(id_client, greutate, data)
            dispatch({type: SAVE_GREUTATE_SUCCEEDED, payload: {item: savedItem}});
        } catch (error) {
            dispatch({type: SAVE_GREUTATE_FAILED, payload: {error}});
        }
    }


    function getEvolutieEffect() {
        let canceled = false;
        let greutatis = fetchGreutati();
        return () => {
            canceled = true;
        }

        async function fetchGreutati() {
            try {
                console.log('fetchExperiences started');
                dispatch({type: FETCH_GREUTATI_STARTED});
                const greutati = await getGreutatiById(id)
                console.log('fetchExperiences succeeded');
                if (!canceled) {
                    dispatch({type: FETCH_GREUTATI_SUCCEEDED, payload: {greutati}});
                }
            } catch (error) {
                console.log('fetchgreutati failed');
                dispatch({type: FETCH_GREUTATI_FAILED, payload: {error}});
            }
        }
    }

};
