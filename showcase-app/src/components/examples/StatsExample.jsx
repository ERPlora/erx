import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

function StatsExample() {
  const statsRef = useRef(null);

  useEffect(() => {
    if (statsRef.current) {
      statsRef.current.stats = [
        {
          label: 'Total Revenue',
          value: '€127,450',
          trend: 'up',
          change: '+12.5%',
          icon: 'cash-outline'
        },
        {
          label: 'Orders',
          value: '1,284',
          trend: 'up',
          change: '+8.2%',
          icon: 'cart-outline'
        },
        {
          label: 'Customers',
          value: '892',
          trend: 'down',
          change: '-2.1%',
          icon: 'people-outline'
        },
        {
          label: 'Avg. Order',
          value: '€99.26',
          trend: 'up',
          change: '+3.8%',
          icon: 'trending-up-outline'
        },
      ];
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Business Metrics</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <erx-stats ref={statsRef}></erx-stats>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default StatsExample;
