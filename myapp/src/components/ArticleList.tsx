import { IonCheckbox, IonItem, IonLabel, IonList } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ArticleItem } from '../assets/tsx/interfaces';
import { toggleArticleCollected } from '../assets/storage/categorySlice';
import { toggleArticleCollectedLS } from '../assets/storage/localStorageHandler';
import { useAppDispatch } from '../hooks';

interface ContainerProps extends RouteComponentProps<{ idShoppingList?: string }> { checkboxMode: Boolean }

const ArticleList: React.FC<ContainerProps> = ({ match, shoppinglist, idCategory, checkboxMode }: any) => {

    const dispatch = useAppDispatch();

    const handleToggleCollected = (idArticle: string, toggleState: boolean) => {
        dispatch(toggleArticleCollected({ idArticle, idCategory, idShoppinglist: shoppinglist.id, toggleState }))
        toggleArticleCollectedLS(idArticle, idCategory, shoppinglist.id, toggleState)
    }

    if (checkboxMode) {
        return (
            <IonList>
                {shoppinglist?.articleList.map((article: ArticleItem) => {
                    return (
                        <IonItem key={article.id} >
                            <IonCheckbox slot="start" checked={article.collected} onIonChange={e => handleToggleCollected(article.id, e.detail.checked)} />
                            <IonLabel >{article.name}</IonLabel>
                            <IonLabel position="fixed">{article.quantity} {article.unit}</IonLabel>
                        </IonItem>
                    )
                })}
            </IonList>
        );
    } else {
        return (
            <IonList>
                {shoppinglist?.articleList.map((article: ArticleItem) => {
                    return (
                        <IonItem key={article.id} detail routerLink={match.url + "/article/" + article.id}>
                            <IonLabel >{article.name}</IonLabel>
                            <IonLabel position="fixed">{article.quantity} {article.unit}</IonLabel>
                        </IonItem>
                    )
                })}
            </IonList>
        );
    }


};

export default withRouter(ArticleList);
