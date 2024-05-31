import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

interface Credentials {
  email: string;
  password: string;
}


  interface User {
  email: string;
  password: string;
  id: string;
  first_name: string;
  last_name: string;
  organization: string;
  profile_picture: string;
}

  interface Session {
    user: {
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        organization: string;
        profile_picture: string;        
    }
    

  }


}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    email: string;
    id: string;
    first_name: string;
    last_name: string;
    organization: string;
    profile_picture: string;
  }
}