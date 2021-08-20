import React, {useState} from 'react';
import {IonInput, IonItem, IonLabel} from '@ionic/react';
import {SportProps} from "../../../signup/signup_antrenor_second_page/SportProps";

interface SportPropsExt extends SportProps {

}

const SportItem: React.FC<SportPropsExt> = ({denumire,experienta}) => {


    return (
        <IonItem id={denumire}>
            <IonLabel>{denumire} {experienta} ani</IonLabel>


        </IonItem>
    );
};
export default SportItem;
