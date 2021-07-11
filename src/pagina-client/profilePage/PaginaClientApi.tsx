// @ts-ignore

import axios from 'axios';
import {baseUrl, config, withLogs} from "../../core";
import {SportProps} from "../../signup/signup_antrenor_second_page/SportApi";
import {PaginaAntrenorProps} from "../../pagina-antrenor/profilePage/PaginaAntrenorProps";
import {PaginaClientProps} from "./PaginaClientProps";

const paginaClientUrl = `http://${baseUrl}/client`;




export const getClientById: (id: string ) => Promise<PaginaClientProps[]> = id => {
    return withLogs(axios.get(paginaClientUrl+'/id', {
        headers: {
            'id': "'"+id+"'",
            'Content-Type': 'application/json'
        }
    }), 'getClient');

}




export const getClienti: () => Promise<PaginaClientProps[]> = () => {

    return withLogs(axios.get(paginaClientUrl, config), 'getClent');
}