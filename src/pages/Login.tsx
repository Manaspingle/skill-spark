import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try alex@test.com / password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold">
            N
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Sign in to Nexus</h1>
          <p className="mt-1 text-sm text-muted-foreground">Master the fundamentals through precision testing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="shadow-card rounded-xl bg-card p-6 space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border-0 bg-muted px-3 py-2.5 text-sm text-foreground shadow-option outline-none focus:shadow-option-selected transition-shadow"
                placeholder="alex@test.com"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border-0 bg-muted px-3 py-2.5 text-sm text-foreground shadow-option outline-none focus:shadow-option-selected transition-shadow"
                placeholder="password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          No account?{' '}
          <Link to="/signup" className="text-primary hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
