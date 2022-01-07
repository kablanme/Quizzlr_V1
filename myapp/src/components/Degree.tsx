import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import {arrowForward} from 'ionicons/icons';
interface ContainerProps {}




const Degree: React.FC<ContainerProps> = () => {
    return (
        <div className="Degree">
                <IonRow> 
                    <IonCol size="12" size-sm="6">
                        <IonText className="Degree">
                            <h2>Choose a degree for </h2>
                            <h2>your question</h2>
                        </IonText>
                        <br></br>
                        <br></br>
                        <br></br>
      <IonButton   shape="round" expand="block" size="large" fill="outline">Accessory Design</IonButton>
      <IonButton  shape="round" expand="block" size="large" fill="outline">Industrial Design</IonButton>
      <IonButton  shape="round" expand="block" size="large" fill="outline">Fashion</IonButton>
      <IonButton  shape="round" expand="block" size="large" fill="outline">Jewellery Design</IonButton>
      <IonButton  shape="round" expand="block" size="large" fill="outline">Transportation Design</IonButton>
      <IonButton  shape="round" expand="block" size="large" fill="outline">Visual Communication</IonButton>
    
      <IonContent className="button">
            <IonButton color="primary" href="/question" fill="clear" >
            <IonIcon slot="end" icon={arrowForward} ></IonIcon>
            </IonButton>       
            </IonContent>

                    </IonCol>
            
                </IonRow>
        </div >
    );
};




export default Degree;
