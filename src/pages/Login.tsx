
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlaskConical, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-industrial-blue to-industrial-darkblue items-center justify-center">
        <div className="max-w-lg mx-auto p-8">
          <FlaskConical className="h-16 w-16 text-white mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Industrial Reactor Monitoring</h1>
          <p className="text-lg text-white/80">
            Monitor your reactors in real-time with comprehensive analytics and alerts.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium">Real-time Monitoring</h3>
              <p className="text-white/70 text-sm mt-1">Track temperatures and pressure as they change</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium">Batch Management</h3>
              <p className="text-white/70 text-sm mt-1">Track progress and status of all production batches</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium">Alert System</h3>
              <p className="text-white/70 text-sm mt-1">Get notified when reactors reach critical levels</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium">Analytics Dashboard</h3>
              <p className="text-white/70 text-sm mt-1">View historical data and performance metrics</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <FlaskConical className="h-10 w-10 text-industrial-blue mx-auto mb-2" />
            <h1 className="text-2xl font-bold">Login to ReactorMon</h1>
            <p className="text-gray-500 mt-1">Enter your credentials to access the dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-industrial-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-industrial-blue hover:bg-industrial-darkblue"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-industrial-blue hover:underline">
                Register
              </Link>
            </p>
          </div>
          
          <div className="mt-8 text-xs text-center text-gray-500">
            <p>Admin access: admin@gmail.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
