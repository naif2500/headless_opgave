// components/LoginForm.js
'use client';
import { useState } from 'react';
import { loginToWordPress } from '../lib/api';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Verify credentials with WordPress
      await loginToWordPress(username, appPassword);
      
      // 2. If it succeeds, save creds to localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('appPassword', appPassword);
      
      // 3. Reload to show the dashboard
      window.location.reload();
    } catch (err) {
      setError('Login failed! Check your Username and Application Password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <input 
        className="w-full border p-2 mb-4" 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        className="w-full border p-2 mb-4" 
        placeholder="Application Password" 
        onChange={(e) => setAppPassword(e.target.value)} 
      />
      
      <button 
        disabled={isLoading}
        type="submit" 
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {isLoading ? 'Verifying...' : 'Log In'}
      </button>
    </form>
  );
}