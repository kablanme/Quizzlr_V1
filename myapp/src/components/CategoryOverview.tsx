import { IonItem, IonLabel, IonList, IonSearchbar } from '@ionic/react';
import { useState } from 'react';
import { Category } from '../assets/tsx/interfaces';
import { useAppSelector } from '../hooks';

interface ContainerProps { }

const CategoryOverview: React.FC<ContainerProps> = () => {

    const [searchText, setSearchText] = useState<string>("");
    const categoryList: Array<Category> = useAppSelector(state => state.category.categoryList);

    return (
        <div className="">
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>

            <IonList>
                {categoryList.map((categoryItem: Category) => {
                    return (
                        < IonItem key={categoryItem.id} detail routerLink={"/shoppinglists/category/" + categoryItem.id} lines="inset" >
                            <IonLabel >{categoryItem.name}</IonLabel>
                        </IonItem>
                    )
                })}
            </IonList>
        </div >
    );
};

export default CategoryOverview;