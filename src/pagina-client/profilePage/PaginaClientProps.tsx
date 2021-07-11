import {RouteComponentProps} from "react-router";

export interface PaginaClientProps {
    id?:string,
    nume: string,
    prenume: string,
    email: string,
    varsta: number,
    greutate:number,
    inaltime:number,
    descriere: string,
    sex:string,
    bmi:number,
    status:string,
    poza: string,

}