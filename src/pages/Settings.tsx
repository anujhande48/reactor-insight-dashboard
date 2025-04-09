
import { useState } from 'react';
import { useUserSettings } from '@/hooks/useUserSettings';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from "sonner";
import { Camera, Save, Upload, User } from 'lucide-react';

const Settings = () => {
  const { settings, updateSettings, isLoaded } = useUserSettings();
  const [tempSettings, setTempSettings] = useState({ ...settings });
  const [profileImage, setProfileImage] = useState<string | null>(settings.avatar || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    updateSettings({
      ...tempSettings,
      avatar: profileImage || undefined
    });
    toast.success("Settings saved successfully!");
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-industrial-blue"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500">Customize your dashboard experience</p>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="display">Display</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4 p-6 bg-white rounded-lg border border-gray-200">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 flex items-center justify-center border border-gray-300">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1" asChild>
                          <label htmlFor="profile-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4" />
                            <span>Upload</span>
                            <input 
                              id="profile-upload" 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageUpload}
                            />
                          </label>
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Camera className="h-4 w-4" />
                          <span>Take Photo</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input id="display-name" defaultValue="John Doe" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="job-title" defaultValue="Process Engineer" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="display" className="space-y-4 p-6 bg-white rounded-lg border border-gray-200">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <RadioGroup 
                      value={tempSettings.theme} 
                      onValueChange={(value) => setTempSettings({...tempSettings, theme: value as 'light' | 'dark' | 'industrial'})}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="industrial" id="theme-industrial" />
                        <Label htmlFor="theme-industrial">Industrial</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Gauge Type</h3>
                    <RadioGroup 
                      value={tempSettings.gaugeType} 
                      onValueChange={(value) => setTempSettings({...tempSettings, gaugeType: value as 'radial' | 'linear'})}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="radial" id="gauge-radial" />
                        <Label htmlFor="gauge-radial">Radial (Circular)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="linear" id="gauge-linear" />
                        <Label htmlFor="gauge-linear">Linear (Bar)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Refresh Rate</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Update interval: {tempSettings.refreshRate} seconds</span>
                      </div>
                      <Slider
                        value={[tempSettings.refreshRate]}
                        min={1}
                        max={20}
                        step={1}
                        onValueChange={(value) => setTempSettings({...tempSettings, refreshRate: value[0]})}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Faster (1s)</span>
                        <span>Slower (20s)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4 p-6 bg-white rounded-lg border border-gray-200">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive alerts via email</p>
                      </div>
                      <Switch 
                        id="email-notifications"
                        checked={tempSettings.notifications.email}
                        onCheckedChange={(checked) => 
                          setTempSettings({
                            ...tempSettings, 
                            notifications: {...tempSettings.notifications, email: checked}
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-notifications">In-App Notifications</Label>
                        <p className="text-sm text-gray-500">Show alerts within the dashboard</p>
                      </div>
                      <Switch 
                        id="app-notifications"
                        checked={tempSettings.notifications.inApp}
                        onCheckedChange={(checked) => 
                          setTempSettings({
                            ...tempSettings, 
                            notifications: {...tempSettings.notifications, inApp: checked}
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive alerts via SMS (additional charges may apply)</p>
                      </div>
                      <Switch 
                        id="sms-notifications"
                        checked={tempSettings.notifications.sms}
                        onCheckedChange={(checked) => 
                          setTempSettings({
                            ...tempSettings, 
                            notifications: {...tempSettings.notifications, sms: checked}
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={saveSettings}
                className="bg-industrial-blue hover:bg-industrial-darkblue flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
