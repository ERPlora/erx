import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';

function PaymentExample() {
  const paymentRef = useRef(null);

  useEffect(() => {
    if (paymentRef.current) {
      paymentRef.current.setAttribute('total', '127.50');
      paymentRef.current.setAttribute('currency', '€');

      paymentRef.current.methods = [
        { id: 'card', name: 'Credit/Debit Card', icon: 'card', enabled: true },
        { id: 'cash', name: 'Cash', icon: 'cash', enabled: true },
        { id: 'paypal', name: 'PayPal', icon: 'logo-paypal', enabled: true },
        { id: 'apple', name: 'Apple Pay', icon: 'logo-apple', enabled: true },
      ];

      // Listen for payment events
      paymentRef.current.addEventListener('erxPaymentSelect', (e) => {
        console.log('Payment method selected:', e.detail);
      });

      paymentRef.current.addEventListener('erxPaymentComplete', (e) => {
        console.log('Payment completed:', e.detail);
      });
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Checkout - Select Payment Method</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <erx-payment ref={paymentRef}></erx-payment>

          <IonList style={{ marginTop: '24px' }}>
            <IonItem lines="none">
              <IonLabel>
                <h3>Order Summary</h3>
                <p>Subtotal: €112.50</p>
                <p>Tax (13.33%): €15.00</p>
                <p style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '8px' }}>
                  Total: €127.50
                </p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default PaymentExample;
