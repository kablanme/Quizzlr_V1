import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonModal, useIonPopover } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CategoryDetails from '../components/CategoryDetails';
import { useEffect, useState } from 'react';
import { Category, ShoppingList } from '../assets/tsx/interfaces';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ellipsisHorizontal, ellipsisVertical, pencilOutline, trashOutline } from 'ionicons/icons';
import { deleteCategory, editCategory } from '../assets/storage/categorySlice';
import { deleteCategoryLS, editCategoryLS } from '../assets/storage/localStorageHandler';
import placeholder from '../assets/img/placeholder.jpg'
import { CharacterPhoto, usePhotoGallery } from '../assets/camera/usePhotoGallery';

import './CategoryDetailPage.css'

interface ContainerProps extends RouteComponentProps<{ id: string; }> { };

const Body: React.FC<{
    photo?: CharacterPhoto; categoryName: string; description: string; shoppinglists: Array<ShoppingList>; deletePhotoDisabled: boolean;
    takePhoto: () => {}; deletePhoto: () => {}; onDescriptionChange: (value: string) => {}; onCategoryNameChange: (value: string) => {};
    onDismiss: () => void; onSave: () => void;
}> = ({ categoryName, description, shoppinglists, photo, deletePhotoDisabled, takePhoto, deletePhoto, onDescriptionChange, onCategoryNameChange, onDismiss, onSave }) => {

    return (<>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonButton disabled={categoryName === ""} onClick={() => onSave()}>Save</IonButton>
                </IonButtons>
                <IonButtons slot="start">
                    <IonButton onClick={() => onDismiss()} >Close</IonButton>
                </IonButtons>
                <IonTitle>Edit Category</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent >
            <IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" >
                            <IonImg id="img-category-edit" src={photo?.webviewPath || placeholder} />
                        </IonCol>
                        <IonCol size="12" size-sm="6">
                            <IonButton size="small" expand="block" shape="round" onClick={() => { takePhoto() }} >Change image</IonButton>
                        </IonCol>
                        <IonCol size="12" size-sm="6">
                            <IonButton disabled={deletePhotoDisabled} size="small" expand="block" shape="round" onClick={() => deletePhoto()} >Delete image</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Article Name *</IonLabel>
                <IonInput value={categoryName} placeholder="Name" onIonChange={e => onCategoryNameChange(e.detail.value! || "")} clearInput />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Additional Information</IonLabel>
                <IonTextarea value={description} placeholder="Description" onIonChange={e => onDescriptionChange(e.detail.value! || "")} />
            </IonItem>
            <IonList>
                <IonListHeader><strong>Shoppinglists of Category</strong></IonListHeader>
                {shoppinglists.map((shoppinglist: ShoppingList) => {
                    return (
                        <IonItem>
                            <IonLabel slot="start">{shoppinglist.name}</IonLabel>
                            <IonLabel slot="end">{shoppinglist.articleList.length} Article</IonLabel>
                        </IonItem>
                    )
                })}
            </IonList>
        </IonContent>
    </>)
}

const PopoverList: React.FC<{ onHide: () => void; onEditClick: () => void; onDeleteClick: () => void; }> = ({ onHide, onEditClick, onDeleteClick }) => (
    <IonList>
        <IonItem button onClick={() => { onEditClick() }}>
            <IonIcon slot="start" icon={pencilOutline} />
            <IonLabel>Edit</IonLabel>
        </IonItem>
        <IonItem button onClick={() => { onDeleteClick() }}>
            <IonIcon slot="start" icon={trashOutline} />
            <IonLabel>Delete</IonLabel>
        </IonItem>
    </IonList>
);

const CategoryDetailPage: React.FC<ContainerProps> = ({ match, history }) => {

    const [categoryListItem, setCategorieListItem] = useState<Category>()
    const [categoryName, setCategoryName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const categoryItem: Category = useAppSelector(state => state.category.categoryList.find(category => category.id === match.params.id))!;
    const [photo, setPhoto] = useState<CharacterPhoto>()
    const [photoToDelete, setPhotoToDelete] = useState<CharacterPhoto>();
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const dispatch = useAppDispatch();
    const [presentLoading, dismissLoading] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const [presentModal, dismissModal] = useIonModal(Body, {
        categoryName,
        description,
        photo: photo,
        deletePhotoDisabled: (photos.length <= 0),
        takePhoto: () => takePhoto(),
        deletePhoto: () => handleDeletePhoto(),
        onCategoryNameChange: (value: string) => setCategoryName(value),
        onDescriptionChange: (value: string) => setDescription(value),
        onSave: () => handleModalSave(),
        onDismiss: () => handleModalDismiss()
    });

    const [presentPopover, dismissPopover] = useIonPopover(PopoverList, {
        onHide: () => dismissModal(), onEditClick: () => presentModal({}), onDeleteClick: () => presentAlert({
            cssClass: '',
            header: 'Delete Category',
            message: 'Do you really want to remove the category from the list permanently. This action can not be undone.',
            buttons: [
                'Cancel',
                {
                    text: 'Ok', handler: (d) => {
                        presentLoading({ message: "Article will be deleted", duration: 1000 });
                        redirectBack();
                        deleteCategoryLS(match.params.id);
                        dispatch(deleteCategory({ idCategory: match.params.id }));
                        dismissPopover();
                    }
                },
            ],
            onDidDismiss: (e) => { console.log('did dismiss'); },
        })
    });

    useEffect(() => {
        setPhoto(photos[0])

    }, [photos]);

    useEffect(() => {
        setCategorieListItem(categoryItem)
    }, [categoryItem]);

    useEffect(() => {
        setCategorieListItem(categoryItem);
        setCategoryName(categoryItem.name);
        setDescription(categoryItem.description);
    }, []);

    const redirectBack = () => {
        history.goBack();
    };

    const handleDeletePhoto = () => {
        if (photos.length > 0) {
            deletePhoto(photos[0])
        };
    };

    const handleModalSave = () => {
        let changedCategory: Category = {
            id: categoryListItem?.id || "",
            name: categoryName,
            description: description,
            shoppingLists: categoryListItem?.shoppingLists || [],
            photo: photos[0]
        };
        editCategoryLS(changedCategory, match.params.id);
        dispatch(editCategory({ changedCategory: changedCategory, idCategory: match.params.id }));
        handleModalDismiss();
    }

    const handleModalDismiss = () => {
        setCategoryName(categoryListItem!.name);
        setDescription(categoryListItem!.description);
        if (photos.length > 0) {
            deletePhoto(photos[0])
        }
        dismissModal();
        dismissPopover();
    };

    const renderDetails = () => {
        return (<CategoryDetails category={categoryListItem!} />)
    };

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={"/categories"} />
                    </IonButtons>
                    <IonButtons slot="primary">
                        <IonButton onClick={(e) => {
                            presentPopover({
                                event: e.nativeEvent
                            })
                        }} >
                            <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Category Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Category Details</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {renderDetails()}

            </IonContent>
        </IonPage>
    );
};

export default withRouter(CategoryDetailPage);