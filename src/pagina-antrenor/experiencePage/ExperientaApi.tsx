import axios from 'axios';
import {Plugins} from "@capacitor/core";
import {PaginaAntrenorProps} from "../profilePage/PaginaAntrenorProps";
import {withLogs, authConfig, baseUrl, getLogger, config} from "../../core";
import {SportProps} from "../../signup/signup_antrenor_second_page/SportApi";

const {Storage} = Plugins; //local
const experUrl = `http://${baseUrl}/antrenor_sporturi`;

export interface ExperienceProps {
    denumire: string
    experienta: number;
}


export const getExperienta: (id: number) => Promise<ExperienceProps> = (id) => {
    return withLogs(
        axios.get(experUrl + '/experience', {
            headers: {
                'id_antrenor': id
            }
        }), 'getExperienta'
    );
}

export const salveazaExperienta: (id_antrenor: number, id_sport: number, experienta: number) => Promise<SportProps[]> = (id_antrenor, id_sport, experienta) => {

    return withLogs(axios.put(experUrl + '/edit', {
        'antrenor': id_antrenor,
        'sport':id_sport,
       'experienta': experienta
    }, config), 'salveazaExperienta');
}

