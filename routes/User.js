const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "373151948151-7ucdilvhgce7u17fv2s1vs67bbvjesh3.apps.googleusercontent.com"
);
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};

userRouter.post("/adduser", (req, res) => {
  const {name,email } = req.body;
  console.log(req.body);
  const newUser = new User({
   name,
   email
  });
  newUser.save((err) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "User successfully added",
          msgError: false,
        },
      });
  });
});

userRouter.post("/login", (req, res) => {
  console.log(req.body.token);
  const { token } = req.body;
  const ticket = async () => {
    const ticket = await client.verifyIdToken({
      idToken: token,
    });
    const user = ticket.getPayload();

    if (true) {
      const tokenn = signToken(token);
      res.cookie("access_token", tokenn, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: user,
        isAdmin:user.email=="recruiterbit9@gmail.com"
      });
    } else {
      res.status(500).json({
        message: {
          msgBody: "Please login via edu email id only",
          msgError: true,
        },
        user: { name: "", username: "", email: "", phone: "", univ: " " },
        success: true,
        isAuthenticated: false,
        isAdmin: false,
      });
    }
    // }
  };
  ticket();
});
userRouter.post("/getuserbyemail", (req, res) => {
  console.log("Fetching User");
  User.findOne({email:req.body.email}).exec((err, document) => {
    if (err) {
      console.log("User failed to fetch");
      res.status(500).json({
        message: { msgBody: "User failed to fetch", msgError: true },
      });
    } else {
      console.log("User fetched successfully");
      res.status(200).json({ user: document });
    }
  });
});
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({
      user: { name: "", username: "", email: "", phone: "", univ: " " },
      success: true,
    });
  }
);


userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, email, picture } = req.user;
    // console.log("route",req.user);
    res.status(200).json({
      isAuthenticated: true,
      user: { name, email, picture },
    });
  }
);

module.exports = userRouter;
