if (process.env.ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')

const menuItemRoutes = require('./routes/MenuItems.js')
const menuItemsController = require('./controllers/MenuItems');
const specialsItemRoutes = require('./routes/SpecialsItems')
const specialsItemsController = require('./controllers/SpecialsItems');
const usersRoutes = require('./routes/User')
const usersController  = require('./controllers/User')
const stripe = require('./routes/Stripe')

const app = express()

menuItemsController.connect();
specialsItemsController.connect();
usersController.connect()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

//HomeTest
app.get('/', (req, res) => {
    res.send('Welcome to Pops Pizzeria API')
})

// routes
app.use('/menu', menuItemRoutes)
app.use('/specials', specialsItemRoutes)
app.use('/users', usersRoutes)
app.use('/stripe', stripe)

// Listen for connection 
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});