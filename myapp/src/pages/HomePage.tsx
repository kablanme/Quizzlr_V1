import { IonButtons, IonContent, IonFooter, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HomeContainer from '../components/HomeContainer';
import './HomePage.css';


const Home: React.FC = () => {
    return (
        
        <IonPage>
            <IonContent fullscreen>
                
                <HomeContainer />
            </IonContent>
            <IonFooter>
                    <IonToolbar>
                        <IonTitle size="large">Start</IonTitle>
                    </IonToolbar>
                </IonFooter>
        </IonPage >
    );
};


export default Home;
