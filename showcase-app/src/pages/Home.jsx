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
  IonCardContent,
  IonChip,
  IonBadge,
} from '@ionic/react';
import { IoMoonOutline, IoSunnyOutline, IoRocketOutline, IoLayersOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ERX Component Showcase</IonTitle>
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
            <IonTitle size="large">ERX Component Showcase</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="welcome-state">
          <h1>Welcome to ERX Component Showcase</h1>
          <p>Select a component from the left sidebar to view its documentation and live example.</p>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <IonChip color="primary">
              <IoRocketOutline size={20} style={{ marginRight: '4px' }} />
              <span>Stencil.js</span>
            </IonChip>
            <IonChip color="secondary">
              <IoLayersOutline size={20} style={{ marginRight: '4px' }} />
              <span>Ionic React</span>
            </IonChip>
            <IonChip color="tertiary">
              <IoColorPaletteOutline size={20} style={{ marginRight: '4px' }} />
              <span>ERPlora UX Theme</span>
            </IonChip>
          </div>

          <div className="stats-grid">
            <IonCard>
              <IonCardContent className="stat-card">
                <div className="stat-number">94</div>
                <div className="stat-label">Components</div>
                <IonBadge color="success" style={{ marginTop: '8px' }}>Ready to use</IonBadge>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent className="stat-card">
                <div className="stat-number">10</div>
                <div className="stat-label">Categories</div>
                <IonBadge color="primary" style={{ marginTop: '8px' }}>POS, HR, MFG & more</IonBadge>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent className="stat-card">
                <div className="stat-number">✨</div>
                <div className="stat-label">UX Theme</div>
                <IonBadge color="tertiary" style={{ marginTop: '8px' }}>Dark mode ready</IonBadge>
              </IonCardContent>
            </IonCard>
          </div>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Quick Start</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ol className="quick-start-list">
                <li>Browse components in the left sidebar</li>
                <li>Use the search bar to find specific components</li>
                <li>Click on any component to view its live example</li>
                <li>Toggle dark mode with the button in the top right</li>
              </ol>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Featured Components</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IonChip>erx-cart</IonChip>
                <IonChip>erx-data-grid</IonChip>
                <IonChip>erx-stats</IonChip>
                <IonChip>erx-kanban</IonChip>
                <IonChip>erx-calendar</IonChip>
                <IonChip>erx-timeline</IonChip>
                <IonChip>erx-payment</IonChip>
                <IonChip>erx-rating</IonChip>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
