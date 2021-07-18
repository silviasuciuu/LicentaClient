import React, {useContext, useState} from 'react';
import {IonItem, IonLabel, IonButton, IonList, IonContent, IonPage, IonLoading, IonImg, IonFab} from '@ionic/react';

import {RouteComponentProps, useHistory, withRouter} from "react-router";
import Client from "./Client";
import {ClientContext} from "./PaginaClientProvider";

interface ClientPropsExt extends RouteComponentProps<{
    id?: string;
}> {
}

const PaginaClient: React.FC<ClientPropsExt> = ({history, match}) => {
    const {client, fetching, fetchingError} = useContext(ClientContext);
    try {
        //@ts-ignore
        const routeId = history.location.state.id
        const arr = client?.filter(a => a.id == routeId)

        return (
            <IonPage>
                <IonContent>
                    <IonLoading isOpen={fetching} message="Fetching client"/>
                    {arr && (
                        <IonList>
                            {arr.map(({id, nume, prenume, email, varsta, greutate, inaltime, sex, bmi, status, poza, descriere}) =>
                                <Client key={id} id={id} nume={nume} prenume={prenume} email={email} varsta={varsta}
                                        greutate={greutate}
                                        inaltime={inaltime} sex={sex} bmi={bmi} status={status}
                                        descriere={descriere} poza={poza}
                                        onEdit={(id) => history.push({
                                            pathname: `/client/edit`,
                                            state: {id: id}
                                        })
                                        }

                                        onEvolution={(id) => history.push({
                                            pathname: `/evolution`,
                                            state: {id: id}
                                        })
                                        }/>)}
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


export default PaginaClient;