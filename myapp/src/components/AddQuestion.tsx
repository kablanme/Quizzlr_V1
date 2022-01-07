import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import './AddQuestion.css';
import {arrowForward, arrowBack} from 'ionicons/icons';
import { useForm, Controller } from "react-hook-form";

interface ContainerProps {
}




const AddQuestion: React.FC<ContainerProps> = () => {
 
    const saveClicked = () => {
        alert("saveClicked");
    };

    return (
        <div className="container">
                <IonRow> 
                    <IonCol size="12" size-sm="6">
                        <IonText >
                            <h2>Submit a question </h2>
                        </IonText>
                        <br ></br>
                        <br ></br>
                        <br ></br>
        
    <IonContent className="Question">
      <IonItem>
        <IonLabel className="Question1"  position="floating" >enter your question</IonLabel>
        <IonInput    clearInput></IonInput>
      </IonItem>
    </IonContent>

    <IonContent className="Answer1">
      <IonItem>
        <IonLabel  position="floating" >enter your right answer</IonLabel>
        <IonInput ></IonInput>
      </IonItem>
      </IonContent>
      <IonContent className="Answer2">
      <IonItem>
        <IonLabel position="floating">enter your wrong answer</IonLabel>
        <IonInput></IonInput>
      </IonItem>
      </IonContent>
      <IonContent className="Answer3" >
      <IonItem>
        <IonLabel   position="floating">enter your wrong answer</IonLabel>
        <IonInput></IonInput>
      </IonItem>
      </IonContent>
      <IonContent className="Answer4">
      <IonItem>
        <IonLabel position="floating">enter your wrong answer</IonLabel>
        <IonInput></IonInput>
      </IonItem>
      </IonContent>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
      <IonFabButton>
        <IonIcon name="arrow-dropup" />
      </IonFabButton>
    </IonFab>

            <IonContent className="questionbutton">
            <IonButton color="primary" href="/play" fill="clear" size="small" onClick={ () => saveClicked()}>
            <IonIcon slot="end" icon={arrowForward} ></IonIcon>
            </IonButton>       
            </IonContent>


        </IonCol>
     </IonRow>
        </div >
    );
};

export default AddQuestion;