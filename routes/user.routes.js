import express from 'express'
import passport from 'passport'

const router = express.Router()

// redirect to google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// google callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
        console.log(`user details ${req.user}`)
        res.redirect('/dashboard') // after successful login
    }
)

// logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})


export default router