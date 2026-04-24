import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) navigate('/');
    else setError(result.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass max-w-md w-full p-8 rounded-3xl animate-in">
        <h1 className="text-4xl font-bold mb-2 text-center">Voxa</h1>
        <p className="text-text-muted text-center mb-8">Your Cloud Library</p>
        
        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
              <input 
                type="email" 
                className="w-full bg-black/40 border border-white/5 rounded-xl p-3 pl-10 focus:border-primary outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
              <input 
                type="password" 
                className="w-full bg-black/40 border border-white/5 rounded-xl p-3 pl-10 focus:border-primary outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center">
            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-text-muted">
          New here? <Link to="/register" className="text-white hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
