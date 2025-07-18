import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/Users.js";
import dotenv from 'dotenv'

dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
    async (accessToken, RefreshToken, profile, done) => {

        try {

            let calli = await User.findOne({ googleId: profile.id });

            if (!calli) {
                calli = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value
                })
            }

            done(null, calli)
        } catch (error) {
            done(null, error)
        }
    }))

passport.serializeUser((user, done) => {
    done(null, user.id) // store user session
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
