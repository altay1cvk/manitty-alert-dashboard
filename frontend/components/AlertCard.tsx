import Link from 'next/link';

interface Alert {
  id: string;
  subject: string;
  timestamp: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  message: string;
  metadata: {
    deviceId: string;
    location: string;
  };
}

const severityColors = {
  LOW: 'bg-green-100 text-green-800 border-green-300',
  MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
  CRITICAL: 'bg-red-100 text-red-800 border-red-300',
};

export default function AlertCard({ alert }: { alert: Alert }) {
  const date = new Date(alert.timestamp);

  return (
    <Link href={`/alerts/${alert.id}`}>
      <div className="bg-white border-2 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${severityColors[alert.severity]}`}>
            {alert.severity}
          </span>
        </div>
        <p className="text-gray-600 mb-3">{alert.message}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>📍 {alert.metadata.location}</span>
          <span>🔧 {alert.metadata.deviceId}</span>
          <span>
            {date.toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
