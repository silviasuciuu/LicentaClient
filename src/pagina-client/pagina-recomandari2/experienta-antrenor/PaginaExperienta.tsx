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
    IonInput, IonRow, IonHeader, IonToolbar, IonTitle, IonButtons
} from '@ionic/react';

import {match, RouteComponentProps, useHistory} from "react-router";
import {getSportIdByNume} from "../../../signup/signup_antrenor_second_page/SportApi";
import {getExperienta, salveazaExperienta} from "../../../pagina-antrenor/experiencePage/ExperientaApi";
import {ExperienceContext, setId} from "./ExperientaProvider";
import Sport from "../../../signup/signup_antrenor_second_page/Sport";
import SportItem from "./SportItem";

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

        return (
            <IonPage>
                <IonRow className="navbar-top">
                    <IonRow className="title">
                        <IonLabel class={"mainh2"}>Experienta</IonLabel>
                    </IonRow>
                </IonRow>

                <IonHeader>
                    <IonToolbar>
                        <IonTitle class="centered">Fit At Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonLoading isOpen={fetching} message="Fetching sports"/>
                    {result && (


                        <IonList>
                            <>
                                <IonRow class={"main"}>
                                    <IonItem class={"card2"}>
                                        <IonItem class={"card-body"}>

                                            <table>

                                                <tbody>


                                                {result.map(({denumire, experienta}) =>


                                                    <>


                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <SportItem key={denumire} denumire={denumire}
                                                                       experienta={experienta}


                                                                />
                                                            </td>
                                                        </tr>

                                                    </>,
                                                )}

                                                <IonRow className="sidenav">
                                                    <IonRow className="profile">


                                                    </IonRow>
                                                </IonRow>


                                                </tbody>
                                            </table>

                                        </IonItem>


                                    </IonItem>
                                </IonRow></>

                        </IonList>


                    )}
                    {fetchingError && (
                        <div>{fetchingError.message || 'Failed to fetch '}</div>
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
