import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {
    IonButton,
    IonSelect,
    IonContent,
    IonSelectOption,
    IonHeader,
    IonInput,
    IonItemDivider,
    IonRow,
    IonCol,
    IonIcon,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonListHeader,
    IonLabel,
    IonRadio,
    IonItem,
    IonCheckbox,
    IonRadioGroup, IonImg
} from '@ionic/react';
import {AuthContext} from './AuthProvider';
import {getLogger} from '../core';
import {personCircle} from "ionicons/icons";
import {loginFct, loginGetId} from "./authApi";
import {logo} from "./logo";
const log = getLogger('Login');

interface LoginState {
    email?: string;
    parola?: string;
    tip?: string;
}

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const {isAuthenticated, isAuthenticating, login} = useContext(AuthContext);
    const [state, setState] = useState<LoginState>({});
    const {email, parola, tip} = state;

    const handleLogin = async () => {
        if (check() == 'wrong')
            alert('Completati toate campurile')
        else {
            log('handleLogin...');
            login?.(email, parola, tip);
            var id = await loginGetId(email, parola, tip)


            if (tip == 'antrenor') {
                history.push({
                    pathname: `/antrenor`,
                    state: {id: id}
                })
            }
            if (tip == 'client')
            {
                history.push({
                    pathname: `/client`,
                    state: {id: id}
                })

            }

        }
    };

    function check() {
        if (parola == '' || email == '' || tip === undefined) {
            alert('Completati toate campurile')
            return 'wrong'
        }
        return 'good';
    }

    const handleSignUp = () => {
        if (tip == undefined)
            alert('Alegeti tipul utilizatorului')
        else {
            if (tip == 'antrenor')
                history.push('/inregistrare_antrenor');
            if (tip == 'client')
                history.push('/inregistrare_client');

        }


    };
    log('render');
    if (isAuthenticated) {
        return <Redirect to={{pathname: '/'}}/>
    }
    return (
        <IonPage>
            <IonHeader>

                <IonToolbar>
                    <IonTitle class="centered">Fit At Home</IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonLabel style={{ fontSize: "40px", color: "#318ce7"}} >Login</IonLabel><br/>

            <IonRow class="fields">
                <IonCol>
                    <IonIcon
                        style={{fontSize: "70px", color: "#318ce7"}}
                        icon={personCircle}
                    />

                </IonCol>
            </IonRow>


            <IonRow class="fields">
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


            <IonRow class="fields">
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Parola</IonLabel>
                        <IonInput
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


            <IonContent>
                <br/>
                <IonLabel class="label">Inregistreaza-te sau autentifica-te ca:</IonLabel>
                <IonItem class="rol">
                    <IonLabel>Rol</IonLabel>
                    <IonSelect id="rol" onIonChange={e => {
                        setState({
                            ...state,
                            tip: e.detail.value || ''


                        });

                    }}>
                        <IonSelectOption value="client">Client</IonSelectOption>
                        <IonSelectOption value="antrenor">Antrenor</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonLoading isOpen={isAuthenticating}/>

                <IonButton id={"autentificare"} class="buton"
                           onClick={handleLogin}>Autentificare</IonButton>
                <IonButton id="inregistrare" onClick={handleSignUp}>Inregistrare</IonButton>
            </IonContent>
        </IonPage>
    );
};