import { useEffect, useRef } from 'react';

function CartExample() {
  const cartRef = useRef(null);

  useEffect(() => {
    if (cartRef.current) {
      // Sample cart data
      cartRef.current.items = [
        {
          id: '1',
          productId: 'p1',
          name: 'Wireless Mouse',
          price: 29.99,
          quantity: 2,
          image: 'https://via.placeholder.com/60/667eea/ffffff?text=Mouse',
        },
        {
          id: '2',
          productId: 'p2',
          name: 'Mechanical Keyboard',
          price: 89.99,
          quantity: 1,
          image: 'https://via.placeholder.com/60/22c55e/ffffff?text=KB',
        },
      ];
    }
  }, []);

  return (
    <div className="example-wrapper">
      <erx-cart ref={cartRef} tax-rate="0.21" currency="€"></erx-cart>
    </div>
  );
}

export default CartExample;
