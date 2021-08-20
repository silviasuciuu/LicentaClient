import React, {useState} from 'react';
import {IonImg, IonInput,IonButton, IonItem, IonLabel, IonTabButton} from '@ionic/react';

export interface RecomandareProps2 {
    id: string,
    nume: string,
    prenume: string,
    email: string,
    poza: string,
    numar_telefon: string,
    openWhatsapp: (id?: string) => void;
    openProfile: (id?: string) => void;
    openExperience: (id?: string) => void;

}

const RecomandareElem2: React.FC<RecomandareProps2> = ({id, nume, prenume, email, poza, numar_telefon,openWhatsapp,openProfile,openExperience}) => {


    return (
        <IonItem id={id}>
            <IonImg style={{width: "100px"}} alt={"No Photo"}
                    src={poza}/>
            <IonLabel>{nume} {prenume}</IonLabel><br/>
            <IonLabel> {email}</IonLabel>

            <IonLabel>  {numar_telefon}</IonLabel>
            <IonButton onClick={()=>openProfile(id)}>Vizualizeaza profilul</IonButton>
            <input type="image" src="https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN" style={{width: "50px"}}
                   onClick={() => openWhatsapp(id)}
             />

        </IonItem>
    );
};
export default RecomandareElem2;
