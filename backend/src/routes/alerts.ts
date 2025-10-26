import { Router, Request, Response } from 'express';
import { Alert, MonthlyStats } from '../types/Alert';
import alertsData from '../data/alerts.json';

const router = Router();
const alerts: Alert[] = alertsData as Alert[];

router.get('/', (req: Request, res: Response) => {
  try {
    const { subject } = req.query;
    let filteredAlerts = alerts;
    
    if (subject && typeof subject === 'string') {
      filteredAlerts = alerts.filter(alert => alert.subject === subject);
    }
    
    res.json({
      success: true,
      count: filteredAlerts.length,
      data: filteredAlerts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch alerts' });
  }
});

router.get('/stats', (req: Request, res: Response) => {
  try {
    const { subject } = req.query;
    let filteredAlerts = alerts;
    
    if (subject && typeof subject === 'string') {
      filteredAlerts = alerts.filter(alert => alert.subject === subject);
    }
    
    const monthlyMap = new Map<string, Alert[]>();
    
    filteredAlerts.forEach(alert => {
      const date = new Date(alert.timestamp);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, []);
      }
      monthlyMap.get(monthKey)!.push(alert);
    });
    
    const monthlyStats: MonthlyStats[] = Array.from(monthlyMap.entries())
      .map(([month, alerts]) => ({ month, count: alerts.length, alerts }))
      .sort((a, b) => a.month.localeCompare(b.month));
    
    res.json({ success: true, data: monthlyStats });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
  }
});

router.get('/month/:year/:month', (req: Request, res: Response) => {
  try {
    const { year, month } = req.params;
    const { subject } = req.query;
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    
    let filteredAlerts = alerts.filter(alert => {
      const date = new Date(alert.timestamp);
      const alertMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return alertMonth === monthKey;
    });
    
    if (subject && typeof subject === 'string') {
      filteredAlerts = filteredAlerts.filter(alert => alert.subject === subject);
    }
    
    res.json({ success: true, month: monthKey, count: filteredAlerts.length, data: filteredAlerts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch alerts for month' });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const alert = alerts.find(a => a.id === id);
    
    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }
    
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch alert' });
  }
});

export default router;
