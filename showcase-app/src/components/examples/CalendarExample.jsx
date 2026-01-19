import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

function CalendarExample() {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const today = new Date();
      calendarRef.current.value = today.toISOString().split('T')[0];

      calendarRef.current.events = [
        {
          date: today.toISOString().split('T')[0],
          title: 'Team Meeting',
          time: '10:00 AM',
          type: 'meeting'
        },
        {
          date: today.toISOString().split('T')[0],
          title: 'Product Demo',
          time: '2:00 PM',
          type: 'presentation'
        },
      ];
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Event Calendar</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <erx-calendar ref={calendarRef}></erx-calendar>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default CalendarExample;
