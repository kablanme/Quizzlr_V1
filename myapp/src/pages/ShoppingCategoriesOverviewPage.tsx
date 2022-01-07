import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import CategoryOverview from '../components/CategoryOverview';

interface ContainerProps extends RouteComponentProps<{}> { }

const ShoppingCategoriesOverviewPage: React.FC<ContainerProps> = () => {

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Category of Shoppinglists</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Category of Shoppinglists</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <CategoryOverview />

            </IonContent>

        </IonPage>
    );
};

export default ShoppingCategoriesOverviewPage;
