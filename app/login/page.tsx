"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const router = useRouter();
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  if (result?.error) {
    console.error("Login failed: ", result.error);
  } else {
    router.push("/");
  }
};

return (
    <div>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10 p-6 border rounded'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
            <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>Email:</label>
            <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-3 py-2 border rounded'
            />
            </div>
            <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium mb-2'>Password:</label>
            <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full px-3 py-2 border rounded'
            />
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'>Login</button>
        </form>
        <div>
            <p className='text-center mt-4'>
                Don't have an account? <a href='/register' className='text-blue-500 hover:underline'>Register</a>
            </p>
        </div>
    </div>

  )
}

export default LoginPage
