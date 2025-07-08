import express from 'express'
import dotenv from 'dotenv'
import connectDb from "./config/db.js"
import session from 'express-session';
import passport from 'passport';
import cors from 'cors'
import './config/Passport.js'
import userRoutes from './routes/user.routes.js'

// load environment variables
dotenv.config();

// connect database
connectDb();

const app = express();
app.use(express.json());

// communication for the frontend html
app.use(cors({
    origin: 'https://muchemiwamuyu.github.io',  // change to production link later
    credentials: true
}))

// session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        secure: true,
        sameSite: 'none',
        httpOnly: true
    }
}))

// passport
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/auth', userRoutes) 

// protecting middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google')
}

// routing 
app.get('/dashboard', isLoggedIn, (req, res) => {
    if(!req.user) return res.redirect('/auth/google');
    res.send(`welcome ${req.user.name}`)
})


// starting the server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

