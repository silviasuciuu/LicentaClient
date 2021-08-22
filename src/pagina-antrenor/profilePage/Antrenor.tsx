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
import {PaginaAntrenorProps} from "./PaginaAntrenorProps";


interface PaginaAntrenorPropsExt extends PaginaAntrenorProps {
    onEdit: (id?: string) => void;
    onExperienceEdit: (id?: string) => void;
    onLogOut: () => void;


}



const Antrenor: React.FC<PaginaAntrenorPropsExt> = ({id, nume, prenume, email, varsta, nota, descriere, poza,numar_telefon,onEdit,onExperienceEdit,onLogOut}) => {




    return (
        <IonList>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonList>
                        <IonButton onClick={() => onEdit(id)}>Editeaza profilul </IonButton>
                        <IonButton onClick={() => onExperienceEdit(id)}>Experienta mea</IonButton>
                        <IonButton onClick={() => onLogOut()}>LogOut</IonButton>
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
                                <td>Numar telefon</td>
                                <td></td>
                                <td> {numar_telefon}</td>
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
export default Antrenor;
