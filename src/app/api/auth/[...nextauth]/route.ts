import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv';
dotenv.config();


  interface User {
  email: string;
  password: string;
  id: string;
  first_name: string;
  last_name: string;
  organization: string;
  profile_picture: string;
}


interface AuthResponse {
  status: number;
  user: User;
}

async function authenticate(email: string, password: string): Promise<AuthResponse> {
    try{
    let response = await fetch(`${process.env.NEXT_PUBLIC_GO_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });


    let data = await response.json();
        console.log(data)

    if(response.status !== 200){
      throw new Error("Either the user does not exist or the password is incorrect");
    }

    data = data.object;



    let user: User = {
      email: data.email,
      password: data.password,
      id: data._id,
      first_name: data.first_name,
      last_name: data.last_name,
      organization: data.organization,
      profile_picture: data.profile_picture
    }

    let authResponse: AuthResponse = {
      status: 200,
      user: user
    }

          console.log(authResponse)


    return authResponse;
  } catch (error) {
    let authResponse: AuthResponse = {
      status: 400,
      user: {
        email: "",
        password: "",
        id: "",
        first_name: "",
        last_name: "",
        organization: "",
        profile_picture: ""
      }
    }

    return authResponse;
  }

    

    
}





    



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials) {
          console.log(credentials);
          const { email, password } = credentials;
          let new_user: User | null = null
          try {


            let response : AuthResponse
            response = await authenticate(email, password);

            console.log("this is the response")

            console.log(response)

            if(response.status !== 200){
              throw new Error("Either the user does not exist or the password is incorrect");
            }

            new_user = response.user;

            return new_user;
            

           
    
          } catch (error) {
            throw new Error("Either the user does not exist or the password is incorrect");
          }

          return new_user;
        }
        return null; // Return null if credentials are undefined
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: "secret",
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.organization = user.organization;
        token.profile_picture = user.profile_picture;
        
        return token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.email) {
        session.user = { email: token.email || '' , id: token.id, first_name: token.first_name, last_name: token.last_name, organization: token.organization, profile_picture: token.profile_picture};
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


