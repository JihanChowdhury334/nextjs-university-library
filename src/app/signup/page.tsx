'use client'

import { useState, FormEvent } from "react"


export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();


        const res=await fetch("/api/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },


            body: JSON.stringify({ name, email, password }),
        });

            const data = await res.json();

            setMessage(data.message);
    }


  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-6">Create an Account</h1>

      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

       
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>

      
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </main>
  );
}
                
        