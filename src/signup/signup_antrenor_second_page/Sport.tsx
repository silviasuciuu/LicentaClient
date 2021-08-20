import React, {useState} from 'react';
import {IonInput, IonItem, IonLabel} from '@ionic/react';
import {SportProps} from './SportProps';

interface SportPropsExt extends SportProps {

}

const Sport: React.FC<SportPropsExt> = ({denumire,experienta}) => {


    return (
        <IonItem id={denumire}>
            <IonLabel>{denumire} {experienta} ani</IonLabel>

        </IonItem>
    );
};
export default Sport;
