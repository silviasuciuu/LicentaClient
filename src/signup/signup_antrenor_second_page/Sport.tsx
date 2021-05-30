import React, {useState} from 'react';
import {IonInput, IonItem, IonLabel} from '@ionic/react';
import {SportProps} from './SportProps';

interface SportPropsExt extends SportProps {

}

const Sport: React.FC<SportPropsExt> = ({denumire,experienta}) => {


    return (
        <IonItem id={denumire}>
            <IonLabel>{denumire}</IonLabel>
            <IonInput
                type="number"
                // @ts-ignore
                min={0}
            >
                {experienta}
            </IonInput>
        </IonItem>
    );
};
export default Sport;
