import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonBadge,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { componentCategories } from '../data/components';
import './Menu.css';

const Menu = () => {
  const location = useLocation();
  const [searchText, setSearchText] = useState('');

  // Flatten all components
  const allComponents = componentCategories.flatMap((category) =>
    category.components.map((comp) => ({
      ...comp,
      categoryId: category.id,
      categoryName: category.name,
    }))
  );

  // Filter components
  const filteredComponents = allComponents.filter((comp) =>
    comp.name.toLowerCase().includes(searchText.toLowerCase()) ||
    comp.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // Group by category
  const groupedComponents = componentCategories.map((category) => ({
    ...category,
    components: filteredComponents.filter((comp) => comp.categoryId === category.id),
  })).filter((category) => category.components.length > 0);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>ERX Components</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value)}
          placeholder="Search components..."
          animated
        />

        {groupedComponents.map((category) => (
          <IonList key={category.id} className="category-list">
            <IonListHeader className="category-header">
              <IonLabel>
                <h2>{category.name}</h2>
              </IonLabel>
              <IonBadge color="primary">{category.components.length}</IonBadge>
            </IonListHeader>

            {category.components.map((component) => (
              <IonMenuToggle key={component.name} autoHide={false}>
                <IonItem
                  className={location.pathname === `/component/${component.name}` ? 'selected' : ''}
                  routerLink={`/component/${component.name}`}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel>
                    <h3>{component.name}</h3>
                    <p>{component.description}</p>
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        ))}

        {groupedComponents.length === 0 && (
          <div className="empty-state">
            <p>No components found</p>
          </div>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
