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
import {getSportIdByNume} from "../../../signup/signup_antrenor_second_page/SportApi";
import {getExperienta, salveazaExperienta} from "../../../pagina-antrenor/experiencePage/ExperientaApi";
import {ExperienceContext, setId} from "./ExperientaProvider";
import Sport from "../../../signup/signup_antrenor_second_page/Sport";

interface EditarePropsExt extends RouteComponentProps<{
    id?: string;
}> {
}


const PaginaExperienta: React.FC<EditarePropsExt> = ({history, match}) => {

    const {sports, fetching, fetchingError} = useContext(ExperienceContext);
    // @ts-ignore
    const result = sports?.filter(x => x.experienta !=null);
    try {

        //@ts-ignore
        const routeId = history.location.state.id
        setId(Number(routeId))
console.log(sports,'ssss')

        return (
            <IonPage>
                <IonContent>
                    <IonLoading isOpen={fetching} message="Fetching sports"/>
                    {result && (
                        <IonList>
                            {result.map(({denumire, experienta}) =>

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
            </IonPage>

        )
    } catch (TypeError) {


        return (<IonLabel>Unauthorized</IonLabel>)
    }
    ;

};

export default PaginaExperienta;
