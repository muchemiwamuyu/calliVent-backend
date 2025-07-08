import express from 'express'
import passport from 'passport'

const router = express.Router()

// redirect to google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// google callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log(`user details`, req.user)
        res.redirect('https://muchemiwamuyu.github.io/calender-manager/') // after successful login
    }
)

// get auth status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      loggedIn: true,
      user: {
        id: req.user.id,
        name: req.user.displayName,
        email: req.user.emails?.[0]?.value,
        photo: req.user.photos?.[0]?.value
      }
    });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})


export default router