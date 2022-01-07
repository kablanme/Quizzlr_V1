import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import AddArticleModal from '../components/AddArticleModal';
import ArticleList from '../components/ArticleList';

import { useAppSelector } from '../hooks';

interface ContainerProps extends RouteComponentProps<{ idShoppinglist: string }> { }

const ArticleListPage: React.FC<ContainerProps> = ({ match, props }: any) => {
    const [checkMode, setCheckMode] = useState<boolean>(true)
    const category = useAppSelector(state => state.category.categoryList.find(element => element.id === match.params.idCategorie))
    const shoppinglist = category?.shoppingLists.find(element => element.id === match.params.idShoppinglist)

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={"/shoppinglists/category/" + match.params.idCategorie} />
                    </IonButtons>
                    <IonItem slot="end">
                        <IonLabel>Checkbox Mode</IonLabel>
                        <IonToggle checked={checkMode} onIonChange={e => { setCheckMode(e.detail.checked) }} />
                    </IonItem>
                    <IonTitle>List of Articles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">List of Articles</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <ArticleList checkboxMode={checkMode} idCategory={match.params.idCategorie} shoppinglist={shoppinglist} {...props} />

                <AddArticleModal idCategory={match.params.idCategorie} idShoppinglist={match.params.idShoppinglist} />
            </IonContent>

        </IonPage>
    );
};

export default ArticleListPage;