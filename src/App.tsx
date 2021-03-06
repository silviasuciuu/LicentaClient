import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {AuthProvider, Login, PrivateRoute} from './auth';
import SignUpAntrenor from "./signup/signup_antrenor_first_page/SignUpAntrenor";
import {SignUpAntrenorProvider} from "./signup/signup_antrenor_first_page";
import {SportProvider} from "./signup/signup_antrenor_second_page";
import Sport from "./signup/signup_antrenor_second_page/Sport";
import SportPage from "./signup/signup_antrenor_second_page/SportPage";
import {SignUpClientProvider} from "./signup/singup_client";
import SignUpClient from "./signup/singup_client/SignUpClient";
import Antrenor from "./pagina-antrenor/profilePage/PaginaAntrenor";
import PaginaAntrenor from "./pagina-antrenor/profilePage/PaginaAntrenor";
import EditareAntrenor from "./pagina-antrenor/editPage/EditareAntrenor";
import {AntrenorProvider} from "./pagina-antrenor/profilePage/PaginaAntrenorProvider";
import EditareExperienta from "./pagina-antrenor/experiencePage/EditareExperienta";
import {ExperienceProvider} from "./pagina-antrenor/experiencePage/ExperiencePageProvider";
import Galerie from "./pagina-antrenor/paginaGalerie/Galerie";
import {GalerieProvider} from "./pagina-antrenor/paginaGalerie/GalerieProvider";
import {ClientProvider} from "./pagina-client/profilePage/PaginaClientProvider";
import PaginaClient from "./pagina-client/profilePage/PaginaClient";
import Evolutie from "./pagina-client/evolutionPage/Evolutie";
import {EvolutieProvider} from "./pagina-client/evolutionPage/EvolutieProvider";
import EditareClient from "./pagina-client/editPage/EditareClient";
import {RecomandareProvider2} from "./pagina-client/pagina-recomandari2";
import PaginaRecomandare from "./pagina-client/pagina-recomandari2/PaginaRecomandari2";
import CPaginaAntrenor from "./pagina-client/pagina-recomandari2/pagina-profil-antrenor/CPaginaAntrenor";
import {CAntrenorProvider} from "./pagina-client/pagina-recomandari2/pagina-profil-antrenor";
import PaginaExperienta from "./pagina-client/pagina-recomandari2/experienta-antrenor/PaginaExperienta";
import {ExperientaProvider} from "./pagina-client/pagina-recomandari2/experienta-antrenor/ExperientaProvider";


const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <AuthProvider>
                    <Route path="/login" component={Login} exact={true}/>
                    <SignUpAntrenorProvider>
                        <Route path="/inregistrare_antrenor" component={SignUpAntrenor} exact={true}/>
                    </SignUpAntrenorProvider>
                    <SportProvider>
                        <Route path="/inregistrare_antrenor/sporturi" component={SportPage} exact={true}/>
                    </SportProvider>
                    <SignUpClientProvider>
                        <Route path="/inregistrare_client" component={SignUpClient} exact={true}/>
                    </SignUpClientProvider>
                    <AntrenorProvider>
                        <Route path="/antrenor" component={PaginaAntrenor} exact={true}/>
                        <Route path="/antrenor/edit" component={EditareAntrenor} exact={true}/>
                        <ExperienceProvider>
                            <Route path="/antrenor/experience_edit" component={EditareExperienta} exact={true}/>
                        </ExperienceProvider>
                        <GalerieProvider>
                            <Route path="/galerie" component={Galerie} exact={true}/>
                        </GalerieProvider>
                    </AntrenorProvider>
                    <Route path="/gallery" component={Galerie} exact={true}/>
                    <ClientProvider>
                        <Route path="/client" component={PaginaClient} exact={true}/>
                        <Route path="/client/edit" component={EditareClient} exact={true}/>
                        <EvolutieProvider>
                            <Route path="/evolution" component={Evolutie} exact={true}/>
                        </EvolutieProvider>
                        <RecomandareProvider2>
                            <Route path="/recomandations" component={PaginaRecomandare} exact={true}/>
                        </RecomandareProvider2>
                        <CAntrenorProvider>
                            <Route path="/recomandations/profile" component={CPaginaAntrenor} exact={true}/>
                            <ExperientaProvider>
                                <Route path="/recomandations/profile/experience" component={PaginaExperienta} exact={true}/>

                            </ExperientaProvider>

                        </CAntrenorProvider>
                    </ClientProvider>


                    <Route exact path="/" render={() => <Redirect to="/login"/>}/>
                </AuthProvider>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
