// import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';
import Credentials from "@auth/core/providers/credentials"
import { db, eq, User } from 'astro:db';
import bcrypt from 'bcryptjs';

export default defineConfig({
  providers: [
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      credentials:{
        email: {label:'correo', type:'email'},	
        password: {label:'password', type:'password'}
      },
      authorize: async({email, password})=>{
        const [user] = await db.select().from(User).where(eq(User.email, email as string))
        if(!user){
          throw new Error('Usuario no encontrado')
        }
        if(!bcrypt.compareSync(password as string, user.password)){
          throw new Error('Contraseñas incorrectas')
        }
        const {password:_, ...rest} = user;
        return rest;
      }
    })
  ],
});