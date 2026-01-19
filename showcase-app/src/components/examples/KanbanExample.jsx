import { useEffect, useRef } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

function KanbanExample() {
  const kanbanRef = useRef(null);

  useEffect(() => {
    if (kanbanRef.current) {
      kanbanRef.current.columns = [
        {
          id: 'todo',
          title: 'To Do',
          cards: [
            { id: '1', title: 'Design new dashboard', description: 'Create mockups for analytics dashboard', tags: ['design', 'ui'] },
            { id: '2', title: 'Update documentation', description: 'Add API reference docs', tags: ['docs'] },
          ]
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          cards: [
            { id: '3', title: 'Implement user authentication', description: 'Add OAuth2 login flow', tags: ['backend', 'security'] },
            { id: '4', title: 'Fix cart calculation bug', description: 'Tax calculation incorrect for multi-item orders', tags: ['bug', 'urgent'] },
          ]
        },
        {
          id: 'review',
          title: 'Review',
          cards: [
            { id: '5', title: 'Add payment gateway', description: 'Stripe integration complete', tags: ['backend', 'payment'] },
          ]
        },
        {
          id: 'done',
          title: 'Done',
          cards: [
            { id: '6', title: 'Setup CI/CD pipeline', description: 'GitHub Actions configured', tags: ['devops'] },
            { id: '7', title: 'Create landing page', description: 'Marketing site deployed', tags: ['frontend'] },
          ]
        },
      ];
    }
  }, []);

  return (
    <div className="example-wrapper">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Project Tasks</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <erx-kanban ref={kanbanRef}></erx-kanban>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default KanbanExample;
