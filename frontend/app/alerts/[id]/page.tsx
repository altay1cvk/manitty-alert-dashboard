'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AlertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [alert, setAlert] = useState<any>(null);

  useEffect(() => {
    loadAlert();
  }, []);

  const loadAlert = async () => {
    try {
      const data = await api.getAlert(params.id as string);
      setAlert(data.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (!alert) return <div className="flex justify-center py-12">Chargement...</div>;

  const severityColors: any = {
    LOW: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    CRITICAL: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:underline">
        ← Retour
      </button>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{alert.title}</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${severityColors[alert.severity]}`}>
            {alert.severity}
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Message</h3>
            <p className="text-lg">{alert.message}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">ID</h3>
              <p className="font-mono">{alert.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Subject</h3>
              <p>{alert.subject}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p>{new Date(alert.timestamp).toLocaleString('fr-FR')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p>📍 {alert.metadata.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Device ID</h3>
              <p className="font-mono">🔧 {alert.metadata.deviceId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
