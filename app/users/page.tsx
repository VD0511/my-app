"use client"
import { useState } from "react"

export default function Page(){
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const validate = () => {
        let err = {};

        if (!name.trim()) err.name = "Name required";
        if (!age) err.age = "Age required";
        if (!email) err.email = "Email required";
        else if (!email.includes("@")) err.email = "Invalid email";
        if (!password) err.password = "Password required";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSignup = async()=>{
        if (!name || !age || !email || !password) {
        alert("Sab fields bharni zaroori hai");
        return;
    }

        let response = await fetch("http://localhost:3000/api/users",{
            method: "POST",
            body: JSON.stringify({name,age,email,password}),
            headers: {"content-type": "application/json"}
        })

        response = await response.json();

        if (response.success) {
        alert("Naya user ban gaya!");
        // Form reset karne ke liye
        setName(""); setAge(""); setEmail(""); setPassword("");
    } else {
        alert("Kuch error aya: " + response.message);
    }
}
    
    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-96 h-[450px">
         <div className="absolute inset-0 translate-x-6 translate-y-6 flex flex-col bg-gradient-to-r from-[#64965e] to-[#81ff8a] justify-center items-center gap-4  border border-black rounded-lg ">
           <h1 className="text-2xl font-bold ">Signup User</h1> 
           <input type="text" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3" />
           <input type="text" placeholder="Enter age" value={age} onChange={(e)=> setAge(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3" />
           <input type="text" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3"/>
           <input type="password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3"/>
           <button onClick={handleSignup} className="bg-gradient-to-r from-[#056b3b] to-[#516b8b] text-white rounded-lg font-medium text-lg h-10 w-72">Signup</button>
         </div>
         <div className=" absolute top-6 left-8 w-full h-full flex flex-col bg-gradient-to-r from-[#64965e] to-[#81ff8a] justify-center items-center gap-4  border border-black rounded-lg ">
           <h1 className="text-2xl font-bold ">Login User</h1> 
           <input type="text" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3" />
           <input type="text" placeholder="Enter age" value={age} onChange={(e)=> setAge(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3" />
           <input type="text" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3"/>
           <input type="password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="border border-black h-10 w-72 rounded-lg pl-3"/>
           <button onClick={handleSignup} className="bg-gradient-to-r from-[#056b3b] to-[#516b8b] text-white rounded-lg font-medium text-lg h-10 w-72">Login</button>
         </div>
        </div>
        </div>
    )
}