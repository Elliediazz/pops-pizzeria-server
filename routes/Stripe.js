if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const endpointSecret = process.env.ENDPOINT_SECRET

router.post('/checkout', async (req, res) => {
  const { items, note } = req.body;
  console.log(items)

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
          selectedOption: item.Options,
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

//Create Order
const createOrder = async (customer, data) => {
  const Items = JSON.parse (customer.metadata.cart);
  
  
  const newOrder = new Order({
    userId: customer.metadata.userId, //need to add
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    payment_status: data.payment_status 
  })

    try {
      const savedOrder = await newOrder.save()

      console.log("Processed order:", savedOrder)
      //email the customer
      //email Pizzeria 

    }catch(err){
      console.log(err)
    }
}

// Stripe webhook 
router.post('/webhook', (req, res,) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('webhook verified')

  } catch (err) {
    console.log("webhook error:", err)
    res.status(400).send(`Webhook Error: ${err.message}`);

    return;
  }

  let eventType = event.type;
  let data = event.data.object;
   console.log(eventType)
  // console.log(data)

  //handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
    .retrieve(data.customer)
    .then((customer) => {
      console.log(customer)
      console.log("data:", data)
      createOrder(customer,data)
      
    }).catch(err => console.log(err.message))
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

module.exports = router;