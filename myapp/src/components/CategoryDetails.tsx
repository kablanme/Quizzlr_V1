import { IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import placeholder from '../assets/img/placeholder.jpg'
import { Category } from '../assets/tsx/interfaces';
import './CategoryDetails.css'

interface ContainerProps extends RouteComponentProps<{}> {
    category: Category
}

const CategoryDetails: React.FC<ContainerProps> = ({ category }) => {

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12" size-sm="6">
                    <IonImg id="img-category" src={category?.photo?.webviewPath || placeholder} />
                </IonCol>
                <IonCol>
                    <IonText><strong>Category name:</strong> {category?.name}</IonText><br />
                    <IonText><strong>Description:</strong> {category?.description}</IonText><br />
                    <IonText><strong>Number of Lists:</strong> {category?.shoppingLists.length}</IonText><br />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default withRouter(CategoryDetails);
