"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PaymentPage = ({ username }) => {

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])

    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            })
            router.push(`/${username}`)
        }
    }, [])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        const u = await fetchuser(username)
        setcurrentUser(u)
        const dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        const order = await initiate(amount, username, paymentform)

        const options = {
            key: currentUser.razorpayid,
            amount: amount,
            currency: "INR",
            name: "Get Me A Chai",
            description: "Support Payment",
            order_id: order.id,
            callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            theme: { color: "#3399cc" }
        }

        const rzp = new Razorpay(options)
        rzp.open()
    }

    return (
        <>
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className='cover w-full bg-red-50 relative'>
                <img className='object-cover w-full h-48 md:h-96
' src={currentUser.coverpic} alt="" />
                <div className='absolute -bottom-20 right-[33%] md:right-[46%] border-2 border-white rounded-full size-36 overflow-hidden'>
                    <img className='object-cover rounded-full size-36' src={currentUser.profilepic} alt="" />
                </div>
            </div>

            <div className="info flex flex-col items-center my-24 mb-32 gap-2">
                <div className='font-bold text-lg'>@{username}</div>
                <div className='text-slate-400'>Lets help {username} get a chai!</div>
                <div className='text-slate-400'>
                    {payments.length} Payments · ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>

                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">

                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-5">
                        <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                        <ul className='text-lg'>
                            {payments.length === 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => (
                                <li key={i} className='my-4 flex gap-2'>
                                    <img width={33} src="/avatar.gif" alt="" />
                                    <span>
                                        {p.name} donated <b>₹{p.amount}</b> — “{p.message}”
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-5">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>

                        <div className='flex flex-col gap-3'>
                            <input name="name" onChange={handleChange} value={paymentform.name}
                                className='p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />

                            <input name="message" onChange={handleChange} value={paymentform.message}
                                className='p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />

                            <input name="amount" onChange={handleChange} value={paymentform.amount}
                                className='p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />

                            <button
                                onClick={() => pay(parseInt(paymentform.amount) * 100)}
                                disabled={paymentform.name.length < 3 || paymentform.message.length < 4 || paymentform.amount.length < 1}
                                className="text-white bg-purple-600 from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800 transition font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-slate-600"
                            >
                                Pay
                            </button>
                        </div>

                        <div className='flex gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
