import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { homeOutline, listOutline, storefrontOutline } from 'ionicons/icons';

export const Menu: React.FC = () => (
    <>
        <IonMenu side="start" content-id="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="none">
                    <IonItem routerLink="/play" >
                        <IonLabel>Start over</IonLabel>
                    </IonItem>

                    <IonItem routerLink="/degree">
                        <IonLabel>Submit a question</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/home">
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
        <IonRouterOutlet></IonRouterOutlet>
    </>
);

export default Menu;