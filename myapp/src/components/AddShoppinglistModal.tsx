import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { addOutline } from 'ionicons/icons';
import { useAppDispatch } from '../hooks';
import { ShoppingList } from '../assets/tsx/interfaces';
import { addShoppinglist } from '../assets/storage/categorySlice';
import { addShoppinglistLS } from '../assets/storage/localStorageHandler';

interface ContainerProps {
    idCategory: string
}

const AddShoppinglistModal: React.FC<ContainerProps> = ({ idCategory }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        setName("");
        setShowModal(false);
    }

    const handleAddShoppinglist = () => {
        const newShoppinglist: ShoppingList = {
            id: Date.now().toString(),
            name: name,
            articleList: []
        };

        addShoppinglistLS(newShoppinglist, idCategory);
        dispatch(addShoppinglist({ shoppinglist: newShoppinglist, idCategory: idCategory }));
        handleCloseModal();
    }

    return (
        <>
            <IonModal isOpen={showModal} cssClass='my-custom-class' onDidDismiss={() => handleCloseModal()} >
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton disabled={name === ""} onClick={() => handleAddShoppinglist()}>Save</IonButton>
                        </IonButtons>
                        <IonButtons slot="start">
                            <IonButton onClick={() => handleCloseModal()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>Add Shoppinglist</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonItem>
                        <IonLabel position="floating">List Name *</IonLabel>
                        <IonInput value={name} placeholder="Name" onIonChange={e => setName(e.detail.value! || "")} clearInput></IonInput>
                    </IonItem>
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

export default AddShoppinglistModal;