import { IonActionSheet, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { addOutline, close, trash } from 'ionicons/icons';
import { useAppDispatch } from '../hooks';
import { addCategory } from '../assets/storage/categorySlice'
import { Category } from '../assets/tsx/interfaces';
import { addCategoryLS } from '../assets/storage/localStorageHandler';
import placeholder from '../assets/img/placeholder.jpg'
import { CharacterPhoto, usePhotoGallery } from '../assets/camera/usePhotoGallery';

import './AddCategoryModal.css'

const AddCategoryModal: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [photoToDelete, setPhotoToDelete] = useState<CharacterPhoto>();
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const dispatch = useAppDispatch()


    const handleCloseModal = () => {
        setName("");
        setDescription("");
        setShowModal(false);
    }

    const handleSaveCategory = () => {
        const newCategory: Category = {
            id: Date.now().toString(),
            name: name,
            description: description,
            shoppingLists: [],
            photo: photos[0]
        };

        addCategoryLS(newCategory)
        dispatch(addCategory(newCategory))
        handleCloseModal();
    }

    return (
        <>
            <IonModal isOpen={showModal} onDidDismiss={handleCloseModal} cssClass=''>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton disabled={name === ""} onClick={() => handleSaveCategory()}>Save</IonButton>
                        </IonButtons>
                        <IonButtons slot="start">
                            <IonButton onClick={() => handleCloseModal()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>Add Category</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" >
                                    <IonImg id="img-add-category" src={photos[0]?.webviewPath || placeholder} />
                                </IonCol>
                                <IonCol size="12" size-sm="6">
                                    <IonButton size="small" expand="block" shape="round" onClick={() => { takePhoto() }} >Change image</IonButton>
                                </IonCol>
                                <IonCol size="12" size-sm="6">
                                    <IonButton disabled={photos.length <= 0} size="small" expand="block" shape="round" onClick={() => { setPhotoToDelete(photos[0]) }} >Delete image</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Category Name *</IonLabel>
                        <IonInput value={name} placeholder="Name" onIonChange={e => setName(e.detail.value! || "")} clearInput></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Category description</IonLabel>
                        <IonTextarea value={description} placeholder="Description" onIonChange={e => setDescription(e.detail.value! || "")}></IonTextarea>
                    </IonItem>

                    <IonActionSheet
                        isOpen={!!photoToDelete}
                        buttons={[{
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                if (photoToDelete) {
                                    deletePhoto(photoToDelete);
                                    setPhotoToDelete(undefined);
                                }
                            }
                        }, {
                            text: 'Cancel',
                            icon: close,
                            role: 'cancel'
                        }]}
                        onDidDismiss={() => setPhotoToDelete(undefined)} />

                </IonContent>
            </IonModal>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => setShowModal(true)}>
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </>
    );
};

export default AddCategoryModal;