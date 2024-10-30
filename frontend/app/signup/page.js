"use client";
import { useState } from "react";
import { useAuth } from "../auth/authContext";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: </label>
        <input type="text" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Enter</button>
    </form>
  );
}
