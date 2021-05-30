// @ts-ignore
import {baseUrl, config, withLogs} from "../../core";

import axios from 'axios';

const signupAntrenorUrl = `http://${baseUrl}/signup-antrenor`;


export interface SignUpAntrenorProps {
    nume: string,
    prenume: string,
    email: string,
    parola: string,
    varsta: number,
    descriere: string,
    poza: string,

}

export const signUpAntrenor: (nume?: string, prenume?: string, email?: string, parola?: string, varsta?: number, descriere?: string, poza?: string) => Promise<SignUpAntrenorProps> = (nume, prenume, email, parola, varsta, descriere, poza) => {


    return withLogs(axios.post(signupAntrenorUrl+'/create', {
        nume,
        prenume,
        email,
        parola,
        varsta,
        descriere,
        poza
    }, config), 'signUpAntrenor');
}
export const getAntrenorByEmail: (email: string | undefined) => Promise<SignUpAntrenorProps[]> = email => {
    return axios.get(signupAntrenorUrl+'/email', {
        headers: {
            'email': "'"+email+"'"
        }
    });
}