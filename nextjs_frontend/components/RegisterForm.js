import { registerUser } from '../lib/api';
import { useState } from 'react';

export default function RegisterForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser(e.target.username.value, e.target.email.value, e.target.password.value);
      alert('Account created! You can now log in.');
      e.target.reset(); // Clear the form
    } catch (err) {
      setError(err.message); // Show the error from WordPress
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      
      <input name="username" placeholder="Username" className="border p-2 w-full" required />
      <input name="email" type="email" placeholder="Email" className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" className="border p-2 w-full" required />
      
      <button 
        disabled={loading} 
        className="bg-green-600 text-white p-2 w-full disabled:bg-gray-400"
      >
        {loading ? 'Registering...' : 'Opret Bruger'}
      </button>
    </form>
  );
}