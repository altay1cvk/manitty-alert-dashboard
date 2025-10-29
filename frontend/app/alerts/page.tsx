import { Suspense } from 'react';
import AlertsContent from './AlertsContent';

export default function AlertsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12">Chargement...</div>}>
      <AlertsContent />
    </Suspense>
  );
}
