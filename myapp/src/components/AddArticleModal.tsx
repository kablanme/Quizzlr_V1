/* eslint-disable @typescript-eslint/no-unused-vars */
import { IonActionSheet, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonModal, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { addOutline, close, trash } from 'ionicons/icons';
import { useAppDispatch } from '../hooks';
import { addArticle } from '../assets/storage/categorySlice';
import { ArticleItem } from '../assets/tsx/interfaces';
import { UNITS } from '../assets/tsx/constants';
import { CharacterPhoto, usePhotoGallery } from '../assets/camera/usePhotoGallery';
import placeholder from '../assets/img/placeholder.jpg'
import { addArticleLS } from '../assets/storage/localStorageHandler';

import './AddArticleModal.css'

interface ContainerProps {
    idCategory: string,
    idShoppinglist: string
}

const AddArticleModal: React.FC<ContainerProps> = ({ idCategory, idShoppinglist }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [additionalInformation, setAdditionalInformation] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [unit, setUnit] = useState<string>("");
    const [photo, setPhoto] = useState<CharacterPhoto>();
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<CharacterPhoto>();

    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        setName("");
        setAdditionalInformation("");
        setQuantity(1);
        setUnit("");
        setShowModal(false);
        setPhoto(undefined);
    }

    useEffect(() => {
        setPhoto(photos[0])

    }, [photos]);

    const handleAddArticle = () => {
        let newArticle: ArticleItem = {
            id: Date.now().toString(),
            name: name,
            additionalInfo: additionalInformation,
            quantity: quantity,
            unit: unit,
            photo: photo,
            collected: false
        };

        addArticleLS(newArticle, idCategory, idShoppinglist);
        dispatch(addArticle({ article: newArticle, idCategory: idCategory, idShoppinglist: idShoppinglist }));
        handleCloseModal();
    }


    const handleLoadImage = () => {
        if (photo !== undefined) {
            return photo.webviewPath
        }
        return placeholder
    }

    return (
        <>
            <IonModal isOpen={showModal} onDidDismiss={handleCloseModal} cssClass=''>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton disabled={name === "" || quantity === 0 || unit === ""} onClick={() => handleAddArticle()}>Add</IonButton>
                        </IonButtons>
                        <IonButtons slot="start">
                            <IonButton onClick={() => handleCloseModal()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>Add Article</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" >
                                    <IonImg id="img-article-add" src={handleLoadImage()} />
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
                        <IonLabel position="floating">Article Name *</IonLabel>
                        <IonInput value={name} placeholder="Name" onIonChange={e => setName(e.detail.value! || "")} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Additional Information</IonLabel>
                        <IonInput value={additionalInformation} placeholder="Additional Information" onIonChange={e => setAdditionalInformation(e.detail.value! || "")} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Quantity *</IonLabel>
                        <IonInput type="number" value={quantity} placeholder="Quantity" onIonChange={e => parseInt(e.detail.value!, 10)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Unit *</IonLabel>
                        <IonSelect onIonChange={e => setUnit(e.detail.value)}>
                            <IonSelectOption value="">No unit selected</IonSelectOption>
                            {UNITS.map(unit => {
                                return <IonSelectOption key={unit.key} value={unit.value}>{unit.key}</IonSelectOption>
                            })}
                        </IonSelect>
                    </IonItem>
                </IonContent>
            </IonModal>
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
                onDidDismiss={() => setPhotoToDelete(undefined)}
            />

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => setShowModal(true)}>
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </>
    );
};

export default AddArticleModal;