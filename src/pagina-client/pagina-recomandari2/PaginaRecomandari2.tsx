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
    IonInput, IonRow, IonHeader, IonToolbar, IonTitle
} from '@ionic/react';

import {match, RouteComponentProps, useHistory} from "react-router";
import RecomandareElem, {RecomandareProps2} from "./Recomandari2";
import {RecomandareContext2, setIdRec} from "./RecomandariProvider2";

interface PaginaRecomandariPropsExt extends RouteComponentProps<{
    id?: string;
}> {
}


const PaginaRecomandari: React.FC<PaginaRecomandariPropsExt> = ({history, match}) => {


    const {recomandari, fetching, fetchingError} = useContext(RecomandareContext2);
    try {
        //@ts-ignore
        const routeId = history.location.state.id
        setIdRec(Number(routeId))

        return (
            <IonPage>



                <IonRow className="navbar-top">
                    <IonRow className="title">
                        <IonLabel class={"mainh2"}>Recomandari antrenori</IonLabel>
                    </IonRow>
                </IonRow>

                <IonHeader>
                    <IonToolbar>
                        <IonTitle class="centered">Fit At Home</IonTitle>
                    </IonToolbar>
                </IonHeader>



                <IonContent>
                    <IonLoading isOpen={fetching} message="Fetching recoms"/>
                    {recomandari && (
                        <IonList>
                            {recomandari.map(({id, nume, prenume, email, poza, numar_telefon}) =>

                                <RecomandareElem key={id} nume={nume} prenume={prenume} email={email} poza={poza}
                                                 numar_telefon={numar_telefon}


                                                 id={id}

                                                 openWhatsapp={(id) =>{
                                                     const url='https://api.whatsapp.com/send?phone=4'+numar_telefon
                                                     window.open(url, '_blank')                                                 }
                                                 }

                                                 openProfile={(id) =>{
                                                     history.push({
                                                         pathname: `/recomandations/profile`,
                                                         state: {id: id}
                                                     })                                              }
                                                 }

                                                 openExperience={(id) =>{
                                                     history.push({
                                                         pathname: `/recomandations/profile/experience`,
                                                         state: {id: id}
                                                     })                                              }
                                                 }

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

export default PaginaRecomandari;
