function ProductCardExample() {
  return (
    <div className="example-wrapper">
      <erx-product-card
        name="Laptop Pro 2025"
        price="1299.99"
        currency="€"
        image="https://via.placeholder.com/300x200/667eea/ffffff?text=Laptop"
        rating="4.5"
        in-stock="true"
      ></erx-product-card>
    </div>
  );
}

export default ProductCardExample;
