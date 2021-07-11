import React, {useContext, useState} from 'react';
import {
    IonButton, IonCol,
    IonContent,
    IonHeader,
    IonFabButton,
    IonFab,
    IonTextarea,
    IonSelect,
    IonImg,
    IonInput, IonItem, IonLabel,
    IonLoading,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar, IonIcon, IonActionSheet, IonSelectOption, IonFooter
} from '@ionic/react';
import {SignUpClientContext} from "./SignUpClientProvider";
import {Photo, usePhotoGallery} from "./usePhotoGallery";
import {camera, trash, close} from "ionicons/icons";
import {getClientByEmail, SignUpClientProps} from "./signUpClientApi";
import {RouteComponentProps} from "react-router";


interface SignUpClientState {
    nume?: string;
    prenume?: string;
    email?: string;
    parola?: string;
    varsta?: number;
    greutate?: number;
    inaltime?: number;
    sex?: string;
    bmi?: string;
    status?: string;
    poza?: string;
    descriere?: string;

}

const SignUpClient: React.FC<RouteComponentProps> = ({history}) => {
    const {signUpClient} = useContext(SignUpClientContext);

    const [state, setState] = useState<SignUpClientState>({});
    const [photoPath, setPhotoPath] = useState('');
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const {nume, prenume, email, parola, varsta, greutate, inaltime, sex, bmi, status, poza, descriere} = state;
    const [confirma_parola, setConfirma_parola] = useState<string>();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();

    const changeDatas = () => {
        console.log(nume, prenume, email, parola, varsta, greutate, inaltime, sex, bmi, status, photoPath, descriere)
        // @ts-ignore
        let bmiCalc = greutate / (inaltime * inaltime) * 10000
        if (bmiCalc == NaN)
            bmiCalc = 0
        // @ts-ignore
        document.getElementById('bmi').innerHTML = bmiCalc
        if (bmiCalc < 18.5)
            // @ts-ignore
            document.getElementById('status').innerHTML = 'Subponderal'
        if (bmiCalc <= 24.9 && bmiCalc >= 18.5)
            // @ts-ignore
            document.getElementById('status').innerHTML = 'Normal'
        if (bmiCalc >= 25 && bmiCalc <= 29.9)
            // @ts-ignore
            document.getElementById('status').innerHTML = 'Supraponderal'
        if (bmiCalc >= 30)
            // @ts-ignore
            document.getElementById('status').innerHTML = 'Obez'


    };


    const handleLSignUpClient = async () => {
        let checkExist = await getClientByEmail(email)
        // @ts-ignore
        let par1 = document.getElementById("p1").value
        // @ts-ignore
        let par2 = document.getElementById("p2").value
        if (nume == '' || prenume == '' || email == '' || varsta == 0 || greutate == 0 || inaltime == 0 || sex == '' || descriere == '' || photoPath == '')
            alert('Toate campurile sunt obligatorii')
        else {
            // @ts-ignore
            console.log('bmi', document.getElementById('bmi').textContent, 'status', document.getElementById('status').textContent)
            // @ts-ignore
            const st = document.getElementById('status').textContent || ''
            // @ts-ignore
            const bmii = document.getElementById('bmi').textContent || ''


            // @ts-ignore
            if (par1 == par2 && par1 != '' && parseInt(checkExist.data.length) == parseInt(0)) {
                signUpClient?.(nume, prenume, email, parola, varsta, greutate, inaltime, sex, bmii, st, photoPath, descriere);
                history.push({
                    pathname: '/login',
                })
            }
        }
        // @ts-ignore
        if (parseInt(checkExist.data.length) != parseInt(0)) {
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
                    <IonTitle>Inregistrare client</IonTitle>
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
                            <IonLabel position="floating"> Greutate</IonLabel>
                            <IonInput
                                type="number"
                                value={greutate}
                                // @ts-ignore

                                min={0}
                                onIonChange={e => {
                                    setState({
                                        ...state,
                                        //@ts-ignore
                                        greutate: parseInt(e.detail.value) || 0
                                    })
                                    changeDatas()
                                }
                                }
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Inaltime(cm)</IonLabel>
                            <IonInput
                                type="number"
                                value={inaltime}
                                // @ts-ignore
                                min={0}
                                onIonChange={e => {
                                    setState({
                                        ...state,
                                        //@ts-ignore
                                        inaltime: parseInt(e.detail.value) || 0
                                    })
                                    changeDatas()
                                }}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>


                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Sex</IonLabel>
                            <IonSelect onIonChange={e => setState({
                                ...state,
                                //@ts-ignore
                                sex: e.detail.value || ''
                            })}>
                                <IonSelectOption value="m">m</IonSelectOption>
                                <IonSelectOption value="f">f</IonSelectOption>
                            </IonSelect>

                        </IonItem>
                    </IonCol>
                </IonRow>


                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel> BMI:</IonLabel>
                            <IonInput
                                disabled={true}
                                type="text"
                                value={bmi}

                                id={"bmi"}
                                onIonChange={e => setState({
                                    ...state,
                                    bmi: e.detail.value || ''
                                })}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel> Status:</IonLabel>
                            <IonInput
                                type="text"
                                disabled={true}
                                value={status}
                                id={"status"}
                                onIonChange={e => setState({
                                    ...state,
                                    status: e.detail.value || ''
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
                    style={{width: "150px", height: "150px", margin: "0 auto"}}
                    onClick={() => {
                        setPhotoToDelete(photos?.find(item => item.webviewPath === photoPath))
                    }}
                    alt={"Poza de profil"}
                    src={photoPath}
                />
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

                <IonButton onClick={handleLSignUpClient}>Salveaza</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SignUpClient;