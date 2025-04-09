
import { useState, useEffect } from 'react';

export type ThemeType = 'light' | 'dark' | 'industrial';
export type GaugeType = 'radial' | 'linear';

export interface UserSettings {
  theme: ThemeType;
  gaugeType: GaugeType;
  refreshRate: number;
  notifications: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
  avatar?: string;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  gaugeType: 'radial',
  refreshRate: 5, // seconds
  notifications: {
    email: false,
    inApp: true,
    sms: false
  }
};

export const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('reactorUserSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('reactorUserSettings', JSON.stringify(updatedSettings));
  };

  return {
    settings,
    updateSettings,
    isLoaded
  };
};
