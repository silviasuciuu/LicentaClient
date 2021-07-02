import axios from 'axios';
import { Plugins } from "@capacitor/core";
import {PaginaAntrenorProps} from "../profilePage/PaginaAntrenorProps";
import {withLogs,authConfig, baseUrl, getLogger} from "../../core";

const { Storage } = Plugins; //local
const antrenorUrl = `http://${baseUrl}/antrenor`;




export const updateAntrenor: ( antrenor: PaginaAntrenorProps) => Promise<PaginaAntrenorProps> = ( antrenor) => {
    console.log(`${antrenorUrl}/'edit'`)
    var result = axios.put(`${antrenorUrl}/edit`, antrenor);
    result.then(async function (r) {
        var person = r.data;
    });
    return withLogs(result, "updatePerson");
}
