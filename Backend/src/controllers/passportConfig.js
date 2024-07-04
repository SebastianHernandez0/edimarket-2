const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  registrarUsuario,
  verificarUsuario,
  consultarUsuarioById,
} = require("../models/userModel");


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await verificarUsuario(email, "dummy_password", true);
        if (!user) {
          // Registrar el usuario si no existe
          const newUser = {
            nombre: profile.displayName,
            email: email,
            contraseña: '', // No necesitas contraseña para usuarios autenticados con Google
          };

          user = await registrarUsuario(newUser);
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
      let user= await consultarUsuarioById(id);
      done(null, user);
    } catch (error) {
      console.error("Error during deserialization", error);
      done(error, null);
    }
  });

module.exports = passport;
