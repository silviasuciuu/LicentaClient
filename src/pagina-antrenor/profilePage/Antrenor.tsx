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
import {RouteComponentProps} from "react-router";


interface PaginaAntrenorPropsExt extends PaginaAntrenorProps {
    onEdit: (id?: string) => void;
    onExperienceEdit: (id?: string) => void;

}



const Antrenor: React.FC<PaginaAntrenorPropsExt> = ({id, nume, prenume, email, varsta, nota, descriere, poza,onEdit,onExperienceEdit}) => {
    const [mQuery, setMQuery] = React.useState<any>({
        matches: window.innerWidth > 768 ? true : false,
    });

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 768px)");
        mediaQuery.addListener(setMQuery);

        return () => mediaQuery.removeListener(setMQuery);
    }, []);

    console.log(descriere)
    return (

        <IonList>
            <IonToolbar>
                <IonTitle>Profilul meu de antrenor</IonTitle>
                <IonButtons slot="end">
                    <div>
                        {mQuery && !mQuery.matches ? (
                            <IonMenuButton/>
                        ) : (
                            <>
                                <IonButton onClick={() => onEdit(id)}>Editeaza profilul </IonButton>
                                <IonButton routerLink={"/page-2"}>Transformarile mele</IonButton>
                                <IonButton onClick={() => onExperienceEdit(id)}>Experienta mea</IonButton>

                            </>
                        )}
                    </div>
                </IonButtons>
            </IonToolbar>
            <IonRow class={"antrenorProfilePage"}> <IonLabel><IonImg style={{width: "100px"}} alt={"No Photo"}
                                                                     src={poza}/></IonLabel></IonRow>
            <IonRow class={"antrenorProfilePage"}><h1><IonLabel>{nume} {prenume}</IonLabel></h1></IonRow>
            <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel>{email}</IonLabel></h1></IonRow>
            <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel class={"spatiuAntrenor"}>{varsta} ani</IonLabel>
            </h1>
                <h1> Nota <IonLabel>{nota}</IonLabel></h1></IonRow>
            <IonRow class={"antrenorProfilePageDescriere"}><h1><IonTextarea>{descriere}</IonTextarea></h1></IonRow>

        </IonList>

    );
};
export default Antrenor;
