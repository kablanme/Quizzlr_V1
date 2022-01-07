import { IonItem, IonLabel, IonList } from '@ionic/react';

import { RouteComponentProps, withRouter } from 'react-router';
import { Category } from '../assets/tsx/interfaces';
import { useAppSelector } from '../hooks';

interface ContainerProps extends RouteComponentProps<{}> { }

const CategoryList: React.FC<ContainerProps> = ({ match }) => {

    const categoryList: Array<Category> = useAppSelector(state => state.category.categoryList);

    const renderListitems = () => {

        if (categoryList.length === 0) {
            return <IonItem lines="inset" >
                <IonLabel >No Elements in list</IonLabel>
            </IonItem>
        };

        return categoryList.map((category: Category) => {
            return (
                <IonItem key={category.id} detail routerLink={match.url + "/" + category.id} routerDirection="forward" lines="inset" >
                    <IonLabel >{category.name}</IonLabel>
                </IonItem>
            );
        })
    }

    return (
        <div className="">
            <IonList>
                {renderListitems()}
            </IonList>
        </div>
    );
};

export default withRouter(CategoryList);