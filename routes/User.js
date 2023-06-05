const router = require('express').Router()
const { 
    signUp, 
    logIn, 
    getProfileData,
    logOut 
} =  require('../controllers/User')
const { validateJWT }= require('../middleware/Auth')

router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/logout', logOut)
router.get('/profile',validateJWT, getProfileData)

module.exports = router