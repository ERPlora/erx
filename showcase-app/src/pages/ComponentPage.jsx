import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import ComponentExample from '../components/ComponentExample';
import { componentCategories } from '../data/components';

const ComponentPage = () => {
  const { name } = useParams();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Find component info
  const allComponents = componentCategories.flatMap((category) =>
    category.components.map((comp) => ({
      ...comp,
      categoryName: category.name,
    }))
  );

  const component = allComponents.find((c) => c.name === name);

  if (!component) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Component Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonCard>
            <IonCardContent>
              <p>Component "{name}" not found.</p>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{component.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <IoSunnyOutline size={24} /> : <IoMoonOutline size={24} />}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{component.name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="component-detail">
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>{component.categoryName}</IonCardSubtitle>
              <IonCardTitle>{component.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p className="component-description">{component.description}</p>
            </IonCardContent>
          </IonCard>

          <div className="component-example-section">
            <h2>Live Example</h2>
            <ComponentExample componentName={component.name} />
          </div>

          <div className="component-usage-section">
            <h2>Usage</h2>
            <IonCard>
              <IonCardContent>
                <pre className="code-block">
                  <code>{`<${component.name}></${component.name}>`}</code>
                </pre>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ComponentPage;
