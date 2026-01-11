import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {

      if (account.provider === "github") {

        await connectDb("mongodb://localhost:27017/chai")

        // check if user exists
        const currentUser = await User.findOne({ email: user.email })

        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
        }

        return true
      }

      return false
    },

    async session({ session }) {
      await connectDb("mongodb://localhost:27017/chai")

      const dbUser = await User.findOne({ email: session.user.email })
      session.user.name = dbUser.username

      return session
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
