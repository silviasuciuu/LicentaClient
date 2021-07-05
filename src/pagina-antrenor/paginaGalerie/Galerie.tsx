import React, {useContext, useEffect, useState} from 'react';
import {
    IonActionSheet,
    IonButton,
    IonButtons,
    IonContent, IonFab, IonFabButton,
    IonHeader, IonIcon,
    IonInput, IonItem, IonLabel, IonListHeader,
    IonLoading,
    IonPage, IonRadio, IonRadioGroup,
    IonTitle,
    IonToolbar,
    IonImg, IonTextarea, IonList, IonGrid, IonCol, IonRow
} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import {ReactPhotoCollage} from "react-photo-collage";
import {camera} from "ionicons/icons";
import {Photo, usePhotoGallery} from "../editPage/usePhotoGallery";

interface AntrenorEditProps extends RouteComponentProps<{
    id?: string;
}> {
}

const Galerie: React.FC<AntrenorEditProps> = ({history, match}) => {
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    const [poza, setPoza] = useState('');
    const [poza1, setPoza1] = useState('');
    //@ts-ignore
    alert(JSON.stringify(history.location.state.id))


    return (
        <IonContent>



        </IonContent>
    );
};

export default Galerie;