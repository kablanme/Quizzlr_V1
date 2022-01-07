import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/HomePage';
import Play from './pages/PlayPage';
import ChooseCharacter from './pages/ChooseCharacterPage';
import Degree from './pages/DegreePage';
import Question from './pages/QuestionPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Menu from './components/Menu';
import CategoryPage from './pages/CategoryPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import { CategoryState } from './assets/tsx/interfaces';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect } from 'react';
import { Storage } from '@capacitor/storage';
import { setLocalStorageState } from './assets/storage/categorySlice';
import ShoppingCategoriesOverviewPage from './pages/ShoppingCategoriesOverviewPage';
import ShoppingListsPage from './pages/ShoppingListsPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import QuestionCardPage from './pages/QuestionCardPage'

const App: React.FC = () => {
    const categoryState: CategoryState = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getLocalStorage()
    }, [])

    const getLocalStorage = async () => {
        var { value } = await Storage.get({
            key: 'category',
        });

        if (value !== null) {
            dispatch(setLocalStorageState(JSON.parse(value!)))
        } else {

            await Storage.set({
                key: 'category',
                value: JSON.stringify(categoryState),
            });
        }
    }

    const renderComponent = (component: any) => {
        return component
    }

    return (
        <IonApp>
            <IonReactRouter>
                <Menu />
                <IonPage id="main-content" >
                    <IonRouterOutlet>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>

                        <Route exact path="/shoppinglists" render={props => renderComponent(<ShoppingCategoriesOverviewPage {...props} />)} />
                        <Route exact path="/shoppinglists/category/:idCategorie" render={props => renderComponent(<ShoppingListsPage {...props} />)} />
                        <Route exact path="/shoppinglists/category/:idCategorie/shoppinglist/:idShoppinglist" render={props => renderComponent(<ArticleListPage {...props} />)} />
                        <Route exact path="/shoppinglists/category/:idCategorie/shoppinglist/:idShoppinglist/article/:idArticle" render={props => renderComponent(<ArticleDetailPage {...props} />)} />
                        <Route exact path="/categories" render={props => renderComponent(<CategoryPage {...props} />)} />
                        <Route exact path="/categories/:id" render={props => renderComponent(<CategoryDetailPage {...props} />)} />
                        <Route exact path="/play" component={Play} />
                        <Route exact path="/questions" component={QuestionCardPage} />
                        <Route exact path="/choose" component={ChooseCharacter} />
                        <Route exact path="/degree" component={Degree} />
                        <Route exact path="/question" component={Question} />                        
                    
                    </IonRouterOutlet>
                </IonPage>
            </IonReactRouter>
        </IonApp>)
};

export default App;
