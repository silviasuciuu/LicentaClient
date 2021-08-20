import axios from 'axios';
import {baseUrl, config, withLogs} from "../../core";
import {PaginaAntrenorProps} from "../../pagina-antrenor/profilePage/PaginaAntrenorProps";
import {getClientByIdd} from "../evolutionPage/EvolutieApi";
import {PaginaClientProps} from "../profilePage/PaginaClientProps";
import {
    getAntrenorById,
    getAntrenorByIdd,
    getAntrenorByIddd
} from "../../pagina-antrenor/profilePage/PaginaAntrenorApi";

const paginaAntrenorUrl = `http://${baseUrl}/antrenor_sporturi`;


export const getRecomandariById: (id: number) => Promise<PaginaAntrenorProps[]> = async id => {

    var statuss = await getClientByIdd(id.toString())
    var status = statuss[0].status
    let id_scop
    if (status == 'Obez')
        id_scop = 3
    if (status == 'Normal')
        id_scop = 1
    if (status == 'Supraponderal')
        id_scop = 3
    if (status == 'Subponderal')
        id_scop = 2
    console.log(id_scop, 'idsssss')
    let vari = await withLogs(axios.get(paginaAntrenorUrl + '/scop', {
        headers: {
            'id_scop': id_scop,
            'Content-Type': 'application/json'
        }

    }), 'getAntrenor');
    let antrenori = new Set()
    // @ts-ignore
    for (let i = 0; i < vari.length; i++) {
        // @ts-ignore
        let aux = await getAntrenorBySport(vari[i].id)
        for (let j = 0; j < aux.length; j++)
            // @ts-ignore
        {
            // @ts-ignore
            antrenori.add(aux[j].id_antrenor)

        }
    }
    let an = Array.from(antrenori)
    let all: PaginaAntrenorProps[] = []
    for (const x of an) {

        // @ts-ignore

        let rez = await getAntrenorByIddd(x.toString());
        // @ts-ignore
        all.push(rez)
    }
    const res = []
    for(let i=0;i<all.length;i++)
        // @ts-ignore
        res.push(all[i][0])

    console.log(res[0], 'antrrr')

    return res
}


export const getAntrenorBySport: (id_sport: number) => Promise<PaginaAntrenorProps[]> = async id_sport => {
    return withLogs(axios.get(paginaAntrenorUrl + '/id_sport', {
        headers: {
            'id_sport': id_sport,
            'Content-Type': 'application/json'
        }
    }), 'getAntrenor');
}