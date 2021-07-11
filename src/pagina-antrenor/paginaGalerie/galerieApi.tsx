// @ts-ignore

import axios from 'axios';
import {baseUrl, config, withLogs} from "../../core";
import {SportProps} from "../../signup/signup_antrenor_second_page/SportApi";
import {SignUpClientProps} from "../../signup/singup_client/signUpClientApi";

const galerieUrl = `http://${baseUrl}/transformare`;

export interface GalerieProps {
    id?:number,
    id_antrenor:number,
    poza:string


}


export const getAllById: (id: string ) => Promise<GalerieProps[]> = id => {
    return withLogs(axios.get(galerieUrl+'/id_antrenor', {
        headers: {
            'id_antrenor': "'"+id+"'",
            'Content-Type': 'application/json'
        }
    }), 'getAntrenor');

}

export const addPhoto: (id_antrenor: number, poza: string | undefined) => Promise<GalerieProps> = (id_antrenor, poza) => {

    return withLogs(axios.post(galerieUrl+'/create', {
        'id_antrenor': id_antrenor,
        'poza':poza
    }, config), 'addPhoto');
}



