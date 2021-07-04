import React, {useContext, useState} from 'react';
import {IonItem, IonLabel, IonButton, IonList, IonContent, IonPage, IonLoading, IonImg, IonFab} from '@ionic/react';

import {RouteComponentProps, useHistory, withRouter} from "react-router";
import {PaginaAntrenorProps} from "./PaginaAntrenorProps";
import {AntrenorContext} from "./PaginaAntrenorProvider";
import {SignUpAntrenorProps} from "../../signup/signup_antrenor_first_page/signUpAntrenorApi";
import Antrenor from "./Antrenor";

interface AntrenorPropsExt extends RouteComponentProps<{
    id?: string;
}> {
}

const PaginaAntrenor: React.FC<AntrenorPropsExt> = ({history, match}) => {
    const {antrenor, fetching, fetchingError} = useContext(AntrenorContext);
    const routeId = match.params.id || '';


    const arr = antrenor?.filter(a => a.id == routeId)

    return (
        <IonPage>
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching antrenor"/>
                {arr && (
                    <IonList>
                        {arr.map(({id, nume, prenume, email, varsta, nota, descriere, poza}) =>
                            <Antrenor key={id} id={id} nume={nume} prenume={prenume} email={email} varsta={varsta}
                                      nota={nota} descriere={descriere} poza={poza} onEdit={(id) => history.push({
                                pathname: `/antrenor/edit/${id}`,
                                state: {id: id}
                            })

                            }
                                      onExperienceEdit={(id) => history.push({
                                          pathname: `/antrenor/experience_edit/${id}`,
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


};


export default PaginaAntrenor;