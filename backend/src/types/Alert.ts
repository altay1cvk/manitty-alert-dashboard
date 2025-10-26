export interface Alert {
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

export interface MonthlyStats {
  month: string;
  count: number;
  alerts: Alert[];
}
