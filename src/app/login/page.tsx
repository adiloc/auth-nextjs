"use client";
import Link from "next/link";
import React, { useEffect }from "react";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

console.log(user)
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
  
  } catch (error: any) {
    console.log("Login failed", error.message);
    toast.error(error.message); 

  } finally {
    setLoading(false);
  }
  
  return (
    <div className="flex flex-col items-center
     justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr/>
      <label htmlFor="email">email</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
        id= "email"
        type= "text"
        value= {user.email}
        onChange= {(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        />
      <label htmlFor="password">password</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
        id= "password"
        type= "text"
        value= {user.password}
        onChange= {(e) => setUser({...user, password: e.target.value})}
        placeholder="password" 
        />
        <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
        onClick={onLogin}
        >Login here</button>
        <Link href="/signu">Visit login page</Link>
    </div>
  )
}}