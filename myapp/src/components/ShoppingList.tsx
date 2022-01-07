import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSearchbar, IonTitle, IonToolbar, useIonAlert, useIonModal, } from '@ionic/react';
import { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Category, ShoppingList } from '../assets/tsx/interfaces';
import { deleteShoppinglist, editShoppinglist } from '../assets/storage/categorySlice';
import { deleteShoppinglistLS, editShoppinglistLS } from '../assets/storage/localStorageHandler';
import { useAppDispatch, useAppSelector } from '../hooks';

interface ContainerProps extends RouteComponentProps<{ idCategory?: string }> { }

const Body: React.FC<{ name: string, onChange: (e: any) => void; onSave: () => void; onClose: () => void; }> = ({ name, onChange, onSave, onClose }) => (
    <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonButton disabled={name === ""} onClick={() => onSave()}>Save</IonButton>
                </IonButtons>
                <IonButtons slot="start">
                    <IonButton onClick={() => onClose()}>Close</IonButton>
                </IonButtons>
                <IonTitle>Edit Shoppinglist</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonItem>
                <IonLabel position="floating">List Name *</IonLabel>
                <IonInput value={name} placeholder="Name" onIonChange={e => onChange(e.detail.value)} clearInput></IonInput>
            </IonItem>
        </IonContent>
    </>
);

const ShoppingListComp: React.FC<ContainerProps> = ({ match, idCategory }: any) => {
    const [presentAlert] = useIonAlert();
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [selectedShoppinglist, setSelectedShoppinglist] = useState<ShoppingList>();
    const categoryListItem: Category = useAppSelector(state => state.category.categoryList.find(element => element.id === idCategory))!;

    const handleOnClose = () => {
        setName("");
        dismiss();
    }

    const handleEditShoppinglist = () => {
        let changedShoppinglist: ShoppingList = {
            id: selectedShoppinglist!.id,
            name: name,
            articleList: selectedShoppinglist!.articleList
        };
        editShoppinglistLS(idCategory, selectedShoppinglist!.id, changedShoppinglist);
        dispatch(editShoppinglist({ idCategory: idCategory, idShoppinglist: selectedShoppinglist!.id, shoppinglist: changedShoppinglist, }));
        handleOnClose();
    }

    const [present, dismiss] = useIonModal(Body, {
        name,
        onChange: (value: string) => setName(value),
        onClose: handleOnClose,
        onSave: handleEditShoppinglist,
    });

    const filterFunction = (): any => {
        let result: Array<ShoppingList> = categoryListItem?.shoppingLists.filter(shoppinglist => shoppinglist.name.includes(searchText))!;
        if (result.length > 0) {
            return (
                <IonList>
                    {result.map((shoppinglist: ShoppingList) => {
                        return (
                            <IonItemSliding key={shoppinglist.id}>
                                <IonItem detail routerLink={match.url + "/shoppinglist/" + shoppinglist.id} routerDirection="forward" lines="inset" >
                                    <IonLabel >{shoppinglist.name}</IonLabel>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption onClick={() => {
                                        setSelectedShoppinglist(shoppinglist)
                                        setName(shoppinglist.name)
                                        present({
                                            cssClass: '',
                                        });
                                    }}>Edit</IonItemOption>
                                    <IonItemOption onClick={() => {
                                        setSelectedShoppinglist(shoppinglist)
                                        presentAlert({
                                            cssClass: '',
                                            header: 'Delete Shoppinglist',
                                            message: 'Do you really want to remove the item from the list permanently. This action can not be undone.',
                                            buttons: [
                                                'Cancel',
                                                {
                                                    text: 'Ok', handler: (d) => {
                                                        deleteShoppinglistLS(idCategory, shoppinglist.id);
                                                        dispatch(deleteShoppinglist({ idCategory: idCategory, idShoppinglist: shoppinglist.id }));
                                                    }
                                                },
                                            ],
                                            onDidDismiss: (e) => console.log('did dismiss'),
                                        })
                                    }}>Delete</IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        )
                    })
                    }
                </IonList >)
        }
        return (
            <IonItem lines="inset" >
                <IonLabel >No results</IonLabel>
            </IonItem>
        )
    }

    const renderListitems = () => {
        if (categoryListItem?.shoppingLists.length === 0) {
            return (
                <IonItem lines="inset" >
                    <IonLabel >No Elements in list</IonLabel>
                </IonItem>
            );
        };

        if (searchText.length > 0) {
            return filterFunction();
        } else {
            return (
                <IonList>
                    {categoryListItem?.shoppingLists.map(shoppinglist => {
                        return (
                            <IonItemSliding key={shoppinglist.id}>
                                <IonItem detail routerLink={match.url + "/shoppinglist/" + shoppinglist.id} routerDirection="forward" lines="inset" >
                                    <IonLabel >{shoppinglist.name}</IonLabel>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption onClick={() => {
                                        setSelectedShoppinglist(shoppinglist)
                                        setName(shoppinglist.name)
                                        present({
                                            cssClass: '',
                                        });
                                    }}>Edit</IonItemOption>
                                    <IonItemOption onClick={() => {
                                        setSelectedShoppinglist(shoppinglist)
                                        presentAlert({
                                            cssClass: 'my-css',
                                            header: 'Delete Shoppinglist',
                                            message: 'Do you really want to remove the item from the list permanently. This action can not be undone.',
                                            buttons: [
                                                'Cancel',
                                                {
                                                    text: 'Ok', handler: (d) => {
                                                        deleteShoppinglistLS(idCategory, shoppinglist.id);
                                                        dispatch(deleteShoppinglist({ idCategory: idCategory, idShoppinglist: shoppinglist.id }));
                                                    }
                                                },
                                            ],
                                            onDidDismiss: (e) => console.log('did dismiss'),
                                        })
                                    }
                                    }>Delete</IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        )
                    })
                    }
                </IonList >)
        }

    }

    return (
        <div className="">
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>

            {renderListitems()}

        </div>
    );
};

export default withRouter(ShoppingListComp);
