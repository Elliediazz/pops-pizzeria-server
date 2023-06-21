require("dotenv").config();
const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY);


router.post('/checkout', async (req, res) => {
  //console.log(req.body);
  const lineItems = req.body.items.map((item)=> {
          return({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                ...(item.image ? { image: [item.image] } : {}),
                metadata:{
                  id: item._id
                }
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity
          })
  });

  const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/shoppingcart`
  });
  
  res.send({url: session.url });
});


module.exports = router