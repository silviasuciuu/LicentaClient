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
    IonImg, IonTextarea, IonList, IonRow
} from '@ionic/react';
import {AntrenorContext} from '../profilePage/PaginaAntrenorProvider';
import {RouteComponentProps} from 'react-router';

import {camera, close, trash} from "ionicons/icons";
import {Photo, usePhotoGallery} from "./usePhotoGallery";
import {PaginaAntrenorProps} from "../profilePage/PaginaAntrenorProps";
import Antrenor from "../profilePage/Antrenor";


interface AntrenorEditProps extends RouteComponentProps<{
    id?: string;
}> {
}

const EditareAntrenor: React.FC<AntrenorEditProps> = ({history, match}) => {
    const {antrenor, saving, savingError, saveAntrenor} = useContext(AntrenorContext);
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [email, setEmail] = useState('');
    const [varsta, setVarsta] = useState(0);
    const [descriere, setDescriere] = useState('');
    const [poza, setPoza] = useState('');
    const [numar_telefon, setNumar_telefon] = useState('');

    const [antrenorr, setAntrenorr] = useState<PaginaAntrenorProps>();
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();


    useEffect(() => {
        //@ts-ignore
        const routeId = history.location.state.id
        const antr = antrenor?.find(it => it.id == routeId.toString());
        setAntrenorr(antr);
        if (antr) {
            setNume(antr.nume);
            setPrenume(antr.prenume);
            setEmail(antr.email);
            setVarsta(antr.varsta);
            setDescriere(antr.descriere);
            setPoza(antr.poza);

        }
    }, [match.params.id, antrenor]);


    const handleSave = () => {
        console.log(antrenorr)
        const editedAntrenor = antrenorr
            ? {
                ...antrenorr,
                nume,
                prenume,
                email,
                varsta,
                descriere,
                poza,
                numar_telefon
            }
            : {
                nume,
                prenume,
                email,
                varsta,
                descriere,
                poza,
                numar_telefon

            };
        saveAntrenor && saveAntrenor(editedAntrenor).then(() => {
            history.goBack();
        })
    };

    return (
        <IonPage>
            <IonButtons slot="end">
                <IonButton onClick={handleSave}>
                    Save
                </IonButton>
            </IonButtons>
            <IonRow className="navbar-top">
                <IonRow className="title">
                    <IonLabel class={"mainh2"}>Editeaza profilul</IonLabel>
                </IonRow>
            </IonRow>

            <IonHeader>
                <IonToolbar>
                    <IonTitle class="centered">Fit At Home</IonTitle>
                </IonToolbar>
            </IonHeader>


            <IonContent>

                <IonList>


                    <IonRow className="sidenav">
                        <IonRow className="profile">




                            <IonImg
                                style={{width: "100px", height: "100px", margin: "0 auto"}}
                                onClick={() => {
                                    setPhotoToDelete(photos?.find(item => item.webviewPath === poza))
                                }}
                                alt={"No photo"}
                                src={poza}
                            />



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
                                        <td>
                                            <IonInput className="inputField" placeholder={"Nume"} value={nume}
                                                      onIonChange={e => setNume(e.detail.value || '')}/>
                                        </td>
                                    </tr>


                                    <tr>
                                        <td>Prenume</td>
                                        <td>

                                        </td>
                                        <td>
                                            <IonInput className="inputField" placeholder="Prenume" value={prenume}
                                                      onIonChange={e => setPrenume(e.detail.value || '')}/>
                                        </td>
                                    </tr>


                                    <tr>
                                        <td>Varsta</td>
                                        <td></td>
                                        <td>
                                            <IonInput type="number" placeholder="Varsta" value={varsta}
                                                // @ts-ignore
                                                      onIonChange={e => setVarsta(parseInt(e.detail.value) || 0)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Descriere</td><br/>
                                        <td>:</td>
                                        <td>
                                            <IonTextarea value={descriere} placeholder="Descriere"
                                                         onIonChange={e => setDescriere(e.detail.value || '')}>

                                            </IonTextarea>
                                        </td>
                                    </tr>






                                    </tbody>
                                </table>
                            </IonItem>


                        </IonItem>
                    </IonRow>








                </IonList>

                <IonLoading isOpen={saving}/>
                {savingError && (
                    <div>{savingError.message || 'Failed to save Person'}</div>
                )}

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton
                        onClick={() => {
                            const photoTaken = takePhoto();
                            photoTaken.then((data) => {
                                setPoza(data.webviewPath!);
                            });
                        }}
                    >
                        <IonIcon icon={camera}/>
                    </IonFabButton>
                </IonFab>
                <IonActionSheet
                    isOpen={!!photoToDelete}
                    buttons={[
                        {
                            text: "Delete",
                            role: "destructive",
                            icon: trash,
                            handler: () => {
                                if (photoToDelete) {
                                    deletePhoto(photoToDelete);
                                    setPhotoToDelete(undefined);
                                    setPoza("")
                                }
                            },
                        },
                        {
                            text: "Cancel",
                            icon: close,
                            role: "cancel",
                        },
                    ]}
                    onDidDismiss={() => setPhotoToDelete(undefined)}
                />
            </IonContent>
        </IonPage>
    );
};

export default EditareAntrenor;