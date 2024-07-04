const express = require("express");
const router = express.Router();
const passport= require("../controllers/passportConfig")
const jwt = require("jsonwebtoken");

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
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
  
  module.exports = router;