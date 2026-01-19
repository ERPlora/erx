import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

function DataGridExample() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.columns = [
        { field: 'id', header: 'ID', sortable: true, width: 80 },
        { field: 'name', header: 'Product Name', sortable: true },
        { field: 'category', header: 'Category', sortable: true },
        { field: 'price', header: 'Price', sortable: true, width: 120 },
        { field: 'stock', header: 'Stock', sortable: true, width: 100 },
        { field: 'status', header: 'Status', sortable: true, width: 120 },
      ];

      gridRef.current.data = [
        { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: '€29.99', stock: 45, status: 'active' },
        { id: 2, name: 'USB-C Cable', category: 'Accessories', price: '€12.99', stock: 128, status: 'active' },
        { id: 3, name: 'Laptop Stand', category: 'Office', price: '€45.99', stock: 23, status: 'active' },
        { id: 4, name: 'Bluetooth Headphones', category: 'Electronics', price: '€89.99', stock: 8, status: 'low-stock' },
        { id: 5, name: 'Desk Organizer', category: 'Office', price: '€19.99', stock: 0, status: 'out-of-stock' },
        { id: 6, name: 'Webcam HD', category: 'Electronics', price: '€79.99', stock: 34, status: 'active' },
        { id: 7, name: 'Mechanical Keyboard', category: 'Electronics', price: '€129.99', stock: 15, status: 'active' },
        { id: 8, name: 'Monitor Arm', category: 'Office', price: '€69.99', stock: 12, status: 'active' },
      ];
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Product Inventory</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <erx-data-grid ref={gridRef}></erx-data-grid>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default DataGridExample;
