"use client";

import Google from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    if(password !== confirmPassword){
      return alert("passwords do not match");
    }
      const response = await fetch('/api/auth/register',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password,username})
      })
       const data = await response.json();
      if(!response.ok){
        return alert(data.error)
      }
      console.log(data);


     router.push('/login');

  }

  return (
    <div>
    <section className="bg-gray-50 dark:bg-black">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          
          {/* Video-Con    */}
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-blue-400">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register a new account
              </h1>
              <form className="space-y-4 md:space-y-6" 
              onSubmit={handleSubmit}
              >
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                      <input type="text" name="username" id="username" className="input input-info w-sm bg-transparent" placeholder="Hxrsshhh" required
                      value={username}
                      onChange={(e)=>(setUsername(e.target.value))}
                       />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="input input-info w-sm bg-transparent" placeholder="hxrsshh@example.com" required 
                      value={email}
                      onChange={(e)=>(setEmail(e.target.value))}
                      />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="input input-info w-sm bg-transparent"  required 
                      value={password}
                      onChange={(e)=>(setPassword(e.target.value))}
                      />
                  </div>
                   <div>
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                      <input type="password" name="ConfirmPassword" id="password" placeholder="••••••••" className="input input-info w-sm bg-transparent"  required
                      value={confirmPassword}
                      onChange={(e)=>(setConfirmPassword(e.target.value))}
                       />
                  </div>
                  
                  <button type="submit" className="btn btn-info rounded-sm w-sm">Register</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account ? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
   </div>
  );
};

export default Page;
