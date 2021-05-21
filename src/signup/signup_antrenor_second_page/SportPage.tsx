import React, {useContext, useState} from 'react';
import {IonItem, IonLabel, IonButton, IonList, IonContent, IonPage, IonLoading} from '@ionic/react';
import {SportProps} from "./SportProps";
import Sport from "./Sport";

import {SportContext} from './SportProvider'
import {useHistory} from "react-router";
import {SignUpAntrenorProps} from "../signup_antrenor_first_page/signUpAntrenorApi";
import {getAntrenorByEmail, getSportIdByNume, getSporturi, salveazaSport} from "./SportApi";

interface SportPropsExt extends SportProps {

}


const SportPage: React.FC<SportPropsExt> = ({}) => {
    const {sports, fetching, fetchingError} = useContext(SportContext);
    const history = useHistory<SignUpAntrenorProps>()

    function trimite(sport: Promise<number>, experienta: number, antrenorId: Promise<number>) {

        console.log(sport + "sport" + experienta + "exper" + antrenorId + "antrid")
        salveazaSport(parseInt(String(antrenorId)),parseInt(String(sport)),parseInt(String(experienta)))

    }

    const handleAlegereSporturi = async () => {
        const sports = await getSporturi();
      //  console.log(sports[0].denumire + 'ssssssss')
        // @ts-ignore
        const antr = await getAntrenorByEmail(JSON.stringify(history.location.state.detail))
        // @ts-ignore
        //    console.log(antr[0].id + "id antrenor")
        // @ts-ignore
        // console.log(JSON.stringify(history.location.state.detail) + "tttttttttttttttttttttttttttttttttttt")
        console.log(document.getElementsByClassName("native-input sc-ion-input-md")[0].value + "eelllll")
        var exper = document.getElementsByClassName("native-input sc-ion-input-md")

        for (let i = 0; i < exper.length; i++) {
            // @ts-ignore
            let val = exper[i].value;
            if (val.toString() != '' && val.toString() != '0') {

                // @ts-ignore
                let sid = await getSportIdByNume(sports[i].denumire)

                // @ts-ignore
                trimite(sid[0].id, val.toString(), antr[0].id)
            }
        }

        history.push('/login')
    };
    // @ts-ignore
    return (
        <IonPage>
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching sports"/>
                {sports && (
                    <IonList>
                        {sports.map(({denumire, experienta}) =>
                            <Sport key={denumire} denumire={denumire} experienta={experienta}/>)}
                    </IonList>
                )}
                {fetchingError && (
                    <div>{fetchingError.message || 'Failed to fetch students'}</div>
                )}
            </IonContent>
            <IonButton onClick={handleAlegereSporturi}>Finalizare</IonButton>
        </IonPage>

    )
        ;

};

export default SportPage;
