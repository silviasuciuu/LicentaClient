// @ts-ignore
import {baseUrl, config, withLogs} from "../../core";

import axios from 'axios';

const signupAntrenorUrl = `http://${baseUrl}/signup-antrenor`;


export interface SignUpAntrenorProps {
    id?:number ;
    nume: string,
    prenume: string,
    email: string,
    parola: string,
    varsta: number,
    descriere: string,
    poza: string,
    numar_telefon:string

}

export const signUpAntrenor: (nume?: string, prenume?: string, email?: string, parola?: string, varsta?: number, descriere?: string, poza?: string,numar_telefon?:string) => Promise<SignUpAntrenorProps> = (nume, prenume, email, parola, varsta, descriere, poza,numar_telefon) => {

    return withLogs(axios.post(signupAntrenorUrl+'/create', {
        nume,
        prenume,
        email,
        parola,
        varsta,
        descriere,
        poza,
        'numar_telefon':numar_telefon
    }, config), 'signUpAntrenor');
}
export const getAntrenorByEmail: (email: string | undefined) => Promise<SignUpAntrenorProps[]> = email => {
    return axios.get(signupAntrenorUrl+'/email', {
        headers: {
            'email': "'"+email+"'"
        }
    });
}