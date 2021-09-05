import React, {useContext, useState} from 'react';
import {
    IonButton, IonCol,
    IonContent,
    IonHeader,
    IonFabButton,
    IonFab,
    IonTextarea,
    IonImg,
    IonInput, IonItem, IonLabel,
    IonLoading,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar, IonIcon, IonActionSheet, IonApp, IonButtons, IonList, IonSelect, IonSelectOption, IonFooter
} from '@ionic/react';
import {SignUpAntrenorContext} from "./SignUpAntrenorProvider";
import {Photo, usePhotoGallery} from "./usePhotoGallery";
import {camera, trash, close} from "ionicons/icons";
import {getAntrenorByEmail, SignUpAntrenorProps} from "./signUpAntrenorApi";
import {RouteComponentProps} from "react-router";
import {type} from "os";


interface SignUpAntrenorState {
    nume?: string;
    prenume?: string;
    email?: string;
    parola?: string;
    varsta?: number;
    descriere?: string;
    poza?: string;
    numar_telefon?:string;
}

const SignUpAntrenor: React.FC<RouteComponentProps> = ({history}) => {
    const {signUpAntrenor} = useContext(SignUpAntrenorContext);

    const [state, setState] = useState<SignUpAntrenorState>({});
    const [photoPath, setPhotoPath] = useState('');
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const {nume, prenume, email, parola, varsta, descriere, poza,numar_telefon} = state;
    const [confirma_parola, setConfirma_parola] = useState<string>();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    const handleLSignUpAntrenor = async () => {
        let checkExist = await getAntrenorByEmail(email)
        // @ts-ignore
        let par1 = document.getElementById("p1").value
        // @ts-ignore
        let par2 = document.getElementById("p2").value
        if (nume == '' || prenume == '' || email == '' || varsta == 0   || descriere == ''||photoPath=='')
            alert('Toate campurile sunt obligatorii')
        else{
        // @ts-ignore
        if (par1 == par2 && par1 != '' && parseInt(checkExist.data.length)==parseInt(0)) {
            signUpAntrenor?.(nume, prenume, email, parola, varsta, descriere, photoPath,numar_telefon);
            history.push({
                pathname: 'inregistrare_antrenor/sporturi',
                state: {detail: email,photo:photoPath}
            })
        }}
        // @ts-ignore
        if (parseInt(checkExist.data.length)!=parseInt(0)) {
            alert("Email existent")
        }
        if (par1 != par2 || par1 == '') {
            alert('Parolele nu corespund sau sunt vide')
        }
    };

    return (
        <IonPage>
            <IonApp>
                <IonButtons slot="end">
                    <IonButton onClick={handleLSignUpAntrenor}>
                        Salveaza
                    </IonButton>
                </IonButtons>
                <IonRow className="navbar-top">
                    <IonRow className="title">
                        <IonLabel class={"mainh2"}>Inregistrare antrenor</IonLabel>
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
                                    style={{width: "150px", height: "150px", margin: "0 auto"}}
                                    onClick={() => {
                                        setPhotoToDelete(photos?.find(item => item.webviewPath === photoPath))
                                    }}
                                    alt={"Poza de profil"}
                                    src={photoPath}
                                />



                            </IonRow>
                        </IonRow>

                        <IonRow class={"main"}>
                            <IonItem class={"card3"}>
                                <IonItem class={"card-body"}>

                                    <table>

                                        <tbody>

                                        <tr>
                                            <td>Nume</td>
                                            <td></td>
                                            <td>

                                                <IonInput
                                                    type="text"
                                                    value={nume}
                                                    onIonChange={e => setState({
                                                        ...state,
                                                        nume: e.detail.value || ''
                                                    })}
                                                >
                                                </IonInput>
                                            </td>
                                        </tr>


                                        <tr>
                                            <td>Prenume</td>
                                            <td>

                                            </td>
                                            <td>
                                                <IonInput
                                                    type="text"
                                                    value={prenume}

                                                    onIonChange={e => setState({
                                                        ...state,
                                                        prenume: e.detail.value || ''
                                                    })}
                                                >
                                                </IonInput>
                                            </td>
                                        </tr>



                                        <tr>
                                            <td>Email</td>
                                            <td>

                                            </td>
                                            <td>
                                                <IonInput
                                                    type="text"
                                                    value={email}

                                                    onIonChange={e => setState({
                                                        ...state,
                                                        email: e.detail.value || ''
                                                    })}
                                                >
                                                </IonInput>
                                            </td>
                                        </tr>




                                        <tr>
                                            <td>Parola</td>
                                            <td>

                                            </td>
                                            <td>
                                                <IonInput
                                                    id={"p1"}
                                                    type="password"
                                                    value={parola}
                                                    onIonChange={e => setState({
                                                        ...state,
                                                        parola: e.detail.value || ''
                                                    })}
                                                >
                                                </IonInput>
                                            </td>
                                        </tr>




                                        <tr>
                                            <td>Confirma parola</td>
                                            <td>

                                            </td>
                                            <td>
                                                <IonInput
                                                    id={"p2"}
                                                    type="password"
                                                    value={confirma_parola}
                                                    onIonChange={e => setConfirma_parola(e.detail.value!)}
                                                >
                                                </IonInput>
                                            </td>
                                        </tr>









                                        <tr>
                                            <td>Numar telefon(Whatsapp)</td>
                                            <td></td>
                                            <td>
                                                <IonInput
                                                    value={numar_telefon}
                                                    // @ts-ignore
                                                    min={0}
                                                    onIonChange={e => setState({
                                                        ...state,
                                                        //@ts-ignore
                                                        numar_telefon: e.detail.value || ''
                                                    })}
                                                >
                                                </IonInput>
                                            </td>
                                        </tr>











                                        <tr>
                                            <td>Varsta</td><br/>
                                            <td>:</td>
                                            <td>
                                                <IonInput
                                                    type="number"
                                                    value={varsta}
                                                    // @ts-ignore
                                                    min={0}
                                                    onIonChange={e => setState({
                                                        ...state,
                                                        //@ts-ignore
                                                        varsta: parseInt(e.detail.value) || 0
                                                    })}
                                                >
                                                </IonInput>
                                            </td>
                                        </tr>





                                        <tr>
                                            <td>Descriere</td><br/>
                                            <td>:</td>
                                            <td>
                                                <IonTextarea value={descriere} onIonChange={e => setState({
                                                    ...state,
                                                    //@ts-ignore
                                                    descriere: e.detail.value || ''
                                                })}>

                                                </IonTextarea>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </IonItem>


                            </IonItem>
                        </IonRow>
                    </IonList>

                    <IonFooter class={"toolbar-background"}>
                        <IonToolbar>


                            <IonFab vertical="bottom" horizontal="start">
                                <IonFabButton
                                    onClick={() => {
                                        const photoTaken = takePhoto();
                                        photoTaken.then((data) => {
                                            setPhotoPath(data.webviewPath!);
                                        });

                                    }}
                                >
                                    <IonIcon icon={camera}/>
                                </IonFabButton>
                            </IonFab>

                        </IonToolbar>
                    </IonFooter>
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
                                        setPhotoPath("")
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

export default SignUpAntrenor;