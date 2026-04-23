import { registerUser } from '../lib/api';

export default function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(e.target.username.value, e.target.email.value, e.target.password.value);
      alert('Account created! Now login.');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="username" placeholder="Username" className="border p-2 w-full" required />
      <input name="email" type="email" placeholder="Email" className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" className="border p-2 w-full" required />
      <button className="bg-green-600 text-white p-2 w-full">Register</button>
    </form>
  );
}