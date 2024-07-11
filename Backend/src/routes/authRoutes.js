import { Router } from "express";
const router = Router();
import { passPortConfig } from "../controllers/passPortConfig.js";
import jwt from "jsonwebtoken";

router.get("/google", passPortConfig.passport.authenticate("google", {
    scope: ["profile", "email"],
  }));
  
  router.get('/google/callback', passPortConfig.passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      try {
          const token = jwt.sign(
              { email: req.user.email, id: req.user.id },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );
            res.redirect(`/success?token=${token}`);
      } catch (error) {
          console.error('Error during Google callback', error);
          res.status(500).send('Internal Server Error');
      }
      
    });

export default router;