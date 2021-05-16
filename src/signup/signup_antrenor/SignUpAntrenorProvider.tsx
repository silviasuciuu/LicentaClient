import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLogger } from '../../core';
import {signUpAntrenor as signUpAntrenorApi } from './signUpAntrenorApi';

const log = getLogger('AuthProvider');

type SignUpAntrenorFn = (nume?: string,prenume?: string,email?: string, parola?: string,varsta?:number,descriere?:string,poza?:string) => void;

export interface SignUpAntrenorState {
    signUpAntrenorError: Error | null;
    signUpAntrenor?: SignUpAntrenorFn;
    pendingSignUpAntrenor?: boolean;
    nume?: string;
    prenume?: string;
    email?: string;
    parola?: string;
    varsta?:number;
    descriere?:string;
    poza?:string;
}

const initialState: SignUpAntrenorState = {
    signUpAntrenorError: null,
};

export const SignUpAntrenorContext = React.createContext<SignUpAntrenorState>(initialState);

interface SignUpAntrenorProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const SignUpAntrenorProvider: React.FC<SignUpAntrenorProviderProps> = ({ children }) => {
    const [state, setState] = useState<SignUpAntrenorState>(initialState);
    const { signUpAntrenorError ,pendingSignUpAntrenor} = state;
    const signUpAntrenor = useCallback<SignUpAntrenorFn>(signUpAntrenorCallback, []);
    useEffect(signUpAntrenorEffect, [pendingSignUpAntrenor]);
    const value = {  signUpAntrenor,  signUpAntrenorError };
    log('render');
    return (
        <SignUpAntrenorContext.Provider value={value}>
            {children}
        </SignUpAntrenorContext.Provider>
    );

    function signUpAntrenorCallback(nume?: string,prenume?: string,email?: string, parola?: string,varsta?:number,descriere?:string,poza?:string): void {
        setState({
            ...state,
            nume,
            prenume,
            email,
            parola,
            varsta,
            descriere,
            poza
        });
    }

    function signUpAntrenorEffect() {
        let canceled = false;
        signUpAntr();
        return () => {
            canceled = true;
        }

        async function signUpAntr() {
            if (!pendingSignUpAntrenor) {
                return;
            }
            try {
                setState({
                    ...state,
                });
                const {nume,prenume,email, parola,varsta,descriere,poza } = state;
                 await signUpAntrenorApi(nume,prenume,email, parola,varsta,descriere,poza);
                if (canceled) {
                    return;
                }
                setState({
                    ...state,

                });
            } catch (error) {
                if (canceled) {
                    return;
                }
                setState({
                    ...state,
                    signUpAntrenorError: error,
                    pendingSignUpAntrenor: false,
                });
            }
        }
    }
};
