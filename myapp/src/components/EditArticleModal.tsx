import { IonActionSheet, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonModal, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { editArticle } from '../assets/storage/categorySlice'
import { ArticleItem } from '../assets/tsx/interfaces';
import placeholder from '../assets/img/placeholder.jpg'
import { UNITS } from '../assets/tsx/constants';
import { CharacterPhoto, usePhotoGallery } from '../assets/camera/usePhotoGallery';
import { trash, close } from 'ionicons/icons';
import { editArticleLS } from '../assets/storage/localStorageHandler';

import "./EditArticleModal.css"

interface ContainerProps {
    article: ArticleItem,
    idShoppinglist: string,
    idCategory: string,
    isOpen: boolean,
    modalFunction: Function
}

const ArticleModal: React.FC<ContainerProps> = ({ isOpen, modalFunction, article, idShoppinglist, idCategory }) => {
    const [name, setName] = useState<string>(article.name);
    const [additionalInformation, setAdditionalInformation] = useState<string>(article.additionalInfo);
    const [quantity, setQuantity] = useState<number>(article.quantity);
    const [unit, setUnit] = useState<string>("");
    const [photo, setPhoto] = useState<CharacterPhoto>();
    const dispatch = useAppDispatch();
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<CharacterPhoto>();


    useEffect(() => {
        setName(article.name);
        setAdditionalInformation(article.additionalInfo);
        setQuantity(article.quantity);
        let selectedUnit = UNITS.find(unit => unit.value === article.unit)?.value || "";
        setUnit(selectedUnit);
        setPhoto(article.photo)

    }, [isOpen]);

    useEffect(() => {
        setPhoto(photos[0])

    }, [photos]);


    const handleCloseModal = () => {
        setName("");
        setAdditionalInformation("");
        setQuantity(1);
        setUnit("");
        modalFunction(false);
        if (photos.length > 0) {
            deletePhoto(photos[0])
        }
    }

    const handleSaveArticle = () => {
        let changedArticle: ArticleItem = {
            id: article.id,
            name: name,
            additionalInfo: additionalInformation,
            quantity: quantity,
            unit: unit,
            collected: article.collected,
            photo: photos[0]
        };
        editArticleLS(changedArticle, idCategory, idShoppinglist);
        dispatch(editArticle({ article: changedArticle, idCategory: idCategory, idShoppinglist: idShoppinglist }));
        handleCloseModal();
    }

    const handleLoadImage = () => {
        if (photo) {
            return photo.webviewPath
        }
        return placeholder
    }

    return (
        <IonContent>
            <IonModal isOpen={isOpen} cssClass=''>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton disabled={name === "" || quantity === 0 || unit === ""} onClick={() => handleSaveArticle()}>Save</IonButton>
                        </IonButtons>
                        <IonButtons slot="start">
                            <IonButton onClick={() => handleCloseModal()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>Edit Article</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" >
                                    <IonImg id="img-edit" src={handleLoadImage()} />
                                </IonCol>
                                <IonCol size="12" size-sm="6">
                                    <IonButton size="small" expand="block" shape="round" onClick={() => takePhoto()}  >Change image</IonButton>
                                </IonCol>
                                <IonCol size="12" size-sm="6">
                                    <IonButton disabled={photos.length <= 0} size="small" expand="block" shape="round" onClick={() => { setPhotoToDelete(photos[0]) }} >Delete image</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Article Name</IonLabel>
                        <IonInput value={name} placeholder="Name" onIonChange={e => setName(e.detail.value! || "")} clearInput></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Additional Information</IonLabel>
                        <IonTextarea value={additionalInformation} placeholder="Description" onIonChange={e => setAdditionalInformation(e.detail.value! || "")}></IonTextarea>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Quantity</IonLabel>
                        <IonInput value={quantity} placeholder="Quantity" type="number" onIonChange={e => setQuantity(parseInt(e.detail.value!, 10) || 1)} clearInput></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Unit</IonLabel>
                        <IonSelect value={unit} onIonChange={e => setUnit(e.detail.value)}>
                            <IonSelectOption value="">No unit selected</IonSelectOption>
                            {UNITS.map(unit => {
                                return <IonSelectOption key={unit.key} value={unit.value}>{unit.key}</IonSelectOption>
                            })}
                        </IonSelect>
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
                                    setPhoto(article.photo)
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
        </IonContent >
    );
};

export default ArticleModal;