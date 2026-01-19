import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';

function StockIndicatorExample() {
  const stock1Ref = useRef(null);
  const stock2Ref = useRef(null);
  const stock3Ref = useRef(null);
  const stock4Ref = useRef(null);

  useEffect(() => {
    if (stock1Ref.current) {
      stock1Ref.current.setAttribute('stock', '125');
      stock1Ref.current.setAttribute('min-stock', '20');
      stock1Ref.current.setAttribute('label', 'Wireless Mouse');
    }

    if (stock2Ref.current) {
      stock2Ref.current.setAttribute('stock', '8');
      stock2Ref.current.setAttribute('min-stock', '10');
      stock2Ref.current.setAttribute('label', 'USB-C Cable');
    }

    if (stock3Ref.current) {
      stock3Ref.current.setAttribute('stock', '0');
      stock3Ref.current.setAttribute('min-stock', '5');
      stock3Ref.current.setAttribute('label', 'Laptop Stand');
    }

    if (stock4Ref.current) {
      stock4Ref.current.setAttribute('stock', '45');
      stock4Ref.current.setAttribute('min-stock', '15');
      stock4Ref.current.setAttribute('label', 'Keyboard');
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Inventory Stock Levels</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <erx-stock-indicator ref={stock1Ref}></erx-stock-indicator>
              </IonCol>
              <IonCol size="12" size-md="6">
                <erx-stock-indicator ref={stock2Ref}></erx-stock-indicator>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <erx-stock-indicator ref={stock3Ref}></erx-stock-indicator>
              </IonCol>
              <IonCol size="12" size-md="6">
                <erx-stock-indicator ref={stock4Ref}></erx-stock-indicator>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default StockIndicatorExample;
