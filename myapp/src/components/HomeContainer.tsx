import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import './HomeContainer.css';
import {arrowForward} from 'ionicons/icons';
interface ContainerProps {}



const HomeContainer: React.FC<ContainerProps> = () => {
    
    const [text, setText] = useState<string>();

    return (
        <div className="container">
                <IonRow> 
                    <IonCol size="12" size-sm="6">
                        <IonText >
                            <h2>Matriculate </h2>
                        </IonText>
                        <br ></br>
                        <br ></br>
                        <br ></br>
                          
            <IonContent>
            <IonItem >             
            <IonInput type="text" placeholder="enter your name"  onIonChange={e => setText(e.detail.value!) }></IonInput>
            </IonItem>
            
            </IonContent> 
            <IonContent className="button">
            <IonButton color="primary" href="/play" fill="clear" >
            <IonIcon slot="end" size='large' icon={arrowForward} ></IonIcon>
            </IonButton>       
            </IonContent>
                    </IonCol>
            
                </IonRow>
        </div >
    );
};




export default HomeContainer;
