import React, {useEffect, useState} from 'react';
import {
    IonButtons,
    IonCol, IonContent,
    IonHeader,
    IonImg,
    IonTextarea,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonPage, IonRouterOutlet,
    IonRow, IonTitle,
    IonToolbar, IonMenuButton, IonButton
} from '@ionic/react';
import {PaginaClientProps} from "./PaginaClientProps";


interface PaginaClientPropsExt extends PaginaClientProps {
    onEdit: (id?: string) => void;
    onEvolution: (id?: string) => void;
    onRecomandations: (id?: string) => void;
    onLogOut: () => void;


}


const Client: React.FC<PaginaClientPropsExt> = ({id, nume, prenume, email, varsta, greutate, inaltime, sex, bmi, status, poza, descriere, onEdit, onEvolution, onRecomandations, onLogOut}) => {


    return (
        <IonList>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonList>
                        <IonButton class={"buttons"} onClick={() => onEdit(id)}>Editeaza profilul </IonButton>
                        <IonButton class={"buttons"} onClick={() => onEvolution(id)}>Evolutia mea/Adauga
                            greutate </IonButton>
                        <IonButton class={"buttons"} onClick={() => onRecomandations(id)}>Recomandari
                            antrenori</IonButton>
                        <IonButton class={"buttons"} onClick={() => onLogOut()}>LogOut</IonButton>

                    </IonList>
                </IonButtons>
            </IonToolbar>
            <IonRow className="sidenav">
                <IonRow className="profile">
                    <img src={poza} className={"profileimg"} alt="" style={{width: "100px", height: "100px"}}></img>
                </IonRow>
            </IonRow>

            <IonRow class={"main"}>
                <IonItem class={"card"}>
                    <IonItem class={"card-body"}>

                        <table>

                            <tbody>

                            <tr>
                                <td>Nume</td>
                                <td></td>
                                <td> {nume} {prenume}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td> </td>
                                <td> {email}</td>
                            </tr>
                            <tr>
                                <td>Varsta</td>
                                <td></td>
                                <td> {varsta} ani</td>
                            </tr>

                            <tr>
                                <td>Sex</td>
                                <td></td>
                                <td> {sex}</td>
                            </tr>


                            <tr>
                                <td>Greutate</td>
                                <td></td>
                                <td> {greutate} kg</td>
                            </tr>

                            <tr>
                                <td>Inaltime</td>
                                <td></td>
                                <td> {inaltime} cm</td>
                            </tr>

                            <tr>
                                <td>BMI/Status</td>
                                <td></td>
                                <td> {bmi} / {status}</td>
                            </tr>

                            <tr>

                                <td>{descriere}</td>
                            </tr>



                            </tbody>
                        </table>
                    </IonItem>


                </IonItem>
            </IonRow>

        </IonList>

    );
};
export default Client;
