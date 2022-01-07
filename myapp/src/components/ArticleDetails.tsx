import { IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import placeholder from '../assets/img/placeholder.jpg'
import { ArticleItem } from '../assets/tsx/interfaces';
import './ArticleDetails.css'

interface ContainerProps {
    article: ArticleItem,
}

const ArticleDetails: React.FC<ContainerProps> = ({ article }) => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12" size-sm="6">
                    <IonImg id="img-article-detail" src={article.photo?.webviewPath || placeholder} />
                </IonCol>
                <IonCol size="12" size-sm="6">
                    <IonText><strong>Article name:</strong> {article.name}</IonText><br />
                    <IonText><strong>Additional Information:</strong> {article.additionalInfo}</IonText><br />
                    <IonText><strong>Quantity:</strong> {article.quantity}</IonText><br />
                    <IonText><strong>Unit:</strong> {article.unit}</IonText><br />
                    <IonText><strong>Collected:</strong> {article.collected ? "Is collected" : "Is not collected"}</IonText><br />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default ArticleDetails;
