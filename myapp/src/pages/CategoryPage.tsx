import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { withRouter } from 'react-router-dom';
import AddCategoryModal from '../components/AddCategoryModal';
import CategoryList from '../components/CategoryList';

interface CategoriePageProps { }

const CategoryPage: React.FC<CategoriePageProps> = () => {

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Shoppinglist Categories</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Shoppinglist Categories</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <CategoryList />

                <AddCategoryModal />

            </IonContent>

        </IonPage>
    );
};

export default withRouter(CategoryPage);
