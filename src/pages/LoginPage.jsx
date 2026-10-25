import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [errors, setErrors] = useState({});
  const { theme, toggleTheme } = useTheme();

  const handleLogin = () => {
    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      });
      return;
    }

    setErrors({});

    if (onLogin) {
      onLogin({ email, role });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 relative">
      <button
        type="button"
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/80 text-slate-600 hover:bg-white dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 shadow-sm transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">InTurn</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2">Intern Management System</p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Login</h2>
        
        <Input 
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          error={errors.email}
          required
        />
        
        <Input 
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errors.password}
          required
        />

        <div className="mb-4">
          <p className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Login as</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              <span>Admin</span>
            </label>
            <label className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
              <input
                type="radio"
                name="role"
                value="intern"
                checked={role === 'intern'}
                onChange={() => setRole('intern')}
              />
              <span>Intern</span>
            </label>
          </div>
        </div>
        
        <Button 
          text="Login" 
          onClick={handleLogin} 
          type="primary"
          className="w-full mt-2"
        />
        
        <p className="text-center text-gray-600 dark:text-slate-400 mt-4">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;
