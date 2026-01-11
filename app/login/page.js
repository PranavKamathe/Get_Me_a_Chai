"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    document.title = "Login - Get Me A Chai"
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <div className="text-white py-14 container mx-auto">
      <h1 className="text-center font-bold text-3xl">Login to Get Started</h1>

      <div className="flex flex-col gap-2 min-h-screen items-center p-10">

        <div className="flex flex-col gap-2 min-h-screen bg-gray-100 p-10">

<button
  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
  <span>Continue with Google</span>
</button>

<button
  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
  <span>Continue with LinkedIn</span>
</button>

<button
  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
  <span>Continue with Twitter</span>
</button>

<button
  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
  <span>Continue with Facebook</span>
</button>

<button
  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
  <span>Continue with Github</span>
</button>

<button
  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
  <span>Continue with Apple</span>
</button>

        </div>
      </div>
    </div>
  )
}

export default Login
