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
    IonToolbar, IonIcon, IonActionSheet
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inregistrare antrenor</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Nume</IonLabel>
                            <IonInput
                                type="text"
                                value={nume}
                                onIonChange={e => setState({
                                    ...state,
                                    nume: e.detail.value || ''
                                })}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Prenume</IonLabel>
                            <IonInput
                                type="text"
                                value={prenume}

                                onIonChange={e => setState({
                                    ...state,
                                    prenume: e.detail.value || ''
                                })}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>


                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={e => setState({
                                    ...state,
                                    email: e.detail.value || ''
                                })}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>


                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Parola</IonLabel>
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
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Confirma parola</IonLabel>
                            <IonInput
                                id={"p2"}
                                type="password"
                                value={confirma_parola}
                                onIonChange={e => setConfirma_parola(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>




                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Numar telefon(Whatsapp)</IonLabel>
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
                        </IonItem>
                    </IonCol>
                </IonRow>


                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Varsta</IonLabel>
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
                        </IonItem>
                    </IonCol>
                </IonRow>


                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Descriere</IonLabel>
                            <IonTextarea value={descriere} onIonChange={e => setState({
                                ...state,
                                //@ts-ignore
                                descriere: e.detail.value || ''
                            })}></IonTextarea>
                        </IonItem>
                    </IonCol>
                </IonRow>


                <IonImg
                    style={{width: "200px", height: "200px", margin: "0 auto"}}
                    onClick={() => {
                        setPhotoToDelete(photos?.find(item => item.webviewPath === photoPath))
                    }}
                    alt={"Poza de profil"}
                    src={photoPath}
                />
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


                <IonButton onClick={handleLSignUpAntrenor}>Next</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SignUpAntrenor;