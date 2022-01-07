import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import AddShoppinglistModal from '../components/AddShoppinglistModal';
import ShoppingList from '../components/ShoppingList';
import { Category } from '../assets/tsx/interfaces';
import { useAppSelector } from '../hooks';

interface ContainerProps extends RouteComponentProps<{ idCategorie: string }> { }

const ShoppingListsPage: React.FC<ContainerProps> = ({ match, props }: any) => {

    const categoryListItem: Category = useAppSelector(state => state.category.categoryList.find(element => element.id === match.params.idCategorie))!;

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={"/shoppinglists"} />
                    </IonButtons>
                    <IonTitle>Shoppinglists of {categoryListItem?.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Shoppinglists of  {categoryListItem?.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ShoppingList idCategory={match.params.idCategorie} {...props} />
                <AddShoppinglistModal idCategory={match.params.idCategorie} />
            </IonContent>
        </IonPage>
    );
};

export default ShoppingListsPage;