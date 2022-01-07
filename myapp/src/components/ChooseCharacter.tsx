import React from 'react';
import {  IonSlides, IonSlide, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonRow, IonText, IonToolbar } from '@ionic/react';
import './ChooseCharacter.css';
import user1 from '../assets/img/User1.png';
import user2 from '../assets/img/User2.png';
import user3 from '../assets/img/User3.png';
import user4 from '../assets/img/User4.png';
import user5 from '../assets/img/User5.png';
import user6 from '../assets/img/User6.png';
import HSLogo from '../assets/img/HSLogo.png';
import {arrowForward} from 'ionicons/icons';

interface ContainerProps {}

const slideOpts = {
  initialSlide: 1,
  speed: 400
};

const ChooseCharacter: React.FC<ContainerProps> = () => {
  return (
      <div className="container">
              <IonRow>
              <IonCol size="12" >
                        <div className="HSLogo">
                            <img src={HSLogo} alt="HSLogo"/>
                         </div> 
                    </IonCol>   
                  <IonCol size="12" size-sm="6">
                      <div className="Choose">
                   <IonText>
                       <h2>Choose a character!</h2>
                   </IonText>
                   </div>
                      <IonToolbar>  
                      <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
      <div className="User1">
          <img src={user1} alt="User1"/>
      </div> 
      </IonSlide>
      <IonSlide>
      <div className="User2">
          <img src={user2} alt="User2"/>
      </div> 
      </IonSlide>
      <IonSlide>
      <div className="User3">
          <img src={user3} alt="User3"/>
      </div> 
      </IonSlide>
      <IonSlide>
      <div className="User4">
          <img src={user4} alt="User4"/>
      </div> 
      </IonSlide>
      <IonSlide>
      <div className="User5">
          <img src={user5} alt="User5"/>
      </div> 
      </IonSlide>
      <IonSlide>
      <div className="User6">
          <img src={user6} alt="User6"/>
      </div> 
      </IonSlide>
    </IonSlides>
    </IonToolbar>
    
         
                  </IonCol>
          
              </IonRow>
      </div >
  );
};

export default ChooseCharacter;
