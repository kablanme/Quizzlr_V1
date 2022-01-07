import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import Start from '../components/Start';
import { volumeMediumOutline, menuOutline, arrowForwardOutline } from 'ionicons/icons';
import './PlayPage.css';

const play: React.FC = () => {
    return (
        <IonPage >
            <IonHeader >
            </IonHeader>
            <IonContent fullscreen color="secondary">
                <Start />
            
            <IonFooter>
            <IonToolbar >
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonButton slot="end" fill='clear' size="large" >
                        <IonIcon icon={volumeMediumOutline}></IonIcon>
                    </IonButton>
                    
                </IonToolbar>
            </IonFooter>
           </IonContent>
        </IonPage >
    );
};




export default play;
