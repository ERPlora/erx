import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

function TimelineExample() {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.events = [
        {
          time: '10:30 AM',
          title: 'Order Created',
          description: 'New order #ORD-2024-001 received from customer',
          type: 'info',
          icon: 'document-outline'
        },
        {
          time: '10:35 AM',
          title: 'Payment Confirmed',
          description: 'Payment of €127.50 processed successfully',
          type: 'success',
          icon: 'checkmark-circle-outline'
        },
        {
          time: '11:20 AM',
          title: 'Items Picked',
          description: 'All items collected from warehouse',
          type: 'success',
          icon: 'cube-outline'
        },
        {
          time: '14:45 PM',
          title: 'Order Shipped',
          description: 'Package dispatched via Express Courier',
          type: 'success',
          icon: 'airplane-outline'
        },
        {
          time: 'Pending',
          title: 'Delivery Expected',
          description: 'Estimated delivery: Tomorrow, 10:00 AM - 2:00 PM',
          type: 'pending',
          icon: 'home-outline'
        },
      ];
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Order Timeline - #ORD-2024-001</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <erx-timeline ref={timelineRef}></erx-timeline>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default TimelineExample;
