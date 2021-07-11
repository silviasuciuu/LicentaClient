// @ts-ignore
import {baseUrl, config, withLogs} from "../../core";

import axios from 'axios';
import {SignUpAntrenorProps} from "../signup_antrenor_first_page/signUpAntrenorApi";

const signupClientUrl = `http://${baseUrl}/signup-client`;

export interface SignUpClientProps {
    nume?: string,
    prenume?: string,
    email?: string,
    parola?: string,
    varsta?: number,
    greutate?: number,
    inaltime?: number,
    sex?: string,
    bmi?: string,
    status?: string,
    poza?: string,
    descriere?: string

}

export const signUpClient: (nume?: string, prenume?: string, email?: string, parola?: string, varsta?: number, greutate?: number, inaltime?: number, sex?: string, bmi?: string, status?: string, poza?: string, descriere?: string) => Promise<SignUpClientProps> = (nume, prenume, email, parola, varsta, greutate, inaltime, sex, bmi, status, poza, descriere) => {
console.log(bmi,status,'ssssssssssssssssssssssssss')
    return withLogs(axios.post(signupClientUrl+'/create', {

        nume, prenume, email, parola, varsta, greutate, inaltime, sex, bmi, status, poza, descriere
    }, config), 'signUpClient');
}
export const getClientByEmail: (email: string | undefined) => Promise<SignUpAntrenorProps[]> = email => {
    return axios.get(signupClientUrl+'/email', {
        headers: {
            'email': "'"+email+"'"
        }
    });
}