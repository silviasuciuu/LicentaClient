// @ts-ignore

import axios from 'axios';
import {PaginaAntrenorProps} from "./PaginaAntrenorProps";
import {baseUrl, config, withLogs} from "../../core";
import {SportProps} from "../../signup/signup_antrenor_second_page/SportApi";

const paginaAntrenorUrl = `http://${baseUrl}/antrenor`;




export const getAntrenorById: (id: string ) => Promise<PaginaAntrenorProps[]> = id => {
    return withLogs(axios.get(paginaAntrenorUrl+'/id', {
        headers: {
            'id': "'"+id+"'",
            'Content-Type': 'application/json'
        }
    }), 'getAntrenor');

}




export const getAntrenori: () => Promise<PaginaAntrenorProps[]> = () => {

     return withLogs(axios.get(paginaAntrenorUrl, config), 'getAntrenor');
}