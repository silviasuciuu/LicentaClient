// @ts-ignore
import {baseUrl, config, withLogs} from "../../core";

import axios from 'axios';

const signupAntrenorUrl = `http://${baseUrl}/antrenor/create`;

export interface SignUpAntrenorProps {
    status: string;
}

export const signUpAntrenor: (nume?: string,prenume?: string,email?: string, parola?: string,varsta?:number,descriere?:string,poza?:string) => Promise<SignUpAntrenorProps> = (nume,prenume,email, parola,varsta,descriere,poza) => {
    console.log('am ajuns aiciiiiiiiiiiii')

    return withLogs(axios.post(signupAntrenorUrl, { nume,prenume,email, parola,varsta,descriere,poza }, config), 'signUpAntrenor');
}
