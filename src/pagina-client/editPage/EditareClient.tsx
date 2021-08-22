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
    IonImg, IonTextarea, IonList, IonSelect, IonSelectOption, IonRow, IonApp
} from '@ionic/react';
import {RouteComponentProps} from 'react-router';

import {camera, close, trash} from "ionicons/icons";
import {Photo, usePhotoGallery} from "./usePhotoGallery";
import {ClientContext} from "../profilePage";
import {PaginaEditClientProps} from "./PaginaEditClientProps";
import {getClientByIdd} from "../evolutionPage/EvolutieApi";



interface ClientEditProps extends RouteComponentProps<{
    id?: string;
}> {
}

const EditareClient: React.FC<ClientEditProps> = ({history, match}) => {
    const {client, saving, savingError, saveClient} = useContext(ClientContext);
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [varsta, setVarsta] = useState(0);
    const [descriere, setDescriere] = useState('');
    const [poza, setPoza] = useState('');
    const [inaltime, setInaltime] = useState(0);
    const [sex, setSex] = useState('');
    const [bmi, setBmi] = useState(0);
    var [status, setStatus] = useState('');


    const [clientr, setClientr] = useState<PaginaEditClientProps>();
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();



    useEffect(() => {
        //@ts-ignore
        const routeId = history.location.state.id
        const antr = client?.find(it => it.id == routeId.toString());
        setClientr(antr);
        if (antr) {
            setNume(antr.nume);
            setPrenume(antr.prenume);
            setVarsta(antr.varsta);
            setDescriere(antr.descriere);
            setPoza(antr.poza);
            setBmi(antr.bmi);
            setInaltime(antr.inaltime)
            setStatus(antr.status)
            setSex(antr.sex)

        }
    }, [match.params.id, client]);


    const handleSave = async () => {
        console.log(clientr)
        const editedClient = clientr
            ? {
                ...clientr,
                nume,
                prenume,
                varsta,
                inaltime,
                sex,
                bmi,
                status,
                descriere,
                poza,
            }
            : {
                nume,
                prenume,
                varsta,
                inaltime,
                sex,
                bmi,
                status,
                descriere,
                poza,

            };

        // @ts-ignore
        var greutatee=  await getClientByIdd(history.location.state.id)
        var greutate=greutatee[0].greutate
        //@ts-ignore
        let bmiCalc = greutate / (inaltime * inaltime) * 10000
        if (bmiCalc == NaN)
            bmiCalc = 0
        if (bmiCalc < 18.5)
            status = 'Subponderal'
        if (bmiCalc <= 24.9 && bmiCalc >= 18.5)
            status = 'Normal'
        if (bmiCalc >= 25 && bmiCalc <= 29.9)
            status = 'Supraponderal'
        if (bmiCalc >= 30)
            status = 'Obez'
        editedClient.status=status
        editedClient.bmi=bmiCalc
        saveClient && saveClient(editedClient).then(() => {
            history.goBack();
        })
    };

    return (
        <IonPage>
            <IonApp>
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
                                            <td>Inaltime</td><br/>
                                            <td>:</td>
                                            <td>
                                                <IonInput type="number" placeholder="Inaltime" value={inaltime}
                                                    // @ts-ignore
                                                          onIonChange={e => setInaltime(parseInt(e.detail.value) || 0)}/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Sex</td><br/>
                                            <td>:</td>
                                            <td>
                                                <IonSelect onIonChange={e => setSex(e.detail.value || '')}>
                                                    <IonSelectOption value="m">m</IonSelectOption>
                                                    <IonSelectOption value="f">f</IonSelectOption>
                                                </IonSelect>
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
            </IonApp>

        </IonPage>
    );
};

export default EditareClient;