import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';

function ProgressStepsExample() {
  const stepsRef = useRef(null);

  useEffect(() => {
    if (stepsRef.current) {
      stepsRef.current.steps = [
        { label: 'Order Placed', completed: true, description: 'Order confirmed and payment received' },
        { label: 'Processing', completed: true, description: 'Items being prepared' },
        { label: 'Quality Check', completed: true, description: 'Verifying order accuracy' },
        { label: 'Shipped', completed: false, description: 'Out for delivery' },
        { label: 'Delivered', completed: false, description: 'Order completed' },
      ];
      stepsRef.current.setAttribute('current', '3');
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Order Progress Tracking</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <erx-progress-steps ref={stepsRef}></erx-progress-steps>

          <div style={{ display: 'flex', gap: '8px', marginTop: '24px', justifyContent: 'center' }}>
            <IonButton size="small" fill="outline">Cancel Order</IonButton>
            <IonButton size="small">Track Shipment</IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default ProgressStepsExample;
