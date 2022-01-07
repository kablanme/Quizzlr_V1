import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HomeContainer from '../components/HomeContainer';
import './HomePage.css';


const Home: React.FC = () => {
    return (
        
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Start</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <HomeContainer />
            </IonContent>
        </IonPage >
    );
};


export default Home;
