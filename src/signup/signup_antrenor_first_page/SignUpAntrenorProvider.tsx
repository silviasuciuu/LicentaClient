import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLogger } from '../../core';
import { signUpAntrenor as signUpAntrenorApi } from './signUpAntrenorApi';
import SignUpAntrenor from "./SignUpAntrenor";

const log = getLogger('signUpAntrenorProvider');

type SignUpAntrenorFn = (nume?: string,prenume?: string,email?: string, parola?: string,varsta?:number,descriere?:string,poza?:string,numar_telefon?:string) => void;

export interface AuthState {
    signUpAntrenorError: Error | null;
    isSignedUpAntrenor: boolean;
    isSigningUpAntrenor: boolean;
    signUpAntrenor?: SignUpAntrenorFn;
    pendingSigningUpAntrenor?: boolean;
    nume?: string;
    prenume?: string;
    email?: string;
    parola?: string;
    varsta?:number;
    descriere?:string;
    poza?:string;
    numar_telefon?:string
}

const initialState: AuthState = {
    isSignedUpAntrenor: false,
    isSigningUpAntrenor: false,
    signUpAntrenorError: null,
    pendingSigningUpAntrenor: false,
};

export const SignUpAntrenorContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const SignUpAntrenorProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialState);
    const { isSignedUpAntrenor, isSigningUpAntrenor, signUpAntrenorError, pendingSigningUpAntrenor } = state;
    const signUpAntrenor = useCallback<SignUpAntrenorFn>(signUpAntrenorCallback, []);
    useEffect(signUpAntrenorEffect, [pendingSigningUpAntrenor]);
    const value = { isSignedUpAntrenor, signUpAntrenor, isSigningUpAntrenor,signUpAntrenorError };
    return (
        <SignUpAntrenorContext.Provider value={value}>
            {children}
        </SignUpAntrenorContext.Provider>
    );

    function signUpAntrenorCallback(nume?: string,prenume?: string,email?: string, parola?: string,varsta?:number,descriere?:string,poza?:string,numar_telefon?:string): void {
        log('login');
        setState({
            ...state,
            pendingSigningUpAntrenor: true,
            nume,
            prenume,
            email,
            parola,
            varsta,
            descriere,
            poza,
            numar_telefon
        });
    }

    function signUpAntrenorEffect() {
        let canceled = false;
        signUpAntr();
        return () => {
            canceled = true;
        }

        async function signUpAntr() {
            if (!pendingSigningUpAntrenor) {
                return;
            }
            try {
                setState({
                    ...state,
                    isSigningUpAntrenor: true,
                });
                const {nume,prenume,email, parola,varsta,descriere,poza ,numar_telefon} = state;
                 await signUpAntrenorApi(nume,prenume,email, parola,varsta,descriere,poza,numar_telefon );

                if (canceled) {
                    return;
                }
                log('authenticate succeeded');
                setState({
                    ...state,
                    pendingSigningUpAntrenor: false,
                    isSignedUpAntrenor: true,
                    isSigningUpAntrenor: false,
                });
            } catch (error) {
                if (canceled) {
                    return;
                }
                log('authenticate failed');
                alert("Email deja existent")
                setState({
                    ...state,
                    signUpAntrenorError: error,
                    pendingSigningUpAntrenor: false,
                    isSigningUpAntrenor: false,
                });
            }
        }
    }
};
