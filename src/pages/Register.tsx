import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { showErrorToast, showSuccessToast } from '@/comman/CommanToast';
import Layout from '@/comman/Layout';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match.');
      return;
    }
    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userData);
        showSuccessToast('Registration successful!');
        navigate('/login')
    } catch (error) {
      showErrorToast('Registration failed. Please try again.');
    }
  };

  return (
    <Layout>
        
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Register
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default Register;
