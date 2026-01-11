'use server'

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()

    // find user who will receive payment
    const user = await User.findOne({ username: to_username })
    if (!user) {
        throw new Error("User not found")
    }

    const instance = new Razorpay({
        key_id: user.razorpayid,
        key_secret: user.razorpaysecret
    })

    const options = {
        amount: parseInt(amount) * 100, // convert to paise
        currency: "INR"
    }

    const order = await instance.orders.create(options)

    // save pending payment
    await Payment.create({
        oid: order.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
        done: false
    })

    return order
}

export const fetchuser = async (username) => {
    await connectDb()
    const user = await User.findOne({ username }).lean()
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    const payments = await Payment.find({
        to_user: username,
        done: true
    })
        .sort({ amount: -1 })
        .limit(10)
        .lean()

    return payments
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    const ndata = Object.fromEntries(data)

    // check username change
    if (oldusername !== ndata.username) {
        const exists = await User.findOne({ username: ndata.username })
        if (exists) {
            return { error: "Username already exists" }
        }

        await User.updateOne({ email: ndata.email }, ndata)
        await Payment.updateMany(
            { to_user: oldusername },
            { to_user: ndata.username }
        )
    } else {
        await User.updateOne({ email: ndata.email }, ndata)
    }

    return { success: true }
}
