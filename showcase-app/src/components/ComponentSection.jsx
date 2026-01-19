import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import ComponentExample from './ComponentExample';

function ComponentSection({ category }) {
  return (
    <div className="category-section">
      <h1 className="category-title">{category.name}</h1>
      <p className="category-subtitle">{category.components.length} components</p>

      <div className="components-grid">
        {category.components.map((component) => (
          <IonCard key={component.name}>
            <IonCardHeader>
              <IonCardTitle>{component.name}</IonCardTitle>
              <IonCardSubtitle>{component.description}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <ComponentExample componentName={component.name} />
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </div>
  );
}

export default ComponentSection;
