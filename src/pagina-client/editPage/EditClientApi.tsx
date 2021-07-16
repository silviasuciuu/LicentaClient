import {baseUrl, withLogs} from "../../core";
import {PaginaAntrenorProps} from "../../pagina-antrenor/profilePage/PaginaAntrenorProps";
import axios from 'axios';
import {PaginaClientProps} from "../profilePage/PaginaClientProps";
import {PaginaEditClientProps} from "./PaginaEditClientProps";

const clientUrl = `http://${baseUrl}/client`;




export const updateClient: ( client: PaginaEditClientProps) => Promise<PaginaEditClientProps> = ( client) => {
    var result = axios.put(`${clientUrl}/edit`, client);
    result.then(async function (r) {
        var person = r.data;
    });
    return withLogs(result, "updatePerson");
}