import React, {useContext, useState} from 'react';
import {
    IonItem,
    IonLabel,
    IonButton,
    IonList,
    IonContent,
    IonPage,
    IonLoading,
    IonImg,
    IonFab,
    IonInput
} from '@ionic/react';

import {match, RouteComponentProps, useHistory} from "react-router";
import {getSportIdByNume, SportProps} from "../../signup/signup_antrenor_second_page/SportApi";
import {getExperienta, salveazaExperienta} from "./ExperientaApi";
import {ExperienceContext, setId} from "./ExperiencePageProvider";
import Sport from "../../signup/signup_antrenor_second_page/Sport";

interface EditarePropsExt extends RouteComponentProps<{
    id?: string;
}> {
}


const EditareExperienta: React.FC<EditarePropsExt> = ({history, match}) => {

    const {sports, fetching, fetchingError} = useContext(ExperienceContext);
    try {
        //@ts-ignore
        const routeId = history.location.state.id

        setId(Number(routeId))
        const handleAlegereSporturi = async () => {
            const routeId = match.params.id || '';
            const sports = await getExperienta(Number(routeId));
            // @ts-ignore

            const antr = match.params.id || '';
            // @ts-ignore

            console.log(document.getElementsByClassName("native-input sc-ion-input-md")[0].value + "eelllll")
            var exper = document.getElementsByClassName("native-input sc-ion-input-md")

            for (let i = 0; i < exper.length; i++) {
                // @ts-ignore
                let val = exper[i].value;
                if (val.toString() != '' && val.toString() != '0') {

                    // @ts-ignore
                    let sid = await getSportIdByNume(sports[i].denumire)

                    // @ts-ignore
                    salveazaExperienta(Number(routeId), sid[0].id, val.toString())
                }
            }

            history.goBack()
        };

        return (
            <IonPage>
                <IonContent>
                    <IonLoading isOpen={fetching} message="Fetching sports"/>
                    {sports && (
                        <IonList>
                            {sports.map(({denumire, experienta}) =>

                                // @ts-ignore
                                <Sport key={denumire} denumire={denumire} experienta={experienta}


                                />
                            )}
                        </IonList>
                    )}
                    {fetchingError && (
                        <div>{fetchingError.message || 'Failed to fetch students'}</div>
                    )}


                </IonContent>
                <IonButton onClick={handleAlegereSporturi}>Finalizare</IonButton>
            </IonPage>

        )
    } catch (TypeError) {


        return (<IonLabel>Unauthorized</IonLabel>)
    }
    ;

};

export default EditareExperienta;
