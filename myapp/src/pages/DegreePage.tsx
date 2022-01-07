import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Degree from '../components/Degree';

const AddDegree: React.FC = () => {
    return (
        <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
            <Degree />
        </IonContent>
       
    </IonPage >
);
};


export default AddDegree;