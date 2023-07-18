if (process.env.ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const menuItemRoutes = require('./routes/MenuItems.js')
const menuItemsController = require('./controllers/MenuItems.js');
const specialsItemRoutes = require('./routes/SpecialsItems.js')
const specialsItemsController = require('./controllers/SpecialsItems.js');
const usersRoutes = require('./routes/User.js')
const usersController  = require('./controllers/User.js')
const stripe = require('./routes/Stripe.js')

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
app.use('/webhook', express.raw({type: '*/*'}))

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
app.listen(PORT, () => {
    //DB connection
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'PopsPizzeria'
      })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB', err));

    console.log(`listening on port ${PORT}`)
});