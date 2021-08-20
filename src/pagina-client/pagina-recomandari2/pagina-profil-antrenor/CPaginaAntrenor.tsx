import React, {useContext, useState} from 'react';
import {IonItem, IonLabel, IonButton, IonList, IonContent, IonPage, IonLoading, IonImg, IonFab} from '@ionic/react';

import {RouteComponentProps, useHistory, withRouter} from "react-router";

import {AntrenorContext} from "./CPaginaAntrenorProvider";

import CAntrenor from "./CAntrenor";

interface AntrenorPropsExt extends RouteComponentProps<{
    id?: string;
}> {
}

const CPaginaAntrenor: React.FC<AntrenorPropsExt> = ({history, match}) => {
    const {antrenor, fetching, fetchingError} = useContext(AntrenorContext);
    try {
        //@ts-ignore
        const routeId = history.location.state.id


        const arr = antrenor?.filter(a => a.id == routeId)

        return (
            <IonPage>
                <IonContent>
                    <IonLoading isOpen={fetching} message="Fetching antrenor"/>
                    {arr && (
                        <IonList>
                            {arr.map(({id, nume, prenume, email, varsta, nota, descriere, poza, numar_telefon}) =>
                                <CAntrenor key={id} id={id} nume={nume} prenume={prenume} email={email} varsta={varsta}
                                           nota={nota} descriere={descriere} poza={poza} numar_telefon={numar_telefon}

                                           onExperience={(id) => history.push({
                                              pathname: `/recomandations/profile/experience`,
                                              state: {id: id},

                                          })
                                          }



                                />)}
                        </IonList>
                    )}
                    {fetchingError && (
                        <div>{fetchingError.message || 'Failed to fetch '}</div>
                    )}
                </IonContent>
            </IonPage>

        )
            ;


    } catch (error) {
        return (<IonLabel>Unauthorized</IonLabel>)
    }
}


export default CPaginaAntrenor;