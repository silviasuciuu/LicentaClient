// @ts-ignore
import {baseUrl, config, withLogs} from "../../core";

import axios from 'axios';

const sportUrl = `http://${baseUrl}/sport`;
const antrenorUrl = `http://${baseUrl}/antrenor`;
const antrenorSporturiUrl = `http://${baseUrl}/antrenor_sporturi`;
export interface SportProps {
    denumire: string;
}

export interface SalvareSport {
    id_antrenor: number,
    id_sport: number,
    experienta:number

}

export const getSporturi: () => Promise<SportProps[]> = () => {

    return withLogs(axios.get(sportUrl, config), 'getSporturi');
}

export const getSportIdByNume: (denumire:string) => Promise<number> = (denumire) => {

    return withLogs(
        axios.get(sportUrl+'/nume', { headers:{
                'denumire':denumire
            } }),'getSportIdByNume'
    );}

export const getAntrenorByEmail: (email:string) => Promise<number> =  (email) => {
    return withLogs(
        axios.get(antrenorUrl+'/email', { headers:{
            'email':email
            } }),'getAntrenorByEmail'
        );
}


export const salveazaSport: (id_antrenor: number, id_sport: number,experienta: number) => Promise<SportProps[]> = (id_antrenor,id_sport,experienta) => {
  //  return withLogs(axios.post(authUrl, { email, parola,tip }, config), 'login');
    return withLogs(axios.post(antrenorSporturiUrl+'/create', {id_antrenor,id_sport,experienta}, config), 'salveazaSport');
}



