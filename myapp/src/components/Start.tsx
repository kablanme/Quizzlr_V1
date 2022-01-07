import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import './Start.css';
import wolke1 from '../assets/img/Wolke1.png';
import wolke2 from '../assets/img/Wolke2.png';
import logo from '../assets/img/Logo.png';
import { CreateAnimation, Animation } from '@ionic/react';
import Homecontainer from '../components/HomeContainer';

interface ContainerProps { }

const Start: React.FC<ContainerProps> = () => {
    return (
        <div className="container">
            <IonGrid>
                <IonRow>
                    <IonCol size="12" >
                        <div className="Logo">
                            <img src={logo} alt="logo"/>
                         </div> 
                    </IonCol>                  
                    <IonCol size="12" size-sm="6">
                        
<div className="Wolke1">
<img src={wolke1} alt="Wolke1"/>
          
                    
                     </div> 
                        <IonText >
                            <h2>
                            Welcome to
                            <br></br>
                            Design HS PF,
                            <br></br>
                            Mustermann
                            </h2>
                        </IonText>
                        <div className="Wolke2">
                            <img src={wolke2} alt="Wolke2"/>
                     </div> 
                        <IonContent className="button" color="secondary">
      <IonButton  href="/choose" shape="round" expand="block" size="large" fill="outline">Start</IonButton>
    </IonContent>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </div >
    );
};

export default Start;
