import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getLogger} from '../../core';
import {signUpClient as signUpClientApi} from './signUpClientApi';
import SignUpClient from "./SignUpClient";

const log = getLogger('signUpClientProvider');

type SignUpClientFn = (nume?: string, prenume?: string, email?: string, parola?: string, varsta?: number, greutate?: number, inaltime?: number, sex?: string, bmi?: string, status?: string, poza?: string, descriere?: string) => void;

export interface AuthState {
    signUpClientError: Error | null;
    isSignedUpClient: boolean;
    isSigningUpClient: boolean;
    signUpClient?: SignUpClientFn;
    pendingSigningUpClient?: boolean;
    nume?: string;
    prenume?: string;
    email?: string;
    parola?: string;
    varsta?: number;
    greutate?: number;
    inaltime?: number;
    sex?: string;
    bmi?: string;
    status?: string;
    poza?: string;
    descriere?: string
}

const initialState: AuthState = {
    isSignedUpClient: false,
    isSigningUpClient: false,
    signUpClientError: null,
    pendingSigningUpClient: false,
};

export const SignUpClientContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const SignUpClientProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [state, setState] = useState<AuthState>(initialState);
    const {isSignedUpClient, isSigningUpClient, signUpClientError, pendingSigningUpClient} = state;
    const signUpClient = useCallback<SignUpClientFn>(signUpClientCallback, []);
    useEffect(signUpClientEffect, [pendingSigningUpClient]);
    const value = {isSignedUpClient, signUpClient, isSigningUpClient, signUpClientError};
    return (
        <SignUpClientContext.Provider value={value}>
            {children}
        </SignUpClientContext.Provider>
    );

    function signUpClientCallback(nume?: string, prenume?: string, email?: string, parola?: string, varsta?: number, greutate?: number, inaltime?: number, sex?: string, bmi?: string, status?: string, poza?: string, descriere?: string): void {
        log('login');
        setState({
            ...state,
            pendingSigningUpClient: true,
            nume,
            prenume,
            email,
            parola,
            varsta,
            greutate,
            inaltime,
            sex,
            bmi,
            status,
            poza,
            descriere
        });
    }

    function signUpClientEffect() {
        let canceled = false;
        signUpClien();
        return () => {
            canceled = true;
        }

        async function signUpClien() {
            if (!pendingSigningUpClient) {
                return;
            }
            try {
                setState({
                    ...state,
                    isSigningUpClient: true,
                });
                const {nume, prenume,email, parola, varsta, greutate, inaltime, sex, bmi, status, poza, descriere} = state;
                await signUpClientApi(nume, prenume,email, parola, varsta, greutate, inaltime, sex, bmi, status, poza, descriere);

                if (canceled) {
                    return;
                }
                log('authenticate succeeded');
                setState({
                    ...state,
                    pendingSigningUpClient: false,
                    isSignedUpClient: true,
                    isSigningUpClient: false,
                });
            } catch (error) {
                if (canceled) {
                    return;
                }
                log('authenticate failed');

                setState({
                    ...state,
                    signUpClientError: error,
                    pendingSigningUpClient: false,
                    isSigningUpClient: false,
                });
            }
        }
    }
};
