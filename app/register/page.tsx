"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("password is not match ");
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        })
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "registration failed");
      }
      console.log(data)
      router.push("/login")
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10 p-6 border rounded'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
            onChange={(e) => setpassword(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='confirmPassword' className='block text-sm font-medium mb-2'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'>Register</button>
      </form>
      <div>
        <p className='text-center mt-4'>
          Already have an account? <a href='/login' className='text-blue-500 hover:underline'>Login</a>
        </p>
      </div>
    </div>
  )
}

export default page