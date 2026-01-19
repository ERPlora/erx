function RatingExample() {
  return (
    <div className="example-wrapper">
      <div style={{ marginBottom: '16px' }}>
        <h4>Stars</h4>
        <erx-rating value="4" color="primary" style={{ marginBottom: '8px' }}></erx-rating>
        <erx-rating value="3.5" allow-half="true" color="warning"></erx-rating>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h4>Hearts</h4>
        <erx-rating value="5" icon="heart" color="danger" style={{ marginBottom: '8px' }}></erx-rating>
        <erx-rating value="3" icon="heart" color="primary"></erx-rating>
      </div>

      <div>
        <h4>Sizes</h4>
        <erx-rating value="4" size="sm" style={{ marginRight: '8px' }}></erx-rating>
        <erx-rating value="4" size="md" style={{ marginRight: '8px' }}></erx-rating>
        <erx-rating value="4" size="lg"></erx-rating>
      </div>
    </div>
  );
}

export default RatingExample;
