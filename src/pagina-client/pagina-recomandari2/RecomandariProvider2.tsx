import React, {useCallback, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {getRecomandariById} from "./RecomandariApi2";

export interface RecomandareProps2 {
    id: string,
    nume: string,
    prenume: string,
    email: string,
    poza: string,
    numar_telefon: string
}

export interface RecomandareState2 {
    recomandari?: RecomandareProps2[],
    fetching: boolean,
    fetchingError?: Error | null,

}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialStateRecomandare2: RecomandareState2 = {
    fetching: false,

};


const FETCH_RECOMANDATIONs_STARTED = 'FETCH_RECOMANDATIONs_STARTED';
const FETCH_RECOMANDATIONs_SUCCEEDED = 'FETCH_RECOMANDATIONs_SUCCEEDED';
const FETCH_RECOMANDATIONs_FAILED = 'FETCH_RECOMANDATIONs_FAILED';


const RecomandareReducer2: (state: RecomandareState2, action: ActionProps) => RecomandareState2 =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_RECOMANDATIONs_STARTED:
                return {...state, fetching: true, fetchingError: null};
            case FETCH_RECOMANDATIONs_SUCCEEDED:
                return {...state, recomandari: payload.recomandari, fetching: false};
            case FETCH_RECOMANDATIONs_FAILED:
                return {...state, fetchingError: payload.error, fetching: false};

            default:
                return state;
        }
    };

export const RecomandareContext2 = React.createContext<RecomandareState2>(initialStateRecomandare2);

interface RecomandareProviderProps2 {
    children: PropTypes.ReactNodeLike,
}

var id: number

export function setIdRec(idR: number) {
    id = idR
}


export const RecomandareProvider2: React.FC<RecomandareProviderProps2> = ({children}) => {
    const [state, dispatch] = useReducer(RecomandareReducer2, initialStateRecomandare2);
    const {recomandari, fetching, fetchingError} = state;
    useEffect(getRecomandareEffect2, []);


    const value = {recomandari, fetching, fetchingError};

    return (
        <RecomandareContext2.Provider value={value}>
            {children}
        </RecomandareContext2.Provider>
    );



    function getRecomandareEffect2() {
        let canceled = false;
        let recomandari = fetchRecomandari2();
        return () => {
            canceled = true;
        }

        async function fetchRecomandari2() {
            try {
                console.log('fetchRecoms started');
                dispatch({type: FETCH_RECOMANDATIONs_STARTED});
                const recomandari = await getRecomandariById(id)
                console.log(recomandari ,'RECCCCCCCCCC')
                console.log('fetchRecoms succeeded');
                if (!canceled) {
                    dispatch({type: FETCH_RECOMANDATIONs_SUCCEEDED, payload: {recomandari }});
                }
            } catch (error) {
                console.log('fetchrecoms failed');
                dispatch({type: FETCH_RECOMANDATIONs_FAILED, payload: {error}});
            }
        }
        }


};
