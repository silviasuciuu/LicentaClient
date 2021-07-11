import {
    IonActionSheet, IonButton, IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, {useContext, useState} from 'react';

import { camera, close, trash } from 'ionicons/icons';
import { Photo, usePhotoGallery} from "../editPage/usePhotoGallery";
import {ExperienceContext, setId} from "../experiencePage/ExperiencePageProvider";
import {addPhoto, GalerieProps} from "./galerieApi";
import {RouteComponentProps} from "react-router";


interface GaleriePropsExt extends RouteComponentProps<{
    id?: string;
}> {
}
const Galerie: React.FC<GaleriePropsExt> = ({history, match}) => {
    const { photos, takePhoto, deletePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    //@ts-ignore
    const routeId = history.location.state.id
    const handleSave = () => {
        photos.forEach(x=>{
            addPhoto(routeId,x.webviewPath)
        })
history.goBack()
    };


    setId(Number(routeId))
    return (
        <IonPage>
            <IonHeader>
                <IonButtons slot="end">
                    <IonButton onClick={handleSave}>
                        Save
                    </IonButton>
                </IonButtons>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        {photos.map((photo, index) => (
                            <IonCol size="6" key={index}>
                                <IonImg onClick={() => setPhotoToDelete(photo)}
                                        src={photo.webviewPath}/>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton onClick={() => takePhoto()}>
                        <IonIcon icon={camera}/>
                    </IonFabButton>
                </IonFab>
                <IonActionSheet
                    isOpen={!!photoToDelete}
                    buttons={[{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            if (photoToDelete) {
                                deletePhoto(photoToDelete);
                                setPhotoToDelete(undefined);
                            }
                        }
                    }, {
                        text: 'Cancel',
                        icon: close,
                        role: 'cancel'
                    }]}
                    onDidDismiss={() => setPhotoToDelete(undefined)}
                />
                <IonButton onClick={handleSave}>
                    Save
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Galerie;
