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


}


const Client: React.FC<PaginaClientPropsExt> = ({id, nume, prenume, email, varsta, greutate, inaltime, sex, bmi, status, poza, descriere, onEdit, onEvolution}) => {
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
                <IonTitle>Profilul meu</IonTitle>
                <IonButtons slot="end">
                    <div>
                        {mQuery && !mQuery.matches ? (
                            <IonMenuButton/>
                        ) : (
                            <>
                                <IonButton onClick={() => onEdit(id)}>Editeaza profilul </IonButton>
                                <IonButton onClick={() => onEvolution(id)}>Evolutia mea/Adauga greutate </IonButton>
                                <IonButton onClick={() => onEdit(id)}>Recomandari antrenori</IonButton>

                            </>
                        )}
                    </div>
                </IonButtons>
            </IonToolbar>
            <IonRow class={"antrenorProfilePage"}> <IonLabel><IonImg style={{width: "100px"}} alt={"No Photo"}
                                                                     src={poza}/></IonLabel></IonRow>
            <IonRow class={"antrenorProfilePage"}><h1><IonLabel>{nume} {prenume}</IonLabel></h1></IonRow>
            <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel>{email}</IonLabel></h1></IonRow>
            <IonRow class={"antrenorProfilePageEmail"}>
                <h1><IonLabel class={"spatiu"}>{varsta} ani</IonLabel>
                    <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel
                        class={"spatiu"}>Sex={sex} </IonLabel></h1>
                    </IonRow>
                    <IonRow><h1><IonLabel class={"spatiu"}>{greutate} kg </IonLabel> {inaltime} cm</h1></IonRow></h1>
            </IonRow>
            <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel class={"spatiu"}>BMI={bmi} {status}</IonLabel></h1>
            </IonRow>

            <IonRow class={"antrenorProfilePageDescriere"}><h1><IonTextarea>{descriere}</IonTextarea></h1></IonRow>

        </IonList>

    );
};
export default Client;
