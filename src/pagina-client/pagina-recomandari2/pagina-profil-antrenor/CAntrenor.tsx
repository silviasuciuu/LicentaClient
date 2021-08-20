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
import {PaginaAntrenorProps} from "../../../pagina-antrenor/profilePage/PaginaAntrenorProps";


interface PaginaAntrenorPropsExt extends PaginaAntrenorProps {
    onExperience: (id?: string) => void;



}



const CAntrenor: React.FC<PaginaAntrenorPropsExt> = ({id, nume, prenume, email, varsta, nota, descriere, poza,numar_telefon,onExperience}) => {
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
                <IonTitle>Profilul antrenorului
                </IonTitle>
                <IonButtons slot="end">
                    <div>
                        {mQuery && !mQuery.matches ? (
                            <IonMenuButton/>
                        ) : (
                            <>


                                <IonButton onClick={() => onExperience(id)}>Experienta</IonButton>


                            </>
                        )}
                    </div>
                </IonButtons>
            </IonToolbar>
            <IonRow class={"antrenorProfilePage"}> <IonLabel><IonImg style={{width: "100px"}} alt={"No Photo"}
                                                                     src={poza}/></IonLabel></IonRow>
            <IonRow class={"antrenorProfilePage"}><h1><IonLabel>{nume} {prenume}</IonLabel></h1></IonRow>
            <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel>{email}</IonLabel></h1></IonRow>
            <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel>{numar_telefon}</IonLabel></h1></IonRow>

            <IonRow class={"antrenorProfilePageEmail"}><h1><IonLabel class={"spatiuAntrenor"}>{varsta} ani</IonLabel>
            </h1>
            </IonRow>
            <IonRow class={"antrenorProfilePageDescriere"}><h1><IonTextarea>{descriere}</IonTextarea></h1></IonRow>

        </IonList>

    );
};
export default CAntrenor;
