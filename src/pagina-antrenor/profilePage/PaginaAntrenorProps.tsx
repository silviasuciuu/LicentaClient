import {RouteComponentProps} from "react-router";

export interface PaginaAntrenorProps {
    id?:string,
    nume: string,
    prenume: string,
    email: string,
    varsta: number,
    nota?: number,
    descriere: string,
    poza: string,
    numar_telefon:string

}