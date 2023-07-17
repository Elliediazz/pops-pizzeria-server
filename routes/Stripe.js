if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post('/checkout', async (req, res) => {
  const { items, note } = req.body;

  const customer = await stripe.customers.create({
    metadata:{
      userId: req.body.userId,
      cart: JSON.stringify(items)
    }
  })

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        ...(item.image ? { image: [item.image] } : {}),
        metadata: {
          selectedOption: JSON.stringify(item.options),
          id: item._id,
          note: note,
        },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/shoppingcart`,
  });

  res.send({ url: session.url });
});

// Stripe webhook 
// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// const endpointSecret = process.env.ENDPOINT_SECRET

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if(endpointSecret){

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('webhook verified')
    } catch (err) {
      console.log("webhook eroor:", err)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType= event.type
  }else{
    data = req.body.data.object;
    eventType = req.body.type
  }
  //handle the event
if (eventType === "checkout.session.completed") {
  stripe.customers
  .retrieve(data.customer)
  .then((customer) => {
    console.log(customer)
    console.log("data:",data)
  }).catch(err => console.log(err.message))
}

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

module.exports = router;