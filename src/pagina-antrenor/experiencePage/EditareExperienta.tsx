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
    IonInput, IonRow, IonHeader, IonToolbar, IonTitle, IonTextarea, IonButtons
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

            const sports = await getExperienta(Number(routeId));
            // @ts-ignore

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
                <IonRow className="navbar-top">
                    <IonRow className="title">
                        <IonLabel class={"mainh2"}>Experienta</IonLabel>
                    </IonRow>
                </IonRow>





                <IonButtons slot="end">
                    <IonButton onClick={handleAlegereSporturi}>
                        Save
                    </IonButton>
                </IonButtons>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle class="centered">Fit At Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonLoading isOpen={fetching} message="Fetching sports"/>
                    {sports && (


                        <IonList>
                            <>
                                <IonRow class={"main"}>
                                    <IonItem class={"card2"}>
                                        <IonItem class={"card-body"}>

                                            <table>

                                                <tbody>


                                                {sports.map(({denumire, experienta}) =>


                                                    <>


                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <Sport key={denumire} denumire={denumire}
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

export default EditareExperienta;
