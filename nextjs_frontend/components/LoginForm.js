import { loginUser } from '../lib/api';

export default function LoginForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(e.target.username.value, e.target.password.value);
      alert('Login successful!');
      window.location.reload(); // Refresh to update the UI
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="username" placeholder="Username" className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" className="border p-2 w-full" required />
      <button className="bg-blue-600 text-white p-2 w-full">Login</button>
    </form>
  );
}