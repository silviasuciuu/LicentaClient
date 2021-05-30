import React, {useCallback, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {SportProps} from './SportProps';
import {getSporturi} from './SportApi';
import {log} from "util";


export interface SportsState {
    sports?: SportProps[],
    fetching: boolean,
    fetchingError?: Error | null,

}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialStateSports: SportsState = {
    fetching: false,

};

const FETCH_SPORTS_STARTED = 'FETCH_SPORTS_STARTED';
const FETCH_SPORTS_SUCCEEDED = 'FETCH_SPORTS_SUCCEEDED';
const FETCH_SPORTS_FAILED = 'FETCH_SPORTS_FAILED';


const sportreducer: (state: SportsState, action: ActionProps) => SportsState =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_SPORTS_STARTED:
                return {...state, fetching: true, fetchingError: null};
            case FETCH_SPORTS_SUCCEEDED:
                return {...state, sports: payload.sports, fetching: false};
            case FETCH_SPORTS_FAILED:
                return {...state, fetchingError: payload.error, fetching: false};
            default:
                return state;
        }
    };

export const SportContext = React.createContext<SportsState>(initialStateSports);

interface SportProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const SportProvider: React.FC<SportProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(sportreducer, initialStateSports);
    const {sports, fetching, fetchingError} = state;
    useEffect(getSportsEffect, []);


    const value = {sports, fetching, fetchingError};

    return (
        <SportContext.Provider value={value}>
            {children}
        </SportContext.Provider>
    );

    function getSportsEffect() {
        let canceled = false;
        let sportss = fetchSports();
        return () => {
            canceled = true;
        }

        async function fetchSports() {
            try {
                console.log('fetchSports started');
                dispatch({type: FETCH_SPORTS_STARTED});
                const sports = await getSporturi();
                console.log('fetchSports succeeded');
                if (!canceled) {
                    dispatch({type: FETCH_SPORTS_SUCCEEDED, payload: {sports}});
                }
            } catch (error) {
                console.log('fetchSports failed');
                dispatch({type: FETCH_SPORTS_FAILED, payload: {error}});
            }
        }
    }

};
