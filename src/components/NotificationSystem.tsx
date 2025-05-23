import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bell, AlertCircle, CheckCircle, Info, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
  title: string;
  message: string;
  timestamp: number;
  persistent?: boolean;
  autoClose?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationSystem = ({ notifications, onDismiss, onClearAll }: NotificationSystemProps) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    setVisibleNotifications(notifications.slice(-5)); // Show max 5 notifications
  }, [notifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'achievement': return <Star className="w-4 h-4 text-purple-400" />;
      default: return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-500/50';
      case 'warning': return 'border-yellow-500/50';
      case 'error': return 'border-red-500/50';
      case 'achievement': return 'border-purple-500/50';
      default: return 'border-blue-500/50';
    }
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <Badge variant="outline" className="text-slate-300">
          <Bell className="w-3 h-3 mr-1" />
          {notifications.length} notifications
        </Badge>
        {notifications.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-slate-400 hover:text-slate-200"
          >
            Clear All
          </Button>
        )}
      </div>
      
      {visibleNotifications.map((notification) => (
        <Card
          key={notification.id}
          className={`p-3 bg-slate-800/95 backdrop-blur border ${getBorderColor(notification.type)} animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-100 text-sm">{notification.title}</h4>
                <p className="text-slate-300 text-xs mt-1 break-words">{notification.message}</p>
                <div className="text-slate-500 text-xs mt-1">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(notification.id)}
              className="text-slate-400 hover:text-slate-200 p-1 h-auto"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    if (!notification.persistent && notification.autoClose !== 0) {
      setTimeout(() => {
        dismissNotification(newNotification.id);
      }, notification.autoClose || 5000);
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications
  };
};