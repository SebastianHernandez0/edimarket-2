import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import {userModel} from "../models/userModel.js";

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://edimarket.onrender.com/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          let user = await userModel.verificarUsuario(email, "dummy_password", true);
          if (!user) {
            // Registrar el usuario si no existe
            const newUser = {
              nombre: profile.displayName,
              email: email,
              contraseña: '', // No necesitas contraseña para usuarios autenticados con Google
            };
  
            user = await userModel.registrarUsuario(newUser);
          }
  
          return done(null, user);
        } catch (error) {
          console.error("Error during authentication", error);
          return done(error, null);
        }
      }
    )
  );
  
  
  passport.serializeUser(async(user, done) => {
      console.log("Serializing user: ", user);
      done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
      try {
        console.log("Deserializing user ID:", id);
        let user= await userModel.consultarUsuarioById(id);
        done(null, user);
      } catch (error) {
        console.error("Error during deserialization", error);
        done(error, null);
      }
    });
  

    export const passPortConfig = { passport };