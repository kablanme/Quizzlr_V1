import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import ChooseCharacter from '../components/ChooseCharacter';
import { micOutline, menuOutline, arrowForwardOutline, volumeHigh } from 'ionicons/icons';
import './HomePage.css';

const character: React.FC = () => {
    return (
        <div className="container">
            <IonGrid>
                <IonRow>
                    <IonCol size="12" >
                        
                        <ChooseCharacter/>
                        
                         </IonCol>
                </IonRow>
            </IonGrid>
        </div >
    );
};





export default character;





