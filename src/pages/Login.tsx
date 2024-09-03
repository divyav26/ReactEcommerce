import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { showErrorToast, showSuccessToast } from '@/comman/CommanToast';
import Layout from '@/comman/Layout';
import { auth } from '@/firebase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const user = userData.user;
      // Get token
      const userToken = await user.getIdToken();
      Cookies.set("user_token", userToken); 
      Cookies.set("user_id", user.uid);
      showSuccessToast('Login successful!');
      navigate('/'); 
    } catch (error) {
      showErrorToast('Login failed. Please check your credentials.');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
