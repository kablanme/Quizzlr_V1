import { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical, trashOutline, pencilOutline } from 'ionicons/icons';

import { RouteComponentProps, withRouter } from 'react-router';
import ArticleDetails from '../components/ArticleDetails';
import ArticleModal from '../components/EditArticleModal';
import { ArticleItem, Category, ShoppingList } from '../assets/tsx/interfaces';
import { deleteAricle } from '../assets/storage/categorySlice';
import { deleteArticleLS } from '../assets/storage/localStorageHandler';
import { useAppDispatch, useAppSelector } from '../hooks';

interface ContainerProps extends RouteComponentProps<{}> { }

const ArticlePopover = ({ popoverState, popoverStateFunction, idCategorie, idShoppinglist, idArticle, modalStateFunction, redirectFunction }: any) => {
    const [present] = useIonAlert();
    const dispatch = useAppDispatch()

    return (
        <>
            <IonPopover
                cssClass=''
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() => popoverStateFunction({ showPopover: false, event: undefined })}>
                <IonList>
                    <IonItem button onClick={() => { modalStateFunction(true); popoverStateFunction({ showPopover: false, event: undefined }) }}>
                        <IonIcon slot="start" icon={pencilOutline}></IonIcon>
                        <IonLabel>Edit Article</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() =>
                        present({
                            cssClass: '',
                            header: 'Delete Article',
                            message: 'Do you really want to remove the item from the list permanently. This action can not be undone.',
                            buttons: [
                                'Cancel',
                                {
                                    text: 'Ok', handler: (d) => {
                                        redirectFunction()
                                        popoverStateFunction({ showPopover: false, event: undefined })
                                        deleteArticleLS(idCategorie, idShoppinglist, idArticle)
                                        dispatch(deleteAricle({ idCategory: idCategorie, idShoppinglist: idShoppinglist, idArticle: idArticle, }))
                                    }
                                },
                            ],
                            onDidDismiss: (e) => {
                                popoverStateFunction({ showPopover: false, event: undefined })
                            },
                        })}>
                        <IonIcon slot="start" icon={trashOutline}></IonIcon>
                        <IonLabel>Remove Article</IonLabel>
                    </IonItem>
                </IonList>
            </IonPopover>
        </>
    )
}


const ArticleDetailPage: React.FC<ContainerProps> = ({ match, history, props }: any) => {
    const [presentLoading, dismiss] = useIonLoading();
    const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
    const [showModal, setShowModal] = useState(false);

    const category: Category = useAppSelector(state => state.category.categoryList.find(element => element.id === match.params.idCategorie))!;
    const shoppinglist: ShoppingList = category?.shoppingLists.find(element => element.id === match.params.idShoppinglist)!;
    const article: ArticleItem = shoppinglist?.articleList.find(element => element.id === match.params.idArticle)!;

    const redirectBack = () => {
        history.goBack()
    }

    const renderDetails = () => {
        if (article) {
            return (<>
                <ArticleDetails article={article!} />
                <ArticleModal isOpen={showModal} modalFunction={setShowModal} idCategory={match.params.idCategorie} idShoppinglist={match.params.idShoppinglist} article={article} />
            </>
            )
        } else {
            presentLoading({ message: "Article will be deleted", duration: 2000 })
        }
    }

    return (
        <IonPage>
            <ArticlePopover redirectFunction={redirectBack} popoverState={popoverState} popoverStateFunction={setShowPopover} modalStateFunction={setShowModal} idCategorie={match.params.idCategorie} idShoppinglist={match.params.idShoppinglist} idArticle={match.params.idArticle} />
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={"/shoppinglists/category/" + match.params.idCategorie + "/shoppinglist/" + match.params.idShoppinglist} />
                    </IonButtons>
                    <IonButtons slot="primary">
                        <IonButton onClick={
                            (e: any) => {
                                e.persist();
                                setShowPopover({ showPopover: true, event: e })
                            }} >
                            <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Article: {article?.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Article: {article?.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {renderDetails()}

            </IonContent>
        </IonPage>
    );
};

export default withRouter(ArticleDetailPage);