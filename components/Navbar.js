"use client"
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <nav className='bg-gray-900 shadow-xl shadow-white text-white flex justify-between items-center px-4 md:h-16'>

      <Link className="logo font-bold text-lg flex justify-center items-center" href="/">
        <img className='invertImg' src="/tea.gif" width={44} alt="logo" />
        <span className='text-xl md:text-base my-3 md:my-0'>Get Me a Chai!</span>
      </Link>

      <div className='relative flex items-center gap-4'>
        {session && (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-700 rounded-lg text-sm px-4 py-2"
              type="button"
            >
              {session.user?.name || "Account"}
              <svg
                className="w-4 h-4 ms-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            {showdropdown && (
              <div className="absolute right-0 top-12 z-10 bg-gray-800 rounded-lg shadow-lg w-44">
                <ul className="p-2 text-sm">
                  <li>
                    <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="block p-2 hover:bg-gray-700 rounded">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/earnings" className="block p-2 hover:bg-gray-700 rounded">
                      Earnings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left p-2 hover:bg-gray-700 rounded"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}

        {!session && (
  <Link href="/login">
    <button className="text-white bg-blue-500 from-purple-600 to-blue-500 hover:to-blue-600 font-medium rounded-lg text-sm px-5 py-2.5">
      Login
    </button>
  </Link>
)}

      </div>
    </nav>
  )
}

export default Navbar
