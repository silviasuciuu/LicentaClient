import React, {useCallback, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {SportProps} from "../../signup/signup_antrenor_second_page/SportApi";
import {getExperienta} from "./ExperientaApi";


export interface ExperiencesState {
    sports?: SportProps[],
    fetching: boolean,
    fetchingError?: Error | null,

}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialStateExperiences: ExperiencesState = {
    fetching: false,

};

const FETCH_SPORTS_STARTED = 'FETCH_SPORTS_STARTED';
const FETCH_SPORTS_SUCCEEDED = 'FETCH_SPORTS_SUCCEEDED';
const FETCH_SPORTS_FAILED = 'FETCH_SPORTS_FAILED';


const Experiencereducer: (state: ExperiencesState, action: ActionProps) => ExperiencesState =
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

export const ExperienceContext = React.createContext<ExperiencesState>(initialStateExperiences);

interface ExperienceProviderProps {
    children: PropTypes.ReactNodeLike,
}

var id: number
export  function setId(idR:number)
{
    id=idR
}

export const ExperienceProvider: React.FC<ExperienceProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(Experiencereducer, initialStateExperiences);
    const {sports, fetching, fetchingError} = state;
    useEffect(getExperiencesEffect, [id]);


    const value = {sports, fetching, fetchingError};

    return (
        <ExperienceContext.Provider value={value}>
            {children}
        </ExperienceContext.Provider>
    );

    function getExperiencesEffect() {
        let canceled = false;
        let sportss = fetchExperiences();

       // console.log(id,'iddddddddddd',JSON.stringify(sportss),'llllllllllllllll')
        return () => {
            canceled = true;
        }

        async function fetchExperiences() {
            try {
                console.log('fetchExperiences started');
                dispatch({type: FETCH_SPORTS_STARTED});
                const sports = await getExperienta(id)
                console.log('fetchExperiences succeeded');
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
