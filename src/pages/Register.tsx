
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlaskConical, Loader2 } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setIsSubmitting(true);
    const success = await register(email, password, name);
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
          <h1 className="text-3xl font-bold text-white mb-2">Join ReactorMon</h1>
          <p className="text-lg text-white/80">
            Create an account to gain access to the industrial reactor monitoring system.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium">Why sign up?</h3>
              <ul className="mt-2 space-y-2 text-white/70 text-sm">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span>Monitor reactor temperatures and pressures in real-time</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span>Track batch progress and performance</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span>Receive alerts for critical conditions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span>Access historical data and analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <FlaskConical className="h-10 w-10 text-industrial-blue mx-auto mb-2" />
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-gray-500 mt-1">Enter your details to register</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-industrial-blue hover:bg-industrial-darkblue"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Creating account...
                </>
              ) : (
                'Register'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-industrial-blue hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
