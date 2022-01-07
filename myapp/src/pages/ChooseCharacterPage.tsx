import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import ChooseCharacter from '../components/ChooseCharacter';
import { micOutline, menuOutline, arrowForwardOutline, volumeHigh, volumeMediumOutline,arrowForward } from 'ionicons/icons';
import './HomePage.css';

const character: React.FC = () => {
    return (
        <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen color="secondary">
            <ChooseCharacter />
        </IonContent>
        <IonFooter>
        <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonButton  fill='clear' size="large" >
                    <IonIcon icon={volumeMediumOutline}></IonIcon>
                </IonButton>
                <IonButton slot="end" fill='clear' size="large" >
                <IonIcon icon={arrowForward}></IonIcon>
                </IonButton>
            </IonToolbar>
        </IonFooter>
       
    </IonPage >

    );
};





export default character;





