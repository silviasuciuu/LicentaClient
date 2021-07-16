// @ts-ignore

import axios from 'axios';
import {baseUrl, config, withLogs} from "../../core";
import {SportProps} from "../../signup/signup_antrenor_second_page/SportApi";
import {PaginaClientProps} from "../profilePage/PaginaClientProps";

const paginaEvolutieUrl = `http://${baseUrl}/greutate`;
const paginaClientUrl = `http://${baseUrl}/client`;

export interface PaginaEvolutieProps {
    id?: string,
    greutate: number,
    data: string

}


export const getGreutatiById: (id: number) => Promise<PaginaEvolutieProps[]> = id => {
    return withLogs(axios.get(paginaEvolutieUrl + '/id_client', {
        headers: {
            'id_client': id,
            'Content-Type': 'application/json'
        }
    }), 'getGreutati');

}

export const salveazaGreutate: (id_client: number, greutate: number, data: string) => Promise<PaginaEvolutieProps[]> = (id_client, greutate, data) => {
    return withLogs(axios.post(paginaEvolutieUrl + '/create', {
        'id_client': id_client,
        'greutate':greutate,
        'data': data
    }, config), 'salveazaGreuattea');
}

export const modificaGreutate: (id_client: number, greutate: number,bmi:number,status:string) => Promise<PaginaEvolutieProps[]> = (id_client, greutate,bmi,status) => {
    return withLogs(axios.put(paginaClientUrl + '/edit_greutate', {
        'id': id_client,
        'greutate':greutate,
        'bmi': bmi,
        'status':status
    }, config), 'modifica Greutateaa');
}

const ClientUrl = `http://${baseUrl}/client`;

export const getClientByIdd: (id: string ) => Promise<PaginaClientProps[]> = id => {
    return withLogs(axios.get(ClientUrl+'/id', {
        headers: {
            'id': id,
            'Content-Type': 'application/json'
        }
    }), 'getClient');

}


