import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AddQuestion from '../components/AddQuestion';



const Question: React.FC = () => {
    return (
        
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Start</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <AddQuestion/>
            </IonContent>
        </IonPage >
    );
};


export default Question;
