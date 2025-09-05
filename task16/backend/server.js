import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Stripe from 'stripe';
import { PORT, MONGO_URI, STRIPE_SECRET } from './config.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const stripe = new Stripe(STRIPE_SECRET);

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/products', productRoutes);

app.post('/checkout', async (req, res) => {
  const { items } = req.body;
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({ url: session.url });
});

app.listen(PORT, () => console.log(Backend running on http://localhost:${PORT}));