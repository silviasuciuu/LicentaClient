import React, {useCallback, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {getAllById} from "./galerieApi";


export interface GalerieState {
    photos?: string[],
    fetching: boolean,
    fetchingError?: Error | null,

}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialStateExperiences: GalerieState = {
    fetching: false,

};

const FETCH_PHOTOS_STARTED = 'FETCH_PHOTOS_STARTED';
const FETCH_PHOTOS_SUCCEEDED = 'FETCH_PHOTOS_SUCCEEDED';
const FETCH_PHOTOS_FAILED = 'FETCH_PHOTOS_FAILED';


const GalerieReducer: (state: GalerieState, action: ActionProps) => GalerieState =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_PHOTOS_STARTED:
                return {...state, fetching: true, fetchingError: null};
            case FETCH_PHOTOS_SUCCEEDED:
                return {...state, photos: payload.photos, fetching: false};
            case FETCH_PHOTOS_FAILED:
                return {...state, fetchingError: payload.error, fetching: false};
            default:
                return state;
        }
    };

export const GalerieContext = React.createContext<GalerieState>(initialStateExperiences);

interface GalerieProviderProps {
    children: PropTypes.ReactNodeLike,
}

var id: number
export  function setId(idR:number)
{
    id=idR
}

export const GalerieProvider: React.FC<GalerieProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(GalerieReducer, initialStateExperiences);
    const {photos, fetching, fetchingError} = state;
    useEffect(getGalerieEffect, [id]);


    const value = {photos, fetching, fetchingError};

    return (
        <GalerieContext.Provider value={value}>
            {children}
        </GalerieContext.Provider>
    );

    function getGalerieEffect() {
        let canceled = false;
        let photoss = fetchPhotos();

        return () => {
            canceled = true;
        }

        async function fetchPhotos() {
            try {
                console.log('fetchPhotos started');
                dispatch({type: FETCH_PHOTOS_STARTED});
                const photos = await getAllById(String(id))
                console.log('fetchPhotos succeeded');
                if (!canceled) {
                    dispatch({type: FETCH_PHOTOS_SUCCEEDED, payload: {photos}});
                }
            } catch (error) {
                console.log('fetchPhotos failed');
                dispatch({type: FETCH_PHOTOS_FAILED, payload: {error}});
            }
        }
    }

};
