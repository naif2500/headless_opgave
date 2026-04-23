'use client';

import LoginForm from "../../components/LoginForm";
import RegisterForm from "../..//components/RegisterForm"; 

export default function LoginPage() {
  return (
    <div className="profile-page">
      <h1>Log Ind</h1>
      <LoginForm />
      <RegisterForm /> 
    </div>
  );
}